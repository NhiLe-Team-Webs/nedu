# Payment API Documentation

Tài liệu API cho hệ thống thanh toán NEDU.

---

## Base URL

```
Development: http://localhost:5000
Production: https://your-domain.com
```

---

## Authentication

Hiện tại các API endpoints không yêu cầu authentication. Trong production, nên thêm:
- API Key validation cho admin endpoints
- Rate limiting cho public endpoints

---

## Endpoints

### Orders

#### POST /api/orders
Tạo đơn hàng mới và khởi tạo thanh toán.

**Request Body:**
```json
{
  "fullName": "Nguyễn Văn A",
  "email": "email@example.com",
  "phone": "0901234567",
  "telegram": "@telegram_username",
  "birthday": "1990-01-15",
  "gender": "male",
  "address": "123 Đường ABC, Quận 1, TP.HCM",
  "note": "Ghi chú thêm",
  "program": "Khóa học XYZ",
  "programId": 1,
  "programIds": [1, 2, 3],
  "amount": 1000000,
  "courseName": "Khóa học XYZ",
  "couponCode": "DISCOUNT10"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| fullName | string | ✅ | Họ tên khách hàng |
| email | string | ✅ | Email |
| phone | string | ✅ | Số điện thoại |
| telegram | string | ✅ | Telegram username |
| birthday | string | ❌ | Ngày sinh (YYYY-MM-DD) |
| gender | string | ❌ | Giới tính (male/female) |
| address | string | ❌ | Địa chỉ |
| note | string | ❌ | Ghi chú |
| program | string | ❌ | Tên chương trình |
| programId | number | ❌ | ID chương trình (single) |
| programIds | number[] | ❌ | IDs chương trình (multiple) |
| amount | number | ✅ | Số tiền (VND) |
| courseName | string | ❌ | Tên khóa học |
| couponCode | string | ❌ | Mã giảm giá |

**Response (201 Created):**
```json
{
  "success": true,
  "order": {
    "id": 123,
    "code": "uuid-here",
    "orderCode": "DHXYZ123ABC",
    "status": "pending",
    "amount": 1000000,
    "createdAt": "2024-12-15T09:00:00Z"
  },
  "transaction": {
    "id": 456,
    "orderCode": "DHXYZ123ABC",
    "status": "pending"
  },
  "qrCodeUrl": "https://qr.sepay.vn/img?acc=...",
  "accountNumber": "1234567890",
  "bankCode": "MB",
  "description": "DHXYZ123ABC"
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Missing required fields: fullName, email, phone, telegram"
}
```

---

#### GET /api/orders
Lấy danh sách đơn hàng (admin).

**Query Parameters:**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| limit | number | 50 | Số lượng tối đa |
| offset | number | 0 | Vị trí bắt đầu |
| status | number | - | Filter theo status (0=pending, 2=completed, 3=failed) |

**Example:**
```
GET /api/orders?limit=10&offset=0&status=2
```

**Response:**
```json
{
  "success": true,
  "orders": [...],
  "total": 100,
  "limit": 10,
  "offset": 0
}
```

---

#### GET /api/orders/:id
Lấy chi tiết đơn hàng theo ID hoặc orderCode.

**Params:**
- `id`: Order ID (number) hoặc orderCode (string như "DHXYZ123")

**Example:**
```
GET /api/orders/123
GET /api/orders/DHXYZ123ABC
```

**Response:**
```json
{
  "success": true,
  "order": {
    "id": 123,
    "code": "uuid-here",
    "orderCode": "DHXYZ123ABC",
    "status": "success",
    "amount": 1000000,
    "customerInfo": {
      "fullName": "Nguyễn Văn A",
      "email": "email@example.com",
      "phone": "0901234567",
      "telegram": "@username"
    },
    "program": "Khóa học XYZ",
    "courseName": "Khóa học XYZ",
    "couponCode": "DISCOUNT10",
    "createdAt": "2024-12-15T09:00:00Z",
    "updatedAt": "2024-12-15T09:15:00Z"
  },
  "transaction": {
    "id": 456,
    "orderCode": "DHXYZ123ABC",
    "status": "success",
    "amount": 1000000,
    "gateway": "sepay",
    "gatewayTransactionId": "TXN123456",
    "paymentDate": "2024-12-15T09:10:00Z",
    "qrCodeUrl": "https://..."
  }
}
```

---

#### PATCH /api/orders/:id
Cập nhật trạng thái đơn hàng (admin/testing).

**Request Body:**
```json
{
  "status": "success"
}
```

**Valid Status Values:**
- `pending` - Chờ thanh toán
- `processing` - Đang xử lý
- `success` / `completed` - Hoàn thành
- `failed` - Thất bại
- `cancelled` - Đã hủy
- `refunded` - Đã hoàn tiền

**Response:**
```json
{
  "success": true,
  "order": { ... }
}
```

---

### Receipts

#### GET /api/receipts/:orderId
Lấy biên lai cho đơn hàng đã thanh toán thành công.

**Params:**
- `orderId`: Order ID (number) hoặc orderCode (string)

**Example:**
```
GET /api/receipts/123
GET /api/receipts/DHXYZ123ABC
```

**Response (Success):**
```json
{
  "success": true,
  "receipt": {
    "id": 789,
    "receiptNumber": "RCP-20241215-ABCD",
    "issuedAt": "2024-12-15T09:15:00Z",
    "customer": {
      "name": "Nguyễn Văn A",
      "email": "email@example.com",
      "phone": "0901234567"
    },
    "payment": {
      "amount": 1000000,
      "currency": "VND",
      "method": "bank_transfer"
    },
    "order": {
      "id": 123,
      "code": "uuid-here",
      "orderCode": "DHXYZ123ABC",
      "program": "Khóa học XYZ",
      "courseName": "Khóa học XYZ",
      "createdAt": "2024-12-15T09:00:00Z"
    },
    "transaction": {
      "id": 456,
      "gatewayTransactionId": "TXN123456",
      "gateway": "sepay",
      "paymentDate": "2024-12-15T09:10:00Z"
    }
  }
}
```

**Error (Order Not Completed):**
```json
{
  "success": false,
  "error": "Receipt only available for completed orders",
  "orderStatus": 0
}
```

---

### SePay Payment

#### POST /api/sepay/payment
Tạo payment request và QR code.

**Request Body:**
```json
{
  "fullName": "Nguyễn Văn A",
  "email": "email@example.com",
  "phone": "0901234567",
  "telegram": "@username",
  "gender": "male",
  "amount": 1000000,
  "courseName": "Khóa học XYZ",
  "couponCode": "DISCOUNT10"
}
```

**Response:**
```json
{
  "success": true,
  "qrCodeUrl": "https://qr.sepay.vn/img?acc=...",
  "orderCode": "DHXYZ123ABC",
  "accountNumber": "1234567890",
  "bankCode": "MB",
  "amount": 1000000,
  "description": "DHXYZ123ABC",
  "orderId": 123,
  "transactionId": 456
}
```

---

#### GET /api/sepay/payment
Kiểm tra trạng thái đơn hàng theo orderCode.

**Query Parameters:**
- `orderCode`: Mã đơn hàng (required)
- `simulateSuccess`: "true" để simulate thanh toán thành công (testing only)

**Example:**
```
GET /api/sepay/payment?orderCode=DHXYZ123ABC
GET /api/sepay/payment?orderCode=DHXYZ123ABC&simulateSuccess=true
```

**Response:**
```json
{
  "success": true,
  "order": {
    "orderCode": "DHXYZ123ABC",
    "amount": 1000000,
    "status": "success",
    "createdAt": "2024-12-15T09:00:00Z",
    "customerInfo": { ... }
  }
}
```

---

### SePay Webhook

#### POST /api/sepay/webhook
Endpoint nhận webhook từ SePay khi có giao dịch.

> ⚠️ **Note**: Endpoint này được gọi bởi SePay, không phải frontend.

**Request Body (from SePay):**
```json
{
  "gateway": "MBBank",
  "transactionDate": "2024-12-15 09:10:00",
  "accountNumber": "1234567890",
  "content": "DHXYZ123ABC thanh toan khoa hoc",
  "transferType": "in",
  "transferAmount": 1000000,
  "referenceCode": "TXN123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Webhook processed"
}
```

**What happens:**
1. Log webhook event vào database (audit trail)
2. Tìm order theo orderCode trong content
3. Update transaction status → success
4. Update order status → completed
5. Tự động tạo receipt
6. Update Google Sheets

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Missing/invalid data |
| 401 | Unauthorized - Invalid signature |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## Order Status Values

| Status | Code | Description |
|--------|------|-------------|
| pending | 0 | Chờ thanh toán |
| processing | 1 | Đang xử lý |
| completed | 2 | Hoàn thành |
| failed | 3 | Thất bại |
| cancelled | 4 | Đã hủy |
| refunded | 5 | Đã hoàn tiền |

---

## Error Handling

Tất cả errors trả về format:
```json
{
  "success": false,
  "error": "Error message here"
}
```

---

## Testing

### Simulate Payment Success
```bash
# Create order
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test","email":"test@test.com","phone":"0901234567","telegram":"@test","amount":100000}'

# Check status (use orderCode from response)
curl "http://localhost:5000/api/sepay/payment?orderCode=DHXYZ123"

# Simulate success
curl "http://localhost:5000/api/sepay/payment?orderCode=DHXYZ123&simulateSuccess=true"

# Get receipt
curl "http://localhost:5000/api/receipts/DHXYZ123"
```
