"use client";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";

const images = [
  { src: '/picture/p2.jpg', alt: "post-1", cls: "col-span-1 row-span-1" },
  { src: '/picture/nhile.jpg', alt: "post-2", cls: "col-span-1 row-span-1 md:row-span-2" },
  { src: '/picture/mel.jpg', alt: "post-3", cls: "col-span-2 row-span-1 md:col-span-1 md:row-span-1" },
  { src: '/picture/pauline.jpg', alt: "post-4", cls: "col-span-1 row-span-2" },
  { src: '/picture/p1.jpg', alt: "post-5", cls: "col-span-1 row-span-1" },
  { src: '/picture/p3.jpg', alt: "post-6", cls: "col-span-1 row-span-1" }
];

const Connection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-12 bg-white" id="connection">
      <div className="max-w-[1280px] mx-auto px-[32px]">

        <h3 className="z-10 text-2xl md:text-[36px] font-bold text-center text-[#F7B50C] mb-5">
          {t("connection.heading")}
        </h3>
        <p className="z-10 text-xs md:text-[28px] font-bold text-center text-[#484848] mb-[68px]">
          {t("connection.subheading")}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-6">
          {images.map((img, i) => (
            <div
              key={i}
              className={`${img.cls} overflow-hidden rounded-ios-lg relative bg-white shadow-ios-sm transition-all duration-300 hover:shadow-ios-md`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={400}
                height={400}
                className="w-full h-full object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <a className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-amber-400 text-amber-400 hover:bg-amber-400/10 transition" href="https://www.facebook.com/neducation.sg?locale=vi_VN" target="_blank">
            <Image
              src="/picture/facebook.svg"
              alt="Facebook"
              width={24}
              height={24}
              className="w-6 h-6"
            />
            <span className="font-semibold text-[20px]">N-Education</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Connection;
