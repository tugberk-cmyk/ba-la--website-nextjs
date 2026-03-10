"use client";

import { Check, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

const PricingSection = () => {
  const { t } = useLanguage();

  const plans = [
    {
      name: t("pricing.starter"),
      price: "$199",
      period: "/ay",
      description: t("pricing.starterDesc"),
      features: [
        t("pricing.starter.f1"), t("pricing.starter.f2"), t("pricing.starter.f3"),
        t("pricing.starter.f4"), t("pricing.starter.f5"), t("pricing.starter.f6"),
      ],
      cta: t("pricing.cta"),
      highlight: false,
    },
    {
      name: t("pricing.pro"),
      price: "$399",
      period: "/ay",
      description: t("pricing.proDesc"),
      badge: t("pricing.proBadge"),
      features: [
        t("pricing.pro.f1"), t("pricing.pro.f2"), t("pricing.pro.f3"), t("pricing.pro.f4"),
        t("pricing.pro.f5"), t("pricing.pro.f6"), t("pricing.pro.f7"), t("pricing.pro.f8"),
      ],
      cta: t("pricing.cta"),
      highlight: true,
    },
    {
      name: t("pricing.enterprise"),
      price: t("pricing.enterprisePrice"),
      period: "",
      description: t("pricing.enterpriseDesc"),
      features: [
        t("pricing.enterprise.f1"), t("pricing.enterprise.f2"), t("pricing.enterprise.f3"),
        t("pricing.enterprise.f4"), t("pricing.enterprise.f5"), t("pricing.enterprise.f6"),
      ],
      cta: t("pricing.ctaEnterprise"),
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold mb-4 uppercase tracking-wider">
            {t("pricing.badge")}
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4">
            {t("pricing.title1")}{" "}
            <span className="text-gradient">{t("pricing.title2")}</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            {t("pricing.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                plan.highlight
                  ? "border-primary shadow-[0_8px_32px_hsl(243_80%_62%/0.20)] bg-card"
                  : "border-border bg-card hover:shadow-md"
              }`}
            >
              {plan.highlight && (
                <div className="gradient-primary px-6 py-1.5 text-center">
                  <span className="text-xs font-bold text-primary-foreground uppercase tracking-wider">
                    {plan.badge}
                  </span>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-4xl font-black text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground mb-1">{plan.period}</span>
                </div>
                <Link
                  href="/iletisim"
                  className={`w-full inline-flex items-center justify-center py-2.5 px-4 rounded-md text-sm font-semibold transition-all active:scale-[0.98] mb-6 ${
                    plan.highlight
                      ? "bg-primary text-primary-foreground hover:bg-[hsl(243,80%,55%)] shadow-[0_2px_8px_hsl(243_80%_62%/0.30)]"
                      : "bg-background border border-border text-foreground hover:bg-muted"
                  }`}
                >
                  {plan.cta}
                </Link>
                <ul className="space-y-3">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm">
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        plan.highlight ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                      }`}>
                        <Check className="w-2.5 h-2.5" />
                      </span>
                      <span className="text-foreground">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent/8 border border-accent/20 text-accent font-medium text-sm">
            <Zap className="w-4 h-4" />
            {t("pricing.trial")}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
