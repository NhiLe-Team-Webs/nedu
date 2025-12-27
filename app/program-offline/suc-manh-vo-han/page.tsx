'use client';
import CourseInfo from "@/components/CourseInfo";
import Mission from "@/components/Mission";
import Testimonials from "@/components/Testimonial";
import Instructor from "@/components/Instructor";
import CourseHeader from "@/components/CourseHeader";
import Privilege from "@/app/Privilege";
import Organizers from "@/components/Organizers";
import { getCourseBySlug } from "@/data/courses";
import { getInstructorsByIds } from "@/data/instructors";
import { useLanguage } from "@/lib/LanguageContext";

export default function SucManhVoHanPage() {
  const { t } = useLanguage();
  const course = getCourseBySlug('suc-manh-vo-han');

  const courseDetails = [
    { label: t("program_detail.info.topic"), value: t("program_detail.courses.suc_manh_vo_han.topic"), icon: "Briefcase" },
    { label: t("program_detail.info.schedule"), value: t("program_detail.courses.suc_manh_vo_han.schedule"), icon: "Clock" },
    { label: t("program_detail.info.instructor"), value: t("program_detail.courses.suc_manh_vo_han.instructor"), icon: "User" },
    {
      label: t("program_detail.info.sessions"),
      value: t("program_detail.courses.suc_manh_vo_han.sessions"),
      icon: "Calendar",
    },
    {
      label: t("program_detail.info.location"),
      value: t("program_detail.courses.suc_manh_vo_han.location"),
      icon: "MapPin",
    },
    { label: t("program_detail.info.capacity"), value: t("program_detail.courses.suc_manh_vo_han.capacity"), icon: "Users" },
  ];

  const testimonials = {
    videos: [
      "https://www.youtube.com/embed/Dm6gg-LHGqs",
      "https://www.youtube.com/embed/qEBZwBE449o",
      "https://www.youtube.com/embed/RDKjAQLf5w0",
    ],
    captions: [
      t("program_detail.courses.suc_manh_vo_han.testimonials.0"),
      t("program_detail.courses.suc_manh_vo_han.testimonials.1"),
      t("program_detail.courses.suc_manh_vo_han.testimonials.2"),
    ],
    title: t("program_detail.common.testimonials_title"),
    subtitle: t("program_detail.common.testimonials_subtitle"),
    buttonText: t("program_detail.common.add_to_cart"),
    buttonType: "cart" as const,
    course: course,
  };

  const instructors = getInstructorsByIds(["nhi-le", "mel"]);
  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-20 override-header-spacing">
      <CourseHeader
        bannerUrl="/sucmanhvohan.jpg"
        altText={t("program_detail.courses.suc_manh_vo_han.title")}
        time={t("program_detail.common.offline_course")}
        tags={[t("categories.entrepreneur"), t("categories.business")]}
        title={t("program_detail.courses.suc_manh_vo_han.title")}
        cost="23.960"
        currency="USD"
        paymentLink="/payment/57"
        deposit="180.000.000"
        dep_currency="VND"
        courseSlug="suc-manh-vo-han"
      />
      <div className="ios-safe-padding-bottom">
        <CourseInfo
          title={t("program_detail.info.title")}
          details={courseDetails as any}
          courseSlug="suc-manh-vo-han"
        />

        <Mission
          title={t("mission.title")}
          subtitle={t("mission.subtitle")}
          description={t("program_detail.courses.suc_manh_vo_han.mission_desc")}
        />

        <Testimonials {...testimonials} />
        <Instructor instructors={instructors} />
        <Privilege />
        <Organizers />
      </div>
    </div >
  );
}
