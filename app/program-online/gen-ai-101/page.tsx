'use client';

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
import { useLanguage } from "@/lib/LanguageContext";

export default function GenAI101Page() {
  const { addToCart } = useCart();
  const { t } = useLanguage();
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
  const courseInfo = {
    title: t("program_detail.info.title"),
    details: [
      {
        icon: "Star" as keyof typeof Icon,
        label: t("program_detail.info.topic"),
        value: t("program_detail.courses.gen_ai_101.topic"),
      },
      {
        icon: "Clock" as keyof typeof Icon,
        label: t("program_detail.info.schedule"),
        value: t("program_detail.courses.gen_ai_101.schedule"),
      },
      {
        icon: "MapPin" as keyof typeof Icon,
        label: t("program_detail.info.instructor"),
        value: t("program_detail.courses.gen_ai_101.instructor"),
      },
      { icon: "Calendar" as keyof typeof Icon, label: t("program_detail.info.sessions"), value: t("program_detail.courses.gen_ai_101.sessions") },
      {
        icon: "House" as keyof typeof Icon,
        label: t("program_detail.info.location"),
        value: t("program_detail.courses.gen_ai_101.location"),
      },
      {
        icon: "Users" as keyof typeof Icon,
        label: t("program_detail.info.capacity"),
        value: t("program_detail.courses.gen_ai_101.capacity"),
      },
    ],
  };
  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-20 override-header-spacing">
      <CourseHeader
        imageUrl="/picture/gen_ai.png"
        altText={t("program_detail.courses.gen_ai_101.title")}
        time={t("program_detail.common.online_course")}
        tags={[t("categories.ai")]}
        title={t("program_detail.courses.gen_ai_101.title")}
        description={t("program_detail.courses.gen_ai_101.description")}
        cost="13.069.000"
        paymentLink="/payment/57"
        courseSlug="gen-ai-101"
      />
      <div className="ios-safe-padding-bottom">
        <Instructor instructors={instructors} />
        <div className="py-4">
          <Whom title={t("program_detail.common.who_should_join")} items={whomItems} />
        </div>
        <Testimonials
          courseSlug="gen-ai-101"
          buttonText={t("program_detail.common.add_to_cart")}
          buttonType="cart"
        />
        <CourseInfo {...courseInfo} />
        <Organizers />
      </div>
    </div>
  );
}
