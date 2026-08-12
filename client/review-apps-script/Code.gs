/**
 * Rate Right - Conversation Review: comment backend.
 *
 * A tiny Google Apps Script web app that pools reviewer comments into
 * one Google Sheet. Every comment the review tool posts becomes one row;
 * the tool also reads them all back so each reviewer sees the running
 * thread on every line.
 *
 * SETUP (one time, ~3 minutes) - see SETUP.md in this folder for the
 * walk-through with screenshots-in-words. In short:
 *   1. Create a blank Google Sheet.
 *   2. Extensions > Apps Script. Delete the stub, paste THIS file.
 *   3. Run `setup` once (authorise when prompted) to add the header row.
 *   4. Deploy > New deployment > type "Web app".
 *        Execute as: Me.  Who has access: Anyone.
 *   5. Copy the /exec Web app URL and paste it into the review tool's
 *      config (client/src/review/config.ts REVIEW_ENDPOINT) or append it
 *      as ?endpoint=<url> on the review link.
 *
 * No API keys, no external services - the Sheet lives in your Workspace.
 */

var SHEET_NAME = 'comments';
var HEADERS = [
  'timestamp', 'reviewer', 'journey', 'partner', 'round', 'regimes',
  'stepId', 'optionId', 'field', 'originalText', 'comment', 'anchor',
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

/** GET: return every comment as JSON so the tool can render threads. */
function doGet() {
  var sh = sheet_();
  var last = sh.getLastRow();
  if (last < 2) return json_({ ok: true, comments: [] });
  var rows = sh.getRange(2, 1, last - 1, HEADERS.length).getValues();
  var comments = rows.map(function (r) {
    var o = {};
    HEADERS.forEach(function (h, i) { o[h] = r[i]; });
    return o;
  });
  return json_({ ok: true, comments: comments });
}

/**
 * POST: append one comment. The tool sends a plain-text JSON body (no
 * custom Content-Type) so the browser skips the CORS preflight that
 * Apps Script can't answer.
 */
function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    setup();
    var sh = sheet_();
    sh.appendRow([
      new Date(),
      String(body.reviewer || 'anonymous'),
      String(body.journey || ''),
      String(body.partner || ''),
      String(body.round || ''),
      String(body.regimes || ''),
      String(body.stepId || ''),
      String(body.optionId || ''),
      String(body.field || ''),
      String(body.originalText || ''),
      String(body.comment || ''),
      String(body.anchor || ''),
    ]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}
