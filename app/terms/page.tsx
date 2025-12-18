'use client'

import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F2F2F7] py-8 sm:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-ios-xl shadow-ios-card p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 text-primary">Điều khoản sử dụng</h1>

          <div className="space-y-6 sm:space-y-8">
            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">Chấp nhận điều khoản</h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Bằng cách truy cập và sử dụng website và dịch vụ của N-Edu, bạn đồng ý tuân thủ các điều khoản và điều kiện này. Nếu bạn không đồng ý với bất kỳ phần nào của điều khoản, vui lòng không sử dụng dịch vụ của chúng tôi.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">Định nghĩa</h2>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-sm sm:text-base">"N-Edu" hoặc "Chúng tôi":</p>
                  <p className="text-gray-600 text-sm sm:text-base">CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ NHILE, đơn vị vận hành nền tảng giáo dục.</p>
                </div>
                <div>
                  <p className="font-semibold text-sm sm:text-base">"Dịch vụ":</p>
                  <p className="text-gray-600 text-sm sm:text-base">Các khóa học, chương trình đào tạo và dịch vụ hỗ trợ do N-Edu cung cấp.</p>
                </div>
                <div>
                  <p className="font-semibold text-sm sm:text-base">"Người dùng" hoặc "Bạn":</p>
                  <p className="text-gray-600 text-sm sm:text-base">Cá nhân hoặc tổ chức sử dụng dịch vụ của N-Edu.</p>
                </div>
                <div>
                  <p className="font-semibold text-sm sm:text-base">"Nội dung":</p>
                  <p className="text-gray-600 text-sm sm:text-base">Tất cả tài liệu, video, bài giảng, thông tin được cung cấp qua dịch vụ.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">Đăng ký và tài khoản</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Yêu cầu đăng ký:</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                    <li>Cung cấp thông tin chính xác, đầy đủ và cập nhật</li>
                    <li>Đủ tuổi vị thành niên theo quy định pháp luật</li>
                    <li>Có năng lực hành vi dân sự đầy đủ</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Trách nhiệm tài khoản:</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                    <li>Bảo mật thông tin đăng nhập</li>
                    <li>Chịu trách nhiệm cho mọi hoạt động dưới tài khoản</li>
                    <li>Thông báo ngay khi phát hiện truy cập trái phép</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">Đăng ký khóa học</h2>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Quy trình đăng ký:</h3>
                  <ol className="list-decimal list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                    <li>Chọn khóa học phù hợp</li>
                    <li>Điền form đăng ký với thông tin chính xác</li>
                    <li>Hoàn tất thanh toán theo quy định</li>
                    <li>Nhận xác nhận đăng ký thành công</li>
                  </ol>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Điều kiện tham gia:</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                    <li>Hoàn đủ học phí trước khi khóa học bắt đầu</li>
                    <li>Có đủ điều kiện về chuyên môn (nếu có)</li>
                    <li>Cam kết tham gia đầy đủ các buổi học</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">Thanh toán</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Phương thức thanh toán:</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                    <li>Chuyển khoản ngân hàng</li>
                    <li>Thanh toán qua VNPay</li>
                    <li>Thanh toán tại văn phòng</li>
                    <li>Thanh toán quốc tế</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Chính sách hoàn tiền:</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                    <li>Hoàn 100% nếu hủy trước 7 ngày kể từ ngày đăng ký</li>
                    <li>Hoàn 50% nếu hủy trong vòng 7 ngày trước khi khóa học bắt đầu</li>
                    <li>Không hoàn tiền nếu hủy trong vòng 7 ngày trước khi khóa học bắt đầu</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">Quyền và nghĩa vụ của người dùng</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h3 className="font-semibold mb-3 text-green-700 text-sm sm:text-base">Quyền của bạn:</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                    <li>Truy cập nội dung khóa học đã đăng ký</li>
                    <li>Nhận chứng nhận hoàn thành khóa học</li>
                    <li>Học lại miễn phí khi có lớp mới</li>
                    <li>Nhận hỗ trợ từ đội ngũ N-Edu</li>
                    <li>Tham gia cộng đồng học viên</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-red-700 text-sm sm:text-base">Nghĩa vụ của bạn:</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                    <li>Tuân thủ lịch học và nội quy</li>
                    <li>Tôn trọng giảng viên và học viên khác</li>
                    <li>Không chia sẻ tài liệu học tập trái phép</li>
                    <li>Không sử dụng nội dung vi phạm bản quyền</li>
                    <li>Thanh toán đầy đủ và đúng hạn</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">Sở hữu trí tuệ</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-ios-lg p-4 sm:p-6">
                <h3 className="font-semibold mb-3 text-yellow-800 text-sm sm:text-base">Quy định về bản quyền:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 sm:space-y-2 text-sm sm:text-base">
                  <li>Tất cả nội dung khóa học thuộc sở hữu của N-Edu và các đối tác</li>
                  <li>Bạn được quyền sử dụng nội dung cho mục đích cá nhân học tập</li>
                  <li>Nghiêm cấm sao chép, phân phối, hoặc thương mại hóa nội dung</li>
                  <li>Vi phạm bản quyền có thể bị xử lý theo pháp luật</li>
                  <li>N-Edu có quyền sử dụng hình ảnh học viên cho mục đích marketing</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">Bảo mật thông tin</h2>
              <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
                Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn theo Chính sách bảo mật. Thông tin của bạn sẽ được:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                <li>Thu thập và sử dụng cho mục đích đã nêu rõ</li>
                <li>Bảo mật bằng các biện pháp kỹ thuật hiện đại</li>
                <li>Không chia sẻ với bên thứ ba mà không có sự đồng ý</li>
                <li>Lưu trữ trong thời gian cần thiết theo quy định</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">Hạn chế trách nhiệm</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">N-Edu không chịu trách nhiệm cho:</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                    <li>Kết quả học tập không đạt kỳ vọng</li>
                    <li>Thiệt hại do lỗi kỹ thuật ngoài tầm kiểm soát</li>
                    <li>Nội dung do bên thứ ba cung cấp</li>
                    <li>Mất mát cơ hội kinh doanh</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Trách nhiệm tối đa:</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Trong mọi trường hợp, trách nhiệm của N-Edu không vượt quá số tiền bạn đã thanh toán cho dịch vụ.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">Chấm dứt dịch vụ</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Trường hợp N-Edu có quyền chấm dứt:</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                    <li>Vi phạm điều khoản sử dụng</li>
                    <li>Cung cấp thông tin sai lệch</li>
                    <li>Hành vi gian lận hoặc không trung thực</li>
                    <li>Gây ảnh hưởng tiêu cực đến cộng đồng</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Quyền của người dùng:</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Bạn có quyền chấm dứt sử dụng dịch vụ bất cứ lúc nào, nhưng không được hoàn tiền theo chính sách đã nêu.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">Giải quyết tranh chấp</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Thương lượng:</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Mọi tranh chấp sẽ được giải quyết trước tiên bằng thương lượng, hòa giải giữa các bên.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Thẩm quyền:</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Trường hợp không thể thương lượng, tranh chấp sẽ được giải quyết tại Tòa án nhân dân có thẩm quyền tại Đà Nẵng.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Luật áp dụng:</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Điều khoản này được điều chỉnh theo pháp luật nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">Điều khoản chung</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1 sm:space-y-2 text-sm sm:text-base">
                <li>Điều khoản này thay thế mọi thỏa thuận trước đó giữa các bên</li>
                <li>Nếu bất kỳ điều khoản nào bị vô hiệu, các điều khoản còn lại vẫn có hiệu lực</li>
                <li>N-Edu có quyền thay đổi điều khoản và sẽ thông báo trước khi áp dụng</li>
                <li>Sự thay đổi có hiệu lực khi được đăng tải trên website</li>
                <li>Việc bạn tiếp tục sử dụng dịch vụ đồng nghĩa với việc chấp nhận thay đổi</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">Thông tin liên hệ</h2>
              <div className="bg-gray-50 rounded-ios-lg p-4 sm:p-6">
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  <div>
                    <p className="font-semibold text-sm sm:text-base">Công ty:</p>
                    <p className="text-gray-600 text-sm sm:text-base">CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ NHILE</p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">Mã số thuế:</p>
                    <p className="text-gray-600 text-sm sm:text-base">0317268736</p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">Địa chỉ:</p>
                    <p className="text-gray-600 text-sm sm:text-base">25 Lê Bá Trinh, Phường Hoà Cường Bắc, Quận Hải Châu, Đà Nẵng</p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">Email:</p>
                    <p className="text-primary text-sm sm:text-base">nedu@nhi.sg</p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">Điện thoại:</p>
                    <p className="text-primary text-sm sm:text-base">(+84) 789785904</p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">Website:</p>
                    <p className="text-primary text-sm sm:text-base">https://nedu.nhi.sg</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">Hiệu lực</h2>
              <p className="text-gray-700 text-sm sm:text-base">
                Điều khoản sử dụng này có hiệu lực từ ngày 01/01/2024 và áp dụng cho tất cả người dùng sử dụng dịch vụ của N-Edu.
              </p>
            </section>
          </div>

          <div className="mt-6 sm:mt-8 text-center">
            <Link href="/" className="inline-block bg-primary hover:bg-primary-dark text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-ios-sm ios-haptic-active text-sm sm:text-base">
              Quay lại trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}