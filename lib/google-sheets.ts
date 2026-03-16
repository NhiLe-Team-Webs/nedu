import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { Order } from '@/lib/order-store';

// Initialize the sheet - ensure these env vars are set
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'); // Handle newline characters
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID || '198NMupt0ouMMo8M7Kyn2sRddjaduPL3tYbCFfAGV0nU'; // Default from user screenshot if not set

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
        hour12: false
    });
    
    const parts = formatter.formatToParts(now);
    const getPart = (type: string) => parts.find(p => p.type === type)?.value || '';
    
    // Format: HH:mm:ss DD/MM/YYYY
    return `${getPart('hour')}:${getPart('minute')}:${getPart('second')} ${getPart('day')}/${getPart('month')}/${getPart('year')}`;
};

const getPaymentTimeNow = (): string => getVietnameseTimestamp();

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
        'Sent Emails',
        'Payment Time'
    ];

    let headersChanged = false;
    for (const h of requiredHeaders) {
        if (!sheet.headerValues.includes(h)) {
            headersChanged = true;
            break;
        }
    }

    if (headersChanged || sheet.headerValues.length < requiredHeaders.length) {
        console.log(`[Sheet] Headers mismatch. Current: ${JSON.stringify(sheet.headerValues)}, Required: ${JSON.stringify(requiredHeaders)}`);
        // Find existing headers and merge or just enforce order if it's the raw data sheet
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

        const sheet = doc.sheetsByTitle['RAW_FORM_DATA']; // Priority to RAW_FORM_DATA tab

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
            Timestamp: getVietnameseTimestamp(),
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
            'Sent Emails': '',
            'Payment Time': '',
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
        const sheet = doc.sheetsByTitle['RAW_FORM_DATA'] || doc.sheetsByIndex[0];

        await ensureHeaders(sheet);

        const rows = await sheet.getRows();
        const normalizedOrderCode = normalizeOrderCode(orderCode);
        console.log(`[Sheet] Searching for Order Code: "${normalizedOrderCode}" in ${rows.length} rows`);
        
        // Find row with matching Order Code
        const row = rows.find(r => {
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
                const payTime = getPaymentTimeNow();
                console.log(`[Sheet] Setting Payment Time to: ${payTime}`);
                row.set('Payment Time', payTime);
            }

            if (typeof amountReceived === 'number' && Number.isFinite(amountReceived) && amountReceived > 0) {
                row.set('Amount', String(amountReceived));
            }
            
            await row.save();
            console.log(`[Sheet] Successfully updated row for ${normalizedOrderCode}`);
            return true;
        } else {
            console.warn(`[Sheet] Order code "${normalizedOrderCode}" NOT found in sheet rows`);
            const allCodes = rows.map(r => r.get('Order Code')).filter(Boolean);
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
        const sheet = doc.sheetsByTitle['RAW_FORM_DATA'] || doc.sheetsByIndex[0];

        const rows = await sheet.getRows();
        const row = rows.find(r => r.get('Order Code') === orderCode);

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