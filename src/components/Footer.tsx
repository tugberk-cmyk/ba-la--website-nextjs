"use client";

import Link from "next/link";
import { Linkedin, Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  const links = {
    [t("footer.platform")]: [
      { label: t("footer.features"), href: "/ozellikler" },
      { label: t("footer.howItWorks"), href: "/nasil-calisir" },
      { label: t("footer.pricing"), href: "/fiyatlandirma" },
    ],
    [t("footer.contentTypes")]: [
      { label: t("footer.blogContent"), href: "/icerik-tipleri/blog" },
      { label: t("footer.categoryContent"), href: "/icerik-tipleri/kategori" },
      { label: t("footer.productContent"), href: "/icerik-tipleri/urun" },
    ],
    [t("footer.support")]: [
      { label: t("footer.technology"), href: "/teknoloji" },
      { label: t("footer.helpCenter"), href: "/yardim-merkezi" },
      { label: t("footer.contact"), href: "/iletisim" },
      { label: t("footer.privacy"), href: "/gizlilik-politikasi" },
      { label: t("footer.terms"), href: "/kullanim-kosullari" },
    ],
  };

  return (
    <footer className="border-t border-border bg-background py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2">
            <div className="mb-4">
              <img src="/baglac-logo.svg" alt="baglac" className="h-6" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("footer.tagline")}
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://www.linkedin.com/company/ba%C4%9Flac/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/baglacai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
            <div className="mt-5">
              <img src="/logos/iyzico-band.svg" alt="iyzico ile guvenli odeme" className="h-4 opacity-50" style={{ filter: "invert(1)" }} />
            </div>
          </div>
          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">{category}</h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {t("footer.copyright")}
          </p>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>{t("footer.madeIn")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
