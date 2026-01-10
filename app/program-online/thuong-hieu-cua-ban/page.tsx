'use client';

import Link from "next/link";
import CourseHeader from "@/components/CourseHeader";
import Instructor from "@/components/Instructor";
import Whom from "@/components/Whom";
import Testimonials from "@/app/Testimonials";
import CourseInfo from "@/components/CourseInfo";
import Organizers from "@/components/Organizers";
import { useCart } from "@/lib/cart-context";
import { getInstructorsByIds } from "@/data/instructors";
import { useLanguage } from "@/lib/LanguageContext";

export default function ThuongHieuCuaBanPage() {
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const instructors = getInstructorsByIds(["nhi-le"]);
  const whomItems = [
    {
      icon: "Sprout" as const,
      heading: t("program_detail.whom.student_newbie.heading"),
      description: t("program_detail.whom.student_newbie.description"),
    },
    {
      icon: "Recycle" as const,
      heading: t("program_detail.whom.career_switcher.heading"),
      description: t("program_detail.whom.career_switcher.description"),
    },
    {
      icon: "Split" as const,
      heading: t("program_detail.whom.ai_beginner.heading"),
      description: t("program_detail.whom.ai_beginner.description"),
    },
  ];
  const testimonials = {
    videos: [
      "https://www.youtube.com/embed/PFWDwSf5EGc",
      "https://www.youtube.com/embed/RAaXaJxFXpE",
      "https://www.youtube.com/embed/8qq6WDQFFQk",
    ],
    captions: [
      t("program_detail.courses.cuoc_song_cua_ban.testimonials.0"),
      t("program_detail.courses.cuoc_song_cua_ban.testimonials.1"),
      t("program_detail.courses.cuoc_song_cua_ban.testimonials.2"),
    ],
    title: t("program_detail.common.testimonials_title"),
    subtitle: t("program_detail.common.testimonials_subtitle"),
    buttonText: t("program_detail.common.add_to_cart"),
    buttonLink: "/testimonials",
  };
  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-20 override-header-spacing">
      <CourseHeader
        imageUrl="/picture/thuong_hieu_cua_ban.png"
        altText={t("program_detail.courses.thuong_hieu_cua_ban.title")}
        time={t("program_detail.common.online_course")}
        tags={[t("categories.branding")]}
        title={t("program_detail.courses.thuong_hieu_cua_ban.title")}
        cost="18.960.000"
        paymentLink="/payment/53"
        description={t("program_detail.courses.thuong_hieu_cua_ban.description")}
        courseSlug="thuong-hieu-cua-ban"
      />
      <div className="ios-safe-padding-bottom">
        <Instructor instructors={instructors} />
        <div className="py-4">
          <Whom title={t("program_detail.common.who_should_join")} items={whomItems} />
        </div>
        <Testimonials
          courseSlug="thuong-hieu-cua-ban"
          buttonText={t("program_detail.common.add_to_cart")}
          buttonType="cart"
        />
        <CourseInfo
          title={t("program_detail.info.title")}
          details={[
            {
              icon: "Star" as const,
              label: t("program_detail.info.topic"),
              value: t("program_detail.courses.thuong_hieu_cua_ban.topic"),
            },
            { icon: "Clock" as const, label: t("program_detail.info.schedule"), value: t("program_detail.courses.thuong_hieu_cua_ban.schedule") },
            {
              icon: "MapPin" as const,
              label: t("program_detail.info.instructor"),
              value: t("program_detail.courses.thuong_hieu_cua_ban.instructor"),
            },
            { icon: "Calendar" as const, label: t("program_detail.info.sessions"), value: t("program_detail.courses.thuong_hieu_cua_ban.sessions") },
            {
              icon: "House" as const,
              label: t("program_detail.info.location"),
              value: t("program_detail.courses.thuong_hieu_cua_ban.location"),
            },
            { icon: "Users" as const, label: t("program_detail.info.capacity"), value: t("program_detail.courses.thuong_hieu_cua_ban.capacity") },
          ]}
        />
        <Organizers />
      </div>
    </div>
  );
}
