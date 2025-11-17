'use client'

import Link from 'next/link'

export default function PolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">Chính sách bảo mật</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">Giới thiệu</h2>
              <p className="text-gray-700 leading-relaxed">
                Tại N-Edu, chúng tôi cam kết bảo vệ thông tin cá nhân của bạn. Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng, và bảo vệ thông tin của bạn khi sử dụng dịch vụ của chúng tôi.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">Thông tin chúng tôi thu thập</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Thông tin cá nhân:</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
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
                  <h3 className="font-semibold mb-2">Thông tin học tập:</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Khóa học đã đăng ký</li>
                    <li>Tiến độ học tập</li>
                    <li>Kết quả bài kiểm tra</li>
                    <li>Thời gian tham gia</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Thông tin kỹ thuật:</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Địa chỉ IP</li>
                    <li>Loại trình duyệt</li>
                    <li>Thiết bị sử dụng</li>
                    <li>Dữ liệu truy cập website</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">Mục đích sử dụng thông tin</h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                    <span className="text-xs text-primary font-bold">✓</span>
                  </div>
                  <p className="text-gray-700">Cung cấp dịch vụ giáo dục và hỗ trợ học tập</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                    <span className="text-xs text-primary font-bold">✓</span>
                  </div>
                  <p className="text-gray-700">Gửi thông tin về khóa học và sự kiện</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                    <span className="text-xs text-primary font-bold">✓</span>
                  </div>
                  <p className="text-gray-700">Cải thiện chất lượng dịch vụ</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                    <span className="text-xs text-primary font-bold">✓</span>
                  </div>
                  <p className="text-gray-700">Xử lý thanh toán và xác nhận đăng ký</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-1">
                    <span className="text-xs text-primary font-bold">✓</span>
                  </div>
                  <p className="text-gray-700">Tuân thủ quy định pháp luật</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">Bảo mật thông tin</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold mb-3 text-blue-800">Các biện pháp bảo mật chúng tôi áp dụng:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
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
              <h2 className="text-2xl font-bold mb-4 text-primary">Chia sẻ thông tin</h2>
              <p className="text-gray-700 mb-4">
                Chúng tôi cam kết không bán, thuê, hoặc cho thuê thông tin cá nhân của bạn cho bên thứ ba. Thông tin chỉ được chia sẻ trong các trường hợp sau:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Khi có sự đồng ý của bạn</li>
                <li>Để cung cấp dịch vụ (đối tác thanh toán, logistics)</li>
                <li>Khi yêu cầu của cơ quan pháp luật có thẩm quyền</li>
                <li>Để bảo vệ quyền lợi và an toàn của người dùng</li>
                <li>Trong trường hợp sáp nhập, mua bán doanh nghiệp</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">Quyền của bạn</h2>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Quyền truy cập</h3>
                  <p className="text-gray-600">
                    Bạn có quyền yêu cầu xem thông tin cá nhân mà chúng tôi lưu trữ về bạn.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Quyền chỉnh sửa</h3>
                  <p className="text-gray-600">
                    Bạn có quyền yêu cầu cập nhật hoặc sửa đổi thông tin cá nhân không chính xác.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Quyền xóa</h3>
                  <p className="text-gray-600">
                    Bạn có quyền yêu cầu xóa thông tin cá nhân trong các trường hợp được pháp luật cho phép.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Quyền phản đối</h3>
                  <p className="text-gray-600">
                    Bạn có quyền phản đối việc xử lý thông tin cá nhân của mình.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">Cookie</h2>
              <p className="text-gray-700 mb-4">
                Website của chúng tôi sử dụng cookie để cải thiện trải nghiệm người dùng. Cookie giúp chúng tôi:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Nhớ thông tin đăng nhập</li>
                <li>Theo dõi tiến độ học tập</li>
                <li>Cá nhân hóa nội dung</li>
                <li>Phân tích lưu lượng truy cập</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Bạn có thể quản lý cookie trong cài đặt trình duyệt.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">Lưu trữ thông tin</h2>
              <p className="text-gray-700 mb-4">
                Chúng tôi lưu trữ thông tin cá nhân của bạn trong thời gian cần thiết để:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Cung cấp dịch vụ giáo dục</li>
                <li>Thực hiện các nghĩa vụ pháp lý</li>
                <li>Giải quyết tranh chấp</li>
                <li>Bảo vệ quyền lợi của các bên</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Thời gian lưu trữ cụ thể tùy thuộc vào loại thông tin và mục đích sử dụng.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">Thay đổi chính sách</h2>
              <p className="text-gray-700">
                Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian. Mọi thay đổi sẽ được thông báo trên website và qua email cho người dùng đã đăng ký.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">Liên hệ</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  Nếu bạn có câu hỏi về chính sách bảo mật hoặc muốn thực hiện quyền của mình, vui lòng liên hệ:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">Email:</p>
                    <p className="text-primary">nedu@nhi.sg</p>
                  </div>
                  <div>
                    <p className="font-semibold">Điện thoại:</p>
                    <p className="text-primary">(+84) 789785904</p>
                  </div>
                  <div>
                    <p className="font-semibold">Địa chỉ:</p>
                    <p className="text-gray-600">25 Lê Bá Trinh, Phường Hoà Cường Bắc, Quận Hải Châu, Đà Nẵng</p>
                  </div>
                  <div>
                    <p className="font-semibold">Mã số thuế:</p>
                    <p className="text-gray-600">0317268736</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-primary">Hiệu lực</h2>
              <p className="text-gray-700">
                Chính sách bảo mật này có hiệu lực từ ngày 01/01/2024 và thay thế mọi chính sách bảo mật trước đó.
              </p>
            </section>
          </div>

          <div className="mt-8 text-center">
            <Link href="/" className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-semibold transition">
              Quay lại trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}