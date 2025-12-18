"use client";
import CourseInfo from "@/components/CourseInfo";
import Mission from "@/components/Mission";
import Testimonials from "@/components/Testimonial";
import Instructor from "@/components/Instructor";
import CourseHeader from "@/components/CourseHeader";
import Privilege from "@/app/Privilege";
import Organizers from "@/components/Organizers";
import { getCourseBySlug } from "@/data/courses";
import { getInstructorsByIds } from "@/data/instructors";

export default function SucManhVoHanPage() {
  const course = getCourseBySlug('suc-manh-vo-han');

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
    buttonText: "Thêm vào giỏ hàng",
    buttonType: "cart" as const,
    course: course,
  };

  const instructors = getInstructorsByIds(["nhi-le", "mel"]);
  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-20 override-header-spacing">
      <CourseHeader
        bannerUrl="/sucmanhvohan.jpg"
        altText="Sức Mạnh Vô Hạn"
        time="Khóa học Offline"
        tags={["Doanh nhân", "Doanh nghiệp"]}
        title="Sức Mạnh Vô Hạn"
        cost="23.960"
        paymentLink="/payment/57"
        deposit="180.000.000"
        dep_currency="VND"
        courseSlug="suc-manh-vo-han"
      />
      <div className="ios-safe-padding-bottom">
        <CourseInfo
          title="Thông tin khóa học"
          details={courseDetails as any}
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
    </div >
  );
}
