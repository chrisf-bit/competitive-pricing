# Learner Feedback - Google Sheet backend setup

The sim's **Feedback** button posts each per-screen learner comment into
a Google Sheet you own, tagged with where the learner was (screen, round,
partner, market, name). This is the same mechanism as the Conversation
Review tool (`../review-apps-script/`).

One-time setup, about 3 minutes. No API keys, nothing hosted outside your
Google Workspace.

## Steps

1. **Create the Sheet.** Go to <https://sheets.new> and name it
   e.g. "Rate Right - Learner Feedback".

2. **Open Apps Script.** In the Sheet: **Extensions -> Apps Script**.
   A new tab opens with a stub `Code.gs`.

3. **Paste the script.** Delete the stub and paste the contents of
   `Code.gs` from this folder. Click **Save**.

4. **Create the header row.** In the toolbar, choose the **`setup`**
   function and click **Run**. Approve the authorisation prompt (your
   account -> Advanced -> "Go to project (unsafe)" -> Allow - it is your
   own script). This adds a `feedback` tab with a bold header row.

5. **Deploy as a Web app.** Click **Deploy -> New deployment**. Click the
   gear next to "Select type" -> **Web app**. Set:
   - **Execute as:** Me
   - **Who has access:** **Anyone**  (required - learners post without a
     Google login)

   Click **Deploy** and **copy the Web app URL** (ends in `/exec`).

6. **Point the sim at it.** Two ways:
   - **Bake it in (recommended for the live package):** paste the URL into
     `FEEDBACK_ENDPOINT` in
     `client/src/components/FeedbackButton.tsx`, then rebuild.
   - **No rebuild (for quick testing on the preview):** append
     `?feedbackEndpoint=<url>` to the sim link, or run
     `localStorage.setItem('rateRight:feedbackEndpoint', '<url>')` in the
     browser console once.

## Notes

- **Re-deploying after a script edit:** use **Deploy -> Manage
  deployments -> edit (pencil) -> Version: New version**, so the `/exec`
  URL stays the same.
- **The browser can't read the response** (Apps Script can't answer the
  CORS preflight, so the request is sent "opaque"). That is expected -
  the row still appends. The sim treats the post as fire-and-forget and
  keeps a local copy regardless.
- **If an LMS ever blocks the outbound call**, feedback is still retained
  in the browser's local buffer (`rateRight:feedback:preview`) and
  nothing in the sim breaks.
