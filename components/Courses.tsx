"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight, Calendar } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const slides = [
  {
    id: 1,
    image: "/lachinhminh.jpg",
    date: "14-17 tháng 8 năm 2025",
    title: "LÀ CHÍNH MÌNH",
    label: "Khóa học sắp diễn ra",
  },
  {
    id: 2,
    image: "/THCB.jpg",
    date: "10/10/2024",
    title: "KỸ NĂNG GIAO TIẾP VÀ THUYẾT TRÌNH",
    label: "Giới thiệu",
  },
  {
    id: 3,
    image: "/CSCB.jpg",
    date: "15/11/2024",
    title: "QUẢN LÝ THỜI GIAN VÀ NĂNG SUẤT LÀM VIỆC",
    label: "Các khóa học Online",
  },
];

const Courses: React.FC = () => {
  const [api, setApi] = React.useState<CarouselApi | undefined>(undefined);
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      try {
        api.scrollNext();
      } catch (e) {}
    }, 4000);

    return () => clearInterval(interval);
  }, [api]);

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      try {
        const idx = api.selectedScrollSnap();
        setActive(typeof idx === "number" ? idx : 0);
      } catch (e) {}
    };

    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <section className="relative flex items-center justify-center overflow-hidden">
      <div className="relative flex flex-col justify-center items-center h-screen w-full max-w-[1200px]">
        <Image
          src="/coming-bg.jpg"
          alt="bg"
          fill
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.4)]" />
        <div className="container mx-auto px-4 z-10 w-full">
          <h2 className="md:text-5xl font-extrabold text-white text-center mb-8 uppercase">
            Người Việt, làm hàng Việt, cho người Việt
          </h2>

          <div className="relative w-full">
            <div className="mx-auto max-w-[800px]">
              <Carousel setApi={setApi} opts={{ loop: true }} className="">
                <CarouselContent className="items-center">
                  {slides.map((s) => (
                    <CarouselItem key={s.id}>
                      <div className="bg-[rgba(0,0,0,0.7)] rounded-md p-[16px] flex flex-col md:flex-row items-center gap-6 shadow-lg">
                        <div className="w-full md:w-80 flex-shrink-0">
                          <div className="bg-white rounded-md overflow-hidden shadow-sm flex items-center justify-center">
                            <Image
                              src={s.image}
                              alt={s.title}
                              width={400}
                              height={160}
                              className="w-full h-auto md:h-40 object-cover"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col justify-between text-white h-full">
                          <div className="flex flex-col items-start">
                            <p className="text-[16px] text-white/80">
                              {s.label}
                            </p>
                            <h3 className="text-xl md:text-[24px] font-bold uppercase leading-tight mb-4">
                              {s.title}
                            </h3>
                          </div>
                          
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex flex-row items-center justify-between">
                              <Calendar className="w-5 h-5 text-white/90 mr-2" />
                              <span className="text-sm text-white/90 font-semibold">
                                {s.date}
                              </span>
                            </div>
                              <Button
                                variant="hero"
                                size="icon"
                                className="rounded-b-full rounded-t-full text-[16px] uppercase !bg-[#F7B50C] !text-white w-auto flex items-center justify-center py-[12px] px-[20px]"
                              >
                                Đăng ký ngay
                                <ChevronRight className="font-extrabold" />
                              </Button>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Courses;
