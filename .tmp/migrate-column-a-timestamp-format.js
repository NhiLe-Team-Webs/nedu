require("dotenv").config({ path: ".env.local" });
const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");

const OLD_PATTERN = /^(\d{2}):(\d{2}):(\d{2})\s(\d{2})\/(\d{2})\/(\d{4})$/;

(async () => {
  const auth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, auth);
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle["GIO_HANG"] || doc.sheetsByTitle["GIO HANG"] || doc.sheetsByIndex[0];
  await sheet.loadHeaderRow();

  const rows = await sheet.getRows();
  let changed = 0;

  for (const row of rows) {
    const raw = (row.get("Timestamp") || "").toString().trim();
    const match = raw.match(OLD_PATTERN);
    if (!match) continue;

    const [, hh, mm, ss, dd, MM, yyyy] = match;
    const yy = yyyy.slice(-2);
    const normalized = `${dd}/${MM}/${yy} ${hh}:${mm}:${ss}`;

    row.set("Timestamp", normalized);
    await row.save();
    changed++;
  }

  console.log(`Sheet: ${sheet.title}`);
  console.log(`Rows scanned: ${rows.length}`);
  console.log(`Rows updated in Timestamp: ${changed}`);
})();
