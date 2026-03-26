"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function TermsOfServicePage() {
  const { t } = useLanguage();

  return (
    <main className="pt-[60px]">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{t("terms.title")}</h1>
        <p className="text-sm text-muted-foreground mb-12">{t("terms.effectiveDate")}</p>

        <div className="prose-like space-y-10 text-sm leading-relaxed text-foreground/80">
          {[
            { title: "terms.s1.title", paragraphs: ["terms.s1.p1", "terms.s1.p2"] },
            { title: "terms.s2.title", paragraphs: ["terms.s2.p1", "terms.s2.p2"] },
            { title: "terms.s3.title", paragraphs: ["terms.s3.p1", "terms.s3.p2", "terms.s3.p3"] },
            { title: "terms.s4.title", paragraphs: ["terms.s4.p1", "terms.s4.p2"] },
            { title: "terms.s5.title", paragraphs: ["terms.s5.p1", "terms.s5.p2"] },
            { title: "terms.s6.title", paragraphs: ["terms.s6.p1", "terms.s6.p2"] },
            { title: "terms.s7.title", paragraphs: ["terms.s7.p1", "terms.s7.p2"] },
          ].map((section) => (
            <section key={section.title}>
              <h2 className="text-base font-semibold text-foreground mb-3">{t(section.title)}</h2>
              {section.paragraphs.map((p, i) => (
                <p key={p} className={i > 0 ? "mt-3" : ""}>{t(p)}</p>
              ))}
            </section>
          ))}

          {/* Section 8 with list */}
          <section>
            <h2 className="text-base font-semibold text-foreground mb-3">{t("terms.s8.title")}</h2>
            <p>{t("terms.s8.p1")}</p>
            <ul className="mt-3 space-y-2 list-disc list-inside">
              {["terms.s8.l1", "terms.s8.l2", "terms.s8.l3", "terms.s8.l4"].map((key) => (
                <li key={key}>{t(key)}</li>
              ))}
            </ul>
          </section>

          {[
            { title: "terms.s9.title", paragraphs: ["terms.s9.p1"] },
            { title: "terms.s10.title", paragraphs: ["terms.s10.p1"] },
            { title: "terms.s11.title", paragraphs: ["terms.s11.p1", "terms.s11.p2"] },
          ].map((section) => (
            <section key={section.title}>
              <h2 className="text-base font-semibold text-foreground mb-3">{t(section.title)}</h2>
              {section.paragraphs.map((p, i) => (
                <p key={p} className={i > 0 ? "mt-3" : ""}>{t(p)}</p>
              ))}
            </section>
          ))}

          {/* Contact */}
          <section className="border-t border-border pt-8">
            <h2 className="text-base font-semibold text-foreground mb-3">{t("terms.contact.title")}</h2>
            <p>{t("terms.contact.desc")}</p>
            <div className="mt-3 space-y-1">
              <p><span className="font-medium text-foreground">{t("terms.contact.company")}</span> {t("terms.contact.companyName")}</p>
              <p><span className="font-medium text-foreground">{t("terms.contact.address")}</span> {t("terms.contact.addressValue")}</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
