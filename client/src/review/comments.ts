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
  /** Stable per-comment id (client-generated) so a comment can be
   *  amended or deleted. Empty on rows written before this feature. */
  commentId: string;
}

/** Payload the tool posts for a new comment (server stamps the time). */
export interface NewComment {
  commentId: string;
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

/** Generate a stable id for a new comment (crypto UUID, with fallback). */
export function newCommentId(): string {
  try {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  } catch {
    /* fall through */
  }
  return `c-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
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
    const res = await fetch(url, { method: 'POST', body: JSON.stringify({ action: 'add', ...c }) });
    const data = await res.json();
    return !!data.ok;
  } catch {
    return false;
  }
}

/**
 * Amend a comment's text. The server only applies the change if the
 * posted reviewer matches the row's author (soft ownership).
 */
export async function editComment(commentId: string, reviewer: string, comment: string): Promise<boolean> {
  const url = resolveEndpoint();
  if (!url) return false;
  try {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ action: 'edit', commentId, reviewer, comment }),
    });
    const data = await res.json();
    return !!data.ok;
  } catch {
    return false;
  }
}

/**
 * Delete a comment (hard delete - the row is removed). The server only
 * deletes if the posted reviewer matches the row's author.
 */
export async function deleteComment(commentId: string, reviewer: string): Promise<boolean> {
  const url = resolveEndpoint();
  if (!url) return false;
  try {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ action: 'delete', commentId, reviewer }),
    });
    const data = await res.json();
    return !!data.ok;
  } catch {
    return false;
  }
}
