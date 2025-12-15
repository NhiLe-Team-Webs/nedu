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
    amount: number;
    courseName?: string;
    couponCode?: string;
}

interface PaymentSuccessData extends OrderNotificationData {
    transactionId?: string;
    paymentDate?: string;
    gateway?: string;
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
 * Send notification when new order is created
 */
export async function notifyNewOrder(data: OrderNotificationData): Promise<boolean> {
    const message = `
🆕 <b>ĐƠN HÀNG MỚI</b>

📋 <b>Mã đơn:</b> <code>${data.orderCode}</code>
👤 <b>Khách hàng:</b> ${escapeHtml(data.customerName)}
📧 <b>Email:</b> ${escapeHtml(data.email)}
📱 <b>SĐT:</b> ${escapeHtml(data.phone)}
${data.telegram ? `💬 <b>Telegram:</b> ${escapeHtml(data.telegram)}` : ''}

📚 <b>Khóa học:</b> ${escapeHtml(data.courseName || 'N/A')}
💰 <b>Số tiền:</b> ${formatCurrency(data.amount)}
${data.couponCode ? `🎟️ <b>Mã giảm giá:</b> ${escapeHtml(data.couponCode)}` : ''}

⏳ <i>Đang chờ thanh toán...</i>
`.trim();

    return sendTelegramMessage(message);
}

/**
 * Send notification when payment is successful
 */
export async function notifyPaymentSuccess(data: PaymentSuccessData): Promise<boolean> {
    const message = `
✅ <b>THANH TOÁN THÀNH CÔNG</b>

📋 <b>Mã đơn:</b> <code>${data.orderCode}</code>
👤 <b>Khách hàng:</b> ${escapeHtml(data.customerName)}
📧 <b>Email:</b> ${escapeHtml(data.email)}
📱 <b>SĐT:</b> ${escapeHtml(data.phone)}

📚 <b>Khóa học:</b> ${escapeHtml(data.courseName || 'N/A')}
💰 <b>Số tiền:</b> ${formatCurrency(data.amount)}
${data.transactionId ? `🔗 <b>Mã GD:</b> <code>${escapeHtml(data.transactionId)}</code>` : ''}
${data.gateway ? `🏦 <b>Ngân hàng:</b> ${escapeHtml(data.gateway)}` : ''}
📅 <b>Thời gian:</b> ${data.paymentDate || new Date().toLocaleString('vi-VN')}

🎉 <i>Cảm ơn khách hàng!</i>
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
