"use client";

import { useState, useRef, useEffect } from "react";
import { Mail, Phone, MessageSquare, ChevronDown, Search, BookOpen, Zap, CreditCard, Settings, Shield, BarChart2, X } from "lucide-react";
import Link from "next/link";
import CtaSection from "@/components/CtaSection";
import { useLanguage } from "@/contexts/LanguageContext";

const categoryMeta = [
  { id: "genel", icon: BookOpen, labelKey: "help.cat.genel", faqKeys: ["help.genel.q1", "help.genel.q2", "help.genel.q3", "help.genel.q4"] },
  { id: "icerik", icon: Zap, labelKey: "help.cat.icerik", faqKeys: ["help.icerik.q1", "help.icerik.q2", "help.icerik.q3", "help.icerik.q4"] },
  { id: "seo", icon: BarChart2, labelKey: "help.cat.seo", faqKeys: ["help.seo.q1", "help.seo.q2", "help.seo.q3", "help.seo.q4"] },
  { id: "fiyatlandirma", icon: CreditCard, labelKey: "help.cat.fiyatlandirma", faqKeys: ["help.fiyatlandirma.q1", "help.fiyatlandirma.q2", "help.fiyatlandirma.q3", "help.fiyatlandirma.q4"] },
  { id: "teknik", icon: Settings, labelKey: "help.cat.teknik", faqKeys: ["help.teknik.q1", "help.teknik.q2", "help.teknik.q3"] },
  { id: "guvenlik", icon: Shield, labelKey: "help.cat.guvenlik", faqKeys: ["help.guvenlik.q1", "help.guvenlik.q2", "help.guvenlik.q3"] },
];

type FaqItem = { q: string; a: string; categoryId: string; categoryLabel: string };

const FaqAccordionItem = ({
  q,
  a,
  highlight,
  forceOpen,
}: {
  q: string;
  a: string;
  highlight?: string;
  forceOpen?: boolean;
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (forceOpen) setOpen(true);
  }, [forceOpen]);

  const highlightText = (text: string) => {
    if (!highlight) return text;
    const idx = text.toLowerCase().indexOf(highlight.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark className="bg-foreground/10 text-foreground rounded px-0.5">
          {text.slice(idx, idx + highlight.length)}
        </mark>
        {text.slice(idx + highlight.length)}
      </>
    );
  };

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left gap-4 group"
      >
        <span className="text-sm font-medium text-foreground group-hover:text-foreground/80 transition-colors">
          {highlightText(q)}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 pb-4" : "max-h-0"}`}
      >
        <p className="text-sm text-muted-foreground leading-relaxed">{highlightText(a)}</p>
      </div>
    </div>
  );
};

export default function HelpCenterPage() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("genel");
  const [searchInput, setSearchInput] = useState("");
  const [committedSearch, setCommittedSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const faqSectionRef = useRef<HTMLDivElement>(null);

  // Build translated FAQ categories
  const faqCategories = categoryMeta.map((cat) => ({
    id: cat.id,
    icon: cat.icon,
    label: t(cat.labelKey),
    faqs: cat.faqKeys.map((qKey) => {
      const aKey = qKey.replace(/\.q(\d+)$/, ".a$1");
      return { q: t(qKey), a: t(aKey) };
    }),
  }));

  // Suggestions shown in dropdown while typing (titles only)
  const suggestions: FaqItem[] = searchInput.trim()
    ? faqCategories.flatMap((cat) =>
        cat.faqs
          .filter(
            (f) =>
              f.q.toLowerCase().includes(searchInput.toLowerCase()) ||
              f.a.toLowerCase().includes(searchInput.toLowerCase())
          )
          .map((f) => ({ ...f, categoryId: cat.id, categoryLabel: cat.label }))
      )
    : [];

  // Results shown in main FAQ area after Enter or suggestion click
  const searchResults: FaqItem[] = committedSearch.trim()
    ? faqCategories.flatMap((cat) =>
        cat.faqs
          .filter(
            (f) =>
              f.q.toLowerCase().includes(committedSearch.toLowerCase()) ||
              f.a.toLowerCase().includes(committedSearch.toLowerCase())
          )
          .map((f) => ({ ...f, categoryId: cat.id, categoryLabel: cat.label }))
      )
    : [];

  const isSearchMode = committedSearch.trim().length > 0;

  const activeData = faqCategories.find((c) => c.id === activeCategory)!;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setCommittedSearch(searchInput);
      setShowDropdown(false);
      setTimeout(() => {
        faqSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
    if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  const handleSuggestionClick = (item: FaqItem) => {
    setActiveCategory(item.categoryId);
    setOpenQuestion(item.q);
    setSearchInput(item.q);
    setCommittedSearch("");
    setShowDropdown(false);
    setTimeout(() => {
      faqSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const clearSearch = () => {
    setSearchInput("");
    setCommittedSearch("");
    setShowDropdown(false);
    setOpenQuestion(null);
    inputRef.current?.focus();
  };

  return (
    <main className="pt-[60px]">
      {/* Header */}
      <section className="py-16 md:pb-0">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">{t("help.badge")}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            {t("help.title")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            {t("help.subtitle")}
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              placeholder={t("help.searchPlaceholder")}
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setShowDropdown(true);
                if (!e.target.value.trim()) {
                  setCommittedSearch("");
                }
              }}
              onFocus={() => searchInput.trim() && setShowDropdown(true)}
              onKeyDown={handleKeyDown}
              className="w-full pl-10 pr-9 py-3 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
            />
            {searchInput && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Suggestion dropdown */}
            {showDropdown && searchInput.trim() && (
              <div
                ref={dropdownRef}
                className="absolute left-0 right-0 top-full mt-2 border border-border rounded-xl bg-background shadow-lg z-10 overflow-hidden text-left"
              >
                {suggestions.length > 0 ? (
                  <ul className="py-1.5 max-h-72 overflow-y-auto">
                    <li className="px-4 py-1.5">
                      <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                        {suggestions.length} {t("help.suggestionsHint")}
                      </span>
                    </li>
                    {suggestions.map((item, i) => (
                      <li key={i}>
                        <button
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => handleSuggestionClick(item)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-secondary transition-colors group"
                        >
                          <Search className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm text-foreground truncate">{item.q}</p>
                            <p className="text-[11px] text-muted-foreground">{item.categoryLabel}</p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-6 text-center">
                    <p className="text-sm text-muted-foreground">{t("help.noResults")}</p>
                    <Link
                      href="/iletisim"
                      className="text-sm font-medium text-foreground underline underline-offset-4 mt-2 inline-block"
                    >
                      {t("help.askUs")}
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Hint text */}
          {searchInput.trim() && !showDropdown && !isSearchMode && (
            <p className="mt-3 text-xs text-muted-foreground">{t("help.enterHint")}</p>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqSectionRef} className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">

          {/* Search results mode */}
          {isSearchMode ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    &quot;{committedSearch}&quot; {t("help.resultsFor")}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">{searchResults.length} {t("help.questionsFound")}</p>
                </div>
                <button
                  onClick={clearSearch}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                  {t("help.clear")}
                </button>
              </div>

              {searchResults.length > 0 ? (
                <div className="space-y-4">
                  {searchResults.map((item, i) => (
                    <div key={i} className="border border-border rounded-xl overflow-hidden bg-background px-6">
                      <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider pt-4 mb-1">
                        {item.categoryLabel}
                      </p>
                      <FaqAccordionItem q={item.q} a={item.a} highlight={committedSearch} forceOpen />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 border border-border rounded-xl">
                  <p className="text-sm text-muted-foreground mb-3">{t("help.noResults")}</p>
                  <Link href="/iletisim" className="text-sm font-medium text-foreground underline underline-offset-4">
                    {t("help.askUs")}
                  </Link>
                </div>
              )}
            </div>
          ) : (
            /* Normal category mode */
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
              {/* Category sidebar */}
              <div className="lg:col-span-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">{t("help.categories")}</p>
                <nav className="space-y-1">
                  {faqCategories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors text-left ${
                          activeCategory === cat.id
                            ? "bg-foreground text-background"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                        }`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        {cat.label}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* FAQ accordion */}
              <div className="lg:col-span-3">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-foreground">{activeData.label}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{activeData.faqs.length} {t("help.questions")}</p>
                </div>
                <div className="border border-border rounded-xl overflow-hidden bg-background px-6">
                  {activeData.faqs.map((faq, i) => (
                    <FaqAccordionItem
                      key={i}
                      q={faq.q}
                      a={faq.a}
                      forceOpen={openQuestion === faq.q}
                    />
                  ))}
                </div>

                {/* Still need help */}
                <div className="mt-8 p-6 rounded-xl border border-border bg-secondary/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t("help.notFound")}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{t("help.notFoundDesc")}</p>
                  </div>
                  <Link
                    href="/iletisim"
                    className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-foreground text-background text-sm font-semibold hover:bg-foreground/85 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    {t("help.writeUs")}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-12 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">{t("help.contactLabel")}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="mailto:hey@baglac.com.tr"
              className="flex items-start gap-4 p-5 rounded-xl border border-border bg-background hover:border-foreground/30 transition-colors group"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-md bg-foreground flex items-center justify-center">
                <Mail className="w-5 h-5 text-background" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{t("help.emailLabel")}</p>
                <p className="text-sm font-medium text-foreground group-hover:underline">hey@baglac.com.tr</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t("help.emailDesc")}</p>
              </div>
            </a>

            <a
              href="tel:+908503084980"
              className="flex items-start gap-4 p-5 rounded-xl border border-border bg-background hover:border-foreground/30 transition-colors group"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-md bg-foreground flex items-center justify-center">
                <Phone className="w-5 h-5 text-background" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{t("help.phoneLabel")}</p>
                <p className="text-sm font-medium text-foreground group-hover:underline">+90 850 308 49 80</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t("help.phoneDesc")}</p>
              </div>
            </a>

            <Link
              href="/iletisim"
              className="flex items-start gap-4 p-5 rounded-xl border border-border bg-background hover:border-foreground/30 transition-colors group"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-md bg-foreground flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-background" />
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{t("help.formLabel")}</p>
                <p className="text-sm font-medium text-foreground group-hover:underline">{t("help.formDesc")}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{t("help.formSubDesc")}</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <CtaSection />
    </main>
  );
}
