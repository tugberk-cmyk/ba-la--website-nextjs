"use client";

import CtaSection from "@/components/CtaSection";
import { ShoppingBag, CheckCircle2, Upload, ArrowRight, Zap, Package, Target, FileSpreadsheet, Clock, Eye, Palette, Ruler, Tag, Sparkles, Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

const featuresMeta = [
  { icon: FileSpreadsheet, titleKey: "prod.f1.title", descKey: "prod.f1.desc" },
  { icon: Zap, titleKey: "prod.f2.title", descKey: "prod.f2.desc" },
  { icon: Target, titleKey: "prod.f3.title", descKey: "prod.f3.desc" },
  { icon: Package, titleKey: "prod.f4.title", descKey: "prod.f4.desc" },
  { icon: Clock, titleKey: "prod.f5.title", descKey: "prod.f5.desc" },
  { icon: Search, titleKey: "prod.f6.title", descKey: "prod.f6.desc" },
];

export default function ProductContentPage() {
  const { t } = useLanguage();

  const bulkProducts = [
    { name: "Nike Air Max 270", sku: "NK-270-BLK", statusKey: "prod.completed", words: "420", pct: 100, style: "bg-[hsl(150_55%_92%)] text-[hsl(150_50%_32%)]" },
    { name: "Adidas Ultraboost 22", sku: "AD-UB22-WHT", statusKey: "prod.writing", words: "---", pct: 60, style: "bg-[hsl(220_80%_94%)] text-[hsl(220_70%_40%)]" },
    { name: "Puma RS-X Efekt", sku: "PM-RSX-RED", statusKey: "prod.queued", words: "---", pct: 0, style: "bg-secondary text-muted-foreground border border-border" },
    { name: "New Balance 990v5", sku: "NB-990-GRY", statusKey: "prod.queued", words: "---", pct: 0, style: "bg-secondary text-muted-foreground border border-border" },
  ];

  const analysisExample = {
    name: "Nike Air Max 270 React",
    sku: "NK-270R-BLK-42",
    attributes: [
      { icon: Palette, label: "Siyah / Beyaz", key: "Renk" },
      { icon: Ruler, label: "42 EU", key: "Beden" },
      { icon: Tag, label: "\u20BA4.299", key: "Fiyat" },
      { icon: Package, label: "Mesh / Kaucuk", key: "Malzeme" },
    ],
    output: "Nike Air Max 270 React ile konforun sinirlarini yeniden kesfedin. 270 derece Air yastigi gun boyu hafiflik sunarken, React kopugu enerjiyi geri vererek adimlariniza guc katar. Mesh ust yapi serinlik saglar, kaucuk taban kentsel zeminde maksimum tutus sunar.",
  };

  const stats = [
    { value: "500+", label: t("prod.stat1"), color: "text-[hsl(32_75%_36%)]" },
    { value: "8dk", label: t("prod.stat2"), color: "text-[hsl(220_70%_40%)]" },
    { value: "+41%", label: t("prod.stat3"), color: "text-[hsl(150_50%_32%)]" },
  ];

  const bulkSteps = [
    { icon: FileSpreadsheet, labelKey: "prod.bulkStep1", descKey: "prod.bulkStep1Desc" },
    { icon: Zap, labelKey: "prod.bulkStep2", descKey: "prod.bulkStep2Desc" },
    { icon: Package, labelKey: "prod.bulkStep3", descKey: "prod.bulkStep3Desc" },
    { icon: CheckCircle2, labelKey: "prod.bulkStep4", descKey: "prod.bulkStep4Desc" },
  ];

  const bulkStepColors = [
    "bg-[hsl(220_80%_94%)] text-[hsl(220_70%_40%)]",
    "bg-[hsl(150_55%_92%)] text-[hsl(150_50%_32%)]",
    "bg-[hsl(38_90%_92%)] text-[hsl(32_75%_36%)]",
    "bg-[hsl(150_55%_92%)] text-[hsl(150_50%_32%)]",
  ];

  return (
    <main className="pt-16">

      {/* Hero */}
      <section className="py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[hsl(38_90%_92%)] text-[hsl(32_75%_36%)] text-xs font-semibold mb-6 border border-[hsl(38_80%_84%)]">
                <ShoppingBag className="w-3.5 h-3.5" />
                {t("prod.badge")}
              </div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[1.05] mb-6 text-foreground">
                {t("prod.heroTitle1")}<br />
                <span className="text-gradient">{t("prod.heroTitle2")}</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8 max-w-lg">
                {t("prod.heroSubtitle")}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/iletisim" className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-foreground text-background text-sm font-semibold hover:bg-foreground/85 transition-colors">
                  {t("prod.ctaPrimary")} <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="#toplu-uretim" className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-secondary text-foreground text-sm font-semibold hover:bg-border transition-colors">
                  {t("prod.ctaSecondary")}
                </a>
              </div>
            </div>

            {/* Bulk upload mockup */}
            <div className="animate-fade-in relative">
              <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-secondary px-4 py-3 border-b border-border flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-border" />
                    <div className="w-3 h-3 rounded-full bg-border" />
                    <div className="w-3 h-3 rounded-full bg-border" />
                  </div>
                  <div className="flex-1 bg-background rounded-md px-3 py-1 text-xs text-muted-foreground border border-border">
                    baglac.com.tr/icerik-tipleri/urun
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t("prod.bulkStatus")}</span>
                    <span className="text-xs font-medium text-muted-foreground">4 / 247 {t("prod.bulkProgress")}</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full rounded-full bg-foreground transition-all" style={{ width: "1.6%" }} />
                  </div>
                  <div className="space-y-2.5">
                    {bulkProducts.map((p) =>
                      <div key={p.name} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center shrink-0">
                          <ShoppingBag className="w-3.5 h-3.5 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-xs font-semibold text-foreground truncate">{p.name}</p>
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold shrink-0 ml-2 ${p.style}`}>{t(p.statusKey)}</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                            <div className={`h-full rounded-full transition-all ${p.pct === 100 ? "bg-[hsl(150_50%_40%)]" : p.pct > 0 ? "bg-[hsl(220_70%_40%)]" : "bg-border"}`} style={{ width: `${p.pct}%` }} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="border-2 border-dashed border-border rounded-xl p-4 text-center">
                    <Upload className="w-5 h-5 text-muted-foreground mx-auto mb-1.5" />
                    <p className="text-xs text-muted-foreground font-medium">{t("prod.dragDrop")}</p>
                    <p className="text-[11px] text-muted-foreground/60 mt-0.5">{t("prod.maxRows")}</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white border border-border rounded-xl px-4 py-2.5 shadow-md animate-float">
                <p className="text-xs text-muted-foreground">{t("prod.bulkCapacity")}</p>
                <p className="text-xl font-black text-[hsl(32_75%_36%)]">500+</p>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white border border-border rounded-xl px-4 py-2.5 shadow-md animate-float" style={{ animationDelay: "2s" }}>
                <p className="text-xs text-muted-foreground">{t("prod.conversionIncrease")}</p>
                <p className="text-xl font-black text-foreground">+41%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-border bg-secondary/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
            {stats.map((s) =>
              <div key={s.label} className="animate-fade-up">
                <p className={`text-4xl font-black ${s.color}`}>{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Single product example */}
      <section className="py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background border border-border text-xs font-semibold mb-6 uppercase tracking-wider text-muted-foreground">
                {t("prod.singleBadge")}
              </div>
              <h2 className="text-4xl font-black tracking-tight text-foreground mb-4">
                {t("prod.singleTitle")}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t("prod.singleSubtitle")}
              </p>
              <ul className="space-y-3 mb-8">
                {["prod.single1", "prod.single2", "prod.single3", "prod.single4", "prod.single5"].map((key) =>
                  <li key={key} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[hsl(32_75%_36%)] shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{t(key)}</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Single product card */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
              {/* Header */}
              <div className="bg-[hsl(38_90%_92%)] px-6 py-4 border-b border-[hsl(38_80%_84%)]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[hsl(32_75%_36%)] font-semibold uppercase tracking-wider">{analysisExample.sku}</p>
                    <p className="font-bold text-foreground text-sm">{analysisExample.name}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[hsl(220_80%_94%)] text-[hsl(220_70%_40%)] border border-[hsl(220_70%_88%)]">
                    <Eye className="w-3 h-3 inline mr-1" />{t("prod.analysisInput")}
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-5">
                {/* Attributes read */}
                <div>
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-3">{t("prod.analysisAttr")}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {analysisExample.attributes.map((attr) => {
                      const AttrIcon = attr.icon;
                      return (
                        <div key={attr.key} className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2 border border-border">
                          <AttrIcon className="w-3.5 h-3.5 text-muted-foreground" />
                          <div>
                            <p className="text-[10px] text-muted-foreground font-medium">{attr.key}</p>
                            <p className="text-xs font-semibold text-foreground">{attr.label}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {/* Arrow indicator */}
                <div className="flex items-center justify-center gap-2">
                  <div className="h-px flex-1 bg-border" />
                  <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-background" />
                  </div>
                  <div className="h-px flex-1 bg-border" />
                </div>
                {/* Generated output */}
                <div>
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-2">{t("prod.analysisOutput")}</p>
                  <p className="text-sm text-foreground leading-relaxed bg-[hsl(150_55%_92%)] rounded-lg p-3 border border-[hsl(150_45%_84%)]">{analysisExample.output}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bulk production section */}
      <section id="toplu-uretim" className="py-24 border-b border-border bg-secondary/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background border border-border text-xs font-semibold mb-4 uppercase tracking-wider text-muted-foreground">
              {t("prod.bulkBadge")}
            </div>
            <h2 className="text-4xl font-black tracking-tight text-foreground mb-4">{t("prod.bulkTitle")}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("prod.bulkSubtitle")}
            </p>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2 z-0" />
            <div className="grid lg:grid-cols-4 gap-4 relative z-10">
              {bulkSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={step.labelKey} className="bg-card border border-border rounded-2xl p-5 text-center hover:-translate-y-1 transition-all duration-300 hover:shadow-md">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${bulkStepColors[i]}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="font-bold text-foreground text-sm mb-1">{t(step.labelKey)}</p>
                    <p className="text-xs text-muted-foreground">{t(step.descKey)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight text-foreground mb-4">{t("prod.featuresTitle")}</h2>
            <p className="text-muted-foreground text-lg">{t("prod.featuresSubtitle")}</p>
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
