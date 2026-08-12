# Conversation Review - comment backend setup (one time)

The review tool pools every reviewer's comments into one Google Sheet you
own, via a small Apps Script web app. This takes about 3 minutes and
needs no accounts, keys, or external services.

## Steps

1. **Create a Sheet.** Go to sheets.new (a blank Google Sheet). Name it
   something like "Rate Right - Conversation Review comments".

2. **Open Apps Script.** In that Sheet: menu **Extensions > Apps Script**.
   A code editor opens in a new tab.

3. **Paste the script.** Delete whatever stub code is in `Code.gs`, then
   paste the entire contents of `Code.gs` from this folder. Save (the
   disk icon, or Ctrl+S).

4. **Initialise the sheet.** In the Apps Script toolbar, pick the
   function `setup` from the dropdown and click **Run**. The first run
   asks you to authorise - approve it (it only touches this Sheet). This
   adds the header row.

5. **Deploy as a web app.**
   - Click **Deploy > New deployment**.
   - Click the gear next to "Select type" and choose **Web app**.
   - Set **Execute as: Me**.
   - Set **Who has access: Anyone**. (This is what lets reviewers post
     without signing in. The URL is unguessable; only people with the
     review link can reach it.)
   - Click **Deploy**, approve if asked, and **copy the Web app URL** -
     it ends in `/exec`.

6. **Wire it into the review tool.** Either:
   - Paste the `/exec` URL into `client/src/review/config.ts` as
     `REVIEW_ENDPOINT` and redeploy the review site (reviewers then need
     no setup at all), **or**
   - Share the review link with `?endpoint=<the /exec URL>` appended -
     the tool stores it in that reviewer's browser.

## Reading the results

Open the Sheet. Each comment is one row: who wrote it, which partner /
round / journey / regime, the exact line (step, option, field), the
original text of that line, and their comment. Sort or filter by
`partner`, `reviewer`, or `field` to work through them. No line is ever
retyped by a reviewer - the `originalText` column always carries the
current wording they were looking at.

## Updating the script later

If you change `Code.gs`, in the Apps Script editor do **Deploy > Manage
deployments > (edit) > New version > Deploy**. Keep the same deployment
so the `/exec` URL does not change.
