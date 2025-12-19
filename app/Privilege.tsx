"use client";

import React, { useMemo } from "react";
import {
  Users,
  Repeat,
  LifeBuoy,
  GlobeIcon,
  NotepadText,
  Headphones,
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const Privilege = () => {
  const { t } = useLanguage();

  const privileges = useMemo(() => [
    {
      icon: <Users />,
      title: t("privilege.items.community.title"),
      description: t("privilege.items.community.description"),
    },
    {
      icon: <Repeat />,
      title: t("privilege.items.lifetime.title"),
      description: t("privilege.items.lifetime.description"),
    },
    {
      icon: <LifeBuoy />,
      title: t("privilege.items.support.title"),
      description: t("privilege.items.support.description"),
    },
    {
      icon: <GlobeIcon />,
      title: t("privilege.items.global.title"),
      description: t("privilege.items.global.description"),
    },
    {
      icon: <Users />,
      title: t("privilege.items.personal.title"),
      description: t("privilege.items.personal.description"),
    },
    {
      icon: <Headphones />,
      title: t("privilege.items.team.title"),
      description: t("privilege.items.team.description"),
    },
  ], [t]);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[68px] font-black text-[#f7b50c] uppercase mb-8">
          {t("privilege.heading")}
        </h2>
        <p className="text-lg text-center text-gray-500 max-w-2xl mx-auto mb-12">
          {t("privilege.subheading")}
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {privileges.map((privilege, index) => (
            <div
              key={index}
              className="bg-white rounded-ios-lg p-6 sm:p-8 shadow-ios-card border border-gray-100 hover:shadow-ios-float transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-start gap-5 transform h-full"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500 transition-all duration-300 hover:scale-110 hover:bg-yellow-200">
                {privilege.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg text-[oklch(55.3% 0.013 58.071)] transition-all duration-200 hover:text-yellow-600">
                  {privilege.title}
                </h3>
                <p className="text-gray-600 transition-all duration-200 hover:text-gray-800">{privilege.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Privilege;
