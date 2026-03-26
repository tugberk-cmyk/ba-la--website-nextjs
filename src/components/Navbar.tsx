"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, FileText, Tag, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import { useLocalizedHref } from "@/hooks/useLocalizedPath";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contentDropdownOpen, setContentDropdownOpen] = useState(false);
  const [mobileContentOpen, setMobileContentOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { t } = useLanguage();

  const featuresHref = useLocalizedHref("features");
  const contentTypesHref = useLocalizedHref("contentTypes");
  const contentTypesBlogHref = useLocalizedHref("contentTypesBlog");
  const contentTypesCategoryHref = useLocalizedHref("contentTypesCategory");
  const contentTypesProductHref = useLocalizedHref("contentTypesProduct");
  const howItWorksHref = useLocalizedHref("howItWorks");
  const pricingHref = useLocalizedHref("pricing");
  const blogHref = useLocalizedHref("blog");
  const contactHref = useLocalizedHref("contact");
  const demoHref = useLocalizedHref("demo");
  const homeHref = useLocalizedHref("home");

  const contentTypeLinks = [
    { label: t("nav.blog"), href: contentTypesBlogHref, icon: FileText, desc: t("nav.blogDesc") },
    { label: t("nav.category"), href: contentTypesCategoryHref, icon: Tag, desc: t("nav.categoryDesc") },
    { label: t("nav.product"), href: contentTypesProductHref, icon: ShoppingBag, desc: t("nav.productDesc") },
  ];

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setContentDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isContentActive = pathname.startsWith("/icerik-tipleri") || pathname.startsWith("/en/content-types");

  const simpleLinks = [
    { label: t("nav.howItWorks"), href: howItWorksHref },
    { label: t("nav.pricing"), href: pricingHref },
    { label: "Blog", href: blogHref },
    { label: t("nav.contact"), href: contactHref },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-white/98 backdrop-blur-sm border-b border-[hsl(0_0%_91%)] shadow-[0_1px_0_0_hsl(0_0%_91%)]"
          : "bg-white border-b border-[hsl(0_0%_91%)]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-[60px] flex items-center justify-between">
        {/* Logo */}
        <Link href={homeHref} className="flex items-center">
          <img src="/baglac-logo.svg" alt="baglac" className="h-[1.8rem]" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          <Link
            href={featuresHref}
            className={`px-3.5 py-2 text-sm font-medium transition-colors rounded-md ${
              pathname === featuresHref
                ? "text-foreground bg-secondary"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            {t("nav.features")}
          </Link>

          {/* Content Types dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setContentDropdownOpen((v) => !v)}
              className={`flex items-center gap-1 px-3.5 py-2 text-sm font-medium transition-colors rounded-md ${
                isContentActive || contentDropdownOpen
                  ? "text-foreground bg-secondary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {t("nav.contentTypes")}
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${contentDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {contentDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[320px] bg-white border border-border rounded-xl shadow-lg z-50 overflow-hidden">
                <div className="p-1.5">
                  {contentTypeLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setContentDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary transition-colors group"
                      >
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-foreground text-background">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{item.label}</p>
                          <p className="text-xs text-muted-foreground leading-tight">{item.desc}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {simpleLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 text-sm font-medium transition-colors rounded-md ${
                  isActive
                    ? "text-foreground bg-secondary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA buttons + Language Switcher */}
        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher />
          <Link
            href={demoHref}
            className={`px-4 py-2 text-sm font-semibold rounded-md border transition-colors ${
              pathname === demoHref
                ? "bg-foreground text-background border-foreground"
                : "border-border text-foreground hover:bg-secondary"
            }`}
          >
            {t("nav.demo")}
          </Link>
          <a
            className="px-4 py-2 text-sm font-semibold rounded-md bg-foreground text-background hover:bg-foreground/85 transition-colors"
            href="https://app.baglac.com.tr/"
          >
            {t("nav.login")}
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-secondary transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-border px-4 py-3 space-y-0.5">
          <Link
            href={featuresHref}
            className="block px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            {t("nav.features")}
          </Link>

          <div>
            <button
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
              onClick={() => setMobileContentOpen((v) => !v)}
            >
              {t("nav.contentTypes")}
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileContentOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileContentOpen && (
              <div className="ml-3 mt-0.5 space-y-0.5">
                {contentTypeLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
                      onClick={() => {
                        setMobileOpen(false);
                        setMobileContentOpen(false);
                      }}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {simpleLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 space-y-2 border-t border-border mt-2">
            <div className="px-3 py-1">
              <LanguageSwitcher />
            </div>
            <Link
              href={demoHref}
              className="block px-3 py-2.5 text-sm font-semibold text-center rounded-md border border-border text-foreground hover:bg-secondary transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {t("nav.demo")}
            </Link>
            <a
              href="https://app.baglac.com.tr/"
              className="block px-3 py-2.5 text-sm font-semibold text-center rounded-md bg-foreground text-background hover:bg-foreground/85 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {t("nav.login")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
