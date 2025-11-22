"use client";

import Link from "next/link";
import YouTube from "react-youtube";
import CourseHeader from "@/components/CourseHeader";
import Instructor from "@/components/Instructor";
import Whom from "@/components/Whom";
import Testimonials from "@/app/Testimonials";
import CourseInfo from "@/components/CourseInfo";
import Organizers from "@/components/Organizers";
import { useCart } from "@/lib/cart-context";
import { getInstructorsByIds } from "@/data/instructors";

export default function AIInMarketingPage() {
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
        value: "AI In Marketing",
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
        imageUrl="/picture/ai_in_mkt.png"
        altText="AI In Marketing"
        time="Khóa học Online"
        tags={["AI", "Marketing"]}
        title="AI In Marketing"
        description="Khóa học chuyên sâu về ứng dụng AI trong marketing, giúp các marketer hiện đại hóa chiến lược và tối ưu hóa hiệu quả chiến dịch."
        cost="13.069.000"
        paymentLink="/payment/57"
        courseSlug="ai-in-marketing"
      />
      <Instructor instructors={instructors} />
      <Whom title="Ai nên tham gia khóa học này?" items={whomItems} />
      <Testimonials
        courseSlug="ai-in-marketing"
        buttonText="Thêm vào giỏ hàng"
        buttonType="cart"
      />
      <CourseInfo {...courseInfo} />
      <Organizers />
    </div>
  );
}
