"use client";

import Link from "next/link";
import YouTube from "react-youtube";
import CourseInfo from "@/components/CourseInfo";
import Mission from "@/components/Mission";
import Testimonials from "@/components/Testimonial";
import Instructor from "@/components/Instructor";
import CourseHeader from "@/components/CourseHeader";
import Privilege from "@/app/Privilege";
import Organizers from "@/components/Organizers";

export default function SucManhVoHanPage() {
  const youtubeOpts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  const courseDetails = [
    { label: "Chủ đề", value: "Vận hành doanh nghiệp", icon: "Briefcase" },
    { label: "Thời gian học", value: "Tháng 4 năm 2026", icon: "Clock" },
    { label: "Người dẫn đường", value: "Mel x NhiLe", icon: "User" },
    {
      label: "Số buổi học",
      value: "6 tháng online và 4,5 ngày offline",
      icon: "Calendar",
    },
    {
      label: "Địa điểm học",
      value: "Online qua Zoom và Offline tại khách sạn Mikazuki Đà Nẵng",
      icon: "MapPin",
    },
    { label: "Số lượng học viên", value: "40 học viên", icon: "Users" },
  ];

  const testimonials = {
    videos: [
      "https://www.youtube.com/embed/Dm6gg-LHGqs",
      "https://www.youtube.com/embed/qEBZwBE449o",
      "https://www.youtube.com/embed/RDKjAQLf5w0",
    ],
    captions: [
      "Lần đầu Trang tham gia một chương trình của người Việt mà ấn tượng đến vậy. Cường độ học tập áp lực như môi trường doanh nhân thật sự.",
      "Bằng cấp kinh tế không đảm bảo bạn trở thành doanh nhân thành công. Muốn đi xa, bạn cần hơn cả kiến thức – đó là tư duy, chiến lược, đội nhóm phù hợp với chính mình.",
      "Cần ít nhất 3 năm đi vô đi ra lại cái lớp như vậy để các bạn có thể bắt đầu hiểu vấn đề và bạn thay đổi học phát triển bản thân",
    ],
    title: "Testimonials",
    subtitle: "Lời chứng thực",
    buttonText: "Tìm hiểu thêm",
    buttonLink: "/payment/58",
  };

  const instructors = [
    {
      name: "NhiLe",
      profession: ["Doanh nhân"],
      bio: "15 năm kinh nghiệm trên thương trường tại Singapore và Việt Nam. Hơn 6 năm truyền cảm hứng và giúp nhiều người làm chủ cuộc đời qua các chương trình đào tạo.",
      image: "/picture/nhile.jpg",
      achievements: [],
      projects: [],
      education: "Diploma in Business Administration",
      career: "Founder of NhiLe Team and NhiLe Foundation",
    },
    {
      name: "Mel",
      profession: ["Chuyên gia Marketing"],
      bio: "Melvin Soh, chuyên gia marketing hàng đầu châu Á, nổi tiếng với hơn 15 năm kinh nghiệm thực chiến trong xây dựng thương hiệu và thu hút khách hàng. Anh đã giúp hàng trăm doanh nghiệp tạo dựng lòng trung thành và tăng trưởng bền vững.",
      image: "/picture/mel.jpg",
      achievements: [],
      projects: [],
      education: "MBA in Marketing",
      career: "CEO of Marketing Solutions Asia",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <CourseHeader
        imageUrl="/picture/suc_manh_vo_han.jpg"
        altText="Sức Mạnh Vô Hạn"
        time="Khóa học Offline"
        tags={["Doanh nhân", "Doanh nghiệp"]}
        title="Sức Mạnh Vô Hạn"
        cost="23.960"
        paymentLink="/payment/57"
        deposit="180.000.000"
        dep_currency="VND"
      />
      <CourseInfo
        title="Thông tin khóa học"
        details={courseDetails as any}
        buttonText="Tìm hiểu thêm"
        buttonLink="/payment/58"
        courseSlug="suc-manh-vo-han"
      />

      <Mission
        title="Sứ mệnh"
        subtitle="Sứ mệnh"
        description="Sức Mạnh Vô Hạn được thiết kế để giúp doanh nhân Việt vươn tầm thế giới. Bằng cách kết nối với các Chuyên gia quốc tế, bạn sẽ học những chiến lược đột phá và xây dựng những nền tảng căn bản nhất cho doanh nghiệp, nâng cấp khả năng kinh doanh và mở rộng thị trường."
      />

      <Testimonials {...testimonials} />
      <Instructor instructors={instructors} />
      <Privilege />
      <Organizers />
    </div>
  );
}
