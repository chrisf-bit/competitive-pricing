var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/util/xapi.ts
var xapi_exports = {};
__export(xapi_exports, {
  getState: () => getState,
  granularEnabled: () => granularEnabled,
  isXapiLaunch: () => isXapiLaunch,
  launchActorName: () => launchActorName,
  launchRegistration: () => launchRegistration,
  putState: () => putState,
  xapiClearanceItem: () => xapiClearanceItem,
  xapiClearancePassed: () => xapiClearancePassed,
  xapiCompleted: () => xapiCompleted,
  xapiDecision: () => xapiDecision,
  xapiInitialized: () => xapiInitialized,
  xapiLevelMilestone: () => xapiLevelMilestone,
  xapiRoundCompleted: () => xapiRoundCompleted,
  xapiRoundStarted: () => xapiRoundStarted
});
function granularEnabled() {
  return EMIT_GRANULAR;
}
function normalizeActor(a) {
  if (!a || typeof a !== "object") return null;
  const actor = { ...a };
  ["mbox", "name", "openid", "account"].forEach((k) => {
    if (Array.isArray(actor[k])) actor[k] = actor[k][0];
  });
  if (!actor.objectType) actor.objectType = "Agent";
  return actor;
}
function readLaunch() {
  const q = new URLSearchParams(window.location.search);
  let endpoint = q.get("endpoint") || "";
  if (endpoint && !endpoint.endsWith("/")) endpoint += "/";
  let actor = null;
  const raw = q.get("actor");
  if (raw) {
    try {
      actor = normalizeActor(JSON.parse(raw));
    } catch {
      actor = null;
    }
  }
  return {
    endpoint,
    auth: q.get("auth") || "",
    registration: q.get("registration") || "",
    activityId: q.get("activity_id") || `${NS}`,
    actor
  };
}
function isXapiLaunch() {
  return !!(LAUNCH.endpoint && LAUNCH.auth);
}
function launchRegistration() {
  return LAUNCH.registration || null;
}
function launchActorName() {
  return LAUNCH.actor && LAUNCH.actor.name || null;
}
function uuid() {
  try {
    if (window.crypto && "randomUUID" in window.crypto) {
      return window.crypto.randomUUID();
    }
  } catch {
  }
  const b = new Uint8Array(16);
  (window.crypto || {}).getRandomValues?.(b);
  b[6] = b[6] & 15 | 64;
  b[8] = b[8] & 63 | 128;
  const h = Array.from(b, (x) => x.toString(16).padStart(2, "0"));
  return `${h[0]}${h[1]}${h[2]}${h[3]}-${h[4]}${h[5]}-${h[6]}${h[7]}-${h[8]}${h[9]}-${h[10]}${h[11]}${h[12]}${h[13]}${h[14]}${h[15]}`;
}
function headers() {
  return {
    "Content-Type": "application/json",
    Authorization: LAUNCH.auth,
    "X-Experience-API-Version": XAPI_VERSION
  };
}
function verb(id, word) {
  return { id, display: { "en-US": word } };
}
function interaction(idPath, name) {
  return {
    id: `${NS}${idPath}`,
    objectType: "Activity",
    definition: { type: CMII, name: { "en-US": name } }
  };
}
function extensions(extras) {
  const e = {};
  Object.keys(extras).forEach((k) => {
    if (extras[k] !== void 0) e[`${EXT}/${k}`] = extras[k];
  });
  return e;
}
function context(extras) {
  const c = { platform: "Rate Right", language: "en-US" };
  if (LAUNCH.registration) c.registration = LAUNCH.registration;
  const ext = extensions(extras);
  if (Object.keys(ext).length) c.extensions = ext;
  return c;
}
function statement(v, object, extras, result) {
  const s = {
    id: uuid(),
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    actor: LAUNCH.actor,
    verb: verb(v.word === "initialized" ? `${ADL}/initialized` : `${ADL}/${v.word}`, v.word),
    object
  };
  if (result) s.result = result;
  s.context = context(extras);
  return s;
}
function buffer(s) {
  try {
    const raw = localStorage.getItem(STORAGE_BUFFER);
    const arr = raw ? JSON.parse(raw) : [];
    arr.push(s);
    while (arr.length > 500) arr.shift();
    localStorage.setItem(STORAGE_BUFFER, JSON.stringify(arr));
  } catch {
  }
}
function post(s) {
  buffer(s);
  if (!isXapiLaunch()) return;
  try {
    void fetch(`${LAUNCH.endpoint}statements`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify([s]),
      keepalive: true
    }).catch(() => {
    });
  } catch {
  }
}
function emitInteraction(word, idPath, name, extras, opts = {}) {
  const result = {};
  if (opts.response !== void 0) result.response = opts.response;
  if (opts.success !== void 0) result.success = opts.success;
  if (opts.stars !== void 0) {
    result.score = { raw: opts.stars, min: 0, max: 3, scaled: opts.stars / 3 };
  }
  post(statement({ id: word, word }, interaction(idPath, name), extras, result));
}
function xapiInitialized() {
  post(
    statement(
      { id: "initialized", word: "initialized" },
      { id: LAUNCH.activityId, objectType: "Activity", definition: { type: COURSE, name: { "en-US": "Rate Right" } } },
      { level: "L0" }
    )
  );
}
function xapiClearanceItem(itemId, correct, response) {
  if (!EMIT_GRANULAR) return;
  emitInteraction("answered", `/clearance/${itemId}`, `Clearance - ${itemId}`, {
    level: "L0",
    "item-code": itemId
  }, { success: correct, response });
}
function xapiClearancePassed(pct) {
  post(
    statement({ id: "passed", word: "passed" }, interaction("/clearance", "Clearance"), {
      level: "L0",
      "item-code": "L0.3",
      "normalized-score": Math.round(pct)
    }, { success: true, completion: true, score: { raw: Math.round(pct), min: 0, max: 100, scaled: pct / 100 } })
  );
}
function xapiRoundStarted(round, level) {
  if (!EMIT_GRANULAR) return;
  post(
    statement(
      { id: "attempted", word: "attempted" },
      interaction(`/round-${round}`, `Round ${round}`),
      { level, round }
    )
  );
}
function xapiDecision(args) {
  if (!EMIT_GRANULAR) return;
  const lvl = args.level === "L2" ? 2 : 1;
  emitInteraction(
    "answered",
    `/l${lvl}/r${args.round}/${args.stepId}`,
    `Round ${args.round} - ${args.stepId}`,
    {
      level: args.level,
      round: args.round,
      "step-id": args.stepId,
      "partner-id": args.partnerId,
      "option-id": args.optionId,
      compliance: args.compliance,
      "style-match": args.styleMatch,
      optimal: args.optimal,
      "item-code": args.itemCode,
      "capability-code": args.capabilityCode,
      "objection-type": args.objectionCode
    },
    { response: args.optionId, success: args.optimal }
  );
}
function xapiRoundCompleted(round, level, stars) {
  emitInteraction("completed", `/round-${round}`, `Round ${round}`, {
    level,
    round,
    "normalized-score": Math.round(stars / 3 * 100)
  }, { stars, success: stars > 0 });
}
function xapiLevelMilestone(level, opts = {}) {
  post(
    statement({ id: "completed", word: "completed" }, interaction(`/milestone/${level}`, `${level} complete`), {
      level,
      "rounds-completed": opts.roundsCompleted,
      "total-stars": opts.totalStars
    }, { completion: true, success: true })
  );
}
function xapiCompleted(score) {
  const pct = Math.max(0, Math.min(100, Math.round(score)));
  post({
    id: uuid(),
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    actor: LAUNCH.actor,
    verb: verb(`${ADL}/completed`, "completed"),
    object: {
      id: LAUNCH.activityId,
      objectType: "Activity",
      definition: { type: COURSE, name: { "en-US": "Rate Right" } }
    },
    result: { completion: true, success: true, score: { raw: pct, min: 0, max: 100, scaled: pct / 100 } },
    context: context({})
  });
}
function stateUrl(stateId) {
  if (!isXapiLaunch() || !LAUNCH.actor) return null;
  const params = new URLSearchParams({
    activityId: LAUNCH.activityId,
    agent: JSON.stringify(LAUNCH.actor),
    stateId
  });
  if (LAUNCH.registration) params.set("registration", LAUNCH.registration);
  return `${LAUNCH.endpoint}activities/state?${params.toString()}`;
}
async function getState(stateId) {
  const url = stateUrl(stateId);
  if (!url) return null;
  try {
    const res = await fetch(url, { method: "GET", headers: headers() });
    if (res.status === 404) return null;
    if (!res.ok) return null;
    const text = await res.text();
    return text ? JSON.parse(text) : null;
  } catch {
    return null;
  }
}
function putState(stateId, data) {
  const url = stateUrl(stateId);
  if (!url) return;
  try {
    void fetch(url, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify(data),
      keepalive: true
    }).catch(() => {
    });
  } catch {
  }
}
var XAPI_VERSION, NS, EXT, ADL, ACT, CMII, COURSE, EMIT_GRANULAR, LAUNCH, STORAGE_BUFFER;
var init_xapi = __esm({
  "src/util/xapi.ts"() {
    XAPI_VERSION = "1.0.2";
    NS = "https://booking.com/xapi/rate-right";
    EXT = "https://booking.com/xapi/ext";
    ADL = "http://adlnet.gov/expapi/verbs";
    ACT = "http://adlnet.gov/expapi/activities";
    CMII = `${ACT}/cmi.interaction`;
    COURSE = `${ACT}/course`;
    EMIT_GRANULAR = (() => {
      try {
        const q = new URLSearchParams(window.location.search);
        if (q.get("granular") === "0") return false;
      } catch {
      }
      return true;
    })();
    LAUNCH = readLaunch();
    STORAGE_BUFFER = "rateRight:xapi:buffer";
  }
});

// scripts/xapi-rollback.entry.ts
var captured = [];
var g = globalThis;
var n = 0;
g.window = {
  location: {
    search: `?endpoint=${encodeURIComponent("https://lrs.example/")}&auth=${encodeURIComponent("Basic Zm9vOmJhcg==")}&registration=reg-1&activity_id=${encodeURIComponent("https://booking.com/xapi/rate-right")}&actor=${encodeURIComponent(JSON.stringify({ name: "Test", mbox: "mailto:t@x.com" }))}&granular=0`
  },
  crypto: { randomUUID: () => `uuid-${(n++).toString(16)}` }
};
g.localStorage = /* @__PURE__ */ (() => {
  const m = /* @__PURE__ */ new Map();
  return {
    getItem: (k) => m.get(k) ?? null,
    setItem: (k, v) => void m.set(k, v),
    removeItem: (k) => void m.delete(k)
  };
})();
g.fetch = (_url, opts) => {
  try {
    const p = JSON.parse(opts.body);
    captured.push({ stmt: Array.isArray(p) ? p[0] : p });
  } catch {
  }
  return Promise.resolve({ ok: true, status: 200, text: () => Promise.resolve("") });
};
var xapi = await Promise.resolve().then(() => (init_xapi(), xapi_exports));
var fail = 0;
var bad = (m) => {
  console.log("  FAIL " + m);
  fail++;
};
if (xapi.granularEnabled()) bad("granularEnabled() true despite ?granular=0");
captured.length = 0;
xapi.xapiClearanceItem("A1", true);
xapi.xapiRoundStarted(1, "L1");
xapi.xapiDecision({
  round: 1,
  level: "L1",
  partnerId: "royal-crest",
  stepId: "s1",
  optionId: "o1",
  compliance: "safe",
  styleMatch: 2,
  optimal: true
});
if (captured.length !== 0) bad(`granular emitters posted ${captured.length} despite rollback (expected 0)`);
captured.length = 0;
xapi.xapiInitialized();
xapi.xapiRoundCompleted(1, "L1", 3);
xapi.xapiCompleted(100);
if (captured.length !== 3) bad(`high-level emitters posted ${captured.length} (expected 3 - baseline must never be gated)`);
console.log(`${fail === 0 ? "PASS" : "FAIL"} - rollback harness: ${fail} failure(s)`);
if (fail > 0) process.exit(1);
