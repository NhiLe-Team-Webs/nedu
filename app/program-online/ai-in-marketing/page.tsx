"use client";

import Link from "next/link";
import YouTube from "react-youtube";
import CourseHeader from "@/components/CourseHeader";
import Instructor from "@/components/Instructor";
import Whom from "@/components/Whom";
import Testimonials from "@/app/Testimonials";
import CourseInfo from "@/components/CourseInfo";
import Organizers from "@/components/Organizers";

export default function AIInMarketingPage() {
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
    </div>
  );
}
