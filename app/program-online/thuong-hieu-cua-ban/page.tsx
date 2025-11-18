"use client";

import Link from "next/link";
import CourseHeader from "@/components/CourseHeader";
import Instructor from "@/components/Instructor";
import Whom from "@/components/Whom";
import Testimonials from "@/app/Testimonials";
import CourseInfo from "@/components/CourseInfo";
import Organizers from "@/components/Organizers";

export default function ThuongHieuCuaBanPage() {
  const instructors = [
    {
      name: "NhiLe",
      profession: ["Doanh nhân"],
      bio: "Nhi Lê là một doanh nhân, nhà giáo dục và nhà sáng tạo nội dung người Việt Nam. Cô được biết đến là người đầu tiên đưa chủ đề tâm lý học bằng tiếng Việt lên nền tảng YouTube và là người sáng lập nhiều dự án văn hóa - giáo dục có ảnh hưởng tại Việt Nam. Hiện cô đang sinh sống và làm việc tại Singapore.",
      image: "https://nedu.nhi.sg/images/nhile_1.jpg",
      education:
        'Nhi Lê tốt nghiệp chuyên ngành Tâm lý học (Diploma in Psychology) tại Kaplan Singapore. Ngoài ra, cô còn sở hữu nhiều chứng chỉ chuyên sâu khác như "Lãnh đạo Kiên cường & Kinh doanh Bền vững" (Resilient Leadership & Business Sustainability) và Chứng chỉ Điều hành về Khoa học Hành vi Ứng dụng (Executive Certificate in Applied Behavioural Science) tại Đại học Quản lý Singapore (SMU).',
      career:
        "Nhi Lê hoạt động trong nhiều lĩnh vực, từ kinh doanh, giáo dục đến sáng tạo nội dung. Cô là người có tầm ảnh hưởng trong việc chia sẻ kiến thức về tâm lý học và kỹ năng sống cho thế hệ trẻ.",
      achievements: [
        {
          date: "2025-04",
          description: "Vinh danh với giải thưởng HER Courage Awards 2025.",
        },
        {
          date: "2025-08",
          description:
            "Người phụ nữ Việt Nam đầu tiên xuất hiện trên blog chính thức của YouTube toàn cầu.",
        },
      ],
      projects: [
        {
          title: "Kênh YouTube Nhi Le",
          description:
            "Kênh tiên phong chia sẻ kiến thức tâm lý học bằng tiếng Việt.",
        },
        {
          title: "Cộng đồng NhiLe Team",
          description: "Đào tạo nghề và kỹ năng cần thiết cho giới trẻ.",
        },
        {
          title: "Quỹ NhiLe Foundation",
          description: "Tổ chức phi lợi nhuận hỗ trợ trẻ em Việt Nam.",
        },
        {
          title: "Podcast Ms Nhi và This is Home",
          description: "Kết nối thế hệ trẻ với doanh nhân, nghệ nhân Việt Nam.",
        },
      ],
    },
  ];
  const whomItems = [
    {
      icon: "Sprout",
      heading: "Sinh viên & người mới đi làm",
      description:
        "Trang bị nền tảng thực tế để hiểu rõ AI dùng trong công việc viết – trình bày – giao tiếp, mở ra cơ hội phát triển sớm trong môi trường chuyên nghiệp.",
    },
    {
      icon: "Recycle",
      heading: "Người muốn chuyển ngành",
      description:
        "Khóa học phù hợp cho những ai muốn khám phá tiềm năng AI để ứng dụng trong công việc mới như marketing, truyền thông, quản lý, nhân sự...",
    },
    {
      icon: "Split",
      heading: "Người mới bắt đầu học AI",
      description:
        "Không cần nền tảng kỹ thuật – chỉ cần bạn tò mò, ham học hỏi và muốn dùng AI một cách thực tế để nâng cấp kỹ năng và tăng năng suất cá nhân.",
    },
  ];
  const testimonials = {
    videos: [
      "https://www.youtube.com/embed/PFWDwSf5EGc",
      "https://www.youtube.com/embed/RAaXaJxFXpE",
      "https://www.youtube.com/embed/8qq6WDQFFQk",
    ],
    captions: [
      "Tâm cơ cực kỳ hào hứng để có thể chia sẻ với tất cả các bạn những cái trải nghiệm vừa rồi về 5 bài test thông dụng để xác định một người nào đó có những cái đặc tính nào nổi trội",
      "Nhưng mà trước khi mà các bạn muốn yêu một ai đó một cách đúng ấy thì các bạn phải yêu bản thân mình một cách đúng trước đã",
      "Một cái khá là hay trong cái khóa học lần này là Nhi Lê cho các bạn những cái bài test những cái câu hỏi những cái công cụ để các bạn có thể xác định được cái chỉ số của mình",
    ],
    title: "Testimonials",
    subtitle: "Lời chứng thực",
    buttonText: "Đăng ký ngay",
    buttonLink: "/testimonials",
  };
  return (
    <div className="min-h-screen bg-white">
<<<<<<< HEAD
      <CourseHeader
        imageUrl_bot="https://youtu.be/NtNTPMODvb"
        altText="Thương hiệu của bạn"
        time="KHÓA HỌC ONLINE"
        tags={["Thương hiệu"]}
        title="Thương hiệu của bạn"
        cost="18.960.000"
        paymentLink="/payment/53"
        description="Kiến thức cơ bản nhất cho người muốn bắt đầu mở doanh nghiệp hay cải tổ doanh nghiệp gia đình. Định hình rõ hơn kinh doanh của bạn trong chỉ 4 ngày với khóa học Thương Hiệu Của Bạn - một chương trình được thiết kế đặc biệt cho chủ doanh nghiệp trong kỷ nguyên AI."
      />
      <Instructor instructors={instructors} />
      <Whom title="Ai nên tham gia khóa học này?" items={whomItems} />
      <Testimonials testimonials={testimonials} />
      <CourseInfo
        title="THÔNG TIN KHÓA HỌC"
        buttonText="ĐĂNG KÝ NGAY"
        buttonLink="/payment/57"
        details={[
          {
            icon: "Star",
            label: "Chủ đề:",
            value: "Phát triển bản thân và khám phá nội tâm",
          },
          { icon: "Clock", label: "Thời gian học:", value: "10-13/09/2025" },
          {
            icon: "MapPin",
            label: "Người dẫn đường:",
            value: "NhiLe x Guest Instructors",
          },
          { icon: "Calendar", label: "Số buổi học:", value: "3,5 ngày" },
          {
            icon: "House",
            label: "Địa điểm học:",
            value: "Offline tại địa điểm sẽ thông báo",
          },
          { icon: "Users", label: "Số lượng học viên:", value: "Giới hạn" },
        ]}
      />
      <Organizers />
=======
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
            <Link href="/payment/53" className="inline-block bg-primary hover:bg-primary-dark text-white px-12 py-4 rounded-full font-semibold transition text-lg">
              ĐĂNG KÝ NGAY
            </Link>
          </div>
        </div>
      </section>
>>>>>>> 8f31e5b2135d2ec6e60043fad49e4c7dfb62a595
    </div>
  );
}
