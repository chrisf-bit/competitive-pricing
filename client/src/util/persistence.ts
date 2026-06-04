import type { GameState } from '../types';
import { getScormAdapter } from './scorm';

/**
 * Slim slice of game state that survives a page reload. Deliberately
 * excludes anything tied to a single playthrough (partner metrics,
 * conversation in progress, current round, etc) - those reset on each
 * play. What persists is the learner's identity and durable progress:
 * clearance status, profile, and stars earned per round.
 *
 * Inside a SCORM-compliant LMS the payload is written to
 * `cmi.suspend_data` (SCORM 1.2 caps this at 4096 chars - our payload
 * is well under 1KB even with full roundStars). Outside an LMS we fall
 * back to `localStorage` so dev, Render previews, and the
 * uploader-style "open the built artefact directly" path all keep
 * working.
 *
 * Bumped via STORAGE_KEY when the shape changes - older payloads are
 * ignored on load rather than crashing the app.
 */
const STORAGE_KEY = 'rateRight:state:v1';
const SCORM_SUSPEND_KEY = 'cmi.suspend_data';
const SCORM_STUDENT_NAME_KEY = 'cmi.core.student_name';
const SCORM_LESSON_STATUS_KEY = 'cmi.core.lesson_status';
const SCORM_SCORE_RAW_KEY = 'cmi.core.score.raw';
const SCORM_SCORE_MIN_KEY = 'cmi.core.score.min';
const SCORM_SCORE_MAX_KEY = 'cmi.core.score.max';

export interface PersistedState {
  learnerProfile: GameState['learnerProfile'];
  level0Cleared: boolean;
  /** Best stars earned for each completed round (1-indexed by round). */
  roundStars: Record<number, 0 | 1 | 2 | 3>;
}

function parsePayload(raw: string | null): PersistedState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as PersistedState;
    if (!parsed || typeof parsed !== 'object') return null;
    if (!parsed.learnerProfile || typeof parsed.level0Cleared !== 'boolean') return null;
    return {
      learnerProfile: parsed.learnerProfile,
      level0Cleared: parsed.level0Cleared,
      roundStars: parsed.roundStars ?? {},
    };
  } catch {
    return null;
  }
}

export function loadPersistedState(): PersistedState | null {
  if (typeof window === 'undefined') return null;
  const scorm = getScormAdapter();
  if (scorm) {
    return parsePayload(scorm.get(SCORM_SUSPEND_KEY));
  }
  try {
    return parsePayload(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

export function savePersistedState(state: GameState): void {
  if (typeof window === 'undefined') return;
  const payload: PersistedState = {
    learnerProfile: state.learnerProfile,
    level0Cleared: state.level0Progress.cleared,
    roundStars: state.roundStars,
  };
  const serialised = JSON.stringify(payload);
  const scorm = getScormAdapter();
  if (scorm) {
    // Commit batches the writes; we only commit on save so the LMS
    // network round-trip happens once per save rather than per field.
    scorm.set(SCORM_SUSPEND_KEY, serialised);
    scorm.commit();
    return;
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, serialised);
  } catch {
    // Storage may be unavailable (private mode, quota); fail silently.
  }
}

export function clearPersistedState(): void {
  if (typeof window === 'undefined') return;
  const scorm = getScormAdapter();
  if (scorm) {
    scorm.set(SCORM_SUSPEND_KEY, '');
    scorm.commit();
    return;
  }
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

/**
 * Returns the learner's name as reported by the LMS, when available.
 * Used at boot to pre-populate `learnerProfile.playerName` instead of
 * the `Name_Var` default. Outside a SCORM session returns null and the
 * existing default / character-build flow takes over.
 *
 * The LMS typically returns "Last, First" - we flip to "First Last"
 * for the game's first-name-friendly copy.
 */
export function getLmsStudentName(): string | null {
  const scorm = getScormAdapter();
  if (!scorm) return null;
  const raw = scorm.get(SCORM_STUDENT_NAME_KEY).trim();
  if (!raw) return null;
  // "Doe, John" -> "John Doe". If no comma, return as-is.
  const commaIdx = raw.indexOf(',');
  if (commaIdx === -1) return raw;
  const last = raw.slice(0, commaIdx).trim();
  const first = raw.slice(commaIdx + 1).trim();
  return first ? `${first} ${last}`.trim() : raw;
}

/**
 * Reports lesson outcome to the LMS. Called when clearance is passed
 * (status 'passed') or when the sim is completed (status 'completed').
 * No-ops outside a SCORM session.
 */
export function reportLessonStatus(
  status: 'passed' | 'completed' | 'failed' | 'incomplete',
): void {
  const scorm = getScormAdapter();
  if (!scorm) return;
  scorm.set(SCORM_LESSON_STATUS_KEY, status);
  scorm.commit();
}

/**
 * Reports a score to the LMS (0-100). Used to surface the clearance %
 * to the LMS for reporting. No-ops outside a SCORM session.
 */
export function reportScore(scoreRaw: number, min = 0, max = 100): void {
  const scorm = getScormAdapter();
  if (!scorm) return;
  const clamped = Math.max(min, Math.min(max, Math.round(scoreRaw)));
  scorm.set(SCORM_SCORE_RAW_KEY, String(clamped));
  scorm.set(SCORM_SCORE_MIN_KEY, String(min));
  scorm.set(SCORM_SCORE_MAX_KEY, String(max));
  scorm.commit();
}
