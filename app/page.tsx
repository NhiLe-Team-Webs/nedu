"use client";

import YouTube from "react-youtube";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { courses } from "@/data/courses";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Courses from "./Courses";
import Mission from "./Mission";
import Supports from "./Support";
import Testimonials from "./Testimonials";
import Partners from "./Partners";
import Connection from "./Connection";
import Privilege from "./Privilege";

export default function Home() {
  const youtubeOpts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      mute: 1,
      controls: 0,
      modestbranding: 1,
      rel: 0,
    },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with YouTube Video */}
      <section className="bg-black">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <div className="w-full">
            <div className="relative pb-[56.25%] sm:pb-[56.25%] h-0 overflow-hidden rounded-lg sm:rounded-lg">
              <div className="absolute top-0 left-0 w-full h-full">
                <YouTube
                  videoId="HJ1x2IRMoqM"
                  opts={youtubeOpts}
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Courses />
      <Mission />
      <Supports />
      <Testimonials />
      <Privilege />
      <Partners />
      <Connection />
    </div>
  );
}
