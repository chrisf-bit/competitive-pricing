/**
 * Rate Right - Conversation Review: comment backend.
 *
 * A tiny Google Apps Script web app that pools reviewer comments into
 * one Google Sheet. Every comment the review tool posts becomes one row;
 * the tool also reads them all back so each reviewer sees the running
 * thread on every line. Reviewers can amend or delete their OWN comments
 * (soft ownership: the server only applies an edit/delete when the posted
 * reviewer name matches the row's author).
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
 * After editing this script, re-publish via Deploy > Manage deployments
 * > edit (pencil) > Version: New version, so the /exec URL stays the same.
 *
 * No API keys, no external services - the Sheet lives in your Workspace.
 */

var SHEET_NAME = 'comments';
var HEADERS = [
  'timestamp', 'reviewer', 'journey', 'partner', 'round', 'regimes',
  'stepId', 'optionId', 'field', 'originalText', 'comment', 'anchor',
  'commentId',
];

// 1-based column positions used by edit / delete.
var COL_REVIEWER = HEADERS.indexOf('reviewer') + 1;
var COL_COMMENT = HEADERS.indexOf('comment') + 1;
var COL_COMMENT_ID = HEADERS.indexOf('commentId') + 1;

/** Run once from the editor to create/format the sheet header. */
function setup() {
  ensureHeader_(sheet_());
  return 'ok';
}

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = ss.insertSheet(SHEET_NAME);
  return sh;
}

/**
 * Write / migrate the header row. Safe to call repeatedly - it only
 * rewrites row 1 when it's missing or predates the commentId column, so
 * older sheets pick up the new column without losing existing rows.
 */
function ensureHeader_(sh) {
  var needs = sh.getLastRow() === 0 ||
    sh.getRange(1, COL_COMMENT_ID).getValue() !== 'commentId';
  if (needs) {
    sh.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
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

/** Find the 1-based sheet row for a commentId, or -1 if not found. */
function findRowById_(sh, commentId) {
  if (!commentId) return -1;
  var last = sh.getLastRow();
  if (last < 2) return -1;
  var ids = sh.getRange(2, COL_COMMENT_ID, last - 1, 1).getValues();
  for (var i = 0; i < ids.length; i++) {
    if (String(ids[i][0]) === String(commentId)) return i + 2;
  }
  return -1;
}

/**
 * POST: add / edit / delete a comment, keyed on body.action. The tool
 * sends a plain-text JSON body (no custom Content-Type) so the browser
 * skips the CORS preflight that Apps Script can't answer.
 *
 * Edit and delete are soft-owned: applied only when body.reviewer
 * matches the row's stored author.
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    var body = JSON.parse(e.postData.contents);
    var sh = sheet_();
    ensureHeader_(sh);
    var action = String(body.action || 'add');

    if (action === 'edit' || action === 'delete') {
      var row = findRowById_(sh, body.commentId);
      if (row === -1) return json_({ ok: false, error: 'not-found' });
      var owner = String(sh.getRange(row, COL_REVIEWER).getValue());
      if (owner !== String(body.reviewer || '')) {
        return json_({ ok: false, error: 'not-owner' });
      }
      if (action === 'delete') {
        sh.deleteRow(row);
      } else {
        sh.getRange(row, COL_COMMENT).setValue(String(body.comment || ''));
      }
      return json_({ ok: true });
    }

    // Default: add a new comment.
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
      String(body.commentId || ''),
    ]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}
