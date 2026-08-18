/**
 * Rate Right - Learner Feedback backend.
 *
 * A tiny Google Apps Script web app that pools per-screen learner
 * feedback into one Google Sheet. Each submit from the sim's Feedback
 * button becomes one row. Mirrors the Conversation Review backend in
 * ../review-apps-script/Code.gs.
 *
 * SETUP (one time, ~3 minutes) - see SETUP.md in this folder. In short:
 *   1. Create a blank Google Sheet.
 *   2. Extensions > Apps Script. Delete the stub, paste THIS file.
 *   3. Run `setup` once (authorise when prompted) to add the header row.
 *   4. Deploy > New deployment > type "Web app".
 *        Execute as: Me.  Who has access: Anyone.
 *   5. Copy the /exec Web app URL and either bake it into the sim
 *      (FEEDBACK_ENDPOINT in client/src/components/FeedbackButton.tsx)
 *      or append it as ?feedbackEndpoint=<url> on the sim link.
 *
 * No API keys, no external services - the Sheet lives in your Workspace.
 */

var SHEET_NAME = 'feedback';
var HEADERS = [
  'timestamp', 'learner', 'screen', 'round', 'partner', 'regime', 'comment',
];

/** Run once from the editor to create/format the sheet header. */
function setup() {
  var sh = sheet_();
  if (sh.getLastRow() === 0) {
    sh.appendRow(HEADERS);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  return 'ok';
}

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = ss.insertSheet(SHEET_NAME);
  return sh;
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * POST: append one feedback entry. The sim sends a plain-text JSON body
 * (no custom Content-Type) so the browser skips the CORS preflight that
 * Apps Script can't answer.
 */
function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    setup();
    sheet_().appendRow([
      new Date(),
      String(body.learner || 'anonymous'),
      String(body.screen || ''),
      String(body.round || ''),
      String(body.partner || ''),
      String(body.regime || ''),
      String(body.comment || ''),
    ]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}
