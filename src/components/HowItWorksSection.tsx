"use client";

import { ClipboardList, Sliders, Wand2, Download } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const HowItWorksSection = () => {
  const { t } = useLanguage();

  const steps = [
    {
      number: "01", icon: ClipboardList,
      iconStyle: { bg: "bg-[hsl(220_80%_94%)]", text: "text-[hsl(220_70%_40%)]" },
      title: t("howItWorks.step1.title"), description: t("howItWorks.step1.desc"),
      detail: (
        <div className="flex flex-wrap gap-2">
          {[t("howItWorks.demo.blog"), t("howItWorks.demo.category"), t("howItWorks.demo.product")].map((txt) => (
            <span key={txt} className="px-3 py-1.5 rounded-lg bg-card border border-border text-sm font-medium text-foreground hover:border-foreground/30 cursor-pointer transition-colors">
              {txt}
            </span>
          ))}
        </div>
      ),
    },
    {
      number: "02", icon: Sliders,
      iconStyle: { bg: "bg-[hsl(150_55%_92%)]", text: "text-[hsl(150_50%_32%)]" },
      title: t("howItWorks.step2.title"), description: t("howItWorks.step2.desc"),
      detail: (
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border text-sm">
            <span className="text-muted-foreground">🔑</span>
            <span className="text-foreground font-medium">spor ayakkabı seçimi</span>
          </div>
          <div className="flex gap-2">
            <span className="px-2.5 py-1 rounded-md bg-[hsl(150_55%_92%)] text-[hsl(150_50%_32%)] text-xs font-medium border border-[hsl(150_45%_84%)]">{t("howItWorks.demo.professionalTone")}</span>
            <span className="px-2.5 py-1 rounded-md bg-secondary text-muted-foreground text-xs font-medium border border-border">{t("howItWorks.demo.words")}</span>
          </div>
        </div>
      ),
    },
    {
      number: "03", icon: Wand2,
      iconStyle: { bg: "bg-[hsl(38_90%_92%)]", text: "text-[hsl(32_75%_36%)]" },
      title: t("howItWorks.step3.title"), description: t("howItWorks.step3.desc"),
      detail: (
        <div className="bg-card border border-border rounded-lg p-3 text-xs space-y-1">
          <div className="flex items-center gap-2 text-[hsl(150_50%_32%)] font-semibold text-sm mb-2">
            <span className="animate-pulse">●</span> {t("howItWorks.demo.generating")}
          </div>
          <p className="text-muted-foreground leading-relaxed">
            <span className="text-foreground font-semibold">{t("howItWorks.demo.generatingText")}</span>{" "}
            {t("howItWorks.demo.generatingDesc")}
          </p>
          <div className="flex items-center gap-2 pt-1">
            <div className="flex-1 h-1 rounded-full bg-border overflow-hidden">
              <div className="h-full w-2/3 rounded-full bg-foreground" />
            </div>
            <span className="text-muted-foreground">%67</span>
          </div>
        </div>
      ),
    },
    {
      number: "04", icon: Download,
      iconStyle: { bg: "bg-[hsl(220_80%_94%)]", text: "text-[hsl(220_70%_40%)]" },
      title: t("howItWorks.step4.title"), description: t("howItWorks.step4.desc"),
      detail: (
        <div className="flex flex-wrap gap-2">
          {[t("howItWorks.demo.copy"), t("howItWorks.demo.save"), t("howItWorks.demo.download"), t("howItWorks.demo.edit")].map((action) => (
            <span key={action} className="px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-medium text-foreground hover:border-foreground/30 cursor-pointer transition-colors">
              {action}
            </span>
          ))}
        </div>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border text-xs font-semibold mb-4 uppercase tracking-wider text-muted-foreground">
            {t("howItWorks.badge")}
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4 text-foreground">
            {t("howItWorks.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("howItWorks.subtitle")}
          </p>
        </div>

        <div className="relative flex flex-col gap-0">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;
            return (
              <div key={step.number} className="relative flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-2xl bg-foreground flex items-center justify-center shrink-0 z-10 shadow-md group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 text-background" />
                  </div>
                  {!isLast && (
                    <div className="w-px flex-1 my-2 bg-gradient-to-b from-border to-border/20 min-h-[40px]" />
                  )}
                </div>
                <div className={`flex-1 bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-all duration-300 group ${!isLast ? "mb-6" : ""}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-black text-muted-foreground/50 tracking-widest">{step.number}</span>
                    <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{step.description}</p>
                  {step.detail}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
