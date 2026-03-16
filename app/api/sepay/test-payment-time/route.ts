import { NextRequest, NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID || '198NMupt0ouMMo8M7Kyn2sRddjaduPL3tYbCFfAGV0nU';

const normalizeOrderCode = (value?: string): string => (value || '').trim().toUpperCase();

const getVietnameseTimestamp = (): string => {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const getPart = (type: string) => parts.find((p) => p.type === type)?.value || '';

  return `${getPart('hour')}:${getPart('minute')}:${getPart('second')} ${getPart('day')}/${getPart('month')}/${getPart('year')}`;
};

export async function POST(request: NextRequest) {
  try {
    if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      return NextResponse.json(
        { success: false, error: 'Google Sheets credentials missing' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const orderCode = normalizeOrderCode(body?.orderCode);
    const paymentTime = (body?.paymentTime || '').trim() || getVietnameseTimestamp();

    if (!orderCode) {
      return NextResponse.json(
        { success: false, error: 'Missing orderCode' },
        { status: 400 }
      );
    }

    const serviceAccountAuth = new JWT({
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: GOOGLE_PRIVATE_KEY,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();

    const sheet = doc.sheetsByTitle['RAW_FORM_DATA'] || doc.sheetsByIndex[0];
    await sheet.loadHeaderRow();

    const rows = await sheet.getRows();
    const row = rows.find((r) => normalizeOrderCode(r.get('Order Code')) === orderCode);

    if (!row) {
      return NextResponse.json(
        { success: false, error: `Order code not found: ${orderCode}` },
        { status: 404 }
      );
    }

    row.set('Payment Time', paymentTime);
    await row.save();

    return NextResponse.json({
      success: true,
      message: 'Payment Time updated successfully',
      orderCode,
      paymentTime,
    });
  } catch (error) {
    console.error('Error updating Payment Time in sheet:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      return NextResponse.json(
        { success: false, error: 'Google Sheets credentials missing' },
        { status: 500 }
      );
    }

    const serviceAccountAuth = new JWT({
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: GOOGLE_PRIVATE_KEY,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();

    const sheet = doc.sheetsByTitle['RAW_FORM_DATA'] || doc.sheetsByIndex[0];
    await sheet.loadHeaderRow();

    const rows = await sheet.getRows();
    const orderCodes = rows
      .map((r) => normalizeOrderCode(r.get('Order Code')))
      .filter((code) => Boolean(code))
      .slice(-20)
      .reverse();

    return NextResponse.json({
      success: true,
      totalRows: rows.length,
      orderCodes,
    });
  } catch (error) {
    console.error('Error reading order codes from sheet:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}