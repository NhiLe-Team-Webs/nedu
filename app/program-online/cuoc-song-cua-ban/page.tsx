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

export default function CuocSongCuaBanPage() {
  const { addToCart } = useCart();
  const youtubeOpts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  const instructors = getInstructorsByIds(["nhi-le"]);
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
    buttonLink: "/testimonials",
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-20 override-header-spacing">
      <CourseHeader
        imageUrl="/picture/cuoc_song_cua_ban.png"
        altText="Cuộc sống của bạn"
        time="KHÓA HỌC ONLINE"
        tags={["Phát triển bản thân"]}
        title="Cuộc Sống Của Bạn"
        cost="18.960.000"
        paymentLink="/payment/53"
        description="Khóa học giúp bạn khám phá và định hình lại cuộc sống theo cách riêng, tìm ra con đường phát triển bản thân và xây dựng lối sống ý nghĩa."
        courseSlug="cuoc-song-cua-ban"
      />
      <div className="ios-safe-padding-bottom">
        <Instructor instructors={instructors} />
        <div className="py-4">
          <Whom title="Ai nên tham gia khóa học này?" items={whomItems} />
        </div>
        <Testimonials
          courseSlug="cuoc-song-cua-ban"
          buttonText="Thêm vào giỏ hàng"
          buttonType="cart"
        />
        <CourseInfo
          title="THÔNG TIN KHÓA HỌC"
          details={[
            {
              icon: "Star" as const,
              label: "Chủ đề:",
              value: "Phát triển bản thân",
            },
            { icon: "Clock" as const, label: "Thời gian học:", value: "10-13/09/2025" },
            {
              icon: "MapPin" as const,
              label: "Người dẫn đường:",
              value: "NhiLe",
            },
            { icon: "Calendar" as const, label: "Số buổi học:", value: "3,5 ngày" },
            {
              icon: "House" as const,
              label: "Địa điểm học:",
              value: "Online qua Zoom",
            },
            { icon: "Users" as const, label: "Số lượng học viên:", value: "Giới hạn" },
          ]}
        />
        <Organizers />
      </div>
    </div>
  );
}
