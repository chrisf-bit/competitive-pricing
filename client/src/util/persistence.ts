import type { GameState } from '../types';

/**
 * Slim slice of game state that survives a page reload. Deliberately
 * excludes anything tied to a single playthrough (partner metrics,
 * conversation in progress, current round, etc) - those reset on each
 * play. What persists is the learner's identity and durable progress:
 * clearance status, profile, and stars earned per round.
 *
 * Bumped via STORAGE_KEY when the shape changes - older payloads are
 * ignored on load rather than crashing the app.
 */
const STORAGE_KEY = 'rateRight:state:v1';

export interface PersistedState {
  learnerProfile: GameState['learnerProfile'];
  level0Cleared: boolean;
  /** Best stars earned for each completed round (1-indexed by round). */
  roundStars: Record<number, 0 | 1 | 2 | 3>;
}

export function loadPersistedState(): PersistedState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
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

export function savePersistedState(state: GameState): void {
  if (typeof window === 'undefined') return;
  try {
    const payload: PersistedState = {
      learnerProfile: state.learnerProfile,
      level0Cleared: state.level0Progress.cleared,
      roundStars: state.roundStars,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Storage may be unavailable (private mode, quota); fail silently.
  }
}

export function clearPersistedState(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
