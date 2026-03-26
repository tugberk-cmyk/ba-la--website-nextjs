"use client";

import { ShoppingBag, FileText, Tag } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocalizedHref } from "@/hooks/useLocalizedPath";
import Link from "next/link";

const ContentTypesSection = () => {
  const { t } = useLanguage();
  const contactHref = useLocalizedHref("contact");

  const contentTypes = [
    {
      icon: FileText,
      name: t("contentTypes.blogName"),
      badge: t("contentTypes.blogBadge"),
      badgeStyle: "bg-[hsl(150_55%_92%)] text-[hsl(150_50%_32%)] border border-[hsl(150_45%_84%)]",
      description: t("contentTypes.blogDesc"),
      features: [
        t("contentTypes.blog.f1"), t("contentTypes.blog.f2"),
        t("contentTypes.blog.f3"), t("contentTypes.blog.f4"),
      ],
      preview: (
        <div className="bg-secondary rounded-xl p-4 border border-border text-xs space-y-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Başlık Önizlemesi</span>
          </div>
          <div className="space-y-1.5">
            <p className="font-black text-foreground text-sm leading-tight">H1: Koşu Ayakkabısı Seçim Rehberi 2026</p>
            <p className="font-bold text-foreground pl-3 text-[13px]">H2: Ayak Tipine Göre Doğru Seçim</p>
            <p className="text-muted-foreground pl-6">H3: Düz Tabanlı Ayak İçin Öneriler</p>
            <p className="text-muted-foreground pl-6">H3: Yüksek Kemerli Ayak İçin Öneriler</p>
            <p className="font-bold text-foreground pl-3 text-[13px]">H2: En Çok Sorulan Sorular</p>
          </div>
          <div className="flex gap-2 pt-1">
            <span className="px-2 py-0.5 rounded-md bg-[hsl(150_55%_92%)] text-[hsl(150_50%_32%)] text-[11px] font-medium border border-[hsl(150_45%_84%)]">✓ SEO</span>
            <span className="px-2 py-0.5 rounded-md bg-[hsl(220_80%_94%)] text-[hsl(220_70%_40%)] text-[11px] font-medium border border-[hsl(220_70%_88%)]">1,200–3,000 words</span>
          </div>
        </div>
      ),
    },
    {
      icon: Tag,
      name: t("contentTypes.categoryName"),
      badge: t("contentTypes.categoryBadge"),
      badgeStyle: "bg-[hsl(220_80%_94%)] text-[hsl(220_70%_40%)] border border-[hsl(220_70%_88%)]",
      description: t("contentTypes.categoryDesc"),
      features: [
        t("contentTypes.category.f1"), t("contentTypes.category.f2"),
        t("contentTypes.category.f3"), t("contentTypes.category.f4"),
      ],
      preview: (
        <div className="bg-secondary rounded-xl p-4 border border-border text-xs space-y-3">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Kategori Metni Örneği</div>
          <p className="text-foreground leading-relaxed">
            <span className="font-bold">Spor Ayakkabılar</span> koleksiyonumuzda günlük kullanımdan profesyonel koşuya kadar{" "}
            <span className="bg-[hsl(220_80%_94%)] text-[hsl(220_70%_40%)] px-0.5 rounded">her ihtiyaca uygun</span> modeller bulabilirsiniz...
          </p>
        </div>
      ),
    },
    {
      icon: ShoppingBag,
      name: t("contentTypes.productName"),
      badge: t("contentTypes.productBadge"),
      badgeStyle: "bg-[hsl(38_90%_92%)] text-[hsl(32_75%_36%)] border border-[hsl(38_80%_84%)]",
      description: t("contentTypes.productDesc"),
      features: [
        t("contentTypes.product.f1"), t("contentTypes.product.f2"), t("contentTypes.product.f3"),
        t("contentTypes.product.f4"), t("contentTypes.product.f5"),
      ],
      preview: (
        <div className="bg-secondary rounded-xl p-4 border border-border text-xs space-y-3">
          <div className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">Toplu Yükleme Durumu</div>
          <div className="space-y-2">
            {[
              { name: "Nike Air Max 270", status: "✓", style: "bg-[hsl(150_55%_92%)] text-[hsl(150_50%_32%)]" },
              { name: "Adidas Ultraboost 22", status: "...", style: "bg-[hsl(220_80%_94%)] text-[hsl(220_70%_40%)]" },
              { name: "Puma RS-X", status: "—", style: "bg-secondary text-muted-foreground border border-border" },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="text-foreground font-medium truncate">{item.name}</span>
                <span className={`px-2 py-0.5 rounded-md text-[11px] font-medium shrink-0 ${item.style}`}>{item.status}</span>
              </div>
            ))}
          </div>
          <div className="h-1.5 rounded-full bg-border overflow-hidden">
            <div className="h-full w-1/3 rounded-full bg-foreground" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="content-types" className="py-24 bg-secondary/40 border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background border border-border text-xs font-semibold mb-4 uppercase tracking-wider text-muted-foreground">
            {t("contentTypes.badge")}
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4 text-foreground">
            {t("contentTypes.title")}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("contentTypes.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {contentTypes.map((type) => {
            const Icon = type.icon;
            return (
              <div
                key={type.name}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-foreground flex items-center justify-center">
                        <Icon className="w-5 h-5 text-background" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-medium">{t("contentTypes.contentType")}</p>
                        <h3 className="text-lg font-bold text-foreground">{type.name}</h3>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${type.badgeStyle}`}>
                      {type.badge}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{type.description}</p>
                  {type.preview}
                  <ul className="mt-5 space-y-2">
                    {type.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-sm text-foreground">
                        <span className="w-4 h-4 rounded-full bg-secondary border border-border text-muted-foreground flex items-center justify-center text-[10px] font-bold shrink-0">
                          ✓
                        </span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href={contactHref}
            className="inline-flex items-center justify-center py-3 px-8 rounded-md bg-foreground text-background text-sm font-semibold hover:bg-foreground/85 transition-colors"
          >
            {t("contentTypes.cta")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContentTypesSection;
