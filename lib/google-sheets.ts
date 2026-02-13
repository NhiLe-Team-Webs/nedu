import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { Order } from '@/lib/order-store';

// Initialize the sheet - ensure these env vars are set
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'); // Handle newline characters
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID || '198NMupt0ouMMo8M7Kyn2sRddjaduPL3tYbCFfAGV0nU'; // Default from user screenshot if not set

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
            await sheet.setHeaderRow([
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
                'Status'
            ]);
        }

        await sheet.addRow({
            Timestamp: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
            Name: data.name,
            Email: data.email,
            Phone: data.phone,
            Telegram: data.telegram,
            Birthday: data.dob,
            Gender: data.gender,
            Address: data.address || '',
            Note: data.note || '',
            'Course Name': data.courseName || '',
            'Coupon Code': data.couponCode || '',
            Amount: data.amount,
            'Order Code': data.orderCode,
            Status: data.status,
        });

        return true;
    } catch (error) {
        console.error('Error appending to Google Sheet:', error);
        throw error;
    }
};

export const updateSheetStatus = async (orderCode: string, newStatus: string, amountReceived?: number) => {
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

        const rows = await sheet.getRows();
        // Find row with matching Order Code
        const row = rows.find(r => r.get('Order Code') === orderCode);

        if (row) {
            row.assign({ Status: newStatus });
            if (amountReceived) {
                // Optionally update or verify amount, or add a note?
            }
            await row.save();
            console.log(`Updated status for ${orderCode} to ${newStatus}`);
            return true;
        } else {
            console.warn(`Order code ${orderCode} not found in sheet`);
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
