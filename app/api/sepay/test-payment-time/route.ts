import { NextRequest, NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID || '1Ovc2sNrlw42s85ZHK4M8a6-lGTma3MpgqojR0uSzR-Q';
const TARGET_SHEET_TITLE = 'GIO_HANG';
const REQUIRED_HEADERS = [
  'Timestamp',
  'Name',
  'Email',
  'Phone',
  'Telegram',
  'Birthday',
  'Gender',
  'Address',
  'Note',
  'Course Name',
  'Coupon Code',
  'Amount',
  'Order Code',
  'Status',
  'Payment Time',
  'Sent Emails',
];

const OLD_HEADERS = [
  'Timestamp',
  'Name',
  'Email',
  'Phone',
  'Telegram',
  'Birthday',
  'Gender',
  'Address',
  'Note',
  'Course Name',
  'Coupon Code',
  'Amount',
  'Order Code',
  'Status',
  'Sent Emails',
  'Payment Time',
];

const getTargetSheet = (doc: any) =>
  doc.sheetsByTitle[TARGET_SHEET_TITLE] ||
  doc.sheetsByTitle['GIO HANG'] ||
  doc.sheetsByIndex[0];

const normalizeOrderCode = (value?: string): string => (value || '').trim().toUpperCase();

const getVietnamDateTimeSerialNow = (): number => {
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

  const day = Number(getPart('day'));
  const month = Number(getPart('month'));
  const year = Number(getPart('year'));
  const hour = Number(getPart('hour'));
  const minute = Number(getPart('minute'));
  const second = Number(getPart('second'));

  const utcDate = new Date(Date.UTC(year, month - 1, day, hour - 7, minute, second));
  return utcDate.getTime() / 86400000 + 25569;
};

const parsePaymentTimeToSerial = (value?: string): number | null => {
  if (!value) return null;

  const trimmed = value.trim();
  if (!trimmed) return null;

  const dateFirst = trimmed.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4})\s(\d{1,2}):(\d{1,2}):(\d{1,2})$/);
  if (dateFirst) {
    const [, dd, MM, yyOrYyyy, hh, mm, ss] = dateFirst;
    const year = yyOrYyyy.length === 4 ? Number(yyOrYyyy) : Number(`20${yyOrYyyy}`);
    const utcDate = new Date(Date.UTC(year, Number(MM) - 1, Number(dd), Number(hh), Number(mm), Number(ss)));
    return utcDate.getTime() / 86400000 + 25569;
  }

  const timeFirst = trimmed.match(/^(\d{1,2}):(\d{1,2}):(\d{1,2})\s(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4})$/);
  if (timeFirst) {
    const [, hh, mm, ss, dd, MM, yyOrYyyy] = timeFirst;
    const year = yyOrYyyy.length === 4 ? Number(yyOrYyyy) : Number(`20${yyOrYyyy}`);
    const utcDate = new Date(Date.UTC(year, Number(MM) - 1, Number(dd), Number(hh), Number(mm), Number(ss)));
    return utcDate.getTime() / 86400000 + 25569;
  }

  const isoDate = new Date(trimmed);
  if (!Number.isNaN(isoDate.getTime())) {
    return isoDate.getTime() / 86400000 + 25569;
  }

  return null;
};

const ensurePaymentTimeInColumnO = async (sheet: any) => {
  await sheet.loadHeaderRow();

  const currentHeaderSignature = sheet.headerValues.join('|');
  const requiredHeaderSignature = REQUIRED_HEADERS.join('|');
  const oldHeaderSignature = OLD_HEADERS.join('|');

  if (currentHeaderSignature === oldHeaderSignature) {
    const oldRows = await sheet.getRows();
    const snapshots = oldRows.map((row: any) => ({
      paymentTime: row.get('Payment Time') || '',
      sentEmails: row.get('Sent Emails') || '',
    }));

    await sheet.setHeaderRow(REQUIRED_HEADERS);
    await sheet.loadHeaderRow();

    const rowsAfterHeaderSwap = await sheet.getRows();
    for (let i = 0; i < rowsAfterHeaderSwap.length; i++) {
      rowsAfterHeaderSwap[i].set('Payment Time', snapshots[i]?.paymentTime || '');
      rowsAfterHeaderSwap[i].set('Sent Emails', snapshots[i]?.sentEmails || '');
      await rowsAfterHeaderSwap[i].save();
    }

    return;
  }

  const headersMissing = REQUIRED_HEADERS.some((h) => !sheet.headerValues.includes(h));
  const headerOrderMismatch = currentHeaderSignature !== requiredHeaderSignature;

  if (headersMissing || headerOrderMismatch || sheet.headerValues.length < REQUIRED_HEADERS.length) {
    await sheet.setHeaderRow(REQUIRED_HEADERS);
    await sheet.loadHeaderRow();
  }
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
    const requestedPaymentTime = (body?.paymentTime || '').trim();
    const paymentTimeSerial = parsePaymentTimeToSerial(requestedPaymentTime) ?? getVietnamDateTimeSerialNow();

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

    const sheet = getTargetSheet(doc);
    await ensurePaymentTimeInColumnO(sheet);

    const rows = await sheet.getRows();
    const row = rows.find((r) => normalizeOrderCode(r.get('Order Code')) === orderCode);

    if (!row) {
      return NextResponse.json(
        { success: false, error: `Order code not found: ${orderCode}` },
        { status: 404 }
      );
    }

    row.set('Payment Time', paymentTimeSerial);
    await row.save();

    return NextResponse.json({
      success: true,
      message: 'Payment Time updated successfully',
      orderCode,
      paymentTime: requestedPaymentTime || null,
      paymentTimeSerial,
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

    const sheet = getTargetSheet(doc);
    await ensurePaymentTimeInColumnO(sheet);

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