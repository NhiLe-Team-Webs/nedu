'use client'

import Link from 'next/link'
import YouTube from 'react-youtube'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { courses } from '@/data/courses'

export default function ThuongHieuCuaBanPage() {
  const { addToCart } = useCart();
  const youtubeOpts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="py-8 bg-gradient-to-br from-orange-100 to-red-100">
        <div className="container mx-auto px-4">
          <img src="/picture/thuong_hieu_cua_ban.png" alt="Thương hiệu của bạn" className="w-full max-w-4xl mx-auto rounded-lg shadow-xl" />
        </div>
      </section>

      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-primary font-semibold mb-2">KHÓA HỌC ONLINE</p>
          <div className="flex justify-center space-x-4 mb-4">
            <span className="bg-primary/10 text-primary px-4 py-1 rounded-full font-semibold">Thương hiệu</span>
            <span className="bg-primary/10 text-primary px-4 py-1 rounded-full font-semibold">Doanh nghiệp</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Thương hiệu của bạn</h1>
          <p className="text-gray-600 mb-2">Chi phí: <span className="text-3xl font-bold text-gray-800">Liên hệ</span></p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                const course = courses.find(c => c.slug === "thuong-hieu-cua-ban");
                if (course) addToCart(course);
              }}
              className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-full font-semibold transition text-lg"
            >
              <ShoppingCart className="w-5 h-5" />
              Thêm vào giỏ hàng
            </button>
            <Link href="/payment/53" className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-semibold transition text-lg">
              ĐĂNG KÝ NGAY
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold mb-6 text-primary text-center">Thông tin khóa học</h2>
          <div className="bg-gray-50 rounded-xl p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600 mb-1">Chủ đề:</p>
                <p className="font-semibold text-lg">Xây dựng thương hiệu cá nhân và doanh nghiệp</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Thời gian học:</p>
                <p className="font-semibold text-lg">14-17 tháng 8 năm 2025</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Người dẫn đường:</p>
                <p className="font-semibold text-lg">NhiLe</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Số buổi học:</p>
                <p className="font-semibold text-lg">4 ngày</p>
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

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-8 mb-12">
            <h2 className="text-3xl font-bold mb-4 text-primary">Sứ mệnh</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Thương hiệu của bạn được thiết kế để giúp doanh nhân xây dựng nền tảng thương hiệu vững chắc. Khóa học cung cấp kiến thức cho doanh nhân bắt đầu mở doanh nghiệp hay cải tổ doanh nghiệp gia đình, giúp bạn tạo dựng thương hiệu độc đáo và bền vững.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-primary text-center">Nội dung khóa học</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary font-bold text-lg">1</span>
                  </div>
                  <h3 className="text-xl font-semibold">Nhận diện thương hiệu</h3>
                </div>
                <p className="text-gray-600">
                  Tìm ra giá trị cốt lõi và định vị thương hiệu độc đáo
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary font-bold text-lg">2</span>
                  </div>
                  <h3 className="text-xl font-semibold">Xây dựng câu chuyện thương hiệu</h3>
                </div>
                <p className="text-gray-600">
                  Kể câu chuyện thương hiệu hấp dẫn và kết nối với khách hàng
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary font-bold text-lg">3</span>
                  </div>
                  <h3 className="text-xl font-semibold">Marketing thương hiệu</h3>
                </div>
                <p className="text-gray-600">
                  Chiến lược marketing hiệu quả để lan tỏa thương hiệu
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary font-bold text-lg">4</span>
                  </div>
                  <h3 className="text-xl font-semibold">Quản trị thương hiệu</h3>
                </div>
                <p className="text-gray-600">
                  Duy trì và phát triển thương hiệu bền vững theo thời gian
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-primary text-center">Người dẫn đường</h2>
            
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
              <img src="/picture/nhile.jpg" alt="NhiLe" className="w-32 h-32 rounded-full object-cover mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-center mb-2">NhiLe</h3>
              <p className="text-gray-600 text-center mb-4">Doanh nhân</p>
              <div className="flex justify-center space-x-3 mb-4">
                <a href="https://www.linkedin.com/in/nhisg/" target="_blank" rel="noopener noreferrer">
                  <img src="/picture/linkedin-footer.svg" alt="LinkedIn" className="w-6 h-6" />
                </a>
                <a href="https://www.facebook.com/nhile.sg" target="_blank" rel="noopener noreferrer">
                  <img src="/picture/facebook-footer.svg" alt="Facebook" className="w-6 h-6" />
                </a>
                <a href="https://www.instagram.com/nhile.sg/" target="_blank" rel="noopener noreferrer">
                  <img src="/picture/instagram-footer.svg" alt="Instagram" className="w-6 h-6" />
                </a>
              </div>
              <p className="text-sm text-gray-700">
                15 năm kinh nghiệm trên thương trường tại Singapore và Việt Nam. Hơn 6 năm truyền cảm hứng và giúp nhiều người làm chủ cuộc đời qua các chương trình đào tạo. Chuyên gia về xây dựng thương hiệu cá nhân và doanh nghiệp.
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  const course = courses.find(c => c.slug === "thuong-hieu-cua-ban");
                  if (course) addToCart(course);
                }}
                className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-full font-semibold transition text-lg"
              >
                <ShoppingCart className="w-5 h-5" />
                Thêm vào giỏ hàng
              </button>
              <Link href="/payment/53" className="inline-block bg-primary hover:bg-primary-dark text-white px-12 py-4 rounded-full font-semibold transition text-lg">
                ĐĂNG KÝ NGAY
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}