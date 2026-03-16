# N-EDU Web App

Website giới thiệu chương trình học và hỗ trợ thanh toán trực tuyến cho N-EDU, được xây dựng bằng **Next.js + TypeScript**.

## 1) Công nghệ sử dụng

- **Framework:** Next.js 16 (App Router)
- **Ngôn ngữ:** TypeScript, JavaScript
- **UI:** React 19, Tailwind CSS
- **Tích hợp dịch vụ:** Supabase, SePay, Google Sheets, Telegram

## 2) Yêu cầu môi trường

Trước khi chạy dự án, hãy đảm bảo máy của bạn có:

- **Node.js >= 20** (khuyến nghị dùng bản LTS mới nhất)
- **npm >= 10**

Kiểm tra nhanh:

```bash
node -v
npm -v
```

## 3) Cài đặt dự án

### Bước 1: Clone mã nguồn

```bash
git clone <repo-url>
cd nedu
```

### Bước 2: Cài đặt dependency

```bash
npm install
```

## 4) Cấu hình biến môi trường

Tạo file `.env.local` ở thư mục gốc dự án:

```bash
cp .env.example .env.local
```

> Nếu repo chưa có `.env.example`, bạn có thể tự tạo `.env.local` và thêm các biến bên dưới.

### Danh sách biến môi trường

#### Nhóm Supabase

```env
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

#### Nhóm SePay

```env
SEPAY_API_KEY=
SEPAY_WEBHOOK_API_KEY=
SEPAY_BUSINESS_ACCOUNT_NUMBER=
SEPAY_BUSINESS_BANK_CODE=
SEPAY_TEST_MODE=false
SEPAY_TEST_AMOUNT=2000
SEPAY_DEBUG=false
NEXT_PUBLIC_APP_URL=http://localhost:5000
APP_URL=http://localhost:5000
```

#### Nhóm Google Sheets

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=
GOOGLE_SHEET_ID=
```

> Lưu ý: `GOOGLE_PRIVATE_KEY` thường chứa ký tự xuống dòng. Nếu copy từ JSON, hãy thay xuống dòng thật bằng `\n` khi dán vào `.env.local`.

#### Nhóm Telegram (phục vụ cron/report)

```env
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

## 5) Chạy dự án ở môi trường phát triển

```bash
npm run dev
```

Mặc định ứng dụng chạy tại:

- http://localhost:5000

## 6) Build và chạy production

### Build

```bash
npm run build
```

### Start server production

```bash
npm run start
```

## 7) Kiểm tra chất lượng mã nguồn

```bash
npm run lint
```

## 8) Cấu trúc thư mục chính

```text
app/         # Pages, API routes (App Router)
components/  # UI components tái sử dụng
lib/         # Services, config, repositories, tiện ích
data/        # Dữ liệu tĩnh
docs/        # Tài liệu kỹ thuật và luồng tích hợp
public/      # Ảnh, icon, video tĩnh
```

## 9) Tài liệu liên quan

- `docs/API.md`
- `docs/api_documentation.md`
- `docs/PAYMENT_FLOW.md`
- `docs/sepay-integration.md`

## 10) Một số lỗi thường gặp

- **Port 5000 đã được sử dụng**
  - Đóng tiến trình đang chiếm cổng hoặc đổi cổng trong script `dev` / `start` tại `package.json`.
- **Thanh toán test không đúng số tiền mong muốn**
  - Kiểm tra `SEPAY_TEST_MODE` và `SEPAY_TEST_AMOUNT` trong `.env.local`.
- **Không ghi được dữ liệu lên Google Sheets**
  - Kiểm tra quyền chia sẻ sheet cho service account và định dạng `GOOGLE_PRIVATE_KEY`.

---

Nếu bạn muốn, mình có thể tạo luôn file `.env.example` chuẩn theo README này để onboarding thành viên mới nhanh hơn.
