import { supabaseAdmin } from '@/lib/db';
import axios from 'axios';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const TELEGRAM_API_URL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const getTodayOrders = async () => {
  const now = new Date();
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);

  // Use Supabase Admin client to query the 'order' table
  // Note: Table name is singular 'order' in the schema
  const { data, error } = await supabaseAdmin
    .from('order')
    .select('course_name, receipt_id, telegram')
    .gte('created_at', startOfDay.toISOString())
    .lte('created_at', endOfDay.toISOString());

  if (error) {
    throw new Error(`Supabase query error: ${error.message}`);
  }

  // Map the result to the format expected by formatTelegramMessage
  return data.map(order => ({
    course_name: order.course_name,
    receipts_id: order.receipt_id,
    user_telegram: order.telegram
  }));
};

const formatTelegramMessage = (orders) => {
  const courses = {};

  orders.forEach(order => {
    const courseName = order.course_name || 'Unknown Course';
    if (!courses[courseName]) {
      courses[courseName] = { success: 0, cart: 0, users: [] };
    }

    if (order.receipts_id) {
      courses[courseName].success += 1;
    } else {
      courses[courseName].cart += 1;
    }

    if (order.user_telegram) {
      courses[courseName].users.push(order.user_telegram);
    }
  });

  let message = `Cập nhật đăng ký ngày ${new Date().toLocaleDateString('vi-VN')}:\n`;

  if (Object.keys(courses).length === 0) {
    message += '\nChưa có đăng ký nào hôm nay.';
  }

  Object.entries(courses).forEach(([courseName, data], index) => {
    message += `\n${index + 1}. ${courseName}: \n`;
    message += `- Số lượng đăng ký thành công: ${data.success}\n`;
    message += `- Số lượng thêm vào giỏ hàng: ${data.cart}\n`;
    data.users.forEach(user => {
      message += `+ ${user}\n`;
    });
    message += `\n`;
  });

  return message;
};

const sendTelegramMessage = async (message) => {
  if (!TELEGRAM_API_URL || !TELEGRAM_CHAT_ID) {
    console.warn('Telegram configuration missing');
    return;
  }
  await axios.post(TELEGRAM_API_URL, {
    chat_id: TELEGRAM_CHAT_ID,
    text: message,
  });
};

export async function GET() {
  try {
    const orders = await getTodayOrders();
    const message = formatTelegramMessage(orders);
    await sendTelegramMessage(message);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error generating or sending report:', error);
    return NextResponse.json({ 
      error: error.message || 'Unknown error',
      details: error.toString()
    }, { status: 500 });
  }
}