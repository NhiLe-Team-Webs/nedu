'use client'

import YouTube from 'react-youtube'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { courses } from '@/data/courses'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function Home() {
  const youtubeOpts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with YouTube Video */}
      <section className="bg-black py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
              <div className="absolute top-0 left-0 w-full h-full">
                <YouTube videoId="HJ1x2IRMoqM" opts={youtubeOpts} className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tagline */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-800">
            Người Việt, làm hàng Việt, cho người Việt
          </h2>
        </div>
      </section>

      {/* Upcoming Courses Carousel */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="https://nedu.nhi.sg/images/lachinhminh.png" alt="Là chính mình" className="w-full h-64 object-cover" />
              <div className="p-6">
                <span className="text-sm text-primary font-semibold">Sắp diễn ra</span>
                <h3 className="text-2xl font-bold mt-2 mb-2">Là chính mình</h3>
                <p className="text-gray-600 mb-4">10-13/09/2025</p>
                <Link href="/payment/57" className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-semibold transition">
                  Đăng ký ngay
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="https://nedu.nhi.sg/images/cuocsongcuaban.png" alt="Cuộc sống của bạn" className="w-full h-64 object-cover" />
              <div className="p-6">
                <span className="text-sm text-primary font-semibold">Sắp diễn ra</span>
                <h3 className="text-2xl font-bold mt-2 mb-2">Cuộc sống của bạn</h3>
                <p className="text-gray-600 mb-4">20, 21, 23 tháng 08 năm 2025</p>
                <Link href="/payment/54" className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-semibold transition">
                  Đăng ký ngay
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src="https://nedu.nhi.sg/images/thuonghieucuaban.png" alt="Thương hiệu của bạn" className="w-full h-64 object-cover" />
              <div className="p-6">
                <span className="text-sm text-primary font-semibold">Sắp diễn ra</span>
                <h3 className="text-2xl font-bold mt-2 mb-2">Thương hiệu của bạn</h3>
                <p className="text-gray-600 mb-4">14-17 tháng 8 năm 2025</p>
                <Link href="/payment/53" className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-semibold transition">
                  Đăng ký ngay
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/program" className="inline-block bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-semibold transition">
              Khám phá thêm
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800">
              <span className="text-primary">Mission</span>
            </h2>
            <h3 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-gray-700">Sứ mệnh</h3>

            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <img src="https://nedu.nhi.sg/images/quote.svg" alt="Quote" className="w-12 h-12 mb-4" />
                  <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6">
                    Mang kiến thức, giáo dục chất lượng trên toàn thế giới về Việt Nam và hòa hợp với văn hóa người Việt
                  </p>
                  <a href="https://www.nhi.sg/" className="text-primary hover:text-primary-dark font-semibold" target="_blank" rel="noopener noreferrer">
                    xem thêm →
                  </a>
                </div>
                <div className="flex-shrink-0">
                  <div className="text-center">
                    <img src="https://nedu.nhi.sg/images/nhile.png" alt="Nhi Le" className="w-48 h-48 rounded-full object-cover mx-auto mb-4 shadow-lg" />
                    <h4 className="text-xl font-bold text-gray-800">Nhi Le</h4>
                    <p className="text-gray-600">Doanh nhân</p>
                    <div className="flex justify-center space-x-3 mt-4">
                      <a href="https://www.linkedin.com/in/nhisg/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                        <img src="https://nedu.nhi.sg/images/linkedin.svg" alt="LinkedIn" className="w-6 h-6" />
                      </a>
                      <a href="https://www.facebook.com/nhile.sg" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                        <img src="https://nedu.nhi.sg/images/fb.svg" alt="Facebook" className="w-6 h-6" />
                      </a>
                      <a href="https://www.instagram.com/nhile.sg/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
                        <img src="https://nedu.nhi.sg/images/instagram.svg" alt="Instagram" className="w-6 h-6" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Carousel */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Khóa học <span className="text-primary">nổi bật</span>
          </h2>
          <div className="max-w-6xl mx-auto">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              }}
              className="courses-swiper pb-12"
            >
              {courses.map((course) => (
                <SwiperSlide key={course.id}>
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">
                    <div className="mb-4">
                      <img 
                        src={course.heroImage} 
                        alt={course.title} 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">{course.title}</h3>
                    <div className="mb-3">
                      {course.category.map((cat, index) => (
                        <span key={index} className="inline-block text-xs text-primary font-semibold mr-2">
                          #{cat}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 text-sm line-clamp-3 flex-grow">
                      {course.mission}
                    </p>
                    <div className="mb-4">
                      <p className="text-sm text-gray-600">
                        Chi phí: <span className="text-lg font-bold text-green-600">{course.price.amount} {course.price.currency}</span>
                      </p>
                    </div>
                    <Link 
                      href={`/program-${course.mode}/${course.slug}`} 
                      className="inline-block bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full font-semibold transition text-center"
                    >
                      Tìm hiểu thêm
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Bạn đang cần tư vấn thêm gì?</h2>
          <p className="text-xl mb-8">Hãy để n-edu hỗ trợ cho bạn</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            <span className="text-primary">Testimonials</span>
          </h2>
          <h3 className="text-2xl font-semibold text-center mb-12 text-gray-700">Cảm nhận từ học viên</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative pb-[56.25%] h-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full">
                  <YouTube videoId="Dm6gg-LHGqs" opts={youtubeOpts} className="w-full h-full" />
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-700">
                  Lần đầu Trang tham gia một chương trình của người Việt mà ấn tượng đến vậy. Cường độ học tập áp lực như môi trường doanh nhân thật sự.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative pb-[56.25%] h-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full">
                  <YouTube videoId="pTg5C528B5s" opts={youtubeOpts} className="w-full h-full" />
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-700">
                  Sau 6 tháng tham gia chương trình, mình đã học cách nhận diện và quản lý sự trì hoãn và tạo nên sự thay đổi rõ rệt.
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
                <p className="text-gray-700">
                  Cần ít nhất 3 năm đi vô đi ra lại cái lớp như vậy để các bạn có thể bắt đầu hiểu vấn đề và bạn thay đổi học phát triển bản thân
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/program" className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-semibold transition">
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </section>

      {/* Privileges */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            <span className="text-primary">Privilege</span>
          </h2>
          <h3 className="text-2xl font-semibold text-center mb-12 text-gray-700">Đặc quyền</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 shadow-lg">
              <h4 className="text-xl font-bold mb-3 text-gray-800">Tham gia cộng đồng N-Edu</h4>
              <p className="text-gray-700">
                Chúng tôi có sẵn một cộng đồng tích cực và đầy tiềm năng, nơi có những người cùng chí hướng sẵn lòng đồng hành và hỗ trợ lẫn nhau trong sự nghiệp và cuộc sống.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 shadow-lg">
              <h4 className="text-xl font-bold mb-3 text-gray-800">Học lại trọn đời</h4>
              <p className="text-gray-700">
                Sau khi học viên tốt nghiệp, bạn được quyền quay lại học khi có lớp và hoàn toàn miễn phí. Các chương trình của N-Edu luôn được cập nhật và nâng cấp theo những chuyển biến của thế giới.
              </p>
              <p className="text-sm text-gray-600 mt-2 italic">
                *Đọc thêm trong phần Điều khoản sử dụng ở Mục 7.6 để hiểu rõ.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-8 shadow-lg">
              <h4 className="text-xl font-bold mb-3 text-gray-800">Hỗ trợ sau khi học</h4>
              <p className="text-gray-700">
                Sau khi hoàn thành khóa học, học viên vẫn được hỗ trợ bởi đội ngũ giảng và chuyên gia để giải đáp thắc mắc hoặc giúp giải quyết các vấn đề thực tế.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 shadow-lg">
              <h4 className="text-xl font-bold mb-3 text-gray-800">hợp tác quốc tế</h4>
              <p className="text-gray-700">
                Mỗi năm chúng tôi có nhiều sự kiện và chương trình học trực tiếp, mở ra cơ hội gặp gỡ chuyên gia và học viên quốc tế.
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-8 shadow-lg">
              <h4 className="text-xl font-bold mb-3 text-gray-800">Cá nhân hóa lộ trình</h4>
              <p className="text-gray-700">
                Lựa chọn khóa học phù hợp với nhu cầu cá nhân đưa bạn nhanh đến điều bạn ước muốn.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-8 shadow-lg">
              <h4 className="text-xl font-bold mb-3 text-gray-800">đội ngũ hỗ trợ liên tục</h4>
              <p className="text-gray-700">
                Đội ngũ hỗ trợ của N-Edu luôn sẵn sàng giải đáp thắc mắc của bạn và đảm bảo những quyền lợi của bạn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
            <span className="text-primary">Partners</span>
          </h2>
          <h3 className="text-2xl font-semibold text-center mb-12 text-gray-700">30+ đối tác</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 max-w-6xl mx-auto items-center">
            <div className="flex items-center justify-center"><img src="https://nedu.nhi.sg/images/nlf.png" alt="Partner" className="w-full h-auto max-h-24 object-contain" /></div>
            <div className="flex items-center justify-center"><img src="https://nedu.nhi.sg/images/familycloud.jpg" alt="Partner" className="w-full h-auto max-h-24 object-contain rounded" /></div>
            <div className="flex items-center justify-center"><img src="https://nedu.nhi.sg/images/S&W_avatar-1.jpg" alt="Partner" className="w-full h-auto max-h-24 object-contain rounded" /></div>
            <div className="flex items-center justify-center"><img src="https://nedu.nhi.sg/images/photo_6073197126956990329_y.jpg" alt="Partner" className="w-full h-auto max-h-24 object-contain rounded" /></div>
            <div className="flex items-center justify-center"><img src="https://nedu.nhi.sg/images/thisishome.jpg" alt="Partner" className="w-full h-auto max-h-24 object-contain rounded" /></div>
            <div className="flex items-center justify-center"><img src="https://nedu.nhi.sg/images/XFactor_Method_Logo_-_Blue.png" alt="Partner" className="w-full h-auto max-h-24 object-contain" /></div>
            <div className="flex items-center justify-center"><img src="https://nedu.nhi.sg/images/nlt.png" alt="Partner" className="w-full h-auto max-h-24 object-contain" /></div>
            <div className="flex items-center justify-center"><img src="https://nedu.nhi.sg/images/Soniche.png" alt="Partner" className="w-full h-auto max-h-24 object-contain" /></div>
            <div className="flex items-center justify-center"><img src="https://nedu.nhi.sg/images/hush.jpg" alt="Partner" className="w-full h-auto max-h-24 object-contain rounded" /></div>
            <div className="flex items-center justify-center"><img src="https://nedu.nhi.sg/images/MsNhi_Logo.png" alt="Partner" className="w-full h-auto max-h-24 object-contain" /></div>
            <div className="flex items-center justify-center"><img src="https://nedu.nhi.sg/images/meta.jpg" alt="Partner" className="w-full h-auto max-h-24 object-contain rounded" /></div>
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Kết nối cùng N-Edu</h2>
          <p className="text-center text-gray-600 mb-12">Để cập nhật thông tin mới nhất từ các khóa học</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {[
              'p2.jpg',
              'p1.jpg',
              'nhile.jpg',
              'mel.jpg',
              'p3.jpg',
              'pauline.jpg'
            ].map((img, index) => (
              <a 
                key={index}
                href="https://www.instagram.com/p/DAYE0pPTq7F/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group overflow-hidden rounded-lg aspect-square"
              >
                <img 
                  src={`https://nedu.nhi.sg/images/${img}`}
                  alt="Instagram post"
                  className="w-full h-full object-cover transition group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition flex items-center justify-center">
                  <img src="https://nedu.nhi.sg/images/ig.svg" alt="Instagram" className="w-8 h-8 opacity-0 group-hover:opacity-100 transition" />
                </div>
              </a>
            ))}
          </div>

          <div className="flex justify-center space-x-8 mt-12">
            <a href="https://www.facebook.com/MsNhiSG" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-primary hover:text-primary-dark transition">
              <img src="https://nedu.nhi.sg/images/facebook.svg" alt="Facebook" className="w-8 h-8" />
              <span className="font-semibold">MsNhiSG</span>
            </a>
            <a href="https://www.instagram.com/msnhi_podcast" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-primary hover:text-primary-dark transition">
              <img src="https://nedu.nhi.sg/images/instagram_1.svg" alt="Instagram" className="w-8 h-8" />
              <span className="font-semibold">msnhi_podcast</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
