"use client";

import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import HeroAnimation from "@/components/HeroAnimation";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
const chakraLogo = "/logos/chakra.png";
const denizBankLogo = "/logos/denizbank.png";
const desaLogo = "/logos/desa.png";
const paytrLogo = "/logos/paytr.webp";
const pentiLogo = "/logos/penti.png";
const watsonsLogo = "/logos/watsons.png";
const underArmourLogo = "/logos/under-armour.png";

const START_COUNT = 43546;
const EPOCH = new Date("2026-02-20T12:00:00+03:00").getTime();
const RATE_PER_ACTIVE_SECOND = 0.018;
const ACTIVE_START_HOUR = 7;
const ACTIVE_END_HOUR = 23;
const ACTIVE_HOURS_PER_DAY = ACTIVE_END_HOUR - ACTIVE_START_HOUR;

const getActiveSecondsSinceEpoch = () => {
  const now = Date.now();
  const elapsedMs = Math.max(0, now - EPOCH);
  const elapsedDays = elapsedMs / (1000 * 60 * 60 * 24);
  const fullDays = Math.floor(elapsedDays);
  let activeSeconds = fullDays * ACTIVE_HOURS_PER_DAY * 3600;
  const turkeyNow = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Istanbul" }));
  const currentHour = turkeyNow.getHours() + turkeyNow.getMinutes() / 60 + turkeyNow.getSeconds() / 3600;
  if (currentHour >= ACTIVE_START_HOUR && currentHour < ACTIVE_END_HOUR) {
    activeSeconds += (currentHour - ACTIVE_START_HOUR) * 3600;
  } else if (currentHour >= ACTIVE_END_HOUR) {
    activeSeconds += ACTIVE_HOURS_PER_DAY * 3600;
  }
  return activeSeconds;
};

const getCurrentCount = () => {
  const activeSeconds = getActiveSecondsSinceEpoch();
  return START_COUNT + Math.floor(activeSeconds * RATE_PER_ACTIVE_SECOND);
};

const useContentCounter = () => {
  const [displayCount, setDisplayCount] = useState(getCurrentCount);
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayCount(getCurrentCount());
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return displayCount;
};

const HeroSection = () => {
  const contentCount = useContentCounter();
  const { t, language } = useLanguage();

  return (
    <section className="relative pt-36 pb-0 overflow-hidden bg-background">
      <div className="relative max-w-7xl mx-auto px-6 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col items-start">
            <p className="text-sm text-muted-foreground mb-6 animate-fade-in">
              <span className="font-semibold text-foreground">{t("hero.counter")}</span>{" "}
              <span className="tabular-nums text-foreground font-normal">
                {contentCount.toLocaleString(language === "tr" ? "tr-TR" : "en-US")}
              </span>
            </p>
            <h1 className="text-5xl md:text-[58px] font-black tracking-tight leading-[1.05] mb-6 animate-fade-up">
              <span className="text-foreground">{t("hero.headline")}</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-snug mb-10 animate-fade-up [animation-delay:0.1s]">
              {t("hero.subheadline")}
            </p>
            <div className="flex flex-row gap-3 items-center animate-fade-up [animation-delay:0.2s]">
              <Link
                href="/demo"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-md bg-foreground text-background hover:bg-foreground/85 transition-colors"
              >
                {t("hero.cta")}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/nasil-calisir"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-md border border-border text-foreground hover:bg-secondary transition-colors"
              >
                {t("hero.secondary")}
              </Link>
            </div>
          </div>
          <div className="hidden md:block" />
        </div>
      </div>

      <div
        className="hidden md:block absolute right-0 pointer-events-auto z-0"
        style={{ top: "0", left: "35%", height: "520px" }}
      >
        <HeroAnimation />
      </div>

      {/* Trusted brands — marquee */}
      <div className="relative max-w-full mt-12 animate-fade-up [animation-delay:0.4s]">
        <div className="h-px bg-border w-full" />
        <div className="overflow-hidden py-7">
          <div className="flex animate-marquee whitespace-nowrap">
            {[
              { src: chakraLogo, alt: "Chakra", maxW: "80px" },
              { src: denizBankLogo, alt: "DenizBank", maxW: "120px" },
              { src: desaLogo, alt: "DESA", maxW: "80px" },
              { src: paytrLogo, alt: "PayTR", maxW: "90px" },
              { src: pentiLogo, alt: "Penti", maxW: "64px" },
              { src: watsonsLogo, alt: "Watsons", maxW: "100px" },
              { src: underArmourLogo, alt: "Under Armour", maxW: "64px" },
              { src: chakraLogo, alt: "Chakra", maxW: "80px" },
              { src: denizBankLogo, alt: "DenizBank", maxW: "120px" },
              { src: desaLogo, alt: "DESA", maxW: "80px" },
              { src: paytrLogo, alt: "PayTR", maxW: "90px" },
              { src: pentiLogo, alt: "Penti", maxW: "64px" },
              { src: watsonsLogo, alt: "Watsons", maxW: "100px" },
              { src: underArmourLogo, alt: "Under Armour", maxW: "64px" },
            ].map((logo, i) => (
              <div key={i} className="inline-flex items-center justify-center mx-14 shrink-0" style={{ width: logo.maxW }}>
                <img src={logo.src} alt={logo.alt} className="h-6 w-full object-contain object-center" />
              </div>
            ))}
          </div>
        </div>
        <div className="h-px bg-border w-full" />
      </div>
    </section>
  );
};

export default HeroSection;
