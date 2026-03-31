import { NextRequest, NextResponse } from 'next/server';
import { appendContactToSheet } from '@/lib/google-sheet-contact-service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { hoVaTen, soDienThoai, email, noiDung } = body;
    const thoiGianGuiForm = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });

    await appendContactToSheet({
      thoiGianGuiForm,
      hoVaTen,
      soDienThoai,
      email,
      noiDung,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    // Log lỗi chi tiết
    console.error('Lỗi ghi Google Sheet:', error);
    // Trả về lỗi chi tiết cho FE
    return NextResponse.json({ success: false, error: error?.message || error?.toString() || 'Ghi Google Sheet thất bại', details: error }, { status: 500 });
  }
}
