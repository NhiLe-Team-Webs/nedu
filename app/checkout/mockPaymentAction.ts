'use server'

import { appendToSheet } from '@/lib/google-sheets';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID || '1Ovc2sNrlw42s85ZHK4M8a6-lGTma3MpgqojR0uSzR-Q';
const TARGET_SHEET_TITLE = 'GIO_HANG';

export async function processFreeCheckout(data: any, couponCode: string = 'LCMREVIEWFREE', maxUses: number = 3) {
  try {
    if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      throw new Error('Thiếu cấu hình Google Sheets');
    }

    const serviceAccountAuth = new JWT({
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: GOOGLE_PRIVATE_KEY,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle[TARGET_SHEET_TITLE] || doc.sheetsByTitle['GIO HANG'] || doc.sheetsByIndex[0];
    
    await sheet.loadHeaderRow();
    const rows = await sheet.getRows();
    
    // Count how many times the coupon code has been used
    const usageCount = rows.filter(r => r.get('Coupon Code') === couponCode).length;
    
    if (usageCount >= maxUses) {
      return { success: false, message: `Mã khuyến mãi này đã hết lượt sử dụng (Tối đa ${maxUses} lần).` };
    }
    
    // Generate a random order code
    const orderCode = 'FREE' + Math.floor(Math.random() * 1000000);
    
    await appendToSheet({
      ...data,
      orderCode,
      status: 'đã thanh toán',
      couponCode: couponCode,
      amount: 0,
    });
    
    return { success: true, orderCode };
  } catch (error: any) {
    console.error('Free checkout error:', error);
    return { success: false, message: error.message };
  }
}
