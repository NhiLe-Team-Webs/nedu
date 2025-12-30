"use client";

import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  Users,
  Zap,
} from "lucide-react";
import Organizers from "@/components/Organizers";
import { useLanguage } from "@/lib/LanguageContext";

const neduLogo = "/picture/nedu.svg";
const challengePoster = "/picture/thuthach30day.png";
const tuyetMaiPhoto = "/picture/denise.jpg";

const ThirtyDayPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-20 override-header-spacing font-sans text-gray-900">
      <main className="ios-safe-padding-bottom">
        {/* HERO */}
        <section id="hero" className="pt-8 sm:pt-12 md:pt-16 pb-10 sm:pb-14 text-center px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4 text-primary tracking-tight">
              {t("thirty_day_challenge.title")}
            </h1>
            <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-600 mb-2">
              {t("thirty_day_challenge.topic")} <span className="text-gray-900">{t("thirty_day_challenge.topic_name")}</span>
            </p>
            <div className="mt-2 text-sm sm:text-base bg-white/60 inline-block px-4 py-2 rounded-ios-lg backdrop-blur-sm border border-white/40">
              {t("thirty_day_challenge.cost_label")}{" "}
              <span className="text-green-600 font-extrabold text-lg sm:text-xl">
                396.000 VND
              </span>
            </div>

            <div className="mt-8 sm:mt-10 mb-8 sm:mb-10">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdFUBpOdZTswjw0mraKvyBW0bU5AGK9hrZYatNC2K3gnpQJdQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 sm:px-10 py-3.5 bg-primary text-white font-bold rounded-ios-btn shadow-ios-md hover:shadow-ios-lg hover:brightness-105 active:scale-95 transition-all duration-300 ios-haptic-active text-sm sm:text-base animate-pulse-subtle"
              >
                {t("thirty_day_challenge.register_now")}
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>

            <div className="flex justify-center mb-8">
              <Image
                src={neduLogo}
                alt="N-Education"
                width={600}
                height={150}
                className="w-48 sm:w-64 md:w-80 h-auto object-contain opacity-80"
              />
            </div>

            <div className="flex items-center justify-center">
              <div className="relative rounded-ios-xl shadow-ios-float overflow-hidden border-[6px] border-white max-w-[1000px] w-full">
                <Image
                  src={challengePoster}
                  alt={t("thirty_day_challenge.title")}
                  width={1200}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-10 sm:py-14 max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-ios-xl shadow-ios-card p-6 sm:p-10 border border-white/50 text-center">
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4">
              <span className="font-bold text-gray-900">{t("thirty_day_challenge.about_title")}</span> {t("thirty_day_challenge.about_content")}
            </p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              {t("thirty_day_challenge.about_content_2")}
            </p>
          </div>
        </section>

        {/* 30 NGÀY CÓ GÌ */}
        <section className="py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-4xl font-black text-center text-gray-900 mb-8 sm:mb-12 tracking-tight">
              {t("thirty_day_challenge.what_is_title")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="bg-white rounded-ios-xl shadow-ios-card p-6 sm:p-8 hover:shadow-ios-float transition-all duration-300 border border-white/50 group">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-primary">
                  <Zap size={24} fill="currentColor" />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {t("thirty_day_challenge.card_1.title")}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {t("thirty_day_challenge.card_1.desc")}
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-ios-xl shadow-ios-card p-6 sm:p-8 hover:shadow-ios-float transition-all duration-300 border border-white/50 group">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-primary">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {t("thirty_day_challenge.card_2.title")}
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                  <li className="flex gap-2"><span className="text-primary font-bold">•</span> {t("thirty_day_challenge.card_2.items.0")}</li>
                  <li className="flex gap-2"><span className="text-primary font-bold">•</span> {t("thirty_day_challenge.card_2.items.1")}</li>
                  <li className="flex gap-2"><span className="text-primary font-bold">•</span> {t("thirty_day_challenge.card_2.items.2")}</li>
                  <li className="flex gap-2"><span className="text-primary font-bold">•</span> {t("thirty_day_challenge.card_2.items.3")}</li>
                </ul>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-ios-xl shadow-ios-card p-6 sm:p-8 hover:shadow-ios-float transition-all duration-300 border border-white/50 group">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-primary">
                  <Users size={24} fill="currentColor" />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  {t("thirty_day_challenge.card_3.title")}
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                  <li className="flex gap-2"><span className="text-primary font-bold">•</span> {t("thirty_day_challenge.card_3.items.0")}</li>
                  <li className="flex gap-2"><span className="text-primary font-bold">•</span> {t("thirty_day_challenge.card_3.items.1")}</li>
                  <li className="flex gap-2"><span className="text-primary font-bold">•</span> {t("thirty_day_challenge.card_3.items.2")}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* MENTOR */}
        <section id="mentor" className="py-12 sm:py-20 bg-[#F7F8FC] text-gray-900 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 font-extrabold text-[15vw] sm:text-[10rem] whitespace-nowrap text-[#F8B516]/10 select-none">
              {t("thirty_day_challenge.mentor.bg_text")}
            </div>
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-center mb-10 text-primary uppercase tracking-widest">
              {t("thirty_day_challenge.mentor.title")}
            </h2>

            <div className="bg-white rounded-ios-xl shadow-ios-float overflow-hidden text-gray-900">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-64 md:h-auto">
                  <Image
                    src={tuyetMaiPhoto}
                    alt="Denise"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-8 sm:p-10 flex flex-col justify-center">
                  <div className="mb-6">
                    <h3 className="text-3xl font-black text-gray-900 mb-1">DENISE</h3>
                    <p className="text-primary font-bold tracking-wide uppercase text-sm">{t("thirty_day_challenge.mentor.role")}</p>
                  </div>

                  <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
                    <p>
                      {t("thirty_day_challenge.mentor.desc_1")}
                    </p>
                    <p>
                      {t("thirty_day_challenge.mentor.desc_2")}
                    </p>
                    <div className="bg-gray-50 p-4 rounded-ios-lg border border-gray-100 mt-4">
                      <p className="font-bold text-gray-900 mb-2">{t("thirty_day_challenge.mentor.passion_label")}</p>
                      <p className="text-sm">{t("thirty_day_challenge.mentor.passion_content")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COURSE INFO */}
        <section id="course-info" className="py-12 sm:py-20 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-4xl font-black text-center text-gray-900 mb-8 sm:mb-12 tracking-tight">{t("thirty_day_challenge.info.title")}</h2>

            <div className="bg-white rounded-ios-xl shadow-ios-card p-6 sm:p-10 border border-white/50">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Item */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Zap size={20} fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wide mb-1">{t("thirty_day_challenge.info.topic")}</p>
                    <p className="text-lg font-bold text-gray-900">{t("thirty_day_challenge.topic_name")}</p>
                  </div>
                </div>
                {/* Item */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wide mb-1">{t("thirty_day_challenge.info.time")}</p>
                    <p className="text-lg font-bold text-gray-900">28/12/2025 – 28/01/2026</p>
                  </div>
                </div>
                {/* Item */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Users size={20} fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wide mb-1">{t("thirty_day_challenge.info.instructor")}</p>
                    <p className="text-lg font-bold text-gray-900">Denise</p>
                  </div>
                </div>
                {/* Item */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Users size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wide mb-1">{t("thirty_day_challenge.info.format")}</p>
                    <p className="text-lg font-bold text-gray-900">{t("thirty_day_challenge.info.format_content")}</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 sm:mt-12 text-center border-t border-gray-100 pt-8">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdFUBpOdZTswjw0mraKvyBW0bU5AGK9hrZYatNC2K3gnpQJdQ/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-white font-bold rounded-ios-btn shadow-ios-md hover:shadow-ios-lg hover:brightness-105 active:scale-95 transition-all duration-300 ios-haptic-active text-lg"
                >
                  {t("thirty_day_challenge.info.register")}
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ORGANIZERS - Reuse transparent component or build similar structure */}
        <Organizers />
      </main>
    </div>
  );
};

export default ThirtyDayPage;