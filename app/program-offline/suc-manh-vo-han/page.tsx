'use client'

import Link from 'next/link'
import YouTube from 'react-youtube'

export default function SucManhVoHanPage() {
  const youtubeOpts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="py-8 bg-gradient-to-br from-amber-100 to-orange-100">
        <div className="container mx-auto px-4">
          <img src="https://nedu.nhi.sg/images/lachinhminh.png" alt="Sức Mạnh Vô Hạn" className="w-full max-w-4xl mx-auto rounded-lg shadow-xl" />
        </div>
      </section>

      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-primary font-semibold mb-2">KHÓA HỌC OFFLINE</p>
          <div className="flex justify-center space-x-4 mb-4">
            <span className="bg-primary/10 text-primary px-4 py-1 rounded-full font-semibold">Doanh nhân</span>
            <span className="bg-primary/10 text-primary px-4 py-1 rounded-full font-semibold">Doanh nghiệp</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Sức mạnh vô hạn</h1>
          <p className="text-gray-600 mb-2">Chi phí: <span className="text-3xl font-bold text-gray-800">23.960</span> USD</p>
          <p className="text-gray-600 mb-6">Đặt cọc: <span className="text-2xl font-bold text-green-600">180.000.000</span> VNĐ</p>
          <Link href="/payment/58" className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-semibold transition text-lg">
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
                <p className="font-semibold text-lg">Vận hành doanh nghiệp</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Thời gian học:</p>
                <p className="font-semibold text-lg">Tháng 4 năm 2026</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Người dẫn đường:</p>
                <p className="font-semibold text-lg">Mel x NhiLe</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Số buổi học:</p>
                <p className="font-semibold text-lg">6 tháng online và 4,5 ngày offline</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Địa điểm học:</p>
                <p className="font-semibold text-lg">Online qua Zoom và Offline tại khách sạn Mikazuki Đà Nẵng</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Số lượng học viên:</p>
                <p className="font-semibold text-lg">40 học viên</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 mb-12">
            <h2 className="text-3xl font-bold mb-4 text-primary">Sứ mệnh</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Sức Mạnh Vô Hạn được thiết kế để giúp doanh nhân Việt vươn tầm thế giới. Bằng cách kết nối với các Chuyên gia quốc tế, bạn sẽ học những chiến lược đột phá và xây dựng những nền tảng căn bản nhất cho doanh nghiệp, nâng cấp khả năng kinh doanh và mở rộng thị trường.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-primary text-center">Lời chứng thực</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative pb-[56.25%] h-0 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full">
                    <YouTube videoId="Dm6gg-LHGqs" opts={youtubeOpts} className="w-full h-full" />
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-700 text-sm">
                    Lần đầu Trang tham gia một chương trình của người Việt mà ấn tượng đến vậy. Cường độ học tập áp lực như môi trường doanh nhân thật sự.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative pb-[56.25%] h-0 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full">
                    <YouTube videoId="qEBZwBE449o" opts={youtubeOpts} className="w-full h-full" />
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-700 text-sm">
                    Bằng cấp kinh tế không đảm bảo bạn trở thành doanh nhân thành công. Muốn đi xa, bạn cần hơn cả kiến thức – đó là tư duy, chiến lược, đội nhóm phù hợp với chính mình.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative pb-[56.25%] h-0 overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full">
                    <YouTube videoId="RDKjAQLf5w0" opts={youtubeOpts} className="w-full h-full" />
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-700 text-sm">
                    Cần ít nhất 3 năm đi vô đi ra lại cái lớp như vậy để các bạn có thể bắt đầu hiểu vấn đề và bạn thay đổi học phát triển bản thân
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-primary text-center">Người dẫn đường</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <img src="https://nedu.nhi.sg/images/nhile_1.jpg" alt="NhiLe" className="w-32 h-32 rounded-full object-cover mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-center mb-2">NhiLe</h3>
                <p className="text-gray-600 text-center mb-4">Doanh nhân</p>
                <div className="flex justify-center space-x-3 mb-4">
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
                <p className="text-sm text-gray-700">
                  15 năm kinh nghiệm trên thương trường tại Singapore và Việt Nam. Hơn 6 năm truyền cảm hứng và giúp nhiều người làm chủ cuộc đời qua các chương trình đào tạo.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <img src="https://nedu.nhi.sg/images/mel_1.jpg" alt="Mel" className="w-32 h-32 rounded-full object-cover mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-center mb-2">Mel</h3>
                <p className="text-gray-600 text-center mb-4">Chuyên gia Marketing</p>
                <div className="flex justify-center space-x-3 mb-4">
                  <a href="https://www.facebook.com/@melvinsohonline" target="_blank" rel="noopener noreferrer">
                    <img src="https://nedu.nhi.sg/images/fb.svg" alt="Facebook" className="w-6 h-6" />
                  </a>
                  <a href="https://www.instagram.com/thegreatmelvinsoh" target="_blank" rel="noopener noreferrer">
                    <img src="https://nedu.nhi.sg/images/instagram.svg" alt="Instagram" className="w-6 h-6" />
                  </a>
                </div>
                <p className="text-sm text-gray-700">
                  Melvin Soh, chuyên gia marketing hàng đầu châu Á, nổi tiếng với hơn 15 năm kinh nghiệm thực chiến trong xây dựng thương hiệu và thu hút khách hàng.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/payment/58" className="inline-block bg-primary hover:bg-primary-dark text-white px-12 py-4 rounded-full font-semibold transition text-lg">
              ĐĂNG KÝ NGAY
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
