Tổng quan về hệ thống thanh toán
Hệ thống thanh toán của dự án này được tích hợp với VNPAY, một trong những cổng thanh toán phổ biến tại Việt Nam. Hệ thống được xây dựng bằng NestJS framework và sử dụng TypeORM để tương tác với cơ sở dữ liệu.

Cấu trúc các thành phần chính
1. Các Entity liên quan
PaymentEntity: Lưu trữ thông tin thanh toán chính

id: ID của thanh toán
sourceId: ID của nguồn (thường là mã đơn hàng)
vnpTxnRef: Mã giao dịch của VNPAY
amount: Số tiền thanh toán
status: Trạng thái thanh toán (pending, success, failed)
paymentHistories: Lịch sử thay đổi trạng thái thanh toán
PaymentHistoryEntity: Lưu trữ lịch sử thay đổi trạng thái thanh toán

paymentId: ID của thanh toán liên quan
status: Trạng thái tại thời điểm đó
message: Thông điệp từ VNPAY
rspCode: Mã phản hồi từ VNPAY
params: Tham số gửi đi
OrderEntity: Lưu trữ thông tin đơn hàng

code: Mã đơn hàng (UUID)
fullName: Họ tên người mua
email: Email người mua
phone: Số điện thoại
telegram: Telegram
birthday: Ngày sinh
gender: Giới tính
address: Địa chỉ
note: Ghi chú
program: Tên chương trình học
price: Giá tiền
programId: ID của chương trình
status: Trạng thái đơn hàng (0: pending, 1: confirmed, 2: canceled)
programData: Dữ liệu chương trình dạng JSON
2. Các API Endpoint chính
2.1. Tạo đơn hàng và thanh toán
Endpoint: POST /order/payment
Mô tả: Tạo đơn hàng mới và tạo URL thanh toán VNPAY
Request Body:
{
  fullName: string,      // Họ tên người mua
  email: string,          // Email người mua
  phone: string,         // Số điện thoại
  telegram: string,      // Telegram
  birthday: string,       // Ngày sinh (ISO string)
  gender?: string,        // Giới tính (tùy chọn)
  address: string,        // Địa chỉ
  note?: string,          // Ghi chú (tùy chọn)
  programId: string       // ID của chương trình học
}

Response:
{
  paymentUrl: string      // URL thanh toán VNPAY
}

2.2. Kiểm tra trạng thái thanh toán
Endpoint: GET /order/payment-status/:idx
Mô tả: Kiểm tra trạng thái thanh toán của đơn hàng
Path Parameter: idx - Mã đơn hàng
Response:
{
  status: number          // Trạng thái đơn hàng (0: pending, 1: confirmed, 2: canceled)
}

2.3. Endpoint IPN (Instant Payment Notification)
Endpoint: GET /v1/payment/ipn
Mô tả: Endpoint nhận thông báo từ VNPAY khi thanh toán hoàn tất
Query Parameters: Các tham số từ VNPAY (xem phần 3)
Response:
{
  rspCode: string,       // Mã phản hồi
  message: string        // Thông điệp phản hồi
}

2.4. Endpoint test thanh toán (chỉ trong môi trường development)
Endpoint: GET /v1/payment
Mô tả: Tạo URL thanh toán test (chỉ hoạt động trong môi trường development)
Response: URL thanh toán VNPAY
3. Các tham số quan trọng từ VNPAY
3.1. Tham số gửi đi khi tạo thanh toán
{
  vnp_Amount: number,         // Số tiền (nhân 100)
  vnp_BankCode: string,       // Mã ngân hàng (rỗng để chọn tất cả)
  vnp_CreateDate: number,    // Ngày tạo giao dịch (yyyyMMddHHmmss)
  vnp_ExpireDate: number,    // Ngày hết hạn (yyyyMMddHHmmss)
  vnp_IpAddr: string,         // IP của client
  vnp_TxnRef: string,         // Mã giao dịch (thường là mã đơn hàng)
  vnp_OrderInfo: string,      // Thông tin đơn hàng
  vnp_ReturnUrl: string       // URL trả về sau thanh toán
}

3.2. Tham số nhận về từ VNPAY (IPN)
{
  vnp_Amount: number | string,         // Số tiền
  vnp_TmnCode?: string,                // Mã website của merchant
  vnp_BankCode?: string,               // Mã ngân hàng
  vnp_BankTranNo?: string,             // Mã giao dịch tại ngân hàng
  vnp_CardType?: string,               // Loại thẻ
  vnp_PayDate?: number | string,       // Ngày thanh toán
  vnp_TransactionNo?: number | string, // Mã giao dịch
  vnp_ResponseCode: number | string,   // Mã phản hồi (00: thành công)
  vnp_TransactionStatus?: number | string, // Trạng thái giao dịch
  vnp_SecureHashType?: string,         // Loại hash
  vnp_SecureHash?: string,             // Chữ ký bảo mật
  vnp_TxnRef: string                   // Mã giao dịch
}

4. Logic xử lý thanh toán
4.1. Quy trình tạo thanh toán
Client gửi request đến POST /order/payment với thông tin đơn hàng
Server kiểm tra thông tin chương trình học và tính toán giá tiền
Server tạo đơn hàng mới với trạng thái PENDING
Server tạo URL thanh toán VNPAY với các tham số cần thiết
Server lưu thông tin thanh toán vào database với trạng thái PENDING
Server trả về URL thanh toán cho client
Client chuyển hướng người dùng đến URL thanh toán
4.2. Quy trình xử lý IPN
VNPAY gửi request đến GET /v1/payment/ipn với các tham số kết quả thanh toán
Server kiểm tra IP của request
Server tìm thanh toán dựa trên vnp_TxnRef
Server kiểm tra số tiền và chữ ký bảo mật
Nếu thanh toán thành công (vnp_ResponseCode = '00'):
Cập nhật trạng thái thanh toán thành SUCCESS
Cập nhật trạng thái đơn hàng thành CONFIRMED
Gửi webhook đến các URL đã cấu hình
Nếu thanh toán thất bại:
Cập nhật trạng thái thanh toán thành FAILED
Cập nhật trạng thái đơn hàng thành CANCELED
Gửi webhook đến các URL đã cấu hình
Server trả về phản hồi cho VNPAY
4.3. Quy trình xử lý webhook
Khi thanh toán thành công hoặc thất bại, server lấy danh sách webhook URL từ cấu hình
Server gửi request POST đến các webhook URL với thông tin đơn hàng
Server ghi log kết quả gửi webhook
5. Cấu hình VNPAY
Các cấu hình VNPAY được lấy từ biến môi trường:

VNPAY_VERSION: Phiên bản API
VNPAY_COMMAND: Lệnh thanh toán
VNPAY_TMNCODE: Mã website của merchant
VNPAY_URL: URL thanh toán
VNPAY_API_URL: URL API
VNPAY_SECRET_KEY: Khóa bí mật để tạo chữ ký
VNPAY_VALID_IPS: Danh sách IP hợp lệ của VNPAY
VNPAY_RETURN_URL: URL trả về sau thanh toán
6. Các trạng thái thanh toán và đơn hàng
6.1. Trạng thái thanh toán (PaymentStatus)
PENDING: Đang chờ thanh toán
SUCCESS: Thanh toán thành công
FAILED: Thanh toán thất bại
6.2. Trạng thái đơn hàng (OrderStatusEnum)
PENDING (0): Đang chờ xử lý
CONFIRMED (1): Đã xác nhận
CANCELED (2): Đã hủy
7. Ví dụ sử dụng API
7.1. Tạo đơn hàng và thanh toán
// Request
POST /order/payment
Content-Type: application/json

{
  "fullName": "Nguyễn Văn A",
  "email": "nguyenvana@example.com",
  "phone": "0123456789",
  "telegram": "@nguyenvana",
  "birthday": "1990-01-01T00:00:00.000Z",
  "gender": "male",
  "address": "Hà Nội, Việt Nam",
  "programId": "1"
}

// Response
{
  "paymentUrl": "https://pay.vnpay.vn/vpcpay.html?..."
}

7.2. Kiểm tra trạng thái thanh toán
// Request
GET /order/payment-status/abc-123-def-456

// Response
{
  "status": 1
}

Đây là tổng quan về hệ thống thanh toán trong dự án của bạn. Hệ thống được thiết kế để xử lý thanh toán qua VNPAY, bao gồm việc tạo URL thanh toán, xử lý thông báo từ VNPAY, và cập nhật trạng thái đơn hàng tương ứng.


Task Completed
Tôi đã phân tích hệ thống thanh toán của dự án và cung cấp thông tin chi tiết về:

Các API Endpoint chính:
POST /order/payment - Tạo đơn hàng và tạo URL thanh toán VNPAY
GET /order/payment-status/:idx - Kiểm tra trạng thái thanh toán
GET /v1/payment/ipn - Nhận thông báo từ VNPAY khi thanh toán hoàn tất
GET /v1/payment - Endpoint test thanh toán (chỉ trong môi trường development)
Các field cần thiết:
Để tạo thanh toán: fullName, email, phone, telegram, birthday, address, programId
Để kiểm tra trạng thái: idx (mã đơn hàng)
Để xử lý IPN: Các tham số từ VNPAY như vnp_Amount, vnp_TxnRef, vnp_ResponseCode, vnp_SecureHash
Logic xử lý:
Tạo đơn hàng với trạng thái PENDING
Tạo URL thanh toán VNPAY và lưu thông tin thanh toán
Xử lý IPN từ VNPAY để cập nhật trạng thái thanh toán và đơn hàng
Gửi webhook khi thanh toán thành công hoặc thất bại
Hệ thống sử dụng VNPAY làm cổng thanh toán, với các trạng thái thanh toán (PENDING, SUCCESS, FAILED) và trạng thái đơn hàng (PENDING, CONFIRME