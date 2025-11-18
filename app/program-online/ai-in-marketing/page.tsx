'use client'

import Link from 'next/link'
import YouTube from 'react-youtube'

export default function AIInMarketingPage() {
  const youtubeOpts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="py-8 bg-gradient-to-br from-pink-100 to-purple-100">
        <div className="container mx-auto px-4">
          <img src="/picture/ai_in_mkt.png" alt="AI In Marketing" className="w-full max-w-4xl mx-auto rounded-lg shadow-xl" />
        </div>
      </section>

      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-primary font-semibold mb-2">KHÓA HỌC ONLINE</p>
          <div className="flex justify-center space-x-4 mb-4">
            <span className="bg-primary/10 text-primary px-4 py-1 rounded-full font-semibold">Marketing số</span>
            <span className="bg-primary/10 text-primary px-4 py-1 rounded-full font-semibold">AI</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">AI In Marketing</h1>
          <p className="text-gray-600 mb-2">Chi phí: <span className="text-3xl font-bold text-gray-800">Liên hệ</span></p>
          <Link href="/payment/80" className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-semibold transition text-lg">
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
                <p className="font-semibold text-lg">Ứng dụng AI trong Marketing hiện đại</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Thời gian học:</p>
                <p className="font-semibold text-lg">2 ngày</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Người dẫn đường:</p>
                <p className="font-semibold text-lg">Linda Hui</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Số buổi học:</p>
                <p className="font-semibold text-lg">2 ngày</p>
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

          <div className="bg-gradient-to-br from-pink-50 to-purple-100 rounded-xl p-8 mb-12">
            <h2 className="text-3xl font-bold mb-4 text-primary">Sứ mệnh</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              AI In Marketing được thiết kế để giúp các nhà marketing tiếp cận và ứng dụng công nghệ AI vào chiến lược marketing. Khóa học cung cấp kiến thức và kỹ năng thực tế để tối ưu hóa các chiến dịch marketing, tăng ROI và tạo ra trải nghiệm khách hàng vượt trội.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-primary text-center">Chương trình học</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary font-bold text-lg">1</span>
                  </div>
                  <h3 className="text-xl font-semibold">AI-powered Content Strategy</h3>
                </div>
                <p className="text-gray-600">
                  Xây dựng chiến lược nội dung thông minh với sự hỗ trợ của AI
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary font-bold text-lg">2</span>
                  </div>
                  <h3 className="text-xl font-semibold">Predictive Analytics</h3>
                </div>
                <p className="text-gray-600">
                  Dự đoán hành vi khách hàng và tối ưu hóa chiến dịch
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary font-bold text-lg">3</span>
                  </div>
                  <h3 className="text-xl font-semibold">Personalization at Scale</h3>
                </div>
                <p className="text-gray-600">
                  Cá nhân hóa trải nghiệm khách hàng hàng loạt
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary font-bold text-lg">4</span>
                  </div>
                  <h3 className="text-xl font-semibold">AI Tools Implementation</h3>
                </div>
                <p className="text-gray-600">
                  Thực hành với các công cụ AI marketing hàng đầu
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-primary text-center">Case Study thực tế</h2>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">300%</div>
                  <p className="text-gray-600">Tăng tỷ lệ chuyển đổi</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">50%</div>
                  <p className="text-gray-600">Giảm chi phí marketing</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                  <p className="text-gray-600">Tối ưu hóa tự động</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-primary text-center">Người dẫn đường</h2>
            
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
              <img src="/picture/nhile.jpg" alt="Linda Hui" className="w-32 h-32 rounded-full object-cover mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-center mb-2">Linda Hui</h3>
              <p className="text-gray-600 text-center mb-4">Chuyên gia AI Marketing</p>
              <div className="flex justify-center space-x-3 mb-4">
                <a href="https://www.linkedin.com/in/linda-hui" target="_blank" rel="noopener noreferrer">
                  <img src="/picture/linkedin-footer.svg" alt="LinkedIn" className="w-6 h-6" />
                </a>
                <a href="https://www.facebook.com/linda.hui" target="_blank" rel="noopener noreferrer">
                  <img src="/picture/facebook-footer.svg" alt="Facebook" className="w-6 h-6" />
                </a>
                <a href="https://www.instagram.com/linda.hui" target="_blank" rel="noopener noreferrer">
                  <img src="/picture/instagram-footer.svg" alt="Instagram" className="w-6 h-6" />
                </a>
              </div>
              <p className="text-sm text-gray-700">
                Chuyên gia hàng đầu về ứng dụng AI trong marketing với kinh nghiệm triển khai các chiến dịch AI thành công cho nhiều thương hiệu lớn. Linda Hui có chứng chỉ về AI in Marketing từ SMU và đã giúp nhiều doanh nghiệp tăng trưởng đột phá.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link href="/payment/80" className="inline-block bg-primary hover:bg-primary-dark text-white px-12 py-4 rounded-full font-semibold transition text-lg">
              ĐĂNG KÝ NGAY
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}