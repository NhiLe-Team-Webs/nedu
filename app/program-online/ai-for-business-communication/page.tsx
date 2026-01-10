'use client';

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
import { useLanguage } from "@/lib/LanguageContext";

export default function AIBusinessCommunicationPage() {
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
        value: t("program_detail.courses.ai_for_business_communication.topic"),
      },
      {
        icon: "Clock" as const,
        label: t("program_detail.info.schedule"),
        value: t("program_detail.courses.ai_for_business_communication.schedule"),
      },
      {
        icon: "MapPin" as const,
        label: t("program_detail.info.instructor"),
        value: t("program_detail.courses.ai_for_business_communication.instructor"),
      },
      {
        icon: "Calendar" as const,
        label: t("program_detail.info.sessions"),
        value: t("program_detail.courses.ai_for_business_communication.sessions"),
      },
      {
        icon: "House" as const,
        label: t("program_detail.info.location"),
        value: t("program_detail.courses.ai_for_business_communication.location"),
      },
      {
        icon: "Users" as const,
        label: t("program_detail.info.capacity"),
        value: t("program_detail.courses.ai_for_business_communication.capacity"),
      },
    ],
  };
  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-20 override-header-spacing">
      <CourseHeader
        imageUrl="/picture/ai_for_business.png"
        altText={t("program_detail.courses.ai_for_business_communication.title")}
        time={t("program_detail.common.online_course")}
        tags={[t("categories.ai"), "Business Communication"]}
        title={t("program_detail.courses.ai_for_business_communication.title")}
        description={t("program_detail.courses.ai_for_business_communication.description")}
        cost="13.069.000"
        paymentLink="/payment/57"
        courseSlug="ai-for-business-communication"
      />
      <div className="ios-safe-padding-bottom">
        <Instructor instructors={instructors} />
        <div className="py-4">
          <Whom title={t("program_detail.common.who_should_join")} items={whomItems} />
        </div>
        <Testimonials
          courseSlug="ai-for-business-communication"
          buttonText={t("program_detail.common.add_to_cart")}
          buttonType="cart"
        />
        <CourseInfo {...courseInfo} />
        <Organizers />
      </div>
    </div>
  );
}
