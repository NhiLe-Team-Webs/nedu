'use client'

import Link from 'next/link'

export default function GuidePaymentPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">Hướng dẫn thanh toán</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">Các phương thức thanh toán</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <h3 className="text-xl font-semibold">Chuyển khoản ngân hàng</h3>
                  </div>
                  <p className="text-gray-600 mb-2">
                    Thực hiện chuyển khoản đến tài khoản:
                  </p>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="font-semibold">Ngân hàng: Vietcombank</p>
                    <p className="font-semibold">Số tài khoản: 1234567890</p>
                    <p className="font-semibold">Chủ tài khoản: CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ NHILE</p>
                  </div>
                </div>

                <div className="border rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <h3 className="text-xl font-semibold">Thanh toán qua VNPay</h3>
                  </div>
                  <p className="text-gray-600 mb-2">
                    Sử dụng cổng thanh toán VNPay an toàn và tiện lợi:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Quét mã QR</li>
                    <li>Thẻ tín dụng/Ghi nợ</li>
                    <li>Ví điện tử</li>
                  </ul>
                </div>

                <div className="border rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                      <span className="text-primary font-bold">3</span>
                    </div>
                    <h3 className="text-xl font-semibold">Thanh toán tại văn phòng</h3>
                  </div>
                  <p className="text-gray-600 mb-2">
                    Đến trực tiếp văn phòng của chúng tôi:
                  </p>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="font-semibold">Địa chỉ: 25 Lê Bá Trinh, Phường Hoà Cường Bắc, Quận Hải Châu, Đà Nẵng</p>
                    <p className="font-semibold">Điện thoại: (+84) 789785904</p>
                  </div>
                </div>

                <div className="border rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                      <span className="text-primary font-bold">4</span>
                    </div>
                    <h3 className="text-xl font-semibold">Thanh toán quốc tế</h3>
                  </div>
                  <p className="text-gray-600 mb-2">
                    Chuyển khoản quốc tế qua:
                  </p>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="font-semibold">SWIFT: VCBKVNVX</p>
                    <p className="font-semibold">IBAN: VCBV1234567890</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">Quy trình thanh toán</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Chọn khóa học</h3>
                    <p className="text-gray-600">Truy cập trang khóa học và nhấn "Đăng ký ngay"</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Điền thông tin</h3>
                    <p className="text-gray-600">Hoàn thành form đăng ký với thông tin cá nhân</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Chọn phương thức thanh toán</h3>
                    <p className="text-gray-600">Lựa chọn phương thức thanh toán phù hợp</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Hoàn tất thanh toán</h3>
                    <p className="text-gray-600">Thực hiện thanh toán và chờ xác nhận</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-sm font-bold">5</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Nhận xác nhận</h3>
                    <p className="text-gray-600">Nhận email xác nhận và thông tin khóa học</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">Chính sách hoàn tiền</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold mb-3 text-blue-800">Điều kiện hoàn tiền:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Hoàn tiền 100% nếu hủy trước 7 ngày kể từ ngày đăng ký</li>
                  <li>Hoàn tiền 50% nếu hủy trong vòng 7 ngày trước khi khóa học bắt đầu</li>
                  <li>Không hoàn tiền nếu hủy trong vòng 7 ngày trước khi khóa học bắt đầu</li>
                  <li>Trường hợp đặc biệt sẽ được xem xét个案</li>
                </ul>
                <p className="mt-4 text-sm text-gray-600">
                  * Mọi yêu cầu hoàn tiền cần được gửi qua email: nedu@nhi.sg
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">Hỗ trợ thanh toán</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  Nếu bạn gặp bất kỳ khó khăn nào trong quá trình thanh toán, vui lòng liên hệ:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">Hotline:</p>
                    <p className="text-primary">(+84) 789785904</p>
                  </div>
                  <div>
                    <p className="font-semibold">Email:</p>
                    <p className="text-primary">nedu@nhi.sg</p>
                  </div>
                  <div>
                    <p className="font-semibold">Telegram:</p>
                    <p className="text-primary">@neducationvn</p>
                  </div>
                  <div>
                    <p className="font-semibold">Giờ làm việc:</p>
                    <p className="text-gray-600">Thứ 2 - Thứ 6: 8:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">Câu hỏi thường gặp</h2>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Tôi có thể trả góp không?</h3>
                  <p className="text-gray-600">
                    Có, chúng tôi hỗ trợ trả góp 0% qua các đối tác tài chính. Vui lòng liên hệ để biết chi tiết.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Thanh toán có an toàn không?</h3>
                  <p className="text-gray-600">
                    Hoàn toàn an toàn. Chúng tôi sử dụng cổng thanh toán VNPay được cấp phép và mã hóa thông tin.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Tôi nhận được hóa đơn gì sau khi thanh toán?</h3>
                  <p className="text-gray-600">
                    Bạn sẽ nhận được hóa đơn điện tử qua email và có thể yêu cầu hóa đơn giấy nếu cần.
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-8 text-center">
            <Link href="/program" className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-semibold transition">
              Quay lại khóa học
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}