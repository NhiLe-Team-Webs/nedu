"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { courses as coursesData } from "@/data/courses";
import { useLanguage } from "@/lib/LanguageContext";

const filters = [
  { id: "all", label: "Tất cả" },
  { id: "offline", label: "Offline" },
  { id: "online", label: "Online" },
  { id: "business", label: "Doanh nghiệp" },
];

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export default function ProgramPage() {
  const [filter, setFilter] = useState("all");
  const router = useRouter();
  const { t } = useLanguage();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const navigateToCourse = (mode: string, slug: string) => {
    router.push(`/program-${mode}/${slug}`);
  };

  const filteredCourses = useMemo(() => {
    if (filter === "all") return coursesData;
    if (filter === "offline") return coursesData.filter((c) => c.mode === "offline");
    if (filter === "online") return coursesData.filter((c) => c.mode === "online");
    return coursesData.filter((c) => c.category.includes("Doanh nghiệp"));
  }, [filter]);

  const updateScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Update scroll button states when filter changes
  useEffect(() => {
    // Reset scroll position to start when filter changes
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 0;
    }
    // Update button states after a brief delay to allow DOM to update
    const timer = setTimeout(() => {
      updateScrollButtons();
    }, 100);
    return () => clearTimeout(timer);
  }, [filteredCourses]);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 450; // Width of one card plus gap
      const newScrollLeft = direction === 'left'
        ? carouselRef.current.scrollLeft - scrollAmount
        : carouselRef.current.scrollLeft + scrollAmount;

      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="bg-background overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4">
        <div>
          <h1 className="text-4xl md:text-6xl font-semibold text-primary tracking-tight mb-12">
            {t("program_page.title")}
          </h1>
          <div className="relative w-full flex items-center">
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 md:flex-wrap md:gap-1 md:bg-gray-100 md:rounded-full md:p-1 items-center scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {filters.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`relative rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-colors duration-300 whitespace-nowrap md:flex-shrink-0 ${filter === f.id
                    ? "text-white"
                    : "bg-gray-100 text-gray-600 hover:text-black"
                    }`}
                >
                  {filter === f.id && (
                    <div className="absolute inset-0 bg-black rounded-full z-20"></div>
                  )}
                  <span className="relative z-30">{t(`program_page.filters.${f.id}`)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div
          ref={carouselRef}
          onScroll={updateScrollButtons}
          className="w-full overflow-x-auto pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] py-10"
        >
          <div className="flex gap-8 pl-8 sm:pl-[calc((100%-1280px)/2+2rem)] pr-8">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                data-course-card="true"
                className="w-[300px] md:w-[420px] flex-shrink-0 snap-center flex flex-col justify-between"
              >
                <Link
                  href={`/program-${course.mode}/${course.slug}`}
                  className="group block w-full relative aspect-video overflow-hidden transition-transform duration-300 ease-in-out hover:scale-[1.02]"
                >
                  <img
                    alt={t(course.title)}
                    src={course.heroImage}
                    className="w-full h-full object-cover rounded-[30px]"
                  />
                </Link>
                <div className="flex flex-col items-center text-center w-full max-w-full pb-10 flex-grow">
                  <div className="flex gap-2 mt-4 h-5 items-center">
                    {course.category.map((tag, index) => (
                      <p key={index} className="text-orange-600 font-medium text-xs m-0">
                        {t(tag)}
                      </p>
                    ))}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-0 leading-tight flex flex-col justify-center h-16">
                    <span className="block">{t(course.title)}</span>
                  </h3>
                  <div className="text-gray-500 text-sm max-w-[90%] mx-auto mb-4 min-h-[40px]">
                    <span className="block">{t(course.mission).substring(0, 80)}...</span>
                  </div>
                  <p className="text-base font-medium">
                    {course.price.currency === 'VNĐ'
                      ? `${parseInt(course.price.amount.replace(/[.,]/g, '')).toLocaleString('vi-VN')}\u00A0₫`
                      : `${course.price.currency} ${course.price.amount}`
                    }
                  </p>
                  <div className="flex items-center justify-center gap-4 mt-auto">
                    <Link
                      href={`/program-${course.mode}/${course.slug}`}
                      className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 rounded-full bg-primary text-white hover:text-white hover:bg-primary-dark px-5 py-2 text-sm"
                    >
                      {t("program_page.card.learn_more")}
                    </Link>
                    <button className="text-primary font-medium text-sm hover:underline">
                      {t("program_page.card.register")}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="container max-w-7xl mx-auto px-4 mt-4 flex justify-end gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none border border-input hover:text-accent-foreground rounded-full w-10 h-10 bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
          >
            <ChevronLeft className="h-5 w-5 text-gray-800" />
            <span className="sr-only">{t("program_page.card.previous")}</span>
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none border border-input hover:text-accent-foreground rounded-full w-10 h-10 bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
          >
            <ChevronRight className="h-5 w-5 text-gray-800" />
            <span className="sr-only">{t("program_page.card.next")}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
