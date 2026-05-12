import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID || '1Q73IPYL9Qqp7pAJggBiIl32uPkjNU-9fESIPBRWZNaU';
const TARGET_SHEET_TITLE = 'MA_GIOI_THIEU';

const getVietnamDateTimeString = (): string => {
    return new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
};

/**
 * Append a new referral row to MA_GIOI_THIEU sheet
 * Called when alumni creates a referral code
 */
export async function appendReferralToSheet(data: {
    alumniName: string;
    alumniEmail: string;
    alumniPhone: string;
    alumniUserTele: string;
    alumniBirthDate: string;
    alumniGender: string;
    previousCourse: string;
    referralCode: string;
    status: string;
}) {
    if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
        console.error('[ReferralSheet] Google Sheets credentials missing');
        throw new Error('Google Sheets credentials missing');
    }

    try {
        console.log('[ReferralSheet] Appending referral code:', data.referralCode);
        const serviceAccountAuth = new JWT({
            email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: GOOGLE_PRIVATE_KEY,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, serviceAccountAuth);
        await doc.loadInfo();

        const sheet = doc.sheetsByTitle[TARGET_SHEET_TITLE];
        if (!sheet) {
            throw new Error(`Sheet "${TARGET_SHEET_TITLE}" not found. Available: ${Object.keys(doc.sheetsByTitle).join(', ')}`);
        }

        try {
            await sheet.loadHeaderRow();
        } catch (e) {
            console.log('[ReferralSheet] No header row found, setting it now...');
            await sheet.setHeaderRow([
                'Timestamp',
                'Name',
                'Email',
                'Phone',
                'Telegram',
                'Birthday',
                'Gender',
                'Previous Course',
                'Referral Code',
                'Status',
                'New Student Order ID',
                'New Student Name'
            ]);
        }
        console.log('[ReferralSheet] Headers:', sheet.headerValues);

        await sheet.addRow({
            'Timestamp': getVietnamDateTimeString(),
            'Name': data.alumniName,
            'Email': data.alumniEmail,
            'Phone': data.alumniPhone,
            'Telegram': data.alumniUserTele ? `@${data.alumniUserTele}` : '',
            'Birthday': data.alumniBirthDate,
            'Gender': data.alumniGender,
            'Previous Course': data.previousCourse,
            'Referral Code': data.referralCode,
            'Status': data.status,
            'New Student Order ID': '',
            'New Student Name': '',
        });

        console.log(`[ReferralSheet] ✅ Appended referral code: ${data.referralCode}`);
    } catch (err) {
        console.error('[ReferralSheet] ❌ Error:', err);
        throw err;
    }
}

/**
 * Update referral row in MA_GIOI_THIEU sheet when new student pays
 * Called alongside ReferralRepository.updateStatus
 */
export async function updateReferralInSheet(
    referralCode: string,
    status: string,
    newStudentOrderId?: number,
    newStudentName?: string,
) {
    if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
        console.error('[ReferralSheet] Google Sheets credentials missing');
        return false;
    }

    try {
        console.log(`[ReferralSheet] Updating referral code: ${referralCode} → status: ${status}`);
        const serviceAccountAuth = new JWT({
            email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: GOOGLE_PRIVATE_KEY,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, serviceAccountAuth);
        await doc.loadInfo();

        const sheet = doc.sheetsByTitle[TARGET_SHEET_TITLE];
        if (!sheet) {
            console.error(`[ReferralSheet] Sheet "${TARGET_SHEET_TITLE}" not found`);
            return false;
        }

        try {
            await sheet.loadHeaderRow();
        } catch (e) {
            console.log('[ReferralSheet] No header row found, setting it now...');
            await sheet.setHeaderRow([
                'Timestamp',
                'Name',
                'Email',
                'Phone',
                'Telegram',
                'Birthday',
                'Gender',
                'Previous Course',
                'Referral Code',
                'Status',
                'New Student Order ID',
                'New Student Name'
            ]);
        }
        const rows = await sheet.getRows();

        const row = rows.find((r: any) => {
            const code = (r.get('Referral Code') || '').trim().toUpperCase();
            return code === referralCode.trim().toUpperCase();
        });

        if (row) {
            row.set('Status', status);
            if (newStudentOrderId !== undefined) {
                row.set('New Student Order ID', String(newStudentOrderId));
            }
            if (newStudentName) {
                row.set('New Student Name', newStudentName);
            }
            await row.save();
            console.log(`[ReferralSheet] ✅ Updated referral ${referralCode} → ${status}`);
            return true;
        } else {
            console.warn(`[ReferralSheet] Referral code "${referralCode}" not found in sheet`);
            return false;
        }
    } catch (err) {
        console.error('[ReferralSheet] ❌ Update error:', err);
        return false;
    }
}
