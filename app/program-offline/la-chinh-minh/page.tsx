'use client'

import Link from 'next/link'
import YouTube from 'react-youtube'

export default function LaChinhMinhPage() {
  const youtubeOpts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="py-8 bg-gradient-to-br from-green-100 to-blue-100">
        <div className="container mx-auto px-4">
          <img src="https://nedu.nhi.sg/images/lachinhminh.png" alt="Là chính mình" className="w-full max-w-4xl mx-auto rounded-lg shadow-xl" />
        </div>
      </section>

      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-primary font-semibold mb-2">KHÓA HỌC OFFLINE</p>
          <div className="flex justify-center space-x-4 mb-4">
            <span className="bg-primary/10 text-primary px-4 py-1 rounded-full font-semibold">Phát triển bản thân</span>
            <span className="bg-primary/10 text-primary px-4 py-1 rounded-full font-semibold">Là chính mình</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Là chính mình 3</h1>
          <p className="text-gray-600 mb-2">Chi phí: <span className="text-3xl font-bold text-gray-800">Liên hệ</span></p>
          <Link href="/payment/57" className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-semibold transition text-lg">
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
                <p className="font-semibold text-lg">Phát triển bản thân và khám phá nội tâm</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Thời gian học:</p>
                <p className="font-semibold text-lg">10-13/09/2025</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Người dẫn đường:</p>
                <p className="font-semibold text-lg">NhiLe x Guest Instructors</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Số buổi học:</p>
                <p className="font-semibold text-lg">3,5 ngày</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Địa điểm học:</p>
                <p className="font-semibold text-lg">Offline tại địa điểm sẽ thông báo</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Số lượng học viên:</p>
                <p className="font-semibold text-lg">Giới hạn</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 mb-12">
            <h2 className="text-3xl font-bold mb-4 text-primary">Sứ mệnh</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Là chính mình được thiết kế để giúp bạn tìm thấy và sống thật với con người thật của mình. Ba ngày học trực tiếp với những Người dẫn đường Quốc tế, nơi nhìn rõ cảm xúc của chính bạn và khai mở những khúc mắc - thứ cản bước bạn sống một cuộc đời đáng sống.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-primary text-center">Hành trình khám phá</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary font-bold text-lg">1</span>
                  </div>
                  <h3 className="text-xl font-semibold">Nhận diện bản thể</h3>
                </div>
                <p className="text-gray-600">
                  Khám phá con người thật ẩn sâu bên trong bạn
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary font-bold text-lg">2</span>
                  </div>
                  <h3 className="text-xl font-semibold">Giải phóng cảm xúc</h3>
                </div>
                <p className="text-gray-600">
                  Học cách đối mặt và giải tỏa những cảm xúc bị kìm nén
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary font-bold text-lg">3</span>
                  </div>
                  <h3 className="text-xl font-semibold">Tái tạo cuộc sống</h3>
                </div>
                <p className="text-gray-600">
                  Xây dựng cuộc sống mới dựa trên sự thật bên trong
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-primary text-center">Lời chứng thực</h2>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative pb-[56.25%] h-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full">
                  <YouTube videoId="HJ1x2IRMoqM" opts={youtubeOpts} className="w-full h-full" />
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 text-lg text-center italic">
                  "Bạn Thực Sự Là Ai?" - Hành trình khám phá bản thân đầy cảm hứng
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-primary text-center">Người dẫn đường</h2>
            
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
              <img src="https://nedu.nhi.sg/images/nhile_1.jpg" alt="NhiLe" className="w-32 h-32 rounded-full object-cover mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-center mb-2">NhiLe</h3>
              <p className="text-gray-600 text-center mb-4">Doanh nhân & Nhà tâm lý học</p>
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
                15 năm kinh nghiệm trên thương trường tại Singapore và Việt Nam. Hơn 6 năm truyền cảm hứng và giúp nhiều người làm chủ cuộc đời qua các chương trình đào tạo. Với văn bằng Tâm lý học và kinh nghiệm thực tế, NhiLe sẽ đồng hành cùng bạn trên hành trình khám phá và sống thật với chính mình.
              </p>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-primary text-center">Đặc quyền học viên</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-primary">🔄 Học lại trọn đời</h3>
                <p className="text-gray-700">
                  Quyền tham gia lại các lớp học tương tự trong tương lai
                </p>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-primary">🤝 Cộng đồng hỗ trợ</h3>
                <p className="text-gray-700">
                  Tham gia cộng đồng học viên N-Edu toàn quốc
                </p>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-primary">📚 Tài liệu độc quyền</h3>
                <p className="text-gray-700">
                  Nhận tài liệu và công cụ học tập suốt đời
                </p>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-primary">🌱 Hỗ trợ sau khóa học</h3>
                <p className="text-gray-700">
                  Được tư vấn và hỗ trợ sau khi hoàn thành khóa học
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link href="/payment/57" className="inline-block bg-primary hover:bg-primary-dark text-white px-12 py-4 rounded-full font-semibold transition text-lg">
              ĐĂNG KÝ NGAY
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}