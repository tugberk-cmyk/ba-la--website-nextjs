"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function PrivacyPolicyPage() {
  const { t } = useLanguage();

  return (
    <main className="pt-[60px]">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{t("privacy.title")}</h1>
        <p className="text-sm text-muted-foreground mb-12">{t("privacy.effectiveDate")}</p>

        <div className="prose-like space-y-10 text-sm leading-relaxed text-foreground/80">
          {/* Intro */}
          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">{t("privacy.intro.title")}</h2>
            <p>{t("privacy.intro.p1")}</p>
            <p className="mt-3">{t("privacy.intro.p2")}</p>
            <p className="mt-3">{t("privacy.intro.p3")}</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">{t("privacy.s1.title")}</h2>
            <p>{t("privacy.s1.p1")}</p>
          </section>

          {/* Section 2 with list */}
          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">{t("privacy.s2.title")}</h2>
            <p>{t("privacy.s2.p1")}</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              {["privacy.s2.l1", "privacy.s2.l2", "privacy.s2.l3", "privacy.s2.l4", "privacy.s2.l5"].map((key) => (
                <li key={key}>{t(key)}</li>
              ))}
            </ul>
            <p className="mt-3">{t("privacy.s2.p2")}</p>
          </section>

          {[
            { title: "privacy.s3.title", paragraphs: ["privacy.s3.p1", "privacy.s3.p2"] },
            { title: "privacy.s4.title", paragraphs: ["privacy.s4.p1", "privacy.s4.p2", "privacy.s4.p3"] },
            { title: "privacy.s5.title", paragraphs: ["privacy.s5.p1", "privacy.s5.p2"] },
            { title: "privacy.s6.title", paragraphs: ["privacy.s6.p1"] },
          ].map((section) => (
            <section key={section.title}>
              <h2 className="text-base font-semibold text-foreground mb-3">{t(section.title)}</h2>
              {section.paragraphs.map((p, i) => (
                <p key={p} className={i > 0 ? "mt-3" : ""}>{t(p)}</p>
              ))}
            </section>
          ))}

          {/* Section 7 with list */}
          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">{t("privacy.s7.title")}</h2>
            <p>{t("privacy.s7.p1")}</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              {["privacy.s7.l1", "privacy.s7.l2", "privacy.s7.l3", "privacy.s7.l4", "privacy.s7.l5", "privacy.s7.l6", "privacy.s7.l7", "privacy.s7.l8", "privacy.s7.l9"].map((key) => (
                <li key={key}>{t(key)}</li>
              ))}
            </ul>
          </section>

          {/* Section 8 - Cookies */}
          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">{t("privacy.s8.title")}</h2>
            <p>{t("privacy.s8.p1")}</p>
            <p className="mt-3">{t("privacy.s8.p2")}</p>
            <h3 className="text-sm font-semibold text-foreground mt-5 mb-2">{t("privacy.s8.cookieTypes")}</h3>
            <p>{t("privacy.s8.cookieTypesDesc")}</p>
            <h3 className="text-sm font-semibold text-foreground mt-5 mb-2">{t("privacy.s8.thirdParty")}</h3>
            <p>{t("privacy.s8.thirdPartyDesc")}</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">{t("privacy.s9.title")}</h2>
            <p>{t("privacy.s9.p1")}</p>
          </section>

          {/* Contact */}
          <section className="border-t border-border pt-8">
            <h2 className="text-base font-semibold text-foreground mb-3">{t("privacy.contact.title")}</h2>
            <p>{t("privacy.contact.desc")}</p>
            <div className="mt-3 space-y-1">
              <p><span className="font-medium text-foreground">{t("privacy.contact.company")}</span> {t("privacy.contact.companyName")}</p>
              <p><span className="font-medium text-foreground">{t("privacy.contact.address")}</span> {t("privacy.contact.addressValue")}</p>
              <p><span className="font-medium text-foreground">{t("privacy.contact.web")}</span> {t("privacy.contact.webValue")}</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
