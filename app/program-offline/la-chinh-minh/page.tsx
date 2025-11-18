"use client";

import Link from "next/link";
import CourseHeader from "@/components/CourseHeader";
import CourseInfo from "@/components/CourseInfo";
import Mission from "@/components/Mission";
import Testimonials from "@/components/Testimonial";
import YouTube from "react-youtube";
import Instructor from "@/components/Instructor";
import Privilege from "@/app/Privilege";
import Organizers from "@/components/Organizers";

export default function LaChinhMinhPage() {
  const youtubeOpts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  const instructors = [
    {
      name: "NhiLe",
      profession: ["Doanh nhân"],
      bio: "Nhi Lê là một doanh nhân, nhà giáo dục và nhà sáng tạo nội dung người Việt Nam. Cô được biết đến là người đầu tiên đưa chủ đề tâm lý học bằng tiếng Việt lên nền tảng YouTube và là người sáng lập nhiều dự án văn hóa - giáo dục có ảnh hưởng tại Việt Nam. Hiện cô đang sinh sống và làm việc tại Singapore.",
      image: "/picture/nhile.jpg",
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
    buttonText: "Tìm hiểu thêm",
    buttonLink: "/testimonials",
  };

  return (
    <div className="min-h-screen bg-white">
      <CourseHeader
        imageUrl="/picture/la_chinh_minh.jpg"
        altText="Là chính mình"
        time="Thời gian: THÁNG 03 NĂM 2026"
        tags={["Phát triển bản thân", "Là chính mình"]}
        title="Là Chính Mình"
        cost="59,696,000"
        paymentLink="/payment/57"
      />
      <CourseInfo
        title="THÔNG TIN KHÓA HỌC"
        buttonText="ĐĂNG KÝ NGAY"
        buttonLink="/payment/57"
        courseSlug="la-chinh-minh"
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
      <Mission
        title="Mission"
        subtitle="Sứ mệnh"
        description="Khóa học “Là Chính Mình” mang sứ mệnh giúp bạn khám phá và chữa lành mọi khía cạnh của bản thân, xây dựng lối sống cân bằng và phát triển toàn diện về tinh thần, cảm xúc, và thể chất."
      />
      <Testimonials {...testimonials} />
      <Instructor instructors={instructors} />
      <Privilege />
      <Organizers />
    </div>
  );
}
