"use client";

import CtaSection from "@/components/CtaSection";
import { FileText, CheckCircle2, Search, Languages, HelpCircle, BarChart3, ArrowRight, Layers, Zap, MessageSquareText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

const stepsMeta = [
  { num: "01", titleKey: "blog.step1.title", descKey: "blog.step1.desc", color: "bg-[hsl(220_80%_94%)] text-[hsl(220_70%_40%)]" },
  { num: "02", titleKey: "blog.step2.title", descKey: "blog.step2.desc", color: "bg-[hsl(150_55%_92%)] text-[hsl(150_50%_32%)]" },
  { num: "03", titleKey: "blog.step3.title", descKey: "blog.step3.desc", color: "bg-[hsl(38_90%_92%)] text-[hsl(32_75%_36%)]" },
  { num: "04", titleKey: "blog.step4.title", descKey: "blog.step4.desc", color: "bg-[hsl(220_80%_94%)] text-[hsl(220_70%_40%)]" },
];

const featuresMeta = [
  { icon: Layers, titleKey: "blog.f1.title", descKey: "blog.f1.desc" },
  { icon: Search, titleKey: "blog.f2.title", descKey: "blog.f2.desc" },
  { icon: HelpCircle, titleKey: "blog.f3.title", descKey: "blog.f3.desc" },
  { icon: Languages, titleKey: "blog.f4.title", descKey: "blog.f4.desc" },
  { icon: MessageSquareText, titleKey: "blog.f5.title", descKey: "blog.f5.desc" },
  { icon: Zap, titleKey: "blog.f6.title", descKey: "blog.f6.desc" },
];

export default function BlogContentPage() {
  const { t } = useLanguage();

  const metrics = [
    { value: "3.8x", label: t("blog.metric1"), color: "text-[hsl(220_70%_40%)]" },
    { value: "%94", label: t("blog.metric2"), color: "text-[hsl(150_50%_32%)]" },
    { value: "12dk", label: t("blog.metric3"), color: "text-[hsl(32_75%_36%)]" },
  ];

  return (
    <main className="pt-16">

      {/* Hero */}
      <section className="py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(220_80%_94%)] text-[hsl(220_70%_40%)] text-xs font-semibold mb-6 border border-[hsl(220_70%_88%)]">
                <FileText className="w-3.5 h-3.5" />
                {t("blog.badge")}
              </div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[1.05] mb-6 text-foreground">
                {t("blog.heroTitle1")}<br />
                <span className="text-gradient">{t("blog.heroTitle2")}</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-lg">
                {t("blog.heroSubtitle")}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/iletisim" className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-foreground text-background text-sm font-semibold hover:bg-foreground/85 transition-colors">
                  {t("blog.ctaPrimary")} <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/nasil-calisir" className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-secondary text-foreground text-sm font-semibold hover:bg-border transition-colors">
                  {t("blog.ctaSecondary")}
                </Link>
              </div>
            </div>

            {/* Live preview mockup */}
            <div className="animate-fade-in relative">
              <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-secondary px-4 py-3 border-b border-border flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-border" />
                    <div className="w-3 h-3 rounded-full bg-border" />
                    <div className="w-3 h-3 rounded-full bg-border" />
                  </div>
                  <div className="flex-1 bg-background rounded-md px-3 py-1 text-xs text-muted-foreground border border-border">
                    baglac.com.tr/editor
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("blog.seoPreview")}</span>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[hsl(150_55%_92%)] border border-[hsl(150_45%_84%)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[hsl(150_50%_40%)]" />
                      <span className="text-[11px] font-semibold text-[hsl(150_50%_32%)]">{t("blog.seoScore")}</span>
                    </div>
                  </div>

                  <div className="space-y-2 bg-secondary rounded-xl p-4 border border-border">
                    <p className="font-black text-foreground text-sm leading-tight">H1: Kosu Ayakkabisi Secim Rehberi 2026</p>
                    <p className="font-bold text-foreground pl-4 text-[13px]">H2: Ayak Tipine Gore Dogru Secim</p>
                    <p className="text-muted-foreground pl-8 text-xs">H3: Duz Tabanli Ayak Icin Oneriler</p>
                    <p className="text-muted-foreground pl-8 text-xs">H3: Yuksek Kemerli Ayak Icin Oneriler</p>
                    <p className="font-bold text-foreground pl-4 text-[13px]">H2: En Cok Sorulan Sorular</p>
                    <p className="text-muted-foreground pl-8 text-xs">H3: Hangi marka daha iyi?</p>
                    <p className="text-muted-foreground pl-8 text-xs">H3: Ne siklikla degistirilmeli?</p>
                  </div>

                  <div className="bg-background border border-border rounded-xl p-4 space-y-1.5">
                    <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">{t("blog.serpPreview")}</p>
                    <p className="text-[hsl(220_70%_40%)] text-sm font-medium leading-tight">Kosu Ayakkabisi Secim Rehberi 2026 | Uzman Onerileri</p>
                    <p className="text-[hsl(150_50%_32%)] text-xs">marka.com/blog/kosu-ayakkabisi-rehberi</p>
                    <p className="text-muted-foreground text-xs leading-relaxed">Ayak tipinize gore en uygun kosu ayakkabisini secin. Uzman tavsiyeleri, karsilastirmalar ve satin alma rehberiyle dogru secimi yapin...</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {["kosu ayakkabisi", "ayak tipi", "spor ayakkabi secimi", "+8 anahtar kelime"].map((kw) =>
                      <span key={kw} className="px-2 py-0.5 rounded-md bg-[hsl(220_80%_94%)] text-[hsl(220_70%_40%)] text-[11px] font-medium border border-[hsl(220_70%_88%)]">
                        {kw}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-white border border-border rounded-xl px-4 py-2.5 shadow-md animate-float">
                <p className="text-xs text-muted-foreground">{t("blog.wordCount")}</p>
                <p className="text-xl font-black text-foreground">2.400</p>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white border border-border rounded-xl px-4 py-2.5 shadow-md animate-float" style={{ animationDelay: "1.5s" }}>
                <p className="text-xs text-muted-foreground">{t("blog.prodTime")}</p>
                <p className="text-xl font-black text-foreground">~12dk</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-12 border-b border-border bg-secondary/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
            {metrics.map((m) =>
              <div key={m.label} className="animate-fade-up">
                <p className={`text-4xl font-black ${m.color}`}>{m.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{m.label}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="nasil-calisir" className="py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background border border-border text-xs font-semibold mb-4 uppercase tracking-wider text-muted-foreground">
              {t("blog.howBadge")}
            </div>
            <h2 className="text-4xl font-black tracking-tight text-foreground mb-4">{t("blog.howTitle")}</h2>
            <p className="text-muted-foreground text-lg">{t("blog.howSubtitle")}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stepsMeta.map((step, i) =>
              <div key={step.num} className="relative group">
                {i < stepsMeta.length - 1 &&
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-border z-0" style={{ width: "calc(100% - 2rem)" }} />
                }
                <div className="bg-card border border-border rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 hover:shadow-md relative z-10">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black mb-4 ${step.color}`}>
                    {step.num}
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{t(step.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t(step.descKey)}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-24 border-b border-border bg-secondary/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-black tracking-tight text-foreground mb-4">{t("blog.featuresTitle")}</h2>
            <p className="text-muted-foreground text-lg">{t("blog.featuresSubtitle")}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuresMeta.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.titleKey} className="bg-card border border-border rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 hover:shadow-md group">
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

      {/* SEO Structure Visual */}
      <section className="py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background border border-border text-xs font-semibold mb-6 uppercase tracking-wider text-muted-foreground">
                {t("blog.archBadge")}
              </div>
              <h2 className="text-4xl font-black tracking-tight text-foreground mb-4">
                {t("blog.archTitle")}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {t("blog.archSubtitle")}
              </p>
              <ul className="space-y-3">
                {["blog.arch1", "blog.arch2", "blog.arch3", "blog.arch4", "blog.arch5"].map((key) =>
                  <li key={key} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[hsl(150_50%_32%)] shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{t(key)}</span>
                  </li>
                )}
              </ul>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 space-y-6">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{t("blog.qualityReport")}</p>
              {[
                { labelKey: "blog.quality1", score: 94, color: "bg-[hsl(150_50%_40%)]" },
                { labelKey: "blog.quality2", score: 88, color: "bg-[hsl(220_70%_40%)]" },
                { labelKey: "blog.quality3", score: 92, color: "bg-[hsl(32_75%_36%)]" },
                { labelKey: "blog.quality4", score: 98, color: "bg-foreground" },
              ].map((item) =>
                <div key={item.labelKey}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-foreground">{t(item.labelKey)}</span>
                    <span className="text-sm font-bold text-foreground">{item.score}</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color} transition-all duration-700`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              )}
              <div className="pt-2 border-t border-border flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t("blog.overallScore")}</span>
                <span className="text-2xl font-black text-foreground">93/100</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </main>
  );
}
