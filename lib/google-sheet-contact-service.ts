import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';


const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID || '1Ovc2sNrlw42s85ZHK4M8a6-lGTma3MpgqojR0uSzR-Q';
const TARGET_SHEET_TITLE = 'LIEN_HE';

export async function appendContactToSheet({
  thoiGianGuiForm,
  hoVaTen,
  soDienThoai,
  email,
  noiDung,
}: {
  thoiGianGuiForm: string;
  hoVaTen: string;
  soDienThoai: string;
  email: string;
  noiDung: string;
}) {
  if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
    console.error('[ContactSheet] Google Sheets credentials missing');
    throw new Error('Google Sheets credentials missing');
  }

  try {
    console.log('[ContactSheet] Bắt đầu ghi Google Sheet');
    const serviceAccountAuth = new JWT({
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: GOOGLE_PRIVATE_KEY,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle[TARGET_SHEET_TITLE];
    if (!sheet) throw new Error(`Sheet ${TARGET_SHEET_TITLE} not found`);

    // Chỉ load header, không set header nữa
    await sheet.loadHeaderRow();
    console.log('[ContactSheet] Header values:', sheet.headerValues);
    if (sheet.headerValues.length === 0) {
      throw new Error('Header values are not loaded!');
    }

    await sheet.addRow({
      'Thời gian gửi form': thoiGianGuiForm,
      'Họ và tên': hoVaTen,
      'Số điện thoại': soDienThoai,
      'Email': email,
      'Nội dung': noiDung,
    });
    console.log('[ContactSheet] Ghi Google Sheet thành công');
  } catch (err) {
    console.error('[ContactSheet] Lỗi ghi Google Sheet:', err);
    throw err;
  }
}
