"use client";

import Link from "next/link";
import CourseHeader from "@/components/CourseHeader";
import CourseInfo from "@/components/CourseInfo";
import Mission from "@/components/Mission";
import Testimonials from "@/components/Testimonial";
import Instructor from "@/components/Instructor";
import Privilege from "@/app/Privilege";
import Organizers from "@/components/Organizers";
import { getCourseBySlug } from "@/data/courses";
import { getInstructorsByIds } from "@/data/instructors";

export default function LaChinhMinhPage() {
  const course = getCourseBySlug('la-chinh-minh');

  const youtubeOpts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  // Get instructors from global data
  const instructors = getInstructorsByIds(["nhi-le"]);


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
    buttonText: "Thêm vào giỏ hàng",
    buttonType: "cart" as const,
    course: course,
  };

  return (
    <div className="min-h-screen bg-white">
      <CourseHeader
        bannerUrl="/lachinhminh.jpg"
        altText="Là chính mình"
        time="Thời gian: THÁNG 03 NĂM 2026"
        tags={["Phát triển bản thân", "Là chính mình"]}
        title="Là Chính Mình"
        cost="59.696.000"
        paymentLink="/payment/57"
        courseSlug="la-chinh-minh"
      />
      <CourseInfo
        title="THÔNG TIN KHÓA HỌC"
        details={[
          {
            icon: "Star",
            label: "Chủ đề:",
            value: "Phát triển bản thân và khám phá nội tâm",
          },
          { icon: "Clock", label: "Thời gian học:", value: "05-08/03/2026" },
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
        imgUrl="/lachinhminh.jpg"
      />
      <Testimonials {...testimonials} />
      <Instructor instructors={instructors} />
      <Privilege />
      <Organizers />
    </div>
  );
}
