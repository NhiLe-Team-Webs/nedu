"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import { courses as coursesData } from "@/data/courses";

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
  const { addToCart, items } = useCart();
  const [justAdded, setJustAdded] = useState<Record<string, boolean>>({});

  const handleCardMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleCardMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
    const card = event.currentTarget;
    card.style.removeProperty("--mouse-x");
    card.style.removeProperty("--mouse-y");
  };

  const navigateToCourse = (mode: string, slug: string) => {
    router.push(`/program-${mode}/${slug}`);
  };

  const handleCardKeyDown = (
    event: React.KeyboardEvent<HTMLElement>,
    mode: string,
    slug: string
  ) => {
    if (event.key === "Enter") {
      navigateToCourse(mode, slug);
    }
  };

  const handleAddToCart = (event: React.MouseEvent, course: any) => {
    // Ngăn chặn sự kiện click lan truyền đến card cha
    event.stopPropagation();

    // Thêm khóa học vào giỏ hàng
    addToCart(course);

    // Set justAdded state for this course
    setJustAdded(prev => ({ ...prev, [course.id]: true }));

    // Reset after 3 seconds
    setTimeout(() => {
      setJustAdded(prev => ({ ...prev, [course.id]: false }));
    }, 3000);
  };

  const filteredCourses = useMemo(() => {
    if (filter === "all") return coursesData;
    if (filter === "offline") return coursesData.filter((c) => c.mode === "offline");
    if (filter === "online") return coursesData.filter((c) => c.mode === "online");
    return coursesData.filter((c) => c.category.includes("Doanh nghiệp"));
  }, [filter]);

  return (
    <div className="min-h-screen bg-[#F2F2F7] py-8 sm:py-12 ios-safe-padding-bottom">
      <div className="container mx-auto px-3 sm:px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-3 sm:mb-4 text-primary uppercase tracking-tight px-2">
          Các khóa học chất lượng
        </h1>
        <p className="text-center text-gray-500 font-medium mb-8 sm:mb-10 lg:mb-12 max-w-3xl mx-auto text-sm sm:text-base px-4">
          Lựa chọn chương trình phù hợp với hành trình phát triển bản thân và doanh nghiệp của
          bạn. Mỗi khóa học đều đi kèm công cụ thực hành và có thể tham gia ngay.
        </p>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-12 px-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 sm:px-6 py-2 rounded-full font-semibold transition-all transform active:scale-95 text-sm sm:text-base min-h-[44px] ios-haptic-active ${filter === f.id
                ? "bg-primary text-white shadow-ios-md"
                : "bg-white text-gray-700 hover:bg-gray-50 shadow-ios-sm hover:shadow-ios-md"
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="group bg-white rounded-ios-xl shadow-ios-card overflow-hidden hover:shadow-ios-float transition-all duration-300 ios-haptic-active border border-white/40"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              onClick={() => navigateToCourse(course.mode, course.slug)}
              onKeyDown={(e) => handleCardKeyDown(e, course.mode, course.slug)}
              role="button"
              tabIndex={0}
            >
              <div className="overflow-hidden">
                <img
                  src={course.heroImage}
                  alt={course.title}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                  {course.category.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold uppercase tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2 text-gray-900">
                  {course.title}
                </h3>
                <div className="text-lg sm:text-xl font-bold text-primary mb-3">
                  {course.price.currency === 'VNĐ'
                    ? `${parseInt(course.price.amount.replace(/[.,]/g, '')).toLocaleString('vi-VN')} ${course.price.currency}`
                    : `${course.price.currency} ${course.price.amount}`
                  }
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-500 flex items-center gap-2 font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#F7B50C" className="flex-shrink-0">
                      <path d="M560-564v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-600q-38 0-73 9.5T560-564Zm0 220v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-380q-38 0-73 9t-67 27Zm0-110v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-490q-38 0-73 9.5T560-454ZM260-320q47 0 91.5 10.5T440-278v-394q-41-24-87-36t-93-12q-36 0-71.5 7T120-692v396q35-12 69.5-18t70.5-6Zm260 42q44-21 88.5-31.5T700-320q36 0 70.5 6t69.5 18v-396q-33-14-68.5-21t-71.5-7q-47 0-93 12t-87 36v394Zm-40 118q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740q51-30 106.5-45T700-800q52 0 102 12t96 36q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59ZM280-494Z" />
                    </svg>
                    Số buổi học: <span className="font-semibold text-gray-700">{course.info.sessions}</span>
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-2 font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#F7B50C" className="flex-shrink-0">
                      <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
                    </svg>
                    Người dẫn đường: <span className="font-semibold text-gray-700">{course.info.instructor}</span>
                  </p>
                </div>
                <div className="mt-5">
                  <Button
                    variant="ios-primary"
                    size="sm"
                    onClick={(e) => handleAddToCart(e, course)}
                    disabled={justAdded[course.id]}
                    className={`w-full flex items-center justify-center gap-2 transition-all duration-300 ease-out font-bold rounded-full py-3 min-h-[44px] ${justAdded[course.id]
                        ? 'bg-transparent border-2 border-green-500 text-green-500 cursor-default'
                        : 'bg-primary text-white hover:bg-primary-dark shadow-ios-sm hover:shadow-ios-md ios-haptic-active'
                      }`}
                  >
                    {justAdded[course.id] ? (
                      <>
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Đã thêm vào giỏ hàng</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        Thêm vào giỏ hàng
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
