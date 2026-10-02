/**
 * xAPI (Tin Can) runtime - launch-parameter discovery, statement
 * emission, and State-API persistence.
 *
 * The LMS launches the package with the LRS parameters on the content
 * URL query string (endpoint, auth, actor, registration, activity_id).
 * We read them here, POST statements to the LRS one at a time (so a
 * single rejected statement can never drop the others), and persist the
 * resume slice through the xAPI State API (no size cap, unlike SCORM
 * suspend_data). Outside a launch (dev / direct open) everything no-ops
 * safely and persistence falls back to localStorage.
 *
 * Proven end to end on the target LMS: statements POST, replay appends,
 * and a `completed` against the launched activity marks the lesson done.
 */

const XAPI_VERSION = '1.0.2'; // target LRS caps at 1.0.2; 1.0.3 is rejected
const NS = 'https://booking.com/xapi/rate-right'; // object-id namespace
const EXT = 'https://booking.com/xapi/ext'; // extension-key namespace
const ADL = 'http://adlnet.gov/expapi/verbs';
const ACT = 'http://adlnet.gov/expapi/activities';
const CMII = `${ACT}/cmi.interaction`;
const COURSE = `${ACT}/course`;

export type XapiActor = {
  objectType?: string;
  name?: string;
  mbox?: string;
  openid?: string;
  account?: unknown;
};

type Launch = {
  endpoint: string;
  auth: string;
  registration: string;
  activityId: string;
  actor: XapiActor | null;
};

// The LMS passes the actor with mbox/name as arrays, which is not a
// conformant Agent (they must be single strings). Collapse to the first
// element and stamp objectType so strict LRSes accept it.
function normalizeActor(a: unknown): XapiActor | null {
  if (!a || typeof a !== 'object') return null;
  const actor: Record<string, unknown> = { ...(a as Record<string, unknown>) };
  (['mbox', 'name', 'openid', 'account'] as const).forEach((k) => {
    if (Array.isArray(actor[k])) actor[k] = (actor[k] as unknown[])[0];
  });
  if (!actor.objectType) actor.objectType = 'Agent';
  return actor as XapiActor;
}

function readLaunch(): Launch {
  const q = new URLSearchParams(window.location.search);
  let endpoint = q.get('endpoint') || '';
  if (endpoint && !endpoint.endsWith('/')) endpoint += '/';
  let actor: XapiActor | null = null;
  const raw = q.get('actor');
  if (raw) {
    try {
      actor = normalizeActor(JSON.parse(raw));
    } catch {
      actor = null;
    }
  }
  return {
    endpoint,
    auth: q.get('auth') || '',
    registration: q.get('registration') || '',
    activityId: q.get('activity_id') || `${NS}`,
    actor,
  };
}

const LAUNCH = readLaunch();

/** True when launched by an LMS with a usable LRS endpoint + auth. */
export function isXapiLaunch(): boolean {
  return !!(LAUNCH.endpoint && LAUNCH.auth);
}

/** The launch registration (one attempt), or null outside a launch. */
export function launchRegistration(): string | null {
  return LAUNCH.registration || null;
}

/** Learner display name from the launch actor, or null. */
export function launchActorName(): string | null {
  return (LAUNCH.actor && LAUNCH.actor.name) || null;
}

function uuid(): string {
  try {
    if (window.crypto && 'randomUUID' in window.crypto) {
      return window.crypto.randomUUID();
    }
  } catch {
    /* fall through */
  }
  const b = new Uint8Array(16);
  (window.crypto || ({} as Crypto)).getRandomValues?.(b);
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = Array.from(b, (x) => x.toString(16).padStart(2, '0'));
  return `${h[0]}${h[1]}${h[2]}${h[3]}-${h[4]}${h[5]}-${h[6]}${h[7]}-${h[8]}${h[9]}-${h[10]}${h[11]}${h[12]}${h[13]}${h[14]}${h[15]}`;
}

function headers(): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    Authorization: LAUNCH.auth,
    'X-Experience-API-Version': XAPI_VERSION,
  };
}

// ───────── Statement builders (the Rate Right taxonomy) ─────────

export type Level = 'L0' | 'L1' | 'L2' | 'L3';

type Score = { raw: number; min: number; max: number; scaled?: number };

type ContextExtras = {
  level?: Level;
  round?: number;
  'item-code'?: string;
  'objection-type'?: string;
  'capability-code'?: string;
  'normalized-score'?: number;
  'rounds-completed'?: number;
  'total-stars'?: number;
  mode?: string;
};

function verb(id: string, word: string) {
  return { id, display: { 'en-US': word } };
}

function interaction(idPath: string, name: string) {
  return {
    id: `${NS}${idPath}`,
    objectType: 'Activity',
    definition: { type: CMII, name: { 'en-US': name } },
  };
}

function extensions(extras: ContextExtras) {
  const e: Record<string, unknown> = {};
  (Object.keys(extras) as (keyof ContextExtras)[]).forEach((k) => {
    if (extras[k] !== undefined) e[`${EXT}/${k}`] = extras[k];
  });
  return e;
}

function context(extras: ContextExtras) {
  const c: Record<string, unknown> = { platform: 'Rate Right', language: 'en-US' };
  if (LAUNCH.registration) c.registration = LAUNCH.registration;
  const ext = extensions(extras);
  if (Object.keys(ext).length) c.extensions = ext;
  return c;
}

type Statement = Record<string, unknown>;

function statement(
  v: { id: string; word: string },
  object: unknown,
  extras: ContextExtras,
  result?: unknown,
): Statement {
  const s: Statement = {
    id: uuid(),
    timestamp: new Date().toISOString(),
    actor: LAUNCH.actor,
    verb: verb(v.word === 'initialized' ? `${ADL}/initialized` : `${ADL}/${v.word}`, v.word),
    object,
  };
  if (result) s.result = result;
  s.context = context(extras);
  return s;
}

// ───────── Emission (fire-and-forget, posted individually) ─────────

const STORAGE_BUFFER = 'rateRight:xapi:buffer';

// Keep a local record of every statement so nothing is lost if the LRS
// is briefly unreachable (mirrors the feedback-button posture). Capped so
// it can never grow unbounded.
function buffer(s: Statement) {
  try {
    const raw = localStorage.getItem(STORAGE_BUFFER);
    const arr: Statement[] = raw ? JSON.parse(raw) : [];
    arr.push(s);
    while (arr.length > 500) arr.shift();
    localStorage.setItem(STORAGE_BUFFER, JSON.stringify(arr));
  } catch {
    /* storage full / unavailable - ignore */
  }
}

function post(s: Statement) {
  buffer(s);
  if (!isXapiLaunch()) return;
  // One statement per request - a rejected statement can never drop
  // others, and the LMS marks completion from the launched-activity one.
  try {
    void fetch(`${LAUNCH.endpoint}statements`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify([s]),
      keepalive: true,
    }).catch(() => {
      /* fire-and-forget; buffered above */
    });
  } catch {
    /* ignore */
  }
}

/** Raw emit for a scored interaction (stars 0-3 + normalized 0-100). */
function emitInteraction(
  word: 'answered' | 'completed' | 'passed' | 'failed',
  idPath: string,
  name: string,
  extras: ContextExtras,
  opts: { response?: string; stars?: number; success?: boolean } = {},
) {
  const result: Record<string, unknown> = {};
  if (opts.response !== undefined) result.response = opts.response;
  if (opts.success !== undefined) result.success = opts.success;
  if (opts.stars !== undefined) {
    result.score = { raw: opts.stars, min: 0, max: 3, scaled: opts.stars / 3 } as Score;
  }
  post(statement({ id: word, word }, interaction(idPath, name), extras, result));
}

// ───────── Public event API (call these from the app) ─────────

/** Session start. */
export function xapiInitialized() {
  post(
    statement(
      { id: 'initialized', word: 'initialized' },
      { id: LAUNCH.activityId, objectType: 'Activity', definition: { type: COURSE, name: { 'en-US': 'Rate Right' } } },
      { level: 'L0' },
    ),
  );
}

/** A clearance knowledge-check answer. */
export function xapiClearanceItem(itemId: string, correct: boolean, response?: string) {
  emitInteraction('answered', `/clearance/${itemId}`, `Clearance - ${itemId}`, {
    level: 'L0',
    'item-code': itemId,
  }, { success: correct, response });
}

/** Clearance cleared (headline gate; pct is 0-100). */
export function xapiClearancePassed(pct: number) {
  post(
    statement({ id: 'passed', word: 'passed' }, interaction('/clearance', 'Clearance'), {
      level: 'L0',
      'item-code': 'L0.3',
      'normalized-score': Math.round(pct),
    }, { success: true, completion: true, score: { raw: Math.round(pct), min: 0, max: 100, scaled: pct / 100 } }),
  );
}

/** A round started. */
export function xapiRoundStarted(round: number, level: Level) {
  post(
    statement(
      { id: 'initialized', word: 'initialized' },
      interaction(`/round-${round}`, `Round ${round}`),
      { level, round },
    ),
  );
}

/** A scored in-round decision (stars 0-3). */
export function xapiDecision(args: {
  round: number;
  level: Level;
  itemCode?: string;
  capabilityCode?: string;
  objectionCode?: string;
  response?: string;
  stars: number;
}) {
  emitInteraction('answered', `/l${args.level === 'L2' ? 2 : 1}/r${args.round}/decision`, `Round ${args.round} decision`, {
    level: args.level,
    round: args.round,
    'item-code': args.itemCode,
    'capability-code': args.capabilityCode,
    'objection-type': args.objectionCode,
    'normalized-score': Math.round((args.stars / 3) * 100),
  }, { response: args.response, stars: args.stars, success: args.stars > 0 });
}

/** A round completed with its star score. */
export function xapiRoundCompleted(round: number, level: Level, stars: number) {
  emitInteraction('completed', `/round-${round}`, `Round ${round}`, {
    level,
    round,
    'normalized-score': Math.round((stars / 3) * 100),
  }, { stars, success: stars > 0 });
}

/** A level milestone celebration (clearance / Level 1 / Level 2). */
export function xapiLevelMilestone(
  level: Level,
  opts: { roundsCompleted?: number; totalStars?: number } = {},
) {
  post(
    statement({ id: 'completed', word: 'completed' }, interaction(`/milestone/${level}`, `${level} complete`), {
      level,
      'rounds-completed': opts.roundsCompleted,
      'total-stars': opts.totalStars,
    }, { completion: true, success: true }),
  );
}

/**
 * Final completion - posted against the LMS-launched activity id (not a
 * custom Rate Right id), which is the only object the LMS flips the
 * lesson to Completed on. Idempotent to call more than once. `score` is
 * 0-100. No-ops gracefully outside a launch.
 */
export function xapiCompleted(score: number) {
  const pct = Math.max(0, Math.min(100, Math.round(score)));
  post({
    id: uuid(),
    timestamp: new Date().toISOString(),
    actor: LAUNCH.actor,
    verb: verb(`${ADL}/completed`, 'completed'),
    object: {
      id: LAUNCH.activityId,
      objectType: 'Activity',
      definition: { type: COURSE, name: { 'en-US': 'Rate Right' } },
    },
    result: { completion: true, success: true, score: { raw: pct, min: 0, max: 100, scaled: pct / 100 } },
    context: context({}),
  });
}

// ───────── State API persistence (resume slice) ─────────

function stateUrl(stateId: string): string | null {
  if (!isXapiLaunch() || !LAUNCH.actor) return null;
  const params = new URLSearchParams({
    activityId: LAUNCH.activityId,
    agent: JSON.stringify(LAUNCH.actor),
    stateId,
  });
  if (LAUNCH.registration) params.set('registration', LAUNCH.registration);
  return `${LAUNCH.endpoint}activities/state?${params.toString()}`;
}

/** GET the resume document, or null if absent / not launched. */
export async function getState<T>(stateId: string): Promise<T | null> {
  const url = stateUrl(stateId);
  if (!url) return null;
  try {
    const res = await fetch(url, { method: 'GET', headers: headers() });
    if (res.status === 404) return null;
    if (!res.ok) return null;
    const text = await res.text();
    return text ? (JSON.parse(text) as T) : null;
  } catch {
    return null;
  }
}

/** PUT the resume document (fire-and-forget). */
export function putState(stateId: string, data: unknown): void {
  const url = stateUrl(stateId);
  if (!url) return;
  try {
    void fetch(url, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(data),
      keepalive: true,
    }).catch(() => {
      /* fire-and-forget */
    });
  } catch {
    /* ignore */
  }
}
