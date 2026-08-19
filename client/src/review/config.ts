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
export const REVIEW_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzN3ctRP4OwGRboeWm7AtYan9-P_xu1simow0dV3N7ZTOKValwjnXa9T7N151XCJzPz/exec';

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
