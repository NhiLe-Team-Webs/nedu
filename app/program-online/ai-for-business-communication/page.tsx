'use client'

import Link from 'next/link'
import YouTube from 'react-youtube'

export default function AIBusinessCommunicationPage() {
  const youtubeOpts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="py-8 bg-gradient-to-br from-purple-100 to-blue-100">
        <div className="container mx-auto px-4">
          <img src="https://nedu.nhi.sg/images/thum_yt_2.png" alt="AI for Business Communication" className="w-full max-w-4xl mx-auto rounded-lg shadow-xl" />
        </div>
      </section>

      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-primary font-semibold mb-2">KHÓA HỌC ONLINE</p>
          <div className="flex justify-center space-x-4 mb-4">
            <span className="bg-primary/10 text-primary px-4 py-1 rounded-full font-semibold">AI</span>
            <span className="bg-primary/10 text-primary px-4 py-1 rounded-full font-semibold">Giao tiếp kinh doanh</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">AI for Business Communication</h1>
          <p className="text-gray-600 mb-2">Chi phí: <span className="text-3xl font-bold text-gray-800">Liên hệ</span></p>
          <Link href="/payment/79" className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-semibold transition text-lg">
            ĐĂNG KÝ NGAY
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold mb-6 text-primary text-center">Thông tin khóa học</h2>
          <div className="bg-gray-50 rounded-xl p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600 mb-1">Chủ đề:</p>
                <p className="font-semibold text-lg">Ứng dụng AI trong giao tiếp kinh doanh</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Thời gian học:</p>
                <p className="font-semibold text-lg">3 buổi</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Người dẫn đường:</p>
                <p className="font-semibold text-lg">Linda Hui</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Số buổi học:</p>
                <p className="font-semibold text-lg">3 buổi</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Địa điểm học:</p>
                <p className="font-semibold text-lg">Online qua Zoom</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Số lượng học viên:</p>
                <p className="font-semibold text-lg">Không giới hạn</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 mb-12">
            <h2 className="text-3xl font-bold mb-4 text-primary">Sứ mệnh</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              AI for Business Communication được thiết kế để giúp các chuyên gia và doanh nghiệp tận dụng sức mạnh của AI trong việc tối ưu hóa giao tiếp và tương tác với khách hàng. Khóa học cung cấp công cụ và kỹ năng thực tế để ứng dụng AI vào công việc hàng ngày.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-primary text-center">Nội dung chính</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary font-bold text-lg">1</span>
                  </div>
                  <h3 className="text-xl font-semibold">AI trong Email Marketing</h3>
                </div>
                <p className="text-gray-600">
                  Sử dụng AI để viết email hiệu quả và cá nhân hóa
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary font-bold text-lg">2</span>
                  </div>
                  <h3 className="text-xl font-semibold">Chatbot và Customer Service</h3>
                </div>
                <p className="text-gray-600">
                  Xây dựng chatbot thông minh cho dịch vụ khách hàng
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary font-bold text-lg">3</span>
                  </div>
                  <h3 className="text-xl font-semibold">AI Content Creation</h3>
                </div>
                <p className="text-gray-600">
                  Tạo nội dung chất lượng cao với sự hỗ trợ của AI
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-primary text-center">Lợi ích khóa học</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-primary">⚡ Tăng hiệu suất</h3>
                <p className="text-gray-700">
                  Tự động hóa các tác vụ giao tiếp lặp đi lặp lại
                </p>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-primary">🎯 Cá nhân hóa</h3>
                <p className="text-gray-700">
                  Tạo ra thông điệp phù hợp với từng khách hàng
                </p>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-primary">📊 Phân tích dữ liệu</h3>
                <p className="text-gray-700">
                  Hiểu rõ hơn về hành vi và nhu cầu khách hàng
                </p>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-primary">💰 Tiết kiệm chi phí</h3>
                <p className="text-gray-700">
                  Giảm thiểu thời gian và nhân lực cho các công việc giao tiếp
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-primary text-center">Người dẫn đường</h2>
            
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
              <img src="https://nedu.nhi.sg/images/linda_hui.jpg" alt="Linda Hui" className="w-32 h-32 rounded-full object-cover mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-center mb-2">Linda Hui</h3>
              <p className="text-gray-600 text-center mb-4">Chuyên gia AI & Business Communication</p>
              <div className="flex justify-center space-x-3 mb-4">
                <a href="https://www.linkedin.com/in/linda-hui" target="_blank" rel="noopener noreferrer">
                  <img src="https://nedu.nhi.sg/images/linkedin.svg" alt="LinkedIn" className="w-6 h-6" />
                </a>
                <a href="https://www.facebook.com/linda.hui" target="_blank" rel="noopener noreferrer">
                  <img src="https://nedu.nhi.sg/images/fb.svg" alt="Facebook" className="w-6 h-6" />
                </a>
                <a href="https://www.instagram.com/linda.hui" target="_blank" rel="noopener noreferrer">
                  <img src="https://nedu.nhi.sg/images/instagram.svg" alt="Instagram" className="w-6 h-6" />
                </a>
              </div>
              <p className="text-sm text-gray-700">
                Chuyên gia về ứng dụng AI trong kinh doanh với nhiều năm kinh nghiệm triển khai các giải pháp AI cho doanh nghiệp. Linda Hui đã giúp nhiều tổ chức tối ưu hóa quy trình giao tiếp và tăng trưởng hiệu quả kinh doanh.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link href="/payment/79" className="inline-block bg-primary hover:bg-primary-dark text-white px-12 py-4 rounded-full font-semibold transition text-lg">
              ĐĂNG KÝ NGAY
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}