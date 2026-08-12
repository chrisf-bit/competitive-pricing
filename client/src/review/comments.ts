import { resolveEndpoint } from './config';

/** One comment as stored in / returned from the Google Sheet. */
export interface ReviewComment {
  timestamp: string;
  reviewer: string;
  journey: string;
  partner: string;
  round: number | string;
  regimes: string;
  stepId: string;
  optionId: string;
  field: string;
  originalText: string;
  comment: string;
  anchor: string;
}

/** Payload the tool posts for a new comment (server stamps the time). */
export interface NewComment {
  reviewer: string;
  journey: string;
  partner: string;
  round: number;
  regimes: string;
  stepId: string;
  optionId: string;
  field: string;
  originalText: string;
  comment: string;
  anchor: string;
}

const REVIEWER_KEY = 'rr-review-reviewer';

export function getReviewerName(): string {
  try {
    return window.localStorage.getItem(REVIEWER_KEY) || '';
  } catch {
    return '';
  }
}

export function setReviewerName(name: string): void {
  try {
    window.localStorage.setItem(REVIEWER_KEY, name);
  } catch {
    /* ignore */
  }
}

export function hasEndpoint(): boolean {
  return !!resolveEndpoint();
}

/** Fetch every comment. Returns [] if no endpoint or on failure. */
export async function fetchComments(): Promise<ReviewComment[]> {
  const url = resolveEndpoint();
  if (!url) return [];
  try {
    const res = await fetch(url, { method: 'GET' });
    const data = await res.json();
    return Array.isArray(data.comments) ? data.comments : [];
  } catch {
    return [];
  }
}

/**
 * Post one comment. Sends a plain-text body (no custom Content-Type) so
 * the browser skips the CORS preflight Apps Script can't answer; the
 * script reads e.postData.contents and parses the JSON server-side.
 */
export async function postComment(c: NewComment): Promise<boolean> {
  const url = resolveEndpoint();
  if (!url) return false;
  try {
    const res = await fetch(url, { method: 'POST', body: JSON.stringify(c) });
    const data = await res.json();
    return !!data.ok;
  } catch {
    return false;
  }
}
