"use client";

import CtaSection from "@/components/CtaSection";
import { Tag, CheckCircle2, ShoppingCart, Globe, ArrowRight, Layers, MessageSquare, BarChart3, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

const featuresMeta = [
  { icon: Layers, titleKey: "cat.f1.title", descKey: "cat.f1.desc" },
  { icon: Tag, titleKey: "cat.f2.title", descKey: "cat.f2.desc" },
  { icon: MessageSquare, titleKey: "cat.f3.title", descKey: "cat.f3.desc" },
  { icon: Globe, titleKey: "cat.f4.title", descKey: "cat.f4.desc" },
  { icon: Sparkles, titleKey: "cat.f5.title", descKey: "cat.f5.desc" },
  { icon: ShoppingCart, titleKey: "cat.f6.title", descKey: "cat.f6.desc" },
];

const useCasesMeta = [
  {
    categoryKey: "cat.uc1.category",
    textKey: "cat.uc1.text",
    badgeKey: "cat.uc1.badge",
    badgeStyle: "bg-[hsl(220_80%_94%)] text-[hsl(220_70%_40%)]",
  },
  {
    categoryKey: "cat.uc2.category",
    textKey: "cat.uc2.text",
    badgeKey: "cat.uc2.badge",
    badgeStyle: "bg-[hsl(150_55%_92%)] text-[hsl(150_50%_32%)]",
  },
  {
    categoryKey: "cat.uc3.category",
    textKey: "cat.uc3.text",
    badgeKey: "cat.uc3.badge",
    badgeStyle: "bg-[hsl(38_90%_92%)] text-[hsl(32_75%_36%)]",
  },
];

export default function CategoryContentPage() {
  const { t } = useLanguage();

  return (
    <main className="pt-16">

      {/* Hero */}
      <section className="py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(150_55%_92%)] text-[hsl(150_50%_32%)] text-xs font-semibold mb-6 border border-[hsl(150_45%_84%)]">
                <Tag className="w-3.5 h-3.5" />
                {t("cat.badge")}
              </div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[1.05] mb-6 text-foreground">
                {t("cat.heroTitle1")}<br />
                <span className="text-gradient">{t("cat.heroTitle2")}</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-lg">
                {t("cat.heroSubtitle")}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/en/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-foreground text-background text-sm font-semibold hover:bg-foreground/85 transition-colors">
                  {t("cat.ctaPrimary")} <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="#ornekler" className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-secondary text-foreground text-sm font-semibold hover:bg-border transition-colors">
                  {t("cat.ctaSecondary")}
                </a>
              </div>
            </div>

            {/* Category mockup */}
            <div className="animate-fade-in relative">
              <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-secondary px-4 py-3 border-b border-border flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-border" />
                    <div className="w-3 h-3 rounded-full bg-border" />
                    <div className="w-3 h-3 rounded-full bg-border" />
                  </div>
                  <div className="flex-1 bg-background rounded-md px-3 py-1 text-xs text-muted-foreground border border-border">
                    marka.com/spor-ayakkabilar
                  </div>
                </div>
                <div className="p-6 space-y-5">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-3">{t("cat.topText")}</p>
                    <div className="bg-[hsl(150_55%_92%)] rounded-xl p-4 border border-[hsl(150_45%_84%)] text-sm leading-relaxed text-[hsl(150_40%_25%)]">
                      Her adiminizda farki hissettiren <span className="font-bold">Spor Ayakkabi</span> koleksiyonumuzu kesfedin. Gunluk konfordan maraton performansina kadar ihtiyaciniza ozel modeller...
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-2">{t("cat.keywords")}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {["spor ayakkabi", "kosu ayakkabisi", "antrenman ayakkabisi", "nike", "adidas", "+12"].map((kw) => (
                        <span key={kw} className="px-2 py-0.5 rounded-md bg-secondary border border-border text-xs font-medium text-foreground">
                          #{kw}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-2">{t("cat.faqSection")}</p>
                    <div className="space-y-2">
                      {["Spor ayakkabi nasil secilir?", "Hangi beden bana uyar?", "Iade kosullari nelerdir?"].map((q) => (
                        <div key={q} className="flex items-center gap-2 text-sm text-muted-foreground bg-secondary rounded-lg px-3 py-2">
                          <span className="text-[hsl(150_50%_32%)] font-bold text-xs">S:</span>
                          {q}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white border border-border rounded-xl px-4 py-2.5 shadow-md animate-float">
                <p className="text-xs text-muted-foreground">{t("cat.conversionIncrease")}</p>
                <p className="text-xl font-black text-[hsl(150_50%_32%)]">+2.4x</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="py-24 border-b border-border bg-secondary/40">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight text-foreground mb-4">{t("cat.beforeAfterTitle")}</h2>
            <p className="text-muted-foreground text-lg">{t("cat.beforeAfterSubtitle")}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Before */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-border" />
                <span className="text-sm font-semibold text-muted-foreground">{t("cat.beforeLabel")}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 italic">&quot;{t("cat.beforeText")}&quot;</p>
              <ul className="space-y-1.5">
                {["cat.beforeIssue1", "cat.beforeIssue2", "cat.beforeIssue3"].map((key) => (
                  <li key={key} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="w-4 h-4 rounded-full bg-border flex items-center justify-center text-[10px]">&#x2715;</span>
                    {t(key)}
                  </li>
                ))}
              </ul>
            </div>
            {/* After */}
            <div className="bg-card border border-[hsl(150_45%_84%)] rounded-2xl p-6 bg-[hsl(150_55%_98%)]">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[hsl(150_50%_40%)]" />
                <span className="text-sm font-semibold text-[hsl(150_50%_32%)]">{t("cat.afterLabel")}</span>
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-4">&quot;{t("cat.afterText")}&quot;</p>
              <ul className="space-y-1.5">
                {["cat.afterTag1", "cat.afterTag2", "cat.afterTag3"].map((key) => (
                  <li key={key} className="flex items-center gap-2 text-xs text-[hsl(150_50%_32%)] font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    {t(key)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Example outputs */}
      <section id="ornekler" className="py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight text-foreground mb-4">{t("cat.examplesTitle")}</h2>
            <p className="text-muted-foreground text-lg">{t("cat.examplesSubtitle")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {useCasesMeta.map((uc) => (
              <div key={uc.categoryKey} className="bg-card border border-border rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 hover:shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-foreground">{t(uc.categoryKey)}</h3>
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${uc.badgeStyle}`}>{t(uc.badgeKey)}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(uc.textKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-24 border-b border-border bg-secondary/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight text-foreground mb-4">{t("cat.featuresTitle")}</h2>
            <p className="text-muted-foreground text-lg">{t("cat.featuresSubtitle")}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuresMeta.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.titleKey} className="bg-card border border-border rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 hover:shadow-md">
                  <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-background" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{t(f.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(f.descKey)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaSection />
    </main>
  );
}
