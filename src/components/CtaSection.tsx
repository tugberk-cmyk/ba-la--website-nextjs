"use client";

import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

const CtaSection = () => {
  const { t } = useLanguage();
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-2xl bg-foreground p-12 md:p-16 text-center">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
              {t("cta.title1")}
              <br />
              {t("cta.title2")}
            </h2>
            <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
              {t("cta.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-md bg-white text-foreground hover:bg-white/90 active:scale-[0.98] transition-all"
              >
                {t("cta.primary")}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/iletisim"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-md border border-white/20 text-white hover:bg-white/10 active:scale-[0.98] transition-all"
              >
                {t("cta.secondary")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
