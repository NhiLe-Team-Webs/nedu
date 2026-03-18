import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { Order } from '@/lib/order-store';

// Initialize the sheet - ensure these env vars are set
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'); // Handle newline characters
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID || '1Ovc2sNrlw42s85ZHK4M8a6-lGTma3MpgqojR0uSzR-Q'; // Default from user sheet link if not set
const TARGET_SHEET_TITLE = 'GIO_HANG';

const getTargetSheet = (doc: any) =>
    doc.sheetsByTitle[TARGET_SHEET_TITLE] ||
    doc.sheetsByTitle['GIO HANG'] ||
    doc.sheetsByIndex[0];

const formatBirthdayToDateOnly = (value: string): string => {
    if (!value) return '';

    const trimmed = value.trim();
    const directDateMatch = trimmed.match(/^(\d{4}-\d{2}-\d{2})/);
    if (directDateMatch) {
        return directDateMatch[1];
    }

    const parsedDate = new Date(trimmed);
    if (!Number.isNaN(parsedDate.getTime())) {
        return parsedDate.toISOString().split('T')[0];
    }

    return '';
};



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
        hour12: false
    });
    
    const parts = formatter.formatToParts(now);
    const getPart = (type: string) => parts.find(p => p.type === type)?.value || '';

    const day = Number(getPart('day'));
    const month = Number(getPart('month'));
    const year = Number(getPart('year'));
    const hour = Number(getPart('hour'));
    const minute = Number(getPart('minute'));
    const second = Number(getPart('second'));

    // Convert Vietnam local wall-time directly into Google Sheets serial datetime value.
    const utcDate = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
    return utcDate.getTime() / 86400000 + 25569;
};

const ensureHeaders = async (sheet: any) => {
    await sheet.loadHeaderRow();
    const requiredHeaders = [
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
        'Sent Emails'
    ];

    const oldHeaderOrder = [
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
        'Payment Time'
    ];

    const currentHeaderSignature = sheet.headerValues.join('|');
    const requiredHeaderSignature = requiredHeaders.join('|');
    const oldHeaderSignature = oldHeaderOrder.join('|');

    if (currentHeaderSignature === oldHeaderSignature) {
        // Preserve existing values while swapping header positions so Payment Time moves to column O.
        const oldRows = await sheet.getRows();
        const snapshots = oldRows.map((row: any) => ({
            paymentTime: row.get('Payment Time') || '',
            sentEmails: row.get('Sent Emails') || '',
        }));

        await sheet.setHeaderRow(requiredHeaders);
        await sheet.loadHeaderRow();

        const rowsAfterHeaderSwap = await sheet.getRows();
        for (let i = 0; i < rowsAfterHeaderSwap.length; i++) {
            rowsAfterHeaderSwap[i].set('Payment Time', snapshots[i]?.paymentTime || '');
            rowsAfterHeaderSwap[i].set('Sent Emails', snapshots[i]?.sentEmails || '');
            await rowsAfterHeaderSwap[i].save();
        }

        console.log('[Sheet] Migrated header order and moved Payment Time data to column O');
        return;
    }

    const headersMissing = requiredHeaders.some((h) => !sheet.headerValues.includes(h));
    const headerOrderMismatch = currentHeaderSignature !== requiredHeaderSignature;

    if (headersMissing || headerOrderMismatch || sheet.headerValues.length < requiredHeaders.length) {
        console.log(`[Sheet] Headers mismatch. Current: ${JSON.stringify(sheet.headerValues)}, Required: ${JSON.stringify(requiredHeaders)}`);
        // Enforce exact header order to keep Payment Time fixed at column O.
        await sheet.setHeaderRow(requiredHeaders);
        await sheet.loadHeaderRow(); // Reload after setting
        console.log('[Sheet] Updated headers for alignment and reloaded');
    } else {
        console.log(`[Sheet] Headers are correct: ${JSON.stringify(sheet.headerValues)}`);
    }
};

export const appendToSheet = async (data: {
    name: string;
    email: string;
    phone: string;
    telegram: string;
    dob: string;
    gender: string;
    address?: string;
    note?: string;
    courseName?: string;
    couponCode?: string;
    amount: number;
    orderCode: string;
    status: string;
}) => {
    if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
        console.error('Google Sheets credentials missing');
        throw new Error('Google Sheets credentials missing');
    }

    try {
        const serviceAccountAuth = new JWT({
            email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: GOOGLE_PRIVATE_KEY,
            scopes: [
                'https://www.googleapis.com/auth/spreadsheets',
            ],
        });

        const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, serviceAccountAuth);

        await doc.loadInfo(); // loads document properties and worksheets

        const sheet = getTargetSheet(doc);

        // Check if header row exists, if not set it
        await sheet.loadHeaderRow();

        // If headers don't match or are empty, we might want to set them (careful not to overwrite if not intended)
        // For now, we assume the user might have some headers or we append. 
        // If sheet is empty (like in screenshot), we should set headers first.
        if (sheet.rowCount === 0 || sheet.headerValues.length === 0) {
            await ensureHeaders(sheet);
        }

        await ensureHeaders(sheet);

        console.log(`[Sheet] Appending row for Order Code: ${data.orderCode}`);
        const normalizedOrderCode = normalizeOrderCode(data.orderCode);

        await sheet.addRow({
            Timestamp: getVietnamDateTimeSerialNow(),
            Name: data.name,
            Email: data.email,
            Phone: data.phone,
            Telegram: data.telegram,
            Birthday: formatBirthdayToDateOnly(data.dob),
            Gender: data.gender,
            Address: data.address || '',
            Note: data.note || '',
            'Course Name': data.courseName || '',
            'Coupon Code': data.couponCode || '',
            Amount: data.amount,
            'Order Code': normalizedOrderCode,
            Status: data.status,
            'Payment Time': '',
            'Sent Emails': '',
        });

        console.log(`[Sheet] Successfully appended row for ${normalizedOrderCode}`);
        return true;
    } catch (error) {
        console.error('Error appending to Google Sheet:', error);
        throw error;
    }
};

export const updateSheetStatus = async (orderCode: string, newStatus: string, includeTime: boolean = false, amountReceived?: number) => {
    if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
        console.error('Google Sheets credentials missing');
        return false;
    }

    try {
        const serviceAccountAuth = new JWT({
            email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: GOOGLE_PRIVATE_KEY,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, serviceAccountAuth);
        await doc.loadInfo();
        const sheet = getTargetSheet(doc);

        await ensureHeaders(sheet);

        const rows = await sheet.getRows();
        const normalizedOrderCode = normalizeOrderCode(orderCode);
        console.log(`[Sheet] Searching for Order Code: "${normalizedOrderCode}" in ${rows.length} rows`);
        
        // Find row with matching Order Code
        const row = rows.find((r: any) => {
            const sheetCode = normalizeOrderCode(r.get('Order Code'));
            const isMatch = sheetCode === normalizedOrderCode;
            if (isMatch) console.log(`[Sheet] Found matching row for code ${normalizedOrderCode}`);
            return isMatch;
        });

        if (row) {
            console.log(`[Sheet] Current row status: "${row.get('Status')}", updating to: "${newStatus}"`);
            row.set('Status', newStatus);

            const normalizedStatus = (newStatus || '').trim().toLowerCase();
            const shouldSetPaymentTime =
                includeTime ||
                normalizedStatus === 'đã thanh toán' ||
                normalizedStatus === 'da thanh toan' ||
                normalizedStatus === 'success' ||
                normalizedStatus === 'completed';

            if (shouldSetPaymentTime) {
                const payTimeSerial = getVietnamDateTimeSerialNow();
                console.log(`[Sheet] Setting Payment Time serial to: ${payTimeSerial}`);
                row.set('Payment Time', payTimeSerial);
            }

            if (typeof amountReceived === 'number' && Number.isFinite(amountReceived) && amountReceived > 0) {
                row.set('Amount', String(amountReceived));
            }
            
            await row.save();
            console.log(`[Sheet] Successfully updated row for ${normalizedOrderCode}`);
            return true;
        } else {
            console.warn(`[Sheet] Order code "${normalizedOrderCode}" NOT found in sheet rows`);
            const allCodes = rows.map((r: any) => r.get('Order Code')).filter(Boolean);
            console.log(`[Sheet] Available Order Codes in sheet: ${JSON.stringify(allCodes)}`);
            return false;
        }
    } catch (error) {
        console.error('Error updating Google Sheet:', error);
        return false;
    }
};

export const findOrderInSheet = async (orderCode: string): Promise<Order | null> => {
    if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
        console.error('Google Sheets credentials missing');
        return null;
    }

    try {
        const serviceAccountAuth = new JWT({
            email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: GOOGLE_PRIVATE_KEY,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, serviceAccountAuth);
        await doc.loadInfo();
        const sheet = getTargetSheet(doc);

        const rows = await sheet.getRows();
        const row = rows.find((r: any) => r.get('Order Code') === orderCode);

        if (row) {
            // Map sheet row to Order object
            return {
                orderCode: row.get('Order Code'),
                amount: parseFloat(row.get('Amount') || '0'),
                status: row.get('Status'),
                createdAt: row.get('Timestamp'),
                customerInfo: {
                    fullName: row.get('Name'),
                    email: row.get('Email'),
                    phone: row.get('Phone'),
                    telegram: row.get('Telegram'),
                },
                // These fields might be missing or need to be inferred if needed
                programId: undefined,
                programIds: undefined,
            };
        }
        return null;
    } catch (error) {
        console.error('Error finding order in Google Sheet:', error);
        return null;
    }
};