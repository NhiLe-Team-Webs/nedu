"use client";

import Link from "next/link";
import YouTube from "react-youtube";
import CourseHeader from "@/components/CourseHeader";
import CourseInfo from "@/components/CourseInfo";
import Instructor from "@/components/Instructor";
import Organizers from "@/components/Organizers";
import Whom from "@/components/Whom";
import Testimonials from "@/app/Testimonials";
import { useCart } from "@/lib/cart-context";

export default function AIBusinessCommunicationPage() {
  const { addToCart } = useCart();
  const instructors = [
    {
      name: "Linda Hui-Isaac",
      profession: ["Doanh nhân"],
      bio: "Linda Hui-Isaac là một Chiến lược gia Lãnh đạo về Xây dựng Thương hiệu & AI-Marketing (Branding & AI-Marketing Consultant Lead Trainer). Bà có hơn hai thập kỷ kinh nghiệm toàn cầu, chuyên tư vấn và đào tạo về các chiến lược tiếp thị kỹ thuật số hiệu quả.",
      image: "/picture/linda.jpg",
      education: [
        "- Thạc sĩ Quản trị Kinh doanh Toàn cầu (MBA in Global Business) tại Coventry University (Anh).",
        "- Chứng chỉ Nâng cao về Học tập & Hiệu suất (Advanced Certificate in Learning & Performance) tại Institute of Adult Learning (IAL).",
      ],
      career:
        "Linda Hui-Isaac có hơn 20 năm kinh nghiệm trong lĩnh vực xây dựng thương hiệu và AI-Marketing, đã tư vấn cho nhiều công ty niêm yết trên SGX và các MNC thương hiệu xa xỉ Châu Âu.",
      achievements: [
        {
          date: "2025",
          description: "Hơn 20 năm kinh nghiệm trong lĩnh vực Xây dựng Thương hiệu và AI-Marketing.",
        },
        {
          date: "2025",
          description:
            "Tích lũy kinh nghiệm từ các công ty niêm yết trên SGX và các MNC thương hiệu xa xỉ Châu Âu.",
        },
        {
          date: "2025",
          description: "Đào tạo các công ty lớn: AIA, DBS, UOB, SAXO.",
        },
        {
          date: "2025",
          description: "Đào tạo công nghệ: AWS, SONY, NBCUniversal, Ricoh.",
        },
        {
          date: "2025",
          description: "Đào tạo chính phủ: GOVTech, ICA Singapore, Ministry of Health (MOH).",
        },
        {
          date: "2025",
          description: "Đào tạo giáo dục: NUS, NTU, SMU Academy, Kaplan.",
        },
        {
          date: "2025",
          description: "Đào tạo tư vấn: BCG.",
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
      icon: "Sprout" as const,
      heading: "Sinh viên & người mới đi làm",
      description:
        "Trang bị nền tảng thực tế để hiểu rõ AI dùng trong công việc viết – trình bày – giao tiếp, mở ra cơ hội phát triển sớm trong môi trường chuyên nghiệp.",
    },
    {
      icon: "Recycle" as const,
      heading: "Người muốn chuyển ngành",
      description:
        "Khóa học phù hợp cho những ai muốn khám phá tiềm năng AI để ứng dụng trong công việc mới như marketing, truyền thông, quản lý, nhân sự...",
    },
    {
      icon: "Split" as const,
      heading: "Người mới bắt đầu học AI",
      description:
        "Không cần nền tảng kỹ thuật – chỉ cần bạn tò mò, ham học hỏi và muốn dùng AI một cách thực tế để nâng cấp kỹ năng và tăng năng suất cá nhân.",
    },
  ];
  const courseInfo = {
    title: "THÔNG TIN KHÓA HỌC",
    details: [
      {
        icon: "Star" as const,
        label: "Chủ đề:",
        value: "AI For Business Communication",
      },
      {
        icon: "Clock" as const,
        label: "Thời gian học:",
        value: "28-29 tháng 7 năm 2025",
      },
      {
        icon: "MapPin" as const,
        label: "Người dẫn đường:",
        value: "Linda Hui-Isaac",
      },
      { icon: "Calendar" as const, label: "Số buổi học:", value: "2 buổi" },
      {
        icon: "House" as const,
        label: "Địa điểm học:",
        value: "Online qua Zoom",
      },
      {
        icon: "Users" as const,
        label: "Số lượng học viên:",
        value: "40 học viên / lớp",
      },
    ],
  };
  return (
    <div className="min-h-screen bg-white">
    <CourseHeader
      imageUrl="/picture/ai_for_business.png"
      altText="AI For Business Communication"
      time="Khóa học Online"
      tags={["AI", "Business Communication"]}
      title="AI For Business Communication"
      description="Khóa học chuyên sâu về ứng dụng AI trong giao tiếp kinh doanh, giúp các chuyên gia và doanh nhân tối ưu hóa kỹ năng truyền thông trong kỷ nguyên số."
      cost="13.069.000"
      paymentLink="/payment/57"
      courseSlug="ai-for-business-communication"
    />
      <Instructor instructors={instructors} />
      <Whom title="Ai nên tham gia khóa học này?" items={whomItems} />
      <Testimonials
        courseSlug="ai-for-business-communication"
        buttonText="Thêm vào giỏ hàng"
        buttonType="cart"
      />
      <CourseInfo {...courseInfo} />
      <Organizers />
    </div>
  );
}
