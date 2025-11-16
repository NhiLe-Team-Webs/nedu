"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const slides = [
  {
    id: 1,
    image: '/lachinhminh.jpg',
    date: "02/09/2024",
    title: "KHÓA HỌC ONLINE THAY TƯ DUY ĐỔI CUỘC ĐỜI TỪ DIỄN GIẢ NHI LÊ",
    label: "Khóa học sắp diễn ra",
  },
  {
    id: 2,
    image: '/THCB.jpg',
    date: "10/10/2024",
    title: "KỸ NĂNG GIAO TIẾP VÀ THUYẾT TRÌNH",
    label: "Giới thiệu",
  },
  {
    id: 3,
    image: '/CSCB.jpg',
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
          src='/coming-bg.jpg'
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
                      <div className="bg-white/5 rounded-md p-6 flex flex-col md:flex-row items-center gap-6 shadow-lg bg-gradient-to-r from-slate-800 via-slate-900 to-black">
                        <div className="w-full md:w-80 flex-shrink-0">
                          <div className="bg-white rounded-md overflow-hidden shadow-sm flex items-center justify-center">
                            <Image
                              src={s.image}
                              alt={s.title}
                              width={400}
                              height={160}
                              className="w-full h-44 md:h-40 object-cover"
                            />
                          </div>
                        </div>

                        <div className="flex-1 text-white">
                          <div className="flex items-center gap-4 mb-4">
                            <Calendar className="w-5 h-5 text-white/90" />
                            <span className="text-sm text-white/90">
                              {s.date}
                            </span>
                          </div>

                          <h3 className="text-xl md:text-2xl font-semibold uppercase leading-tight mb-4">
                            {s.title}
                          </h3>

                          <div className="flex items-center gap-4">
                            <Button
                              variant="hero"
                              size="icon"
                              className="!bg-yellow-400 !text-white h-12 w-12 rounded-full flex items-center justify-center"
                            >
                              <ArrowRight className="w-5 h-5" />
                            </Button>

                            <div className="hidden md:block text-white/80">
                              {s.label}
                            </div>
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
