import Link from 'next/link'

export default function Challenge30DaysPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
            THỬ THÁCH 30 NGÀY
          </h1>
          <p className="text-2xl text-gray-800 mb-2">Chủ đề Tháng 11: Sáng tạo nội dung</p>
          <p className="text-gray-600 mb-4">Giá hạn mỗi tháng: <span className="text-3xl font-bold text-green-600">396.000</span> VNĐ</p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdFUBpOdZTswjw0mraKvyBW0bU5AGK9hrZYatNC2K3gnpQJdQ/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-semibold transition text-lg"
          >
            ĐĂNG KÝ NGAY
          </a>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-12 text-center">
            <img src="https://nedu.nhi.sg/images/nedu.svg" alt="N-Edu" className="h-16 mx-auto mb-8" />
            <img src="https://nedu.nhi.sg/images/tt30ngay-bg.png" alt="30 Days Challenge" className="w-full rounded-lg shadow-lg mb-8" />
          </div>

          <div className="prose max-w-none mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Nhi đây, có ai học kiến thức của Nhi xong bỏ vô góc trì hoãn không làm không? Nhi quyết định tạo ra Thử Thách 30 Ngày để đồng hành cùng các bạn bắt đầu tạo thói quen tốt.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Năm 2025, Nhi muốn gần hơn với khán giả của Nhi, cùng các bạn, các em tạo ra nhiều thứ tốt đẹp hơn cho cuộc sống!
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 mb-12">
            <h2 className="text-3xl font-bold mb-4 text-primary">30 ngày có gì?</h2>
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Thử thách 30 ngày là gì?</h3>
            <p className="text-gray-700 mb-6">
              Đây là hành trình 30 ngày hành động liên tục dưới sự quan sát và thúc đẩy của Nhi Lê. Mỗi ngày, bạn nhận nhiệm vụ và cần hoàn thành, báo cáo kết quả trước 11h đêm trong nhóm học.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Bạn nhận được gì sau 30 ngày</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-primary font-bold mr-2">-</span>
                <div>
                  <strong>Rèn luyện tính kỷ luật:</strong> Bứt phá cùng Nhi Lê và kỷ luật liên tục.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-2">-</span>
                <div>
                  <strong>Tính tự giác và chủ động:</strong> Tạo thói quen hành động NGAY LẬP TỨC.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-2">-</span>
                <div>
                  <strong>Nhiệt huyết:</strong> Được tiếp "lửa" mỗi ngày cùng Nhi Lê.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-2">-</span>
                <div>
                  <strong>Tham gia cộng đồng cùng chí hướng:</strong> Môi trường tốt tạo "bàn đạp" cho mọi sự khởi đầu.
                </div>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold mb-4 mt-6 text-gray-800">Ai nên tham gia?</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-primary font-bold mr-2">-</span>
                <span>Những ai đang trì hoãn, thiếu động lực và muốn thay đổi bản thân.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-2">-</span>
                <span>Người đang tìm kiếm môi trường để phát triển bản thân.</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-2">-</span>
                <span>Người muốn học hoặc muốn nâng cấp các kỹ năng.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold mb-4 text-primary text-center">Người dẫn đường</h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <img src="https://nedu.nhi.sg/images/6M0A6064.jpg" alt="Tuyet Mai" className="w-48 h-48 rounded-full object-cover shadow-lg" />
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">TUYET MAI</h3>
                <p className="text-gray-600 mb-4">Nhà sáng tạo nội dung</p>
                <p className="text-gray-700 mb-4">
                  <strong>Hơn 3 năm kinh nghiệm</strong> trong lĩnh vực Sáng tạo nội dung (Content) và Xây dựng kênh cá nhân
                </p>
                <div className="flex space-x-3">
                  <a href="https://www.linkedin.com/in/nhisg/" target="_blank" rel="noopener noreferrer">
                    <img src="https://nedu.nhi.sg/images/linkedin.svg" alt="LinkedIn" className="w-6 h-6" />
                  </a>
                  <a href="https://www.facebook.com/nhile.sg" target="_blank" rel="noopener noreferrer">
                    <img src="https://nedu.nhi.sg/images/fb.svg" alt="Facebook" className="w-6 h-6" />
                  </a>
                  <a href="https://www.instagram.com/nhile.sg/" target="_blank" rel="noopener noreferrer">
                    <img src="https://nedu.nhi.sg/images/instagram.svg" alt="Instagram" className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary text-center">Thông tin khóa học</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600 mb-1">Chủ đề:</p>
                <p className="font-semibold text-lg">Sáng tạo nội dung</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Thời gian:</p>
                <p className="font-semibold text-lg">28/10/2025 - 28/11/2025</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Người dẫn đường:</p>
                <p className="font-semibold text-lg">Tuyết Mai</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Hình thức:</p>
                <p className="font-semibold text-lg">Mỗi ngày thực hiện thử thách được giao trong nhóm chat</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Địa điểm học:</p>
                <p className="font-semibold text-lg">Online qua nhóm chat</p>
              </div>
            </div>

            <div className="text-center mt-8">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdFUBpOdZTswjw0mraKvyBW0bU5AGK9hrZYatNC2K3gnpQJdQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-semibold transition"
              >
                Đăng ký ngay
              </a>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Đơn vị tổ chức và vận hành</h3>
            <div className="flex justify-center items-center space-x-8 mb-8">
              <img src="https://nedu.nhi.sg/images/nedu.svg" alt="N-Edu" className="h-12" />
              <img src="https://nedu.nhi.sg/images/nlt.png" alt="NLT" className="h-12" />
            </div>
            <div className="flex justify-center space-x-8">
              <a href="https://www.facebook.com/MsNhiSG" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-primary hover:text-primary-dark">
                <img src="https://nedu.nhi.sg/images/facebook.svg" alt="Facebook" className="w-8 h-8" />
                <span className="font-semibold">MsNhiSG</span>
              </a>
              <a href="https://www.instagram.com/msnhi_podcast" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-primary hover:text-primary-dark">
                <img src="https://nedu.nhi.sg/images/instagram_1.svg" alt="Instagram" className="w-8 h-8" />
                <span className="font-semibold">msnhi_podcast</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
