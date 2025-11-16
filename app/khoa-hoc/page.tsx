"use client";  // Courses Listing Page

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, UserRound } from "lucide-react";

type Course = {
  title: string;
  tags?: string[];
  sessions?: string;
  guide?: string;
  image?: string;
  type?: "Offline" | "Online" | "Doanh nghiệp";
};

const CourseCard = ({ title, tags, sessions, guide, image }: Course) => {
  const courseSlug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  
  return (
    <Link href={`/khoa-hoc/${courseSlug}`} className="block">
      <div className="bg-white shadow-lg rounded-none overflow-hidden border border-amber-50 group cursor-pointer">
        {image ? (
          <div className="relative h-56 w-full">
            <Image 
              src={image} 
              alt={title} 
              fill
              className="object-cover rounded-none" 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="h-56 bg-gray-200 flex items-center justify-center text-gray-500">Image</div>
        )}
        <div className="p-4">
          {tags && (
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block bg-amber-50 text-amber-400 px-3 py-1 rounded-full"
                  style={{ fontFamily: "'SVN-Gilroy', serif", fontSize: "16px" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h3 className="font-bold text-lg mb-2 transition-colors duration-300 group-hover:text-amber-400">{title}</h3>
          <div className="text-sm text-gray-700 mb-3 space-y-1">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-amber-500" />
              <span>
                Số buổi học:{" "}
                <strong
                  style={{
                    fontFamily: "'SVN-Gilroy', serif",
                    fontSize: "15px",
                    fontWeight: 700,
                    fontStyle: "italic",
                  }}
                >
                  {sessions ?? "Sắp ra mắt"}
                </strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <UserRound className="h-4 w-4 text-amber-500" />
              <span>
                Người dẫn đường:{" "}
                <strong
                  style={{
                    fontFamily: "'SVN-Gilroy', serif",
                    fontSize: "15px",
                    fontWeight: 700,
                    fontStyle: "italic",
                  }}
                >
                  {guide ?? "Sắp ra mắt"}
                </strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function Courses() {
  const [activeFilter, setActiveFilter] = useState("Tất cả");

  const filters = ["Tất cả", "Offline", "Online", "Doanh nghiệp"];

  const courses: Course[] = [
    {
      title: "Sức Mạnh Vô Hạn 2",
      tags: ["Doanh nhân", "Doanh nghiệp"],
      sessions: "6 tháng online và 4,5 ngày offline",
      guide: "Nhile x Melvin",
      image: "/sucmanhvohan.png",
      type: "Offline",
    },
    {
      title: "Là Chính Mình 3",
      tags: ["Phát triển bản thân", "Là chính mình"],
      sessions: "3,5 ngày",
      guide: "Nhile x Guest Instructors",
      image: "/lachinhminh.png",
      type: "Offline",
    },
    {
      title: "Gen AI 101",
      tags: ["AI", "Phát triển kỹ năng số"],
      sessions: "2 buổi",
      guide: "Linda Hui",
      image: "/genai.png",
    },
    {
      title: "Thương Hiệu Của Bạn",
      tags: ["Thương hiệu", "Doanh nghiệp"],
      sessions: "2 buổi",
      guide: "Nhile",
      image: "/thuonghieu.jpg",
    },
    {
      title: "Cuộc Sống Của Bạn",
      tags: ["Cảm xúc", "Phát triển bản thân"],
      sessions: "2 buổi",
      guide: "Nhile",
      image: "/cuocsongcuaban.jpg",
    },
    {
      title: "AI For Business Communication",
      tags: ["AI"],
      sessions: "2 buổi",
      guide: "Linda Hui",
      image: "/aibusiness.png",
    },
    {
      title: "AI In Marketing",
      tags: ["Marketing số"],
      sessions: "2 buổi",
      guide: "Linda Hui",
      image: "/aiinmarketing.png",
    },
    { title: "Sắp Ra Mắt", tags: ["Sắp ra mắt"], image: "/coming Soon.png" },
    { title: "Sắp Ra Mắt", tags: ["Sắp ra mắt"], image: "/coming Soon.png" },
  ];

  return (
    <div className="min-h-screen pt-32 lg:pt-40">{/* offset for fixed header */}
      <section className="max-w-[1200px] mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-amber-400 text-center mb-4 pb-3">
          CÁC KHÓA HỌC CHẤT LƯỢNG
        </h1>
        <div className="flex justify-center items-center gap-0 mb-8">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`transition-all duration-300 flex items-center justify-center h-12 px-4 text-lg font-semibold cursor-pointer border-t-0 border-b-2 border-l-0 border-r-0 rounded-none whitespace-nowrap ${
                activeFilter === filter
                  ? "text-amber-400 border-amber-400"
                  : "text-gray-600 border-transparent"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {courses
            .filter((course) => {
              // Loại bỏ các khóa "Sắp Ra Mắt" khỏi các filter (trừ "Tất cả")
              const isComingSoon = course.title === "Sắp Ra Mắt";
              
              if (activeFilter === "Tất cả") return true;
              if (isComingSoon) return false; // Loại bỏ "Sắp Ra Mắt" khỏi các filter khác
              
              if (activeFilter === "Offline") return course.type === "Offline";
              if (activeFilter === "Online") return course.type !== "Offline";
              if (activeFilter === "Doanh nghiệp") return course.tags?.includes("Doanh nghiệp");
              
              return false;
            })
            .map((course) => (
              <CourseCard key={course.title} {...course} />
            ))}
        </div>
      </section>
    </div>
  );
}

