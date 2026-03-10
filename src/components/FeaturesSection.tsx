"use client";

import {
  Search, Layers, Sliders, FolderOpen, RefreshCw, MessageSquare, Heading1, Package, Zap,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const P = {
  blue:  { bg: "bg-[hsl(220_80%_94%)]", text: "text-[hsl(220_70%_40%)]", tag: "bg-[hsl(220_80%_94%)] text-[hsl(220_70%_40%)] border border-[hsl(220_70%_88%)]" },
  green: { bg: "bg-[hsl(150_55%_92%)]", text: "text-[hsl(150_50%_32%)]", tag: "bg-[hsl(150_55%_92%)] text-[hsl(150_50%_32%)] border border-[hsl(150_45%_84%)]" },
  amber: { bg: "bg-[hsl(38_90%_92%)]",  text: "text-[hsl(32_75%_36%)]",  tag: "bg-[hsl(38_90%_92%)]  text-[hsl(32_75%_36%)]  border border-[hsl(38_80%_84%)]"  },
};

const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Zap, color: P.blue,
      title: t("features.fastCreator"), description: t("features.fastCreatorDesc"),
      tags: [t("features.fastCreatorTag1"), t("features.fastCreatorTag2"), t("features.fastCreatorTag3")],
      demo: (
        <div className="mt-4 bg-secondary rounded-xl p-3 border border-border text-xs space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-[hsl(220_80%_94%)] text-[hsl(220_70%_40%)] font-medium text-[11px] border border-[hsl(220_70%_88%)]">{t("features.demo.control")}</span>
            <span className="px-2 py-0.5 rounded-md bg-[hsl(150_55%_92%)] text-[hsl(150_50%_32%)] font-medium text-[11px] border border-[hsl(150_45%_84%)]">{t("features.demo.recommended")}</span>
            <span className="px-2 py-0.5 rounded-md bg-[hsl(38_90%_92%)] text-[hsl(32_75%_36%)] font-medium text-[11px] border border-[hsl(38_80%_84%)]">{t("features.demo.fast")}</span>
          </div>
          <div className="h-1.5 rounded-full bg-border overflow-hidden"><div className="h-full w-3/4 rounded-full bg-foreground" /></div>
          <p className="text-muted-foreground">{t("features.fastCreatorDemo")}</p>
        </div>
      ),
    },
    {
      icon: Search, color: P.green,
      title: t("features.keywordResearch"), description: t("features.keywordResearchDesc"),
      tags: [t("features.keywordResearchTag1"), t("features.keywordResearchTag2"), t("features.keywordResearchTag3")],
      demo: (
        <div className="mt-4 bg-secondary rounded-xl p-3 border border-border text-xs space-y-1.5">
          {["spor ayakkabı", "koşu ayakkabısı", "erkek spor"].map((kw, i) => (
            <div key={kw} className="flex items-center justify-between">
              <span className="font-medium text-foreground">{kw}</span>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">{[18400, 12100, 9600][i]}/ay</span>
                <div className="w-12 h-1.5 rounded-full bg-border overflow-hidden">
                  <div className="h-full rounded-full bg-[hsl(150_50%_48%)]" style={{ width: `${[80, 60, 45][i]}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: MessageSquare, color: P.amber,
      title: t("features.qna"), description: t("features.qnaDesc"),
      tags: [t("features.qnaTag1"), t("features.qnaTag2"), t("features.qnaTag3")],
      demo: (
        <div className="mt-4 bg-secondary rounded-xl p-3 border border-border text-xs space-y-2">
          {["Spor ayakkabı nasıl seçilir?", "En iyi koşu ayakkabısı hangisi?"].map((q) => (
            <div key={q} className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-[hsl(38_90%_92%)] text-[hsl(32_75%_36%)] flex items-center justify-center text-[10px] font-bold mt-0.5 shrink-0">?</span>
              <span className="text-foreground font-medium">{q}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: Heading1, color: P.blue,
      title: t("features.headingBuilder"), description: t("features.headingBuilderDesc"),
      tags: [t("features.headingBuilderTag1"), t("features.headingBuilderTag2"), t("features.headingBuilderTag3")],
      demo: (
        <div className="mt-4 bg-secondary rounded-xl p-3 border border-border text-xs space-y-1">
          <p className="font-bold text-foreground text-sm">H1: Koşu Ayakkabısı Seçimi</p>
          <p className="font-semibold text-foreground pl-3">H2: Ayak Tipine Göre Seçim</p>
          <p className="text-muted-foreground pl-6">H3: Pronasyon ve Supinasyon</p>
          <p className="font-semibold text-foreground pl-3">H2: Marka Karşılaştırması</p>
        </div>
      ),
    },
    {
      icon: Sliders, color: P.green,
      title: t("features.toneSettings"), description: t("features.toneSettingsDesc"),
      tags: [t("features.toneSettingsTag1"), t("features.toneSettingsTag2"), t("features.toneSettingsTag3")],
      demo: (
        <div className="mt-4 bg-secondary rounded-xl p-3 border border-border text-xs space-y-2">
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2 py-0.5 rounded-md bg-card border border-border text-muted-foreground">{t("features.demo.friendly")}</span>
            <span className="px-2 py-0.5 rounded-md bg-[hsl(150_55%_92%)] text-[hsl(150_50%_32%)] border border-[hsl(150_45%_84%)] font-medium">{t("features.demo.professional")}</span>
            <span className="px-2 py-0.5 rounded-md bg-card border border-border text-muted-foreground">{t("features.demo.excited")}</span>
          </div>
          <div className="text-muted-foreground">{t("features.demo.targetAudience")} <span className="text-foreground font-medium">{t("features.demo.targetAudienceValue")}</span></div>
        </div>
      ),
    },
    {
      icon: Package, color: P.amber,
      title: t("features.bulkProduct"), description: t("features.bulkProductDesc"),
      tags: [t("features.bulkProductTag1"), t("features.bulkProductTag2"), t("features.bulkProductTag3")],
      demo: (
        <div className="mt-4 bg-secondary rounded-xl p-3 border border-border text-xs">
          <div className="border-2 border-dashed border-border rounded-lg p-3 text-center text-muted-foreground">
            <p className="text-lg mb-1">📤</p>
            <p><span className="text-foreground font-medium">{t("features.demo.selectFile")}</span> {t("features.demo.orDragDrop")}</p>
            <p className="text-[11px] mt-0.5">{t("features.demo.fileTypes")}</p>
          </div>
        </div>
      ),
    },
    {
      icon: FolderOpen, color: P.blue,
      title: t("features.archive"), description: t("features.archiveDesc"),
      tags: [t("features.archiveTag1"), t("features.archiveTag2"), t("features.archiveTag3")],
      demo: (
        <div className="mt-4 bg-secondary rounded-xl p-3 border border-border text-xs space-y-1.5">
          {[
            { name: t("features.demo.blogContents"), count: 47, style: "bg-[hsl(220_80%_94%)] text-[hsl(220_70%_40%)]" },
            { name: t("features.demo.categoryTexts"), count: 128, style: "bg-[hsl(150_55%_92%)] text-[hsl(150_50%_32%)]" },
            { name: t("features.demo.productDescriptions"), count: 312, style: "bg-[hsl(38_90%_92%)] text-[hsl(32_75%_36%)]" },
          ].map((folder) => (
            <div key={folder.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>📁</span>
                <span className="font-medium text-foreground">{folder.name}</span>
              </div>
              <span className={`px-1.5 py-0.5 rounded text-[11px] font-medium ${folder.style}`}>{folder.count}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: RefreshCw, color: P.green,
      title: t("features.rewrite"), description: t("features.rewriteDesc"),
      tags: [t("features.rewriteTag1"), t("features.rewriteTag2"), t("features.rewriteTag3")],
      demo: (
        <div className="mt-4 bg-secondary rounded-xl p-3 border border-border text-xs space-y-2">
          <div className="bg-card rounded-lg p-2 border border-border relative">
            <p className="text-muted-foreground line-through">{t("features.demo.oldContent")}</p>
            <div className="absolute -right-1 -top-1 w-4 h-4 rounded-full bg-[hsl(150_55%_92%)] border border-[hsl(150_45%_84%)] flex items-center justify-center">
              <span className="text-[hsl(150_50%_32%)] text-[9px]">✓</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-1 rounded-md border border-border text-muted-foreground text-center hover:bg-secondary transition-colors">{t("features.demo.selectSection")}</button>
            <button className="flex-1 py-1 rounded-md bg-foreground text-background text-center">{t("features.demo.rewriteBtn")}</button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16 mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border text-xs font-semibold mb-4 uppercase tracking-wider text-muted-foreground">
            {t("features.badge")}
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4 text-foreground">
            {t("features.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("features.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {features.map((feature) => {
            const Icon = feature.icon;
            const c = feature.color;
            return (
              <div key={feature.title} className="feature-card group">
                <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-background" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{feature.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {feature.tags.map((tag) => (
                    <span key={tag} className={`px-2 py-0.5 rounded-md text-[11px] font-medium ${c.tag}`}>
                      {tag}
                    </span>
                  ))}
                </div>
                {feature.demo}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
