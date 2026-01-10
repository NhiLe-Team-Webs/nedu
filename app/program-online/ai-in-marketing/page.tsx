'use client';

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
import { useLanguage } from "@/lib/LanguageContext";

export default function AIInMarketingPage() {
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const instructors = getInstructorsByIds(["linda-hui-isaac"]);
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
        icon: "Star" as const,
        label: t("program_detail.info.topic"),
        value: t("program_detail.courses.ai_in_marketing.topic"),
      },
      {
        icon: "Clock" as const,
        label: t("program_detail.info.schedule"),
        value: t("program_detail.courses.ai_in_marketing.schedule"),
      },
      {
        icon: "MapPin" as const,
        label: t("program_detail.info.instructor"),
        value: t("program_detail.courses.ai_in_marketing.instructor"),
      },
      {
        icon: "Calendar" as const,
        label: t("program_detail.info.sessions"),
        value: t("program_detail.courses.ai_in_marketing.sessions"),
      },
      {
        icon: "House" as const,
        label: t("program_detail.info.location"),
        value: t("program_detail.courses.ai_in_marketing.location"),
      },
      {
        icon: "Users" as const,
        label: t("program_detail.info.capacity"),
        value: t("program_detail.courses.ai_in_marketing.capacity"),
      },
    ],
  };
  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-20 override-header-spacing">
      <CourseHeader
        imageUrl="/picture/ai_in_mkt.png"
        altText={t("program_detail.courses.ai_in_marketing.title")}
        time={t("program_detail.common.online_course")}
        tags={[t("categories.ai"), "Marketing"]}
        title={t("program_detail.courses.ai_in_marketing.title")}
        description={t("program_detail.courses.ai_in_marketing.description")}
        cost="13.069.000"
        paymentLink="/payment/57"
        courseSlug="ai-in-marketing"
      />
      <div className="ios-safe-padding-bottom">
        <Instructor instructors={instructors} />
        <div className="py-4">
          <Whom title={t("program_detail.common.who_should_join")} items={whomItems} />
        </div>
        <Testimonials
          courseSlug="ai-in-marketing"
          buttonText={t("program_detail.common.add_to_cart")}
          buttonType="cart"
        />
        <CourseInfo {...courseInfo} />
        <Organizers />
      </div>
    </div>
  );
}
