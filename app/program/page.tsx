"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const coursesData = [
  {
    id: 1,
    slug: "la-chinh-minh",
    mode: "offline",
    title: "Là Chính Mình 03",
    category: ["Phát triển bản thân", "Là chính mình"],
    heroImage: "/picture/la_chinh_minh.jpg",
    info: {
      sessions: "3,5 ngày",
      instructor: "NhiLe x Guest Instructors",
    },
  },
  {
    id: 2,
    slug: "suc-manh-vo-han",
    mode: "offline",
    title: "Sức Mạnh Vô Hạn",
    category: ["Doanh nhân", "Doanh nghiệp"],
    heroImage: "/picture/2_3.jpg",
    info: {
      sessions: "6 tháng online và 4,5 ngày offline",
      instructor: "Mel x NhiLe",
    },
  },
  {
    id: 3,
    slug: "gen-ai-101",
    mode: "online",
    title: "GEN AI 101",
    category: ["AI"],
    heroImage: "/picture/thum_yt_1.png",
    info: {
      sessions: "2 buổi",
      instructor: "Linda Hui-Isaac",
    },
  },
  {
    id: 4,
    slug: "thuong-hieu-cua-ban",
    mode: "online",
    title: "Thương Hiệu Của Bạn",
    category: ["Thương hiệu"],
    heroImage: "/picture/thuong_hieu_cua_ban.png",
    info: {
      sessions: "4 buổi",
      instructor: "NhiLe",
    },
  },
  {
    id: 5,
    slug: "cuoc-song-cua-ban",
    mode: "online",
    title: "CUỘC SỐNG CỦA BẠN",
    category: ["Phát triển bản thân"],
    heroImage: "/picture/cuoc_song_cua_ban.png",
    info: {
      sessions: "3 buổi",
      instructor: "NhiLe",
    },
  },
  {
    id: 6,
    slug: "ai-for-business-communication",
    mode: "online",
    title: "AI FOR BUSINESS COMMUNICATION",
    category: ["Trí tuệ nhân tạo ứng dụng"],
    heroImage: "/picture/thum_yt_2.png",
    info: {
      sessions: "3 buổi",
      instructor: "Linda Hui-Isaac",
    },
  },
  {
    id: 7,
    slug: "ai-in-marketing",
    mode: "online",
    title: "CERTIFIED GEN AI FOUNDATION IN MARKETING & BUSINESS STRATEGY",
    category: ["Marketing số"],
    heroImage: "/picture/thum_yt_3.png",
    info: {
      sessions: "2 buổi",
      instructor: "Linda Hui-Isaac",
    },
  },
];

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

  const filteredCourses = useMemo(() => {
    if (filter === "all") return coursesData;
    if (filter === "offline") return coursesData.filter((c) => c.mode === "offline");
    if (filter === "online") return coursesData.filter((c) => c.mode === "online");
    return coursesData.filter((c) => c.category.includes("Doanh nghiệp"));
  }, [filter]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary uppercase">
          Các khóa học chất lượng
        </h1>
        <p className="text-center text-gray-600 mb-10 max-w-3xl mx-auto">
          Lựa chọn chương trình phù hợp với hành trình phát triển bản thân và doanh nghiệp của
          bạn. Mỗi khóa học đều đi kèm công cụ thực hành và có thể tham gia ngay.
        </p>

        <div className="flex justify-center space-x-4 mb-12">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                filter === f.id
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              onClick={() => navigateToCourse(course.mode, course.slug)}
              onKeyDown={(e) => handleCardKeyDown(e, course.mode, course.slug)}
              role="button"
              tabIndex={0}
            >
              <img
                src={course.heroImage}
                alt={course.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {course.category.map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  📚 Số buổi học: <span className="font-semibold">{course.info.sessions}</span>
                </p>
                <p className="text-sm text-gray-600">
                  👨‍🏫 Người dẫn đường: <span className="font-semibold">{course.info.instructor}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
