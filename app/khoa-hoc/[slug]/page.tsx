"use client";  // Course Detail Page

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronRight, Star, Clock, MapPin, Calendar, Home, Users, Facebook, Instagram, Linkedin, RotateCcw, UserPlus, PenTool, Phone, Globe, User } from "lucide-react";

type Testimonial = {
  videoUrl: string;
  text: string;
};

type SocialLink = {
  platform: "facebook" | "instagram" | "linkedin";
  url: string;
};

type Instructor = {
  name: string;
  title: string;
  image: string;
  description: string;
  socialLinks?: SocialLink[];
};

type Privilege = {
  icon: "users" | "rotate-ccw" | "user-plus" | "pen-tool" | "user" | "phone";
  title: string;
  description: string;
};

type Course = {
  id: string;
  title: string;
  tags?: string[];
  sessions?: string;
  guide?: string;
  image?: string;
  type?: "Offline" | "Online" | "Doanh nghiệp";
  price?: number;
  priceCurrency?: string;
  deposit?: number;
  depositCurrency?: string;
  topic?: string;
  startDate?: string;
  location?: string;
  studentCount?: string;
  mission?: string;
  missionImage?: string;
  testimonials?: Testimonial[];
  instructors?: Instructor[];
  privileges?: Privilege[];
  privilegesImage?: string;
};

const coursesData: Course[] = [
  {
    id: "suc-manh-vo-han-2",
    title: "Sức Mạnh Vô Hạn 2",
    tags: ["Doanh nhân", "Doanh nghiệp"],
    sessions: "6 tháng online và 4,5 ngày offline",
    guide: "Mel x NhiLe",
    image: "/sucmanhvohan.png",
    type: "Offline",
    price: 23960,
    priceCurrency: "USD",
    deposit: 180000000,
    depositCurrency: "VNĐ",
    topic: "Vận hành doanh nghiệp",
    startDate: "Tháng 4 năm 2026",
    location: "Online qua Zoom và Offline tại khách sạn Mikazuki Đà Nẵng",
    studentCount: "40 học viên",
    mission: "Sức Mạnh Vô Hạn được thiết kế để giúp doanh nhân Việt vươn tầm thế giới. Bằng cách kết nối với các Chuyên gia quốc tế, bạn sẽ học những chiến lược đột phá và xây dựng những nền tảng căn bản nhất cho doanh nghiệp, nâng cấp khả năng kinh doanh và mở rộng thị trường.",
    missionImage: "/privillage.jpg",
    testimonials: [
      {
        videoUrl: "https://www.youtube.com/embed/Dm6gg-LHGqs?si=ZiBHEK0dZHJdsxUI",
        text: "Lần đầu Trang tham gia một chương trình của người Việt mà ấn tượng đến vậy. Cường độ học tập áp lực như môi trường doanh nhân thật sự.",
      },
      {
        videoUrl: "https://www.youtube.com/embed/qEBZwBE449o?si=xwRxiXesYq9u4y3c",
        text: "Bằng cấp kinh tế không đảm bảo bạn trở thành doanh nhân thành công. Muốn đi xa, bạn cần hơn cả kiến thức – đó là tư duy, chiến lược, đội nhóm phù hợp với chính mình.",
      },
      {
        videoUrl: "https://www.youtube.com/embed/RDKjAQLf5w0?si=Uecf4KaRb2F8JqyJ",
        text: "Cần ít nhất 3 năm đi vô đi ra lại cái lớp như vậy để các bạn có thể bắt đầu hiểu vấn đề và bạn thay đổi học phát triển bản thân",
      },
    ],
    instructors: [
      {
        name: "Mel",
        title: "Chuyên gia Marketing",
        image: "/mel_1.jpg",
        description: "Melvin Soh, chuyên gia marketing hàng đầu châu Á, nổi tiếng với hơn 15 năm kinh nghiệm thực chiến trong xây dựng thương hiệu và thu hút khách hàng. Anh đã giúp hàng trăm doanh nghiệp tạo dựng lòng trung thành và tăng trưởng bền vững.",
        socialLinks: [
          { platform: "facebook", url: "https://www.facebook.com/@melvinsohonline" },
          { platform: "instagram", url: "https://www.instagram.com/thegreatmelvinsoh" },
        ],
      },
      {
        name: "NhiLe",
        title: "Doanh nhân",
        image: "/nhile_1.jpg",
        description: "15 năm kinh nghiệm trên thương trường tại Singapore và Việt Nam<br /><br />Là một Doanh nhân | Nhà Tâm lý học | Người lãnh đạo cộng đồng<ul><li>Thay đổi và tạo cảm hứng cho hơn 2000 người Việt ở khắp nơi trên thế giới</li><li>Làm việc và là nhà lãnh đạo trong nhiều lĩnh vực tại cả Việt Nam và Singapore</li></ul>Niềm đam mê với Giáo dục<ul><li>Hơn 6 năm truyền cảm hứng và giúp nhiều người làm chủ cuộc đời qua các chương trình đào tạo</li><li>Professional Certificate in Business Coaching (SMU) | Chứng chỉ Chuyên nghiệp về Đào tạo Doanh nghiệp (Đại học SMU)</li><li>Resilient Leadership and Business Sustainability Series (SMU) | Chuỗi chương trình Lãnh đạo Kiên cường và Phát triển Bền vững trong Kinh doanh (Đại học SMU)</li><li>Certification in Artificial Intelligence (AI) in Marketing (SMU) | Chứng chỉ về Ứng dụng Trí tuệ Nhân tạo (AI) trong Marketing (Đại học SMU)</li><li>Diploma in Psychology – Kaplan Singapore | Văn bằng Tâm lý học - Đại học Kaplan, Singapore</li></ul>",
        socialLinks: [
          { platform: "linkedin", url: "https://www.linkedin.com/in/nhisg/" },
          { platform: "facebook", url: "https://www.facebook.com/nhile.sg" },
          { platform: "instagram", url: "https://www.instagram.com/nhile.sg/" },
        ],
      },
    ],
    privileges: [
      {
        icon: "users",
        title: "Tham gia cộng đồng N-Edu",
        description: "Chúng tôi có sẵn một cộng đồng tích cực và đầy tiềm năng, nơi có những người cùng chí hướng sẵn lòng đồng hành và hỗ trợ lẫn nhau trong sự nghiệp và cuộc sống.",
      },
      {
        icon: "rotate-ccw",
        title: "Học lại trọn đời",
        description: "Sau khi học viên tốt nghiệp, bạn được quyền quay lại học khi có lớp và hoàn toàn miễn phí. Các chương trình của N-Edu luôn được cập nhật và nâng cấp theo những chuyển biến của thế giới.",
      },
      {
        icon: "user-plus",
        title: "Hỗ trợ sau khi học",
        description: "Sau khi hoàn thành khóa học, học viên vẫn được hỗ trợ bởi đội ngũ giảng và chuyên gia để giải đáp thắc mắc hoặc giúp giải quyết các vấn đề thực tế.",
      },
      {
        icon: "pen-tool",
        title: "Hợp tác quốc tế",
        description: "Mỗi năm chúng tôi có nhiều sự kiện và chương trình học trực tiếp, mở ra cơ hội gặp gỡ chuyên gia và học viên quốc tế.",
      },
      {
        icon: "user",
        title: "Cá nhân hóa lộ trình",
        description: "Lựa chọn khóa học phù hợp với nhu cầu cá nhân đưa bạn nhanh đến điều bạn ước muốn.",
      },
      {
        icon: "phone",
        title: "Đội ngũ hỗ trợ liên tục",
        description: "Đội ngũ hỗ trợ của N-Edu luôn sẵn sàng giải đáp thắc mắc của bạn và đảm bảo những quyền lợi của bạn.",
      },
    ],
    privilegesImage: "/privillage.jpg",
  },
  {
    id: "la-chinh-minh-3",
    title: "Là Chính Mình 3",
    tags: ["Phát triển bản thân", "Là chính mình"],
    sessions: "3,5 ngày",
    guide: "NhiLe x Guest Instructors",
    image: "/lachinhminh.png",
    type: "Offline",
    price: 59696000,
    priceCurrency: "VNĐ",
    topic: "Phát triển bản thân",
    startDate: "18 - 21/03/2026",
    location: "Khách sạn Mikazuki Đà Nẵng",
    studentCount: "64 học viên",
    mission: "Khóa học \"Là Chính Mình\" mang sứ mệnh giúp bạn khám phá và chữa lành mọi khía cạnh của bản thân, xây dựng lối sống cân bằng và phát triển toàn diện về tinh thần, cảm xúc, và thể chất.",
    missionImage: "/privillage.jpg",
  },
  {
    id: "gen-ai-101",
    title: "Gen AI 101",
    tags: ["AI", "Phát triển kỹ năng số"],
    sessions: "2 buổi",
    guide: "Linda Hui",
    image: "/genai.png",
    price: 13069000,
    priceCurrency: "VNĐ",
  },
  {
    id: "thuong-hieu-cua-ban",
    title: "Thương Hiệu Của Bạn",
    tags: ["Thương hiệu", "Doanh nghiệp"],
    sessions: "2 buổi",
    guide: "Nhile",
    image: "/thuonghieu.jpg",
    price: 18960000,
    priceCurrency: "VNĐ",
  },
  {
    id: "cuoc-song-cua-ban",
    title: "Cuộc Sống Của Bạn",
    tags: ["Cảm xúc", "Phát triển bản thân"],
    sessions: "2 buổi",
    guide: "Nhile",
    image: "/cuocsongcuaban.jpg",
    price: 18960000,
    priceCurrency: "VNĐ",
  },
  {
    id: "ai-for-business-communication",
    title: "AI For Business Communication",
    tags: ["AI"],
    sessions: "2 buổi",
    guide: "Linda Hui",
    image: "/aibusiness.png",
    price: 23609000,
    priceCurrency: "VNĐ",   
  },
  {
    id: "ai-in-marketing",
    title: "AI In Marketing",
    tags: ["Marketing số"],
    sessions: "2 buổi",
    guide: "Linda Hui",
    image: "/aiinmarketing.png",
    price: 28985000,
    priceCurrency: "VNĐ", 
    
  },
];

// Instructors Carousel Component
const InstructorsCarousel = ({ instructors }: { instructors: Instructor[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play: chuyển slide sau 3.5 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % instructors.length);
    }, 3500); // 3.5 giây

    return () => clearInterval(interval);
  }, [instructors.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const getSocialIcon = (platform: "facebook" | "instagram" | "linkedin") => {
    switch (platform) {
      case "facebook":
        return <Facebook className="h-5 w-5" />;
      case "instagram":
        return <Instagram className="h-5 w-5" />;
      case "linkedin":
        return <Linkedin className="h-5 w-5" />;
    }
  };

  return (
    <div className="w-full" style={{ margin: "80px 0px" }}>
      <div className="max-w-[1280px] mx-auto px-10 py-12">
        <div className="flex flex-col items-center justify-center relative w-full">
          {/* INSTRUCTOR text - faded background */}
          <p 
            className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center uppercase whitespace-nowrap"
            style={{ 
              fontSize: "110px", 
              fontWeight: 700, 
              color: "rgba(247, 181, 12, 0.078)",
              zIndex: 0
            }}
          >
            INSTRUCTOR
          </p>
          
          {/* NGƯỜI DẪN ĐƯỜNG heading */}
          <h2 className="relative z-10 text-6xl font-black text-amber-400 text-center uppercase w-full" style={{ fontSize: "60px", margin: "0px 0px 48px" }}>
            Người dẫn đường
          </h2>

          {/* Carousel Container - All devices */}
          <div className="relative w-full max-w-[720px] mx-auto" style={{ margin: "0px 0px 32px" }}>
            {/* Slides */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {instructors.map((instructor, index) => (
                  <div key={index} className="min-w-full flex-shrink-0 flex flex-col items-center" style={{ maxWidth: "720px", margin: "0px auto" }}>
                    {/* Instructor Image */}
                    <div className="relative w-full h-[360px] mb-6 rounded-lg overflow-hidden">
                      <Image
                        src={instructor.image}
                        alt={instructor.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 720px"
                      />
                    </div>
                    
                    {/* Description */}
                    <div 
                      className="text-base font-medium text-gray-700 mb-4"
                      style={{ 
                        fontSize: "16px", 
                        textAlign: instructor.name === "NhiLe" ? "left" : "center", 
                        marginBottom: "16px",
                        width: "100%"
                      }}
                    >
                      <div 
                        dangerouslySetInnerHTML={{ __html: instructor.description }}
                        style={{
                          lineHeight: "1.6"
                        }}
                      />
                      <style>{`
                        div ul {
                          list-style-type: disc;
                          padding-left: 20px;
                          margin: 8px 0px;
                        }
                        div ul li {
                          margin: 4px 0px;
                        }
                      `}</style>
                    </div>
                    
                    {/* Name */}
                    <p className="text-lg font-bold text-gray-800 uppercase text-center" style={{ fontSize: "18px", margin: "0px 0px 4px" }}>
                      {instructor.name}
                    </p>
                    
                    {/* Title */}
                    <p className="text-base font-medium text-amber-400 mb-4 text-center" style={{ fontSize: "15px", margin: "0px 0px 16px" }}>
                      {instructor.title}
                    </p>
                    
                    {/* Social Links */}
                    {instructor.socialLinks && instructor.socialLinks.length > 0 && (
                      <div className="flex justify-center items-center gap-2" style={{ columnGap: "8px" }}>
                        {instructor.socialLinks.map((link, linkIndex) => (
                          <a
                            key={linkIndex}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-amber-400 transition-colors cursor-pointer"
                          >
                            {getSocialIcon(link.platform)}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center items-center gap-2 mt-6" style={{ marginTop: "36px" }}>
              {instructors.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="transition-all duration-300 focus:outline-none"
                  aria-label={`Go to slide ${index + 1}`}
                  style={{ margin: "0px 6px" }}
                >
                  <div
                    className={`rounded-full transition-all duration-300 ${
                      currentIndex === index ? 'bg-amber-400' : 'bg-gray-300'
                    }`}
                    style={{ width: "8px", height: "8px" }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Privileges Section Component
const PrivilegesSection = ({ privileges, backgroundImage }: { privileges: Privilege[]; backgroundImage?: string }) => {
  const getPrivilegeIcon = (iconType: string) => {
    const iconStyle = { width: "26px", height: "26px" };
    switch (iconType) {
      case "users":
        return <Users style={iconStyle} />;
      case "rotate-ccw":
        return <RotateCcw style={iconStyle} />;
      case "user-plus":
        return <UserPlus style={iconStyle} />;
      case "pen-tool":
        return <PenTool style={iconStyle} />;
      case "user":
        return <User style={iconStyle} />;
      case "phone":
        return <Phone style={iconStyle} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full my-12" style={{ minHeight: "900px" }}>
      {/* Background Image */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      
      {/* Dark Overlay with blur */}
      <div className="absolute inset-0 bg-black bg-opacity-20" style={{ filter: "blur(5px)" }} />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[900px] px-10 py-20">
        <div className="max-w-[1280px] mx-auto w-full">
          {/* Title Section with PRIVILEGE and ĐẶC QUYỀN */}
          <div className="relative mb-10">
            {/* PRIVILEGE text - faded background */}
            <p 
              className="absolute top-0 left-1/2 transform -translate-x-1/2 text-center uppercase whitespace-nowrap"
              style={{ 
                fontSize: "110px", 
                fontWeight: 700, 
                color: "rgba(255, 255, 255, 0.2)",
                zIndex: 0
              }}
            >
              PRIVILEGE
            </p>
            
            {/* ĐẶC QUYỀN heading */}
            <h2 className="relative z-10 text-6xl font-black text-white text-center uppercase" style={{ fontSize: "68px", margin: "0px 0px 40px" }}>
              Đặc quyền
            </h2>
          </div>

          {/* Privileges Grid - 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12" style={{ gap: "24px 30px", marginBottom: "48px" }}>
            {privileges.map((privilege, index) => (
              <div 
                key={index} 
                className="flex flex-col p-4 rounded-md"
                style={{ 
                  background: "rgba(255, 255, 255, 0.2)",
                  border: "1px solid rgb(255, 255, 255)",
                  borderRadius: "6px",
                  rowGap: "16px"
                }}
              >
                {/* Icon and Title */}
                <div className="flex items-center gap-3" style={{ columnGap: "12px" }}>
                  <div className="text-amber-400" style={{ fontSize: "26px", display: "flex", alignItems: "center" }}>
                    {getPrivilegeIcon(privilege.icon)}
                  </div>
                  <p className="text-base font-bold text-white uppercase" style={{ fontSize: "16px" }}>
                    {privilege.title}
                  </p>
                </div>
                
                {/* Description */}
                <p className="text-base font-medium text-white" style={{ fontSize: "16px" }}>
                  {privilege.description}
                </p>
              </div>
            ))}
          </div>

          {/* Register Button */}
          <div className="flex justify-center">
            <Link
              href="#"
              className="bg-amber-400 hover:bg-amber-500 text-white px-5 py-3 rounded-full font-medium text-base uppercase transition-all duration-500 flex items-center gap-2"
              style={{ zIndex: 10 }}
            >
              Đăng ký ngay
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Testimonials Carousel Component
const TestimonialsCarousel = ({ testimonials }: { testimonials: Testimonial[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Kiểm tra kích thước màn hình
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-play: chuyển slide sau 3.5 giây (chỉ trên mobile)
  useEffect(() => {
    if (!isMobile) return; // Chỉ chạy trên mobile
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3500); // 3.5 giây

    return () => clearInterval(interval);
  }, [testimonials.length, isMobile]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-10 py-12">
      <div className="flex flex-col items-center justify-center relative">
        {/* TESTIMONIALS text - faded background, positioned higher */}
        <p 
          className="absolute top-[-100px] left-0 right-0 text-center uppercase whitespace-nowrap"
          style={{ 
            fontSize: "110px", 
            fontWeight: 700, 
            color: "rgba(247, 181, 12, 0.078)",
            zIndex: 0
          }}
        >
          TESTIMONIALS
        </p>
        
        {/* LỜI CHỨNG THỰC heading */}
        <h2 className="relative z-10 text-6xl font-black text-amber-400 text-center uppercase" style={{ fontSize: "68px", margin: "0px 0px 24px" }}>
          Lời chứng thực
        </h2>

        {/* Desktop: Grid 3 columns */}
        <div className="hidden md:grid grid-cols-3 gap-6 w-full" style={{ margin: "0px 0px 32px" }}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col items-center max-w-[360px] mx-auto">
              {/* Video iframe - square corners */}
              <div className="w-full overflow-hidden mb-3" style={{ height: "540px" }}>
                <iframe
                  className="w-full h-full"
                  src={testimonial.videoUrl}
                  title={`Testimonial ${index + 1}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              
              {/* Testimonial text */}
              <p className="text-base font-medium text-gray-700 text-center" style={{ fontSize: "16px", margin: "12px auto" }}>
                {testimonial.text}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="relative w-full max-w-[360px] mx-auto md:hidden" style={{ margin: "0px 0px 32px" }}>
          {/* Slides */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="min-w-full flex-shrink-0 flex flex-col items-center">
                  {/* Video iframe - square corners */}
                  <div className="w-full overflow-hidden mb-3" style={{ height: "540px" }}>
                    <iframe
                      className="w-full h-full"
                      src={testimonial.videoUrl}
                      title={`Testimonial ${index + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  
                  {/* Testimonial text */}
                  <p className="text-base font-medium text-gray-700 text-center" style={{ fontSize: "16px", margin: "12px auto" }}>
                    {testimonial.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots - chỉ hiển thị trên mobile */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="transition-all duration-300 focus:outline-none"
                aria-label={`Go to slide ${index + 1}`}
              >
                <div
                  className={`rounded-full transition-all duration-300 ${
                    currentIndex === index ? 'bg-amber-400' : 'bg-gray-300'
                  }`}
                  style={{ width: "8px", height: "8px" }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Register Button */}
        <Link
          href="#"
          className="bg-amber-400 hover:bg-amber-500 text-white px-5 py-3 rounded-full font-medium text-base uppercase transition-all duration-500 flex items-center gap-2 mt-8"
        >
          Đăng ký ngay
          <ChevronRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};

export default function CourseDetail() {
  const params = useParams();
  const slug = params?.slug as string;
  
  // Tìm course theo slug (id hoặc title slug)
  const course = coursesData.find((c) => {
    const titleSlug = c.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    return c.id === slug || titleSlug === slug;
  });

  if (!course) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Khóa học không tồn tại</h1>
          <Link href="/khoa-hoc" className="text-amber-400 hover:underline">
            Quay lại danh sách khóa học
          </Link>
        </div>
      </div>
    );
  }

  // Unified layout function - same structure for ALL courses
  const getTypeLabel = (type?: string): string => {
    if (type === "Offline") return "Khóa học Offline";
    if (type === "Online") return "Khóa học Online";
    if (type === "Doanh nghiệp") return "Khóa học Doanh nghiệp";
    return "Khóa học"; // Default fallback
  };

  // Format number with dot separator
  const formatNumber = (num: number): string => {
    return num.toLocaleString('vi-VN').replace(/,/g, '.');
  };

  return (
    <div className="min-h-screen pt-32">
      <div className="max-w-[1280px] mx-auto px-10">
        {/* 1. Banner Image - Always rendered if image exists */}
        {course.image && (
          <div className="relative w-full h-80 mb-10 rounded-lg overflow-hidden">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1280px"
            />
          </div>
        )}

        {/* 2. Content Section - Fixed order for ALL courses */}
        <div className="flex flex-col items-center">
          {/* 2.1 Type Label - Always rendered */}
          <p className="text-2xl font-bold text-gray-900 uppercase mb-8">
            {getTypeLabel(course.type)}
          </p>

          {/* 2.2 Tags - Always rendered if tags exist */}
          {course.tags && course.tags.length > 0 && (
            <div className="flex gap-4 mb-8">
              {course.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-amber-50 text-amber-400 px-4 py-2 rounded-full"
                  style={{ fontFamily: "'SVN-Gilroy', serif", fontSize: "16px" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* 2.3 Title - Always rendered */}
          <h1 className="text-6xl font-black text-amber-400 text-center capitalize mb-6">
            {course.title}
          </h1>

          {/* 2.4 Price - Always rendered if price exists */}
          {course.price && (
            <div className="flex items-center gap-1 mb-6">
              <p className="text-lg font-semibold">Chi phí:</p>
              <p className="text-4xl font-bold text-green-600">
                {formatNumber(course.price)}
              </p>
              <p className="text-lg font-semibold">{course.priceCurrency}</p>
            </div>
          )}

          {/* 2.5 Deposit - Always rendered if deposit exists */}
          {course.deposit && (
            <div className="flex items-center gap-1 mb-6">
              <p className="text-lg font-semibold">Đặt cọc:</p>
              <p className="text-4xl font-bold text-green-600">
                {formatNumber(course.deposit)}
              </p>
              <p className="text-lg font-semibold">{course.depositCurrency}</p>
            </div>
          )}

          {/* 2.6 Register Button - Always rendered */}
          <Link
            href="#"
            className="bg-amber-400 hover:bg-amber-500 text-white px-5 py-3 rounded-full font-medium text-base uppercase transition-all duration-500 flex items-center gap-2"
          >
            Đăng ký ngay
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>

        {/* 3. Course Information Section - Only for first 2 courses */}
        {(course.id === "suc-manh-vo-han-2" || course.id === "la-chinh-minh-3") && (
          <div className="flex flex-col items-center justify-center mt-12 mb-12 px-10">
            {/* 3.1 Section Title */}
            <h2 className="text-6xl font-black text-amber-400 text-center uppercase mb-12">
              Thông tin khóa học
            </h2>

            {/* 3.2 Information Card */}
            <div className="w-full shadow-lg rounded-lg p-12 mb-12">
              {/* Card Header */}
              <div className="flex justify-between items-start mb-6">
                <p className="text-2xl font-bold uppercase">Thông tin khóa học</p>
              </div>

              {/* Information Grid - 3 columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-20 gap-x-8">
                {/* Topic */}
                {course.topic && (
                  <div className="flex items-start">
                    <Star className="h-5 w-5 text-amber-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div className="flex flex-col gap-1">
                      <p className="text-base font-light">Chủ đề:</p>
                      <p className="text-base font-semibold">{course.topic}</p>
                    </div>
                  </div>
                )}

                {/* Start Date */}
                {course.startDate && (
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-amber-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div className="flex flex-col gap-1">
                      <p className="text-base font-light">Thời gian học:</p>
                      <p className="text-base font-semibold">{course.startDate}</p>
                    </div>
                  </div>
                )}

                {/* Guide */}
                {course.guide && (
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-amber-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div className="flex flex-col gap-1">
                      <p className="text-base font-light">Người dẫn đường:</p>
                      <p className="text-base font-semibold">{course.guide}</p>
                    </div>
                  </div>
                )}

                {/* Sessions */}
                {course.sessions && (
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-amber-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div className="flex flex-col gap-1">
                      <p className="text-base font-light">Số buổi học:</p>
                      <p className="text-base font-semibold">{course.sessions}</p>
                    </div>
                  </div>
                )}

                {/* Location */}
                {course.location && (
                  <div className="flex items-start">
                    <Home className="h-5 w-5 text-amber-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div className="flex flex-col gap-1">
                      <p className="text-base font-light">Địa điểm học:</p>
                      <p className="text-base font-semibold">{course.location}</p>
                    </div>
                  </div>
                )}

                {/* Student Count */}
                {course.studentCount && (
                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-amber-400 mr-2 mt-0.5 flex-shrink-0" />
                    <div className="flex flex-col gap-1">
                      <p className="text-base font-light">Số lượng học viên:</p>
                      <p className="text-base font-semibold">{course.studentCount}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 3.3 Register Button at bottom */}
            <Link
              href="#"
              className="bg-amber-400 hover:bg-amber-500 text-white px-5 py-3 rounded-full font-medium text-base uppercase transition-all duration-500 flex items-center gap-2"
            >
              Đăng ký ngay
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        )}

      </div>

      {/* 4. Mission Section - Only for first 2 courses, full width */}
      {(course.id === "suc-manh-vo-han-2" || course.id === "la-chinh-minh-3") && course.mission && (
        <div className="relative w-full my-12" style={{ minHeight: "900px" }}>
          {/* Background Image */}
          {course.missionImage && (
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${course.missionImage})` }}
            />
          )}
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center min-h-[900px] px-10 py-20">
            {/* Title Section with MISSION and SỨ MỆNH */}
            <div className="relative mb-8">
              {/* MISSION text - faded background */}
              <p 
                className="absolute -top-24 left-1/2 transform -translate-x-1/2 text-center uppercase whitespace-nowrap"
                style={{ 
                  fontSize: "110px", 
                  fontWeight: 700, 
                  color: "rgba(255, 255, 255, 0.2)",
                  zIndex: 0
                }}
              >
                MISSION
              </p>
              
              {/* SỨ MỆNH heading */}
              <h2 className="relative z-10 text-6xl font-black text-white text-center uppercase" style={{ fontSize: "68px" }}>
                Sứ mệnh
              </h2>
            </div>
            
            <p className="text-2xl font-bold text-white text-center max-w-4xl">
              {course.mission}
            </p>
          </div>
        </div>
      )}

      {/* 5. Testimonials Section - Only for courses with testimonials */}
      {course.testimonials && course.testimonials.length > 0 && (
        <TestimonialsCarousel testimonials={course.testimonials} />
      )}

      {/* 6. Instructors Section - Only for courses with instructors */}
      {course.instructors && course.instructors.length > 0 && (
        <InstructorsCarousel instructors={course.instructors} />
      )}

      {/* 7. Privileges Section - Only for courses with privileges (Last section) */}
      {course.privileges && course.privileges.length > 0 && (
        <PrivilegesSection privileges={course.privileges} backgroundImage={course.privilegesImage} />
      )}
    </div>
  );
}

