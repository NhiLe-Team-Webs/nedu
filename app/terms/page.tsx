'use client'

import Link from 'next/link'
import { useLanguage } from "@/lib/LanguageContext";

export default function TermsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#F2F2F7] py-8 sm:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-ios-xl shadow-ios-card p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 text-primary">{t("terms.title")}</h1>

          <div className="space-y-6 sm:space-y-8">
            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">{t("terms.sections.intro.title")}</h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {t("terms.sections.intro.content")}
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">{t("terms.sections.definitions.title")}</h2>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-sm sm:text-base">{t("terms.sections.definitions.items.0.label")}</p>
                  <p className="text-gray-600 text-sm sm:text-base">{t("terms.sections.definitions.items.0.value")}</p>
                </div>
                <div>
                  <p className="font-semibold text-sm sm:text-base">{t("terms.sections.definitions.items.1.label")}</p>
                  <p className="text-gray-600 text-sm sm:text-base">{t("terms.sections.definitions.items.1.value")}</p>
                </div>
                <div>
                  <p className="font-semibold text-sm sm:text-base">{t("terms.sections.definitions.items.2.label")}</p>
                  <p className="text-gray-600 text-sm sm:text-base">{t("terms.sections.definitions.items.2.value")}</p>
                </div>
                <div>
                  <p className="font-semibold text-sm sm:text-base">{t("terms.sections.definitions.items.3.label")}</p>
                  <p className="text-gray-600 text-sm sm:text-base">{t("terms.sections.definitions.items.3.value")}</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">{t("terms.sections.registration.title")}</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">{t("terms.sections.registration.items.0.title")}</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                    <li>{t("terms.sections.registration.items.0.list.0")}</li>
                    <li>{t("terms.sections.registration.items.0.list.1")}</li>
                    <li>{t("terms.sections.registration.items.0.list.2")}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">{t("terms.sections.registration.items.1.title")}</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                    <li>{t("terms.sections.registration.items.1.list.0")}</li>
                    <li>{t("terms.sections.registration.items.1.list.1")}</li>
                    <li>{t("terms.sections.registration.items.1.list.2")}</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">{t("terms.sections.courses.title")}</h2>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">{t("terms.sections.courses.items.0.title")}</h3>
                  <ol className="list-decimal list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                    <li>{t("terms.sections.courses.items.0.list.0")}</li>
                    <li>{t("terms.sections.courses.items.0.list.1")}</li>
                    <li>{t("terms.sections.courses.items.0.list.2")}</li>
                    <li>{t("terms.sections.courses.items.0.list.3")}</li>
                  </ol>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">{t("terms.sections.courses.items.1.title")}</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                    <li>{t("terms.sections.courses.items.1.list.0")}</li>
                    <li>{t("terms.sections.courses.items.1.list.1")}</li>
                    <li>{t("terms.sections.courses.items.1.list.2")}</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">{t("terms.sections.payment.title")}</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">{t("terms.sections.payment.items.0.title")}</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                    <li>{t("terms.sections.payment.items.0.list.0")}</li>
                    <li>{t("terms.sections.payment.items.0.list.1")}</li>
                    <li>{t("terms.sections.payment.items.0.list.2")}</li>
                    <li>{t("terms.sections.payment.items.0.list.3")}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">{t("terms.sections.payment.items.1.title")}</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                    <li>{t("terms.sections.payment.items.1.list.0")}</li>
                    <li>{t("terms.sections.payment.items.1.list.1")}</li>
                    <li>{t("terms.sections.payment.items.1.list.2")}</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">{t("terms.sections.rights.title")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h3 className="font-semibold mb-3 text-green-700 text-sm sm:text-base">{t("terms.sections.rights.user_rights.title")}</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                    <li>{t("terms.sections.rights.user_rights.list.0")}</li>
                    <li>{t("terms.sections.rights.user_rights.list.1")}</li>
                    <li>{t("terms.sections.rights.user_rights.list.2")}</li>
                    <li>{t("terms.sections.rights.user_rights.list.3")}</li>
                    <li>{t("terms.sections.rights.user_rights.list.4")}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 text-red-700 text-sm sm:text-base">{t("terms.sections.rights.user_obligations.title")}</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                    <li>{t("terms.sections.rights.user_obligations.list.0")}</li>
                    <li>{t("terms.sections.rights.user_obligations.list.1")}</li>
                    <li>{t("terms.sections.rights.user_obligations.list.2")}</li>
                    <li>{t("terms.sections.rights.user_obligations.list.3")}</li>
                    <li>{t("terms.sections.rights.user_obligations.list.4")}</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">{t("terms.sections.ip.title")}</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-ios-lg p-4 sm:p-6">
                <h3 className="font-semibold mb-3 text-yellow-800 text-sm sm:text-base">{t("terms.sections.ip.subtitle")}</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 sm:space-y-2 text-sm sm:text-base">
                  <li>{t("terms.sections.ip.list.0")}</li>
                  <li>{t("terms.sections.ip.list.1")}</li>
                  <li>{t("terms.sections.ip.list.2")}</li>
                  <li>{t("terms.sections.ip.list.3")}</li>
                  <li>{t("terms.sections.ip.list.4")}</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">{t("terms.sections.privacy.title")}</h2>
              <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
                {t("terms.sections.privacy.content")}
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                <li>{t("terms.sections.privacy.list.0")}</li>
                <li>{t("terms.sections.privacy.list.1")}</li>
                <li>{t("terms.sections.privacy.list.2")}</li>
                <li>{t("terms.sections.privacy.list.3")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">{t("terms.sections.liability.title")}</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">{t("terms.sections.liability.no_liability.title")}</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                    <li>{t("terms.sections.liability.no_liability.list.0")}</li>
                    <li>{t("terms.sections.liability.no_liability.list.1")}</li>
                    <li>{t("terms.sections.liability.no_liability.list.2")}</li>
                    <li>{t("terms.sections.liability.no_liability.list.3")}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">{t("terms.sections.liability.max_liability.title")}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {t("terms.sections.liability.max_liability.content")}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">{t("terms.sections.termination.title")}</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">{t("terms.sections.termination.edu_rights.title")}</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm sm:text-base">
                    <li>{t("terms.sections.termination.edu_rights.list.0")}</li>
                    <li>{t("terms.sections.termination.edu_rights.list.1")}</li>
                    <li>{t("terms.sections.termination.edu_rights.list.2")}</li>
                    <li>{t("terms.sections.termination.edu_rights.list.3")}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">{t("terms.sections.termination.user_rights.title")}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {t("terms.sections.termination.user_rights.content")}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">{t("terms.sections.dispute.title")}</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">{t("terms.sections.dispute.items.0.title")}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {t("terms.sections.dispute.items.0.content")}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">{t("terms.sections.dispute.items.1.title")}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {t("terms.sections.dispute.items.1.content")}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">{t("terms.sections.dispute.items.2.title")}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {t("terms.sections.dispute.items.2.content")}
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">{t("terms.sections.general.title")}</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1 sm:space-y-2 text-sm sm:text-base">
                <li>{t("terms.sections.general.list.0")}</li>
                <li>{t("terms.sections.general.list.1")}</li>
                <li>{t("terms.sections.general.list.2")}</li>
                <li>{t("terms.sections.general.list.3")}</li>
                <li>{t("terms.sections.general.list.4")}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">{t("terms.sections.contact.title")}</h2>
              <div className="bg-gray-50 rounded-ios-lg p-4 sm:p-6">
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  <div>
                    <p className="font-semibold text-sm sm:text-base">{t("terms.sections.contact.items.0.label")}</p>
                    <p className="text-gray-600 text-sm sm:text-base">{t("terms.sections.contact.items.0.value")}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">{t("terms.sections.contact.items.1.label")}</p>
                    <p className="text-gray-600 text-sm sm:text-base">{t("terms.sections.contact.items.1.value")}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">{t("terms.sections.contact.items.2.label")}</p>
                    <p className="text-gray-600 text-sm sm:text-base">{t("terms.sections.contact.items.2.value")}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">{t("terms.sections.contact.items.3.label")}</p>
                    <p className="text-primary text-sm sm:text-base">{t("terms.sections.contact.items.3.value")}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">{t("terms.sections.contact.items.4.label")}</p>
                    <p className="text-primary text-sm sm:text-base">{t("terms.sections.contact.items.4.value")}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">{t("terms.sections.contact.items.5.label")}</p>
                    <p className="text-primary text-sm sm:text-base">{t("terms.sections.contact.items.5.value")}</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-primary">{t("terms.sections.effectiveness.title")}</h2>
              <p className="text-gray-700 text-sm sm:text-base">
                {t("terms.sections.effectiveness.content")}
              </p>
            </section>
          </div>

          <div className="mt-6 sm:mt-8 text-center">
            <Link href="/" className="inline-block bg-primary hover:bg-primary-dark text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-ios-sm ios-haptic-active text-sm sm:text-base">
              {t("terms.back_home")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}