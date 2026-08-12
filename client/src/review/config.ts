/**
 * Review tool configuration.
 *
 * REVIEW_ENDPOINT is the Google Apps Script web-app `/exec` URL that
 * receives and serves reviewer comments (see review-apps-script/SETUP.md).
 * Paste it here once after deploying the Apps Script and redeploy the
 * review site - reviewers then need zero setup.
 *
 * It can also be supplied per-reviewer via `?endpoint=<url>` on the review
 * link, which takes precedence and is remembered in that browser.
 */
export const REVIEW_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyJ6Ndl4oKz1fmv2_HFGkC-T0dQR5GuwymG9-s04MacHHm3VAOBmH2BWMMvCRyZ5v1Z/exec';

/** Resolve the active endpoint: URL param > localStorage > baked-in config. */
export function resolveEndpoint(): string {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('endpoint');
    if (fromUrl) {
      window.localStorage.setItem('rr-review-endpoint', fromUrl);
      return fromUrl;
    }
    const saved = window.localStorage.getItem('rr-review-endpoint');
    if (saved) return saved;
  } catch {
    /* ignore storage errors */
  }
  return REVIEW_ENDPOINT;
}
