import type { GameState, ParityRegime } from '../types';
import { isXapiLaunch, getState, putState, launchActorName } from './xapi';

/**
 * Slim slice of game state that survives a reload / resume. Excludes
 * anything tied to a single playthrough (partner metrics, conversation in
 * progress, current round) - those reset each play. What persists is the
 * learner's identity and durable progress: clearance status, profile, and
 * stars earned per round.
 *
 * Inside an LMS (Tin Can launch) the payload is stored through the xAPI
 * State API (keyed by activity + agent + registration), which has no size
 * cap and resumes across devices. Outside a launch (dev / direct open) it
 * falls back to localStorage. localStorage is also written in an LMS as a
 * same-device backstop.
 *
 * Bumped via STORAGE_KEY when the shape changes - older payloads are
 * ignored on load rather than crashing.
 */
const STORAGE_KEY = 'rateRight:state:v1';
const STATE_ID = 'rate-right-resume';

/**
 * One-time round-progress reset token. Round stars are keyed by round
 * NUMBER, not by partner, so when the final SME scenarios replaced the
 * POC partners the old "completed" stars carried over and marked the
 * new, never-played rounds as done. Bumping this token drops any
 * persisted `roundStars` exactly once per learner on next load, while
 * preserving clearance status and profile.
 */
const ROUNDS_RESET_TOKEN = 'final-scenarios-2026-08';

export interface PersistedState {
  learnerProfile: GameState['learnerProfile'];
  level0Cleared: boolean;
  /** The regime the learner was cleared under (null for older payloads). */
  level0ClearedForRegime?: ParityRegime | null;
  /** Best stars earned for each completed round (1-indexed by round). */
  roundStars: Record<number, 0 | 1 | 2 | 3>;
  /** Token guarding a one-time round-progress reset. */
  roundsResetToken?: string;
  /** Whether the learner has seen the Portfolio / Partner Detail tours. */
  tutorialShown?: boolean;
  partnerDetailTutorialShown?: boolean;
  /** Whether the one-time sim disclaimer has been acknowledged. */
  disclaimerAcknowledged?: boolean;
}

function normalize(parsed: unknown): PersistedState | null {
  if (!parsed || typeof parsed !== 'object') return null;
  const p = parsed as PersistedState;
  if (!p.learnerProfile || typeof p.level0Cleared !== 'boolean') return null;
  // One-time round-progress reset: if the token is stale, drop roundStars
  // but keep clearance + profile. Stamped current on the next save.
  const roundsCurrent = p.roundsResetToken === ROUNDS_RESET_TOKEN;
  return {
    learnerProfile: p.learnerProfile,
    level0Cleared: p.level0Cleared,
    level0ClearedForRegime: p.level0ClearedForRegime ?? null,
    roundStars: roundsCurrent ? p.roundStars ?? {} : {},
    roundsResetToken: ROUNDS_RESET_TOKEN,
    tutorialShown: p.tutorialShown ?? false,
    partnerDetailTutorialShown: p.partnerDetailTutorialShown ?? false,
    disclaimerAcknowledged: p.disclaimerAcknowledged ?? false,
  };
}

function parsePayload(raw: string | null): PersistedState | null {
  if (!raw) return null;
  try {
    return normalize(JSON.parse(raw));
  } catch {
    return null;
  }
}

/**
 * Synchronous local cache - instant resume on the same device, and the
 * dev / direct-open path. Used at boot for the first paint; the LRS resume
 * (loadResumeState) hydrates over it in an LMS.
 */
export function loadPersistedState(): PersistedState | null {
  if (typeof window === 'undefined') return null;
  try {
    return parsePayload(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

/**
 * Cross-device resume. In an LMS launch the xAPI State API is the source
 * of truth; otherwise this resolves to the local cache.
 */
export async function loadResumeState(): Promise<PersistedState | null> {
  if (isXapiLaunch()) {
    const doc = await getState<PersistedState>(STATE_ID);
    const fromLrs = doc ? normalize(doc) : null;
    if (fromLrs) return fromLrs;
  }
  return loadPersistedState();
}

export function savePersistedState(state: GameState): void {
  if (typeof window === 'undefined') return;
  const payload: PersistedState = {
    learnerProfile: state.learnerProfile,
    level0Cleared: state.level0Progress.cleared,
    level0ClearedForRegime: state.level0Progress.clearedForRegime,
    roundStars: state.roundStars,
    roundsResetToken: ROUNDS_RESET_TOKEN,
    tutorialShown: state.tutorialShown,
    partnerDetailTutorialShown: state.partnerDetailTutorialShown,
    disclaimerAcknowledged: state.disclaimerAcknowledged,
  };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Storage may be unavailable (private mode, quota); fail silently.
  }
  if (isXapiLaunch()) putState(STATE_ID, payload);
}

export function clearPersistedState(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  // In an LMS the resume document is keyed by the launch registration, so
  // a fresh attempt (new registration) already starts empty - nothing to
  // clear on the LRS side here.
}

/**
 * Learner's FIRST name from the LMS launch actor, when available. Used at
 * boot to pre-populate `learnerProfile.playerName` instead of the
 * `Name_Var` default. The sim's copy is first-name-friendly ("Hi
 * Christopher", "Ten out of ten, Christopher"), so we take just the first
 * name rather than the full "First Last" the LMS sends. Handles both
 * "First Last" and "Last, First" forms. The full name is still carried in
 * the xAPI actor for reporting. Null outside a launch.
 */
export function getLmsStudentName(): string | null {
  const raw = (launchActorName() || '').trim();
  if (!raw) return null;
  const commaIdx = raw.indexOf(',');
  // "Last, First [Middle]" -> the first token after the comma.
  if (commaIdx !== -1) {
    const after = raw.slice(commaIdx + 1).trim();
    return after.split(/\s+/)[0] || raw;
  }
  // "First Last" -> the first token.
  return raw.split(/\s+/)[0] || raw;
}
