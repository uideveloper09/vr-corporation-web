/**
 * Google Apps Script — paste into Extensions → Apps Script for your enquiry sheet.
 *
 * Setup:
 * 1. Create a Google Sheet named e.g. "VR Corporation Enquiries"
 * 2. Rename the first tab to "Enquiries" (or change SHEET_NAME below)
 * 3. Put this header row in A1:K1:
 *    Timestamp | Reference | Full Name | Mobile | Email | Preferred Contact | Requirement | Locality | Message | Consent | Source
 * 4. Extensions → Apps Script → paste this file → Save
 * 5. Deploy → New deployment → Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the Web app URL into .env as GOOGLE_SHEETS_WEBHOOK_URL=...
 */

var SHEET_NAME = "Enquiries";

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    if (!sheet) {
      return json_({ ok: false, error: 'Sheet tab "' + SHEET_NAME + '" not found.' });
    }

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.reference || "",
      data.fullName || "",
      data.mobile || "",
      data.email || "",
      data.contactPreference || "",
      data.requirement || "",
      data.locality || "",
      data.message || "",
      data.consent || "",
      data.source || "contact-us",
    ]);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

/** Optional: open the sheet and run once to verify permissions. */
function ping() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  Logger.log(sheet ? "OK: " + sheet.getName() : "Missing tab: " + SHEET_NAME);
}
