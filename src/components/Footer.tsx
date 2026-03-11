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
      { label: t("footer.distanceSales"), href: "/mesafeli-satis-sozlesmesi" },
      { label: t("footer.cancellation"), href: "/iptal-ve-iade" },
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
              <img src="/logos/payment-band.svg" alt="iyzico ile güvenli ödeme - Visa, Mastercard, American Express, Troy" className="h-7" />
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
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm overflow-hidden shrink-0" aria-label="Turkiye">
              <rect width="30" height="20" fill="#E30A17" />
              <circle cx="13" cy="10" r="6" fill="#fff" />
              <circle cx="14.5" cy="10" r="4.8" fill="#E30A17" />
              <polygon points="17,10 18.5,7 16,9 20,9 17.5,7" fill="#fff" transform="rotate(18, 17, 10)" />
            </svg>
            <span>{t("footer.madeIn")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
