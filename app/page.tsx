"use client";

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
  return (
    <div className="min-h-screen">
      {/* Hero Section with Google Drive Video */}
      <section className="bg-black">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <div className="w-full">
            <div className="relative pb-[56.25%] sm:pb-[56.25%] h-0 overflow-hidden rounded-lg sm:rounded-lg">
              <div className="absolute top-0 left-0 w-full h-full">
                <video
                  src="/videos/IMG_6784.MP4"
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  // playsInline
                  controls
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
