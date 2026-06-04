/**
 * SCORM 1.2 API wrapper.
 *
 * On launch from a SCORM-compliant LMS the host injects an `API`
 * object into the iframe's window (or, when the course is nested
 * deeper, into a parent frame's window). This module locates that
 * API and exposes a small, typed surface so the rest of the app
 * does not have to know SCORM exists.
 *
 * Outside an LMS (dev with `npm run dev`, Render preview, opening
 * the built artefact directly) no API is present; `getScormAdapter`
 * returns null and the persistence layer falls back to localStorage.
 *
 * Reference: SCORM 1.2 Run-Time Environment - LMS API methods are
 *   LMSInitialize, LMSFinish, LMSGetValue, LMSSetValue, LMSCommit,
 *   LMSGetLastError, LMSGetErrorString, LMSGetDiagnostic.
 * The pipwerks SCORM wrapper is the de facto reference implementation
 * for the find-API logic - we replicate the search but otherwise keep
 * this small and TypeScript-native.
 */

interface ScormApi {
  LMSInitialize(arg: string): string;
  LMSFinish(arg: string): string;
  LMSGetValue(key: string): string;
  LMSSetValue(key: string, value: string): string;
  LMSCommit(arg: string): string;
  LMSGetLastError(): string;
  LMSGetErrorString(errorCode: string): string;
  LMSGetDiagnostic(errorCode: string): string;
}

export interface ScormAdapter {
  /** Pull a value from the LMS data model (e.g. cmi.suspend_data). */
  get(key: string): string;
  /** Push a value to the LMS data model; returns true on success. */
  set(key: string, value: string): boolean;
  /** Flush pending sets to the LMS; called sparingly. */
  commit(): boolean;
  /** End the SCORM session; idempotent. */
  finish(): void;
}

/** Walk up the frame ancestry looking for a window with `.API`. */
function findApi(startWindow: Window | null, maxDepth = 10): ScormApi | null {
  let win = startWindow;
  let depth = 0;
  while (win && depth < maxDepth) {
    const candidate = (win as unknown as { API?: ScormApi }).API;
    if (candidate) return candidate;
    if (win.parent && win.parent !== win) {
      win = win.parent;
      depth++;
    } else {
      break;
    }
  }
  return null;
}

function locateApi(): ScormApi | null {
  if (typeof window === 'undefined') return null;
  // Search self -> parent chain. SCORM 1.2 typically injects on the
  // parent frame, but some LMSes inject directly on the content frame.
  const fromSelf = findApi(window);
  if (fromSelf) return fromSelf;
  // The opener path covers the case where the course is launched in
  // a new window rather than an iframe.
  if (window.opener) {
    const fromOpener = findApi(window.opener as Window);
    if (fromOpener) return fromOpener;
  }
  return null;
}

let cachedAdapter: ScormAdapter | null | undefined;
let initialized = false;

/**
 * Returns a SCORM adapter if an LMS API is reachable, otherwise null.
 * Initialises the SCORM session on first successful lookup. Cached so
 * repeated calls do not re-traverse the frame chain or re-initialise.
 */
export function getScormAdapter(): ScormAdapter | null {
  if (cachedAdapter !== undefined) return cachedAdapter;

  const api = locateApi();
  if (!api) {
    cachedAdapter = null;
    return null;
  }

  // LMSInitialize must be called once per session. Failure here means
  // the LMS rejected the session - fall back to no-adapter rather than
  // pretending it worked.
  if (!initialized) {
    const ok = api.LMSInitialize('');
    if (ok !== 'true') {
      cachedAdapter = null;
      return null;
    }
    initialized = true;
    // Auto-finish on tab close. `pagehide` is more reliable than
    // `beforeunload` for SCORM, especially on mobile Safari.
    window.addEventListener('pagehide', () => {
      try {
        api.LMSCommit('');
        api.LMSFinish('');
      } catch {
        // Best-effort; the tab is going away anyway.
      }
    });
  }

  cachedAdapter = {
    get(key) {
      try {
        return api.LMSGetValue(key);
      } catch {
        return '';
      }
    },
    set(key, value) {
      try {
        return api.LMSSetValue(key, value) === 'true';
      } catch {
        return false;
      }
    },
    commit() {
      try {
        return api.LMSCommit('') === 'true';
      } catch {
        return false;
      }
    },
    finish() {
      try {
        api.LMSCommit('');
        api.LMSFinish('');
      } catch {
        // ignore - session may already be torn down
      }
    },
  };
  return cachedAdapter;
}

/** True when a SCORM LMS API is reachable. Used to gate UI affordances
 *  that only make sense outside an LMS (e.g. the DevNav Reset button
 *  on hosted preview builds). */
export function isScormSession(): boolean {
  return getScormAdapter() !== null;
}
