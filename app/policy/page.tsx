'use client'

import Link from 'next/link'

export default function PolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 text-primary">Chính sách bảo mật</h1>
          
          <div className="space-y-6 sm:space-y-8">
            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">Giới thiệu</h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Tại N-Edu, chúng tôi cam kết bảo vệ thông tin cá nhân của bạn. Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng, và bảo vệ thông tin của bạn khi sử dụng dịch vụ của chúng tôi.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">Thông tin chúng tôi thu thập</h2>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Thông tin cá nhân:</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                    <li>Họ và tên</li>
                    <li>Email</li>
                    <li>Số điện thoại</li>
                    <li>Ngày sinh</li>
                    <li>Giới tính</li>
                    <li>Địa chỉ</li>
                    <li>Username Telegram</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Thông tin học tập:</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                    <li>Khóa học đã đăng ký</li>
                    <li>Tiến độ học tập</li>
                    <li>Kết quả bài kiểm tra</li>
                    <li>Thời gian tham gia</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Thông tin kỹ thuật:</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                    <li>Địa chỉ IP</li>
                    <li>Loại trình duyệt</li>
                    <li>Thiết bị sử dụng</li>
                    <li>Dữ liệu truy cập website</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">Mục đích sử dụng thông tin</h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary/20 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 mt-1">
                    <span className="text-xs text-primary font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base">Cung cấp dịch vụ giáo dục và hỗ trợ học tập</p>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary/20 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 mt-1">
                    <span className="text-xs text-primary font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base">Gửi thông tin về khóa học và sự kiện</p>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary/20 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 mt-1">
                    <span className="text-xs text-primary font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base">Cải thiện chất lượng dịch vụ</p>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary/20 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 mt-1">
                    <span className="text-xs text-primary font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base">Xử lý thanh toán và xác nhận đăng ký</p>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary/20 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 mt-1">
                    <span className="text-xs text-primary font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base">Tuân thủ quy định pháp luật</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">Bảo mật thông tin</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
                <h3 className="font-semibold mb-3 text-blue-800 text-sm sm:text-base">Các biện pháp bảo mật chúng tôi áp dụng:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 sm:space-y-2 text-sm sm:text-base">
                  <li>Mã hóa dữ liệu SSL/TLS cho tất cả kết nối</li>
                  <li>Phân quyền truy cập thông tin</li>
                  <li>Lưu trữ dữ liệu trên máy chủ bảo mật</li>
                  <li>Backup dữ liệu định kỳ</li>
                  <li>Quét bảo mật và cập nhật hệ thống thường xuyên</li>
                  <li>Đào tạo nhân viên về bảo mật thông tin</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">Chia sẻ thông tin</h2>
              <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
                Chúng tôi cam kết không bán, thuê, hoặc cho thuê thông tin cá nhân của bạn cho bên thứ ba. Thông tin chỉ được chia sẻ trong các trường hợp sau:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 sm:space-y-2 text-sm sm:text-base">
                <li>Khi có sự đồng ý của bạn</li>
                <li>Để cung cấp dịch vụ (đối tác thanh toán, logistics)</li>
                <li>Khi yêu cầu của cơ quan pháp luật có thẩm quyền</li>
                <li>Để bảo vệ quyền lợi và an toàn của người dùng</li>
                <li>Trong trường hợp sáp nhập, mua bán doanh nghiệp</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">Quyền của bạn</h2>
              <div className="space-y-3 sm:space-y-4">
                <div className="border rounded-lg p-3 sm:p-4">
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Quyền truy cập</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Bạn có quyền yêu cầu xem thông tin cá nhân mà chúng tôi lưu trữ về bạn.
                  </p>
                </div>

                <div className="border rounded-lg p-3 sm:p-4">
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Quyền chỉnh sửa</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Bạn có quyền yêu cầu cập nhật hoặc sửa đổi thông tin cá nhân không chính xác.
                  </p>
                </div>

                <div className="border rounded-lg p-3 sm:p-4">
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Quyền xóa</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Bạn có quyền yêu cầu xóa thông tin cá nhân trong các trường hợp được pháp luật cho phép.
                  </p>
                </div>

                <div className="border rounded-lg p-3 sm:p-4">
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Quyền phản đối</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Bạn có quyền phản đối việc xử lý thông tin cá nhân của mình.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">Cookie</h2>
              <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
                Website của chúng tôi sử dụng cookie để cải thiện trải nghiệm người dùng. Cookie giúp chúng tôi:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                <li>Nhớ thông tin đăng nhập</li>
                <li>Theo dõi tiến độ học tập</li>
                <li>Cá nhân hóa nội dung</li>
                <li>Phân tích lưu lượng truy cập</li>
              </ul>
              <p className="text-gray-700 mt-3 sm:mt-4 text-sm sm:text-base">
                Bạn có thể quản lý cookie trong cài đặt trình duyệt.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">Lưu trữ thông tin</h2>
              <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
                Chúng tôi lưu trữ thông tin cá nhân của bạn trong thời gian cần thiết để:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                <li>Cung cấp dịch vụ giáo dục</li>
                <li>Thực hiện các nghĩa vụ pháp lý</li>
                <li>Giải quyết tranh chấp</li>
                <li>Bảo vệ quyền lợi của các bên</li>
              </ul>
              <p className="text-gray-700 mt-3 sm:mt-4 text-sm sm:text-base">
                Thời gian lưu trữ cụ thể tùy thuộc vào loại thông tin và mục đích sử dụng.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">Thay đổi chính sách</h2>
              <p className="text-gray-700 text-sm sm:text-base">
                Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian. Mọi thay đổi sẽ được thông báo trên website và qua email cho người dùng đã đăng ký.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">Liên hệ</h2>
              <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
                  Nếu bạn có câu hỏi về chính sách bảo mật hoặc muốn thực hiện quyền của mình, vui lòng liên hệ:
                </p>
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  <div>
                    <p className="font-semibold text-sm sm:text-base">Email:</p>
                    <p className="text-primary text-sm sm:text-base">nedu@nhi.sg</p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">Điện thoại:</p>
                    <p className="text-primary text-sm sm:text-base">(+84) 789785904</p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">Địa chỉ:</p>
                    <p className="text-gray-600 text-sm sm:text-base">25 Lê Bá Trinh, Phường Hoà Cường Bắc, Quận Hải Châu, Đà Nẵng</p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">Mã số thuế:</p>
                    <p className="text-gray-600 text-sm sm:text-base">0317268736</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">Hiệu lực</h2>
              <p className="text-gray-700 text-sm sm:text-base">
                Chính sách bảo mật này có hiệu lực từ ngày 01/01/2024 và thay thế mọi chính sách bảo mật trước đó.
              </p>
            </section>
          </div>

          <div className="mt-6 sm:mt-8 text-center">
            <Link href="/" className="inline-block bg-primary hover:bg-primary-dark text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold transition text-sm sm:text-base">
              Quay lại trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}