"use client";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

const slides = [
  {
    title: "Sức mạnh vô hạn",
    tags: "#doanh nhân #doanh nghiệp",
    desc: "Chương trình học 6 tháng liên tục cùng những Bậc thầy quốc tế, đặt nền móng vững chãi cho sự bắt đầu của những doanh nhân thực thụ.",
    bg: '/sucmanhvohan.jpg',
  },
  {
    title: "Là chính mình",
    tags: "#phát triển bản thân #là chính mình",
    desc: "Ba ngày học trực tiếp với những Người dẫn đường Quốc tế, nơi nhìn rõ cảm xúc của chính bạn và khai mở những khúc mắc - thứ cản bước bạn sống một cuộc đời đáng sống.",
    bg: '/lachinhminh.jpg',
  },
  {
    title: "Find your x-factor preview",
    tags: "#marketing",
    desc: "Kiến thức thực tế và cơ bản về marketing cho doanh nghiệp. Làm sao để khách hàng nhìn thấy sản phẩm và quyết định mua sản phẩm của bạn một cách tự nhiên.",
    bg: '/xfactor-preview.jpg',
  },
  {
    title: "FINd your x-factor",
    tags: "#marketing",
    desc: "Kiến thức marketing chính thống từ Người dẫn đường Melvin Soh. Cách bước cụ thể để khách hàng tiềm năng nhìn thấy và chọn mua sản phẩm từ bạn.",
    bg: '/x-factor.jpg',
  },
  {
    title: "Thương hiệu của bạn",
    tags: "#thương hiệu #tài chính",
    desc: "Kiến thức cho doanh nhân, bắt đầu mở doanh nghiệp hay cải tổ doanh nghiệp gia đình",
    bg: '/THCB.jpg',
  },
  {
    title: "Cuộc sống của bạn",
    tags: "#phát triển bản thân #cảm xúc",
    desc: "Hiểu sâu hơn về cảm xúc, khai phá những góc khuất cảm xúc của chính mình và sự khởi đầu cho con đường phát triển bản thân",
    bg: '/CSCB.jpg',
  },
];

const Programs = () => {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [selected, setSelected] = React.useState(0);

  // autoplay interval id
  React.useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      try {
        // advance to next slide; embla will handle looping if enabled
        api.scrollNext();
      } catch (e) {
        // ignore
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [api]);

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <section id="program" className="relative items-center h-screen">
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        className="w-full max-w-[1280px] mx-auto relative h-full"
      >
        <CarouselContent className="h-full">
          {slides.map((s, i) => (
            <CarouselItem key={i}>
              <div
                className="h-screen w-full bg-center bg-cover relative flex flex-col justify-center items-center text-center px-6"
                style={{ backgroundImage: `url(${s.bg})` }}
              >
                {/* overlay to darken and match theme */}
                <div className="absolute inset-0 bg-black/60 object-fit" />

                <div className="relative z-10 max-w-3xl">
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white uppercase mb-6 tracking-tight">
                    {s.title}
                  </h2>

                  <div className="inline-block border border-white/40 rounded-full px-6 py-2 text-white/90 mb-6">
                    {s.tags}
                  </div>

                  <p className="text-lg md:text-xl text-white/90 mt-6">
                    {s.desc}
                  </p>

                  <a
                    href="#"
                    className="inline-flex items-center mt-8 bg-amber-400 hover:bg-amber-500 text-white font-semibold px-6 py-3 rounded-full"
                  >
                    Đăng ký ngay
                    <svg
                      className="ml-3 w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 12h14M13 5l7 7-7 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* bullets (inside carousel, centered) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => api?.scrollTo(i)}
              className={
                selected === i
                  ? "w-4 h-4 rounded-full bg-amber-400 border-2 border-white shadow-lg"
                  : "w-3 h-3 rounded-full bg-white/90 border-2 border-white/30 shadow-lg"
              }
            />
          ))}
        </div>

        {/* prev / next controls */}
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default Programs;