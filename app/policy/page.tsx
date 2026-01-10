'use client'

import Link from 'next/link'
import { useLanguage } from "@/lib/LanguageContext";

export default function PolicyPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F2F2F7] py-8 sm:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-ios-xl shadow-ios-card p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 text-primary">{t("policy.title")}</h1>

          <div className="space-y-6 sm:space-y-8">
            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">{t("policy.sections.intro.title")}</h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {t("policy.sections.intro.content")}
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">{t("policy.sections.info_collected.title")}</h2>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">{t("policy.sections.info_collected.personal.title")}</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                    <li>{t("policy.sections.info_collected.personal.list.0")}</li>
                    <li>{t("policy.sections.info_collected.personal.list.1")}</li>
                    <li>{t("policy.sections.info_collected.personal.list.2")}</li>
                    <li>{t("policy.sections.info_collected.personal.list.3")}</li>
                    <li>{t("policy.sections.info_collected.personal.list.4")}</li>
                    <li>{t("policy.sections.info_collected.personal.list.5")}</li>
                    <li>{t("policy.sections.info_collected.personal.list.6")}</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">{t("policy.sections.info_collected.study.title")}</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                    <li>{t("policy.sections.info_collected.study.list.0")}</li>
                    <li>{t("policy.sections.info_collected.study.list.1")}</li>
                    <li>{t("policy.sections.info_collected.study.list.2")}</li>
                    <li>{t("policy.sections.info_collected.study.list.3")}</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">{t("policy.sections.info_collected.tech.title")}</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                    <li>{t("policy.sections.info_collected.tech.list.0")}</li>
                    <li>{t("policy.sections.info_collected.tech.list.1")}</li>
                    <li>{t("policy.sections.info_collected.tech.list.2")}</li>
                    <li>{t("policy.sections.info_collected.tech.list.3")}</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">{t("policy.sections.purpose.title")}</h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary/20 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 mt-1">
                    <span className="text-xs text-primary font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base">{t("policy.sections.purpose.list.0")}</p>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary/20 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 mt-1">
                    <span className="text-xs text-primary font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base">{t("policy.sections.purpose.list.1")}</p>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary/20 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 mt-1">
                    <span className="text-xs text-primary font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base">{t("policy.sections.purpose.list.2")}</p>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary/20 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 mt-1">
                    <span className="text-xs text-primary font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base">{t("policy.sections.purpose.list.3")}</p>
                </div>
                <div className="flex items-start">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary/20 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 mt-1">
                    <span className="text-xs text-primary font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base">{t("policy.sections.purpose.list.4")}</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">{t("policy.sections.security.title")}</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-ios-lg p-4 sm:p-6">
                <h3 className="font-semibold mb-3 text-blue-800 text-sm sm:text-base">{t("policy.sections.security.box_title")}</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 sm:space-y-2 text-sm sm:text-base">
                  <li>{t("policy.sections.security.list.0")}</li>
                  <li>{t("policy.sections.security.list.1")}</li>
                  <li>{t("policy.sections.security.list.2")}</li>
                  <li>{t("policy.sections.security.list.3")}</li>
                  <li>{t("policy.sections.security.list.4")}</li>
                  <li>{t("policy.sections.security.list.5")}</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">{t("policy.sections.sharing.title")}</h2>
              <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
                {t("policy.sections.sharing.content")}
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 sm:space-y-2 text-sm sm:text-base">
                <li>{t("policy.sections.sharing.list.0")}</li>
                <li>{t("policy.sections.sharing.list.1")}</li>
                <li>{t("policy.sections.sharing.list.2")}</li>
                <li>{t("policy.sections.sharing.list.3")}</li>
                <li>{t("policy.sections.sharing.list.4")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">{t("policy.sections.rights.title")}</h2>
              <div className="space-y-3 sm:space-y-4">
                <div className="border border-gray-200 rounded-ios-lg p-3 sm:p-4">
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">{t("policy.sections.rights.items.0.title")}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {t("policy.sections.rights.items.0.content")}
                  </p>
                </div>

                <div className="border border-gray-200 rounded-ios-lg p-3 sm:p-4">
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">{t("policy.sections.rights.items.1.title")}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {t("policy.sections.rights.items.1.content")}
                  </p>
                </div>

                <div className="border border-gray-200 rounded-ios-lg p-3 sm:p-4">
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">{t("policy.sections.rights.items.2.title")}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {t("policy.sections.rights.items.2.content")}
                  </p>
                </div>

                <div className="border border-gray-200 rounded-ios-lg p-3 sm:p-4">
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">{t("policy.sections.rights.items.3.title")}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {t("policy.sections.rights.items.3.content")}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">{t("policy.sections.cookies.title")}</h2>
              <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
                {t("policy.sections.cookies.content1")}
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                <li>{t("policy.sections.cookies.list.0")}</li>
                <li>{t("policy.sections.cookies.list.1")}</li>
                <li>{t("policy.sections.cookies.list.2")}</li>
                <li>{t("policy.sections.cookies.list.3")}</li>
              </ul>
              <p className="text-gray-700 mt-3 sm:mt-4 text-sm sm:text-base">
                {t("policy.sections.cookies.content2")}
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">{t("policy.sections.storage.title")}</h2>
              <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
                {t("policy.sections.storage.content1")}
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                <li>{t("policy.sections.storage.list.0")}</li>
                <li>{t("policy.sections.storage.list.1")}</li>
                <li>{t("policy.sections.storage.list.2")}</li>
                <li>{t("policy.sections.storage.list.3")}</li>
              </ul>
              <p className="text-gray-700 mt-3 sm:mt-4 text-sm sm:text-base">
                {t("policy.sections.storage.content2")}
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">{t("policy.sections.changes.title")}</h2>
              <p className="text-gray-700 text-sm sm:text-base">
                {t("policy.sections.changes.content")}
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">{t("policy.sections.contact.title")}</h2>
              <div className="bg-gray-50 rounded-ios-lg p-4 sm:p-6">
                <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
                  {t("policy.sections.contact.content")}
                </p>
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  <div>
                    <p className="font-semibold text-sm sm:text-base">{t("policy.sections.contact.items.0.label")}</p>
                    <p className="text-primary text-sm sm:text-base">{t("policy.sections.contact.items.0.value")}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">{t("policy.sections.contact.items.1.label")}</p>
                    <p className="text-primary text-sm sm:text-base">{t("policy.sections.contact.items.1.value")}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">{t("policy.sections.contact.items.2.label")}</p>
                    <p className="text-gray-600 text-sm sm:text-base">{t("policy.sections.contact.items.2.value")}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">{t("policy.sections.contact.items.3.label")}</p>
                    <p className="text-gray-600 text-sm sm:text-base">{t("policy.sections.contact.items.3.value")}</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">{t("policy.sections.effectiveness.title")}</h2>
              <p className="text-gray-700 text-sm sm:text-base">
                {t("policy.sections.effectiveness.content")}
              </p>
            </section>
          </div>

          <div className="mt-6 sm:mt-8 text-center">
            <Link href="/" className="inline-block bg-primary hover:bg-primary-dark text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-ios-sm ios-haptic-active text-sm sm:text-base">
              {t("policy.back_home")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}