"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronRight, Calendar, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { courses } from "@/data/courses";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const slides = [
  {
    id: 2,
    slug: "la-chinh-minh",
    image: "/picture/la_chinh_minh.jpg",
    date: "18/03/2026",
    title: "Là Chính Mình 03",
    label: "Khóa học sắp diễn ra",
  },
  {
    id: 1,
    slug: "suc-manh-vo-han",
    image: "/picture/suc_manh_vo_han.jpg",
    date: "01/04/2026",
    title: "Sức Mạnh Vô Hạn",
    label: "Giới thiệu",
  },
  {
    id: 4,
    slug: "thuong-hieu-cua-ban",
    image: "/picture/thuong_hieu_cua_ban.png",
    date: "01/11/2025",
    title: "Thương Hiệu Của Bạn",
    label: "Các khóa học Online",
  },
  {
    id: 5,
    slug: "cuoc-song-cua-ban",
    image: "/picture/cuoc_song_cua_ban.png",
    date: "01/11/2025",
    title: "Cuộc Sống Của Bạn",
    label: "Các khóa học Online",
  },
  {
    id: 6,
    slug: "ai-for-business-communication",
    image: "/picture/ai_for_business.png",
    date: "30/07/2025",
    title: "AI For Business Communication",
    label: "Các khóa học Online",
  },
  {
    id: 7,
    slug: "ai-in-marketing",
    image: "/picture/ai_in_mkt.png",
    date: "05/08/2025",
    title: "AI In Marketing",
    label: "Các khóa học Online",
  },
];

const Courses: React.FC = () => {
  const [api, setApi] = React.useState<CarouselApi | undefined>(undefined);
  const [active, setActive] = React.useState(0);
  const { addToCart } = useCart();

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
    <section className="relative flex flex-col items-center justify-center overflow-hidden h-screen">
      <div className="relative flex flex-col justify-center items-center h-[90%] w-full max-w-[1200px]">
        <div className="container mx-auto px-4 z-10 w-full">
          <h2 className="relative md:text-5xl font-extrabold text-yellow-500 text-center mb-[32px] uppercase">
            Người Việt, làm hàng Việt, cho người Việt
          </h2>

          <div className="relative w-full my-8">
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
                            <p className="text-[16px] text-white">
                              {s.label}
                            </p>
                            <h3 className="text-xl md:text-[24px] font-bold uppercase leading-tight mb-4 text-white">
                              {s.title}
                            </h3>
                          </div>
                           
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex flex-row items-center justify-between">
                              <Calendar className="w-5 h-5 text-white mr-2" />
                              <span className="text-sm text-white font-semibold">
                                {s.date}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                onClick={() => {
                                  const course = courses.find(c => c.slug === s.slug);
                                  if (course) addToCart(course);
                                }}
                                variant="hero"
                                size="icon"
                                className="btn-secondary rounded-b-full rounded-t-full text-[16px] uppercase w-auto flex items-center justify-center py-[12px] px-[20px]"
                              >
                                <ShoppingCart className="h-3 w-3 mr-1" />
                              </Button>
                              <Button
                                onClick={() => {
                                  const course = courses.find(c => c.slug === s.slug);
                                  if (course) addToCart(course);
                                }}
                                variant="hero"
                                size="icon"
                                className="btn-primary rounded-b-full rounded-t-full text-[16px] uppercase w-auto flex items-center justify-center py-[12px] px-[20px]"
                              >
                                Thêm giỏ hàng
                                <ChevronRight className="font-extrabold" />
                              </Button>
                              <Button
                                onClick={() => {
                                  const course = courses.find(c => c.slug === s.slug);
                                  if (course) {
                                    window.location.href = `/payment/${course.paymentId}`;
                                  }
                                }}
                                variant="hero"
                                size="icon"
                                className="btn-primary rounded-b-full rounded-t-full text-[14px] uppercase w-auto flex items-center justify-center py-[8px] px-[16px]"
                              >
                                Tìm hiểu thêm
                                <ChevronRight className="font-extrabold" />
                              </Button>
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
        <div className="text-center mb-8">
          <a href="/program" className="inline-flex items-center text-white hover:bg-yellow-500 transition-colors bg-yellow-400 px-6 py-3 rounded-full">
            <span className="text-lg font-medium text-white">Khám phá thêm</span>
            <ChevronRight className="ml-2 w-5 h-5 text-white" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Courses;
