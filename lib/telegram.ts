/**
 * Telegram Notification Utility
 * Send notifications to Telegram bot/group
 */

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '';

interface OrderNotificationData {
    orderCode: string;
    customerName: string;
    email: string;
    phone: string;
    telegram?: string;
    birthday?: string;
    gender?: string;
    address?: string;
    note?: string;
    amount: number;
    courseName?: string;
    couponCode?: string;
}

interface PaymentSuccessData {
    orderCode: string;
    customerName: string;
    email: string;
    phone: string;
    amount: number;
    courseName?: string;
    transactionId?: string;
    gateway?: string;
    paymentDate?: string;
}

interface PaymentErrorData {
    orderCode?: string;
    error: string;
    context?: string;
    timestamp?: string;
}

/**
 * Check if Telegram is configured
 */
export function isTelegramConfigured(): boolean {
    return !!(TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID);
}

/**
 * Send a message to Telegram
 */
async function sendTelegramMessage(message: string): Promise<boolean> {
    if (!isTelegramConfigured()) {
        console.warn('[Telegram] Bot token or chat ID not configured');
        return false;
    }

    try {
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'HTML',
            }),
        });

        const result = await response.json();

        if (!result.ok) {
            console.error('[Telegram] Failed to send message:', result);
            return false;
        }

        console.log('[Telegram] Message sent successfully');
        return true;
    } catch (error) {
        console.error('[Telegram] Error sending message:', error);
        return false;
    }
}

/**
 * Format currency to VND
 */
function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(amount);
}

/**
 * Format course names - display as list if multiple
 */
function formatCourseNames(courseName: string | undefined): string {
    if (!courseName) return 'Chưa xác định';

    const courses = courseName.split(',').map(c => c.trim()).filter(c => c);

    if (courses.length === 0) return 'Chưa xác định';
    if (courses.length === 1) return escapeHtml(courses[0]);

    // Multiple courses - format as list
    return courses.map(c => `  • ${escapeHtml(c)}`).join('\n');
}

/**
 * Send notification when new order is created
 */
export async function notifyNewOrder(data: OrderNotificationData): Promise<boolean> {
    const courseDisplay = formatCourseNames(data.courseName);
    const isMultipleCourses = data.courseName?.includes(',');

    const message = `
🆕 <b>ĐƠN HÀNG MỚI</b>

📋 <b>Mã đơn:</b> <code>${data.orderCode}</code>

<b>👤 THÔNG TIN KHÁCH HÀNG</b>
• Họ tên: ${escapeHtml(data.customerName)}
• Email: ${escapeHtml(data.email)}
• SĐT: ${escapeHtml(data.phone)}
${data.telegram ? `• Telegram: ${escapeHtml(data.telegram)}` : ''}
${data.birthday ? `• Ngày sinh: ${escapeHtml(data.birthday)}` : ''}
${data.gender ? `• Giới tính: ${escapeHtml(data.gender)}` : ''}
${data.address ? `• Địa chỉ: ${escapeHtml(data.address)}` : ''}
${data.note ? `• Ghi chú: ${escapeHtml(data.note)}` : ''}

<b>📚 CHI TIẾT ĐƠN HÀNG</b>
${isMultipleCourses ? `• Khóa học:\n${courseDisplay}` : `• Khóa học: ${courseDisplay}`}
• Số tiền: ${formatCurrency(data.amount)}
${data.couponCode ? `• Mã giảm giá: ${escapeHtml(data.couponCode)}` : ''}

⏳ <i>Đang chờ thanh toán...</i>
`.trim();

    return sendTelegramMessage(message);
}

/**
 * Send notification when payment is successful
 */
export async function notifyPaymentSuccess(data: PaymentSuccessData): Promise<boolean> {
    const courseDisplay = formatCourseNames(data.courseName);
    const isMultipleCourses = data.courseName?.includes(',');

    const message = `
✅ <b>THANH TOÁN THÀNH CÔNG</b>

📋 <b>Mã đơn:</b> <code>${data.orderCode}</code>
${data.transactionId ? `🔗 <b>Mã GD:</b> <code>${escapeHtml(data.transactionId)}</code>` : ''}

<b>👤 KHÁCH HÀNG</b>
• Họ tên: ${escapeHtml(data.customerName)}
• Email: ${escapeHtml(data.email)}
• SĐT: ${escapeHtml(data.phone)}

<b>� THANH TOÁN</b>
${isMultipleCourses ? `• Khóa học:\n${courseDisplay}` : `• Khóa học: ${courseDisplay}`}
• Số tiền: ${formatCurrency(data.amount)}
${data.gateway ? `• Ngân hàng: ${escapeHtml(data.gateway)}` : ''}
• Thời gian: ${data.paymentDate || new Date().toLocaleString('vi-VN')}
`.trim();

    return sendTelegramMessage(message);
}

/**
 * Send notification when payment error occurs
 */
export async function notifyPaymentError(data: PaymentErrorData): Promise<boolean> {
    const message = `
❌ <b>LỖI THANH TOÁN</b>

${data.orderCode ? `📋 <b>Mã đơn:</b> <code>${data.orderCode}</code>` : ''}
⚠️ <b>Lỗi:</b> ${escapeHtml(data.error)}
${data.context ? `📝 <b>Chi tiết:</b> ${escapeHtml(data.context)}` : ''}
🕐 <b>Thời gian:</b> ${data.timestamp || new Date().toLocaleString('vi-VN')}

<i>Cần kiểm tra và xử lý!</i>
`.trim();

    return sendTelegramMessage(message);
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
    if (!text) return '';
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

/**
 * Send custom notification
 */
export async function sendCustomNotification(
    title: string,
    content: string,
    emoji: string = '📢'
): Promise<boolean> {
    const message = `
${emoji} <b>${escapeHtml(title)}</b>

${content}
`.trim();

    return sendTelegramMessage(message);
}
