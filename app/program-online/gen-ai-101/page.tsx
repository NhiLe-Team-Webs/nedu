"use client";

import CourseHeader from "@/components/CourseHeader";
import CourseInfo from "@/components/CourseInfo";
import Instructor from "@/components/Instructor";
import Organizers from "@/components/Organizers";
import Link from "next/link";
import YouTube from "react-youtube";
import Whom from "@/components/Whom";
import Testimonials from "@/app/Testimonials";
import * as Icon from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { getInstructorsByIds } from "@/data/instructors";

export default function GenAI101Page() {
  const { addToCart } = useCart();
  const youtubeOpts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };
  const instructors = getInstructorsByIds([
    "linda-hui-isaac"
  ]);
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
        icon: "Star" as keyof typeof Icon,
        label: "Chủ đề:",
        value: "AI",
      },
      {
        icon: "Clock" as keyof typeof Icon,
        label: "Thời gian học:",
        value: "28-29 tháng 7 năm 2025",
      },
      {
        icon: "MapPin" as keyof typeof Icon,
        label: "Người dẫn đường:",
        value: "Linda Hui-Isaac",
      },
      { icon: "Calendar" as keyof typeof Icon, label: "Số buổi học:", value: "2 buổi" },
      {
        icon: "House" as keyof typeof Icon,
        label: "Địa điểm học:",
        value: "Online qua Zoom",
      },
      {
        icon: "Users" as keyof typeof Icon,
        label: "Số lượng học viên:",
        value: "40 học viên / lớp",
      },
    ],
  };
  return (
    <div className="min-h-screen bg-white">
      <CourseHeader
        imageUrl="/picture/gen_ai.png"
        altText="GEN AI 101"
        time="Khóa học Online"
        tags={["AI"]}
        title="GEN AI 101"
        description="Giúp người Việt Nam hiểu rõ công nghệ Gen AI và ứng dụng thực tế vào
            công việc một cách có trách nhiệm và hiệu quả. Đồng thời, tạo nền
            tảng để tối ưu hoá các thao tác công việc lặp đi lặp lại hàng ngày
            trong công việc, đặc biệt trong lĩnh vực công và giáo dục."
        cost="13.069.000"
        paymentLink="/payment/57"
        courseSlug="gen-ai-101"
      />
      <Instructor instructors={instructors} />
      <Whom title="Ai nên tham gia khóa học này?" items={whomItems} />
      <Testimonials
        courseSlug="gen-ai-101"
        buttonText="Thêm vào giỏ hàng"
        buttonType="cart"
      />
      <CourseInfo {...courseInfo} />
      <Organizers />
    </div>
  );
}
