'use client'

import Link from 'next/link'
import YouTube from 'react-youtube'

export default function GenAI101Page() {
  const youtubeOpts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="py-8 bg-gradient-to-br from-blue-100 to-purple-100">
        <div className="container mx-auto px-4">
          <img src="https://nedu.nhi.sg/images/thum_yt_1.png" alt="Gen AI 101" className="w-full max-w-4xl mx-auto rounded-lg shadow-xl" />
        </div>
      </section>

      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-primary font-semibold mb-2">KHÓA HỌC ONLINE</p>
          <div className="flex justify-center space-x-4 mb-4">
            <span className="bg-primary/10 text-primary px-4 py-1 rounded-full font-semibold">AI</span>
            <span className="bg-primary/10 text-primary px-4 py-1 rounded-full font-semibold">Phát triển kỹ năng số</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Gen AI 101</h1>
          <p className="text-gray-600 mb-2">Chi phí: <span className="text-3xl font-bold text-gray-800">Liên hệ</span></p>
          <Link href="/payment/53" className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-semibold transition text-lg">
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
                <p className="font-semibold text-lg">Trí tuệ nhân tạo cơ bản</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Thời gian học:</p>
                <p className="font-semibold text-lg">2 buổi</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Người dẫn đường:</p>
                <p className="font-semibold text-lg">Linda Hui</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Số buổi học:</p>
                <p className="font-semibold text-lg">2 buổi</p>
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

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 mb-12">
            <h2 className="text-3xl font-bold mb-4 text-primary">Sứ mệnh</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Gen AI 101 được thiết kế để giúp bạn làm quen với trí tuệ nhân tạo generative và ứng dụng thực tế trong công việc. Khóa học cung cấp kiến thức nền tảng về AI và cách sử dụng các công cụ AI hiệu quả để tăng năng suất.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-primary text-center">Lời chứng thực</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative pb-[56.25%] h-0 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full">
                    <YouTube videoId="pTg5C528B5s" opts={youtubeOpts} className="w-full h-full" />
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-700 text-sm">
                    04 điều đặc biệt của khóa AI mà bạn không nên bỏ lỡ. Khóa học cung cấp kiến thức thực tế và ứng dụng ngay lập tức.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary font-bold text-lg">1</span>
                  </div>
                  <h3 className="text-xl font-semibold">Kiến thức nền tảng</h3>
                </div>
                <p className="text-gray-600">
                  Hiểu rõ về Generative AI và các ứng dụng cơ bản
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary font-bold text-lg">2</span>
                  </div>
                  <h3 className="text-xl font-semibold">Thực hành trực tiếp</h3>
                </div>
                <p className="text-gray-600">
                  Hướng dẫn sử dụng các công cụ AI phổ biến
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-primary text-center">Người dẫn đường</h2>
            
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
              <img src="https://nedu.nhi.sg/images/linda_hui.jpg" alt="Linda Hui" className="w-32 h-32 rounded-full object-cover mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-center mb-2">Linda Hui</h3>
              <p className="text-gray-600 text-center mb-4">Chuyên gia AI</p>
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
                Chuyên gia về trí tuệ nhân tạo với nhiều năm kinh nghiệm trong việc áp dụng AI vào doanh nghiệp. Linda Hui đã giúp nhiều cá nhân và tổ chức tối ưu hóa quy trình làm việc bằng công nghệ AI.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link href="/payment/53" className="inline-block bg-primary hover:bg-primary-dark text-white px-12 py-4 rounded-full font-semibold transition text-lg">
              ĐĂNG KÝ NGAY
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}