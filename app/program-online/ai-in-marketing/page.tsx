"use client";

<<<<<<< HEAD
import Link from "next/link";
import YouTube from "react-youtube";
import CourseHeader from "@/components/CourseHeader";
import Instructor from "@/components/Instructor";
import Whom from "@/components/Whom";
import Testimonials from "@/app/Testimonials";
import CourseInfo from "@/components/CourseInfo";
import Organizers from "@/components/Organizers";
=======
import Link from 'next/link'
import YouTube from 'react-youtube'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { courses } from '@/data/courses'
>>>>>>> origin/clean-main

export default function AIInMarketingPage() {
  const { addToCart } = useCart();
  const youtubeOpts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

    const instructors = [
    {
      name: "Linda Hui-Isaac",
      profession: ["Doanh nhân"],
      bio: "Linda Hui-Isaac là một Chiến lược gia Lãnh đạo về Xây dựng Thương hiệu & AI-Marketing (Branding & AI-Marketing Consultant Lead Trainer). Bà có hơn hai thập kỷ kinh nghiệm toàn cầu, chuyên tư vấn và đào tạo về các chiến lược tiếp thị kỹ thuật số hiệu quả.",
      image:
        "	https://nedu.nhi.sg/images/hi%CC%80nh_co%CC%82_linda.jpg?_wwcv=130",
      education: [
        "- Thạc sĩ Quản trị Kinh doanh Toàn cầu (MBA in Global Business) tại Coventry University (Anh).",
        "- Chứng chỉ Nâng cao về Học tập & Hiệu suất (Advanced Certificate in Learning & Performance) tại Institute of Adult Learning (IAL).",
      ],
      career:
        "Nhi Lê hoạt động trong nhiều lĩnh vực, từ kinh doanh, giáo dục đến sáng tạo nội dung. Cô là người có tầm ảnh hưởng trong việc chia sẻ kiến thức về tâm lý học và kỹ năng sống cho thế hệ trẻ.",
      achievements: [
        {
          title: "Kinh nghiệm toàn cầu",
          description:
            "Hơn 20 năm kinh nghiệm trong lĩnh vực Xây dựng Thương hiệu và AI-Marketing.",
        },
        {
          title: "Kinh nghiệm doanh nghiệp",
          description:
            "Tích lũy kinh nghiệm từ các công ty niêm yết trên SGX và các MNC thương hiệu xa xỉ Châu Âu.",
        },
        {
          title: "Đào tạo: Ngân hàng & Tài chính",
          description: "AIA, DBS, UOB, SAXO.",
        },
        {
          title: "Đào tạo: Truyền thông & Công nghệ",
          description: "AWS, SONY, NBCUniversal, Ricoh.",
        },
        {
          title: "Đào tạo: Chính phủ & Y tế",
          description: "GOVTech, ICA Singapore, Ministry of Health (MOH).",
        },
        {
          title: "Đào tạo: Giáo dục",
          description: "NUS, NTU, SMU Academy, Kaplan.",
        },
        {
          title: "Đào tạo: Dịch vụ Chuyên nghiệp",
          description: "BCG.",
        },
      ],
      projects: [
        {
          title: "Founder tại Crown Mercado Alliance Pte Ltd",
          description:
            "Bà đã tư vấn thành công cho nhiều Doanh nghiệp vừa và nhỏ (SME), Công ty đa quốc gia (MNC), và Cơ quan Chính phủ trong việc triển khai chiến lược tiếp thị kỹ thuật số.",
        },
        {
          title: "Huấn luyện viên Trưởng (Lead Trainer)",
          description:
            "Đã đào tạo hơn 5.000 học viên thuộc hơn 10 ngành nghề khác nhau. Các buổi đào tạo tập trung vào học tập thực hành và các chiến lược đổi mới.",
        },
        {
          title:
            "Chuyên môn: Chiến lược Kinh doanh & Tiếp thị Tăng cường bởi AI",
          description:
            "Tập trung vào ứng dụng AI trong chiến lược kinh doanh và marketing.",
        },
        {
          title: "Chuyên môn: Inbound Omni-Channel",
          description:
            "Xây dựng chiến lược tiếp thị đa kênh theo hướng inbound.",
        },
        {
          title: "Chuyên môn: Nội dung, SEO, SEM & Social Media",
          description:
            "Bao gồm xây dựng nội dung, tối ưu hóa tìm kiếm, quảng cáo và mạng xã hội.",
        },
        {
          title: "Chủ đề đào tạo",
          description: "AI trong Marketing, Quảng cáo TikTok.",
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
  const courseInfo = {
    title: "THÔNG TIN KHÓA HỌC",
    buttonText: "ĐĂNG KÝ NGAY",
    buttonLink: "/payment/57",
    details: [
      {
        icon: "Star",
        label: "Chủ đề:",
        value: "AI",
      },
      {
        icon: "Clock",
        label: "Thời gian học:",
        value: "28-29 tháng 7 năm 2025",
      },
      {
        icon: "MapPin",
        label: "Người dẫn đường:",
        value: "Linda Hui-Isaac",
      },
      { icon: "Calendar", label: "Số buổi học:", value: "2 buổi" },
      {
        icon: "House",
        label: "Địa điểm học:",
        value: "Online qua Zoom",
      },
      {
        icon: "Users",
        label: "Số lượng học viên:",
        value: "40 học viên / lớp",
      },
    ],
  };
  return (
    <div className="min-h-screen bg-white">
<<<<<<< HEAD
      <CourseHeader
        imageUrl_bot="https://nedu.nhi.sg/images/photo_2025-05-30_23-21-04.jpg?_wwcv=130"
        time="Khóa học Online"
        tags={["AI"]}
        title="GEN AI 101"
        description="Giúp người Việt Nam hiểu rõ công nghệ Gen AI và ứng dụng thực tế vào
            công việc một cách có trách nhiệm và hiệu quả. Đồng thời, tạo nền
            tảng để tối ưu hoá các thao tác công việc lặp đi lặp lại hàng ngày
            trong công việc, đặc biệt trong lĩnh vực công và giáo dục."
        cost="13.069.000"
        paymentLink="/payment/57"
      />
      <Instructor instructors={instructors} />
      <Whom title="Ai nên tham gia khóa học này?" items={whomItems} />
      <CourseInfo {...courseInfo} />
      <Organizers />
=======
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
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                const course = courses.find(c => c.slug === "ai-in-marketing");
                if (course) addToCart(course);
              }}
              className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-full font-semibold transition text-lg"
            >
              <ShoppingCart className="w-5 h-5" />
              Thêm vào giỏ hàng
            </button>
            <Link href="/payment/80" className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-semibold transition text-lg">
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
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  const course = courses.find(c => c.slug === "ai-in-marketing");
                  if (course) addToCart(course);
                }}
                className="inline-flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-full font-semibold transition text-lg"
              >
                <ShoppingCart className="w-5 h-5" />
                Thêm vào giỏ hàng
              </button>
              <Link href="/payment/80" className="inline-block bg-primary hover:bg-primary-dark text-white px-12 py-4 rounded-full font-semibold transition text-lg">
                ĐĂNG KÝ NGAY
              </Link>
            </div>
          </div>
        </div>
      </section>
>>>>>>> origin/clean-main
    </div>
  );
}
