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
import { getInstructorsByIds } from "@/data/instructors";

export default function AIBusinessCommunicationPage() {
  const { addToCart } = useCart();
  const instructors = getInstructorsByIds(["linda-hui-isaac"]);
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
    <div className="min-h-screen bg-[#F2F2F7] pb-20 override-header-spacing">
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
      <div className="ios-safe-padding-bottom">
        <Instructor instructors={instructors} />
        <div className="py-4">
          <Whom title="Ai nên tham gia khóa học này?" items={whomItems} />
        </div>
        <Testimonials
          courseSlug="ai-for-business-communication"
          buttonText="Thêm vào giỏ hàng"
          buttonType="cart"
        />
        <CourseInfo {...courseInfo} />
        <Organizers />
      </div>
    </div>
  );
}
