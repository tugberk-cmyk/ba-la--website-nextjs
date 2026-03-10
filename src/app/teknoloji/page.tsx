"use client";

import { useState, useEffect, useRef } from "react";
import CtaSection from "@/components/CtaSection";
import {
  Brain,
  Search,
  Globe,
  Zap,
  Network,
  Shield,
  TrendingUp,
  MessageSquare,
  Layers,
  BarChart3,
  Bot,
  Sparkles,
  ChevronDown,
  ArrowRight,
  Code2,
  Database,
  RefreshCw,
  CheckCircle2,
  Radar,
  FileText,
  GitBranch,
  Target,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// ---- Animated counter hook ----
function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// ---- Intersection observer hook ----
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ---- Static data ----

const statsConfig = [
  { value: 94, suffix: "%", labelKey: "tech.stats.s1" },
  { value: 3, suffix: "dk", labelKey: "tech.stats.s2" },
  { value: 40, suffix: "K+", labelKey: "tech.stats.s3" },
  { value: 99, suffix: "%", labelKey: "tech.stats.s4" },
];

const seoSignals = [
  { label: "Semantic Keyword Density", value: 88, color: "bg-foreground" },
  { label: "Heading Hierarchy Score", value: 95, color: "bg-foreground" },
  { label: "Readability Index", value: 91, color: "bg-foreground" },
  { label: "Internal Link Depth", value: 78, color: "bg-foreground" },
  { label: "Entity Coverage", value: 84, color: "bg-foreground" },
];

const geoSignals = [
  { label: "Answer Completeness", value: 92, color: "bg-foreground" },
  { label: "Fact Accuracy Score", value: 96, color: "bg-foreground" },
  { label: "Conversational Fit", value: 89, color: "bg-foreground" },
  { label: "Source Trustworthiness", value: 87, color: "bg-foreground" },
  { label: "AI Snippet Eligibility", value: 93, color: "bg-foreground" },
];

const techLayersMeta = [
  { icon: Brain, titleKey: "tech.arch.layer1.title", descKey: "tech.arch.layer1.desc", tags: ["LLM", "Orchestration"], color: "pastel-blue" },
  { icon: Search, titleKey: "tech.arch.layer2.title", descKey: "tech.arch.layer2.desc", tags: ["LSI", "NLP", "Entity Graph"], color: "pastel-green" },
  { icon: Globe, titleKey: "tech.arch.layer3.title", descKey: "tech.arch.layer3.desc", tags: ["AI Search", "Answer Engine", "AEO"], color: "pastel-amber" },
  { icon: RefreshCw, titleKey: "tech.arch.layer6.title", descKey: "tech.arch.layer6.desc", tags: ["Freshness", "Re-rank", "Trending"], color: "pastel-amber" },
  { icon: Search, titleKey: "tech.arch.layer7.title", descKey: "tech.arch.layer7.desc", tags: ["Multi-source", "Synthesis", "Depth"], color: "pastel-blue" },
  { icon: Globe, titleKey: "tech.arch.layer8.title", descKey: "tech.arch.layer8.desc", tags: ["Scraping", "Parsing", "Live Data"], color: "pastel-green" },
  { icon: BarChart3, titleKey: "tech.arch.layer9.title", descKey: "tech.arch.layer9.desc", tags: ["SERP", "Ranking", "Intent"], color: "pastel-amber" },
  { icon: Radar, titleKey: "tech.arch.layer10.title", descKey: "tech.arch.layer10.desc", tags: ["N-gram", "Competitor", "Gap"], color: "pastel-blue" },
  { icon: TrendingUp, titleKey: "tech.arch.layer11.title", descKey: "tech.arch.layer11.desc", tags: ["TF-IDF", "Relevance", "Weight"], color: "pastel-green" },
  { icon: Target, titleKey: "tech.arch.layer12.title", descKey: "tech.arch.layer12.desc", tags: ["NER", "Knowledge", "Linking"], color: "pastel-amber" },
  { icon: FileText, titleKey: "tech.arch.layer13.title", descKey: "tech.arch.layer13.desc", tags: ["Outline", "Structure", "Strategy"], color: "pastel-blue" },
  { icon: GitBranch, titleKey: "tech.arch.layer14.title", descKey: "tech.arch.layer14.desc", tags: ["Query", "Fan-out", "Coverage"], color: "pastel-green" },
];

const pipelineStepsMeta = [
  { n: "01", icon: Search, titleKey: "tech.pipeline.step1.title", descKey: "tech.pipeline.step1.desc" },
  { n: "02", icon: Network, titleKey: "tech.pipeline.step2.title", descKey: "tech.pipeline.step2.desc" },
  { n: "03", icon: Layers, titleKey: "tech.pipeline.step3.title", descKey: "tech.pipeline.step3.desc" },
  { n: "04", icon: BarChart3, titleKey: "tech.pipeline.step4.title", descKey: "tech.pipeline.step4.desc" },
  { n: "05", icon: Bot, titleKey: "tech.pipeline.step5.title", descKey: "tech.pipeline.step5.desc" },
  { n: "06", icon: Search, titleKey: "tech.pipeline.step6.title", descKey: "tech.pipeline.step6.desc" },
  { n: "07", icon: Sparkles, titleKey: "tech.pipeline.step7.title", descKey: "tech.pipeline.step7.desc" },
];

const faqKeys = [
  { qKey: "tech.faq.q1", aKey: "tech.faq.a1" },
  { qKey: "tech.faq.q2", aKey: "tech.faq.a2" },
  { qKey: "tech.faq.q3", aKey: "tech.faq.a3" },
  { qKey: "tech.faq.q4", aKey: "tech.faq.a4" },
  { qKey: "tech.faq.q5", aKey: "tech.faq.a5" },
];

const geoVsSeoKeys = [
  { dimKey: "tech.seoVsGeo.dim1", seoKey: "tech.seoVsGeo.seo1", geoKey: "tech.seoVsGeo.geo1" },
  { dimKey: "tech.seoVsGeo.dim2", seoKey: "tech.seoVsGeo.seo2", geoKey: "tech.seoVsGeo.geo2" },
  { dimKey: "tech.seoVsGeo.dim3", seoKey: "tech.seoVsGeo.seo3", geoKey: "tech.seoVsGeo.geo3" },
  { dimKey: "tech.seoVsGeo.dim4", seoKey: "tech.seoVsGeo.seo4", geoKey: "tech.seoVsGeo.geo4" },
  { dimKey: "tech.seoVsGeo.dim5", seoKey: "tech.seoVsGeo.seo5", geoKey: "tech.seoVsGeo.geo5" },
];

// ---- Sub-components ----

function StatCard({ value, suffix, label, start }: { value: number; suffix: string; label: string; start: boolean }) {
  const count = useCountUp(value, 1600, start);
  return (
    <div className="text-center py-10 px-6">
      <div className="text-4xl font-black text-foreground tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

function SignalBar({ label, value, color, delay = 0, start }: { label: string; value: number; color: string; delay?: number; start: boolean }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!start) return;
    const t = setTimeout(() => setWidth(value), delay);
    return () => clearTimeout(t);
  }, [start, value, delay]);
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground font-medium">{label}</span>
        <span className="text-foreground font-semibold tabular-nums">{value}</span>
      </div>
      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color} transition-all duration-1000 ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

function TechFaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="text-sm font-semibold text-foreground group-hover:text-foreground/80 transition-colors">{q}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 pb-5" : "max-h-0"}`}>
        <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

// ---- Page ----

export default function TechnologyPage() {
  const { t } = useLanguage();
  const statsSection = useInView(0.3);
  const techSection = useInView(0.1);
  const signalSection = useInView(0.2);

  const heroCards = [
    { icon: TrendingUp, label: t("tech.semanticSeo"), tag: t("tech.active") },
    { icon: Globe, label: t("tech.geoLayer"), tag: t("tech.active") },
    { icon: Bot, label: t("tech.llmOrchestration"), tag: t("tech.active") },
    { icon: Search, label: t("tech.deepResearch"), tag: t("tech.active") },
    { icon: Code2, label: t("tech.webCrawl"), tag: t("tech.active") },
    { icon: Layers, label: t("tech.serpAnalysis"), tag: t("tech.active") },
  ];

  return (
    <main className="pt-[60px]">

      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32 border-b border-border">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(circle at 1.5px 1.5px, hsl(0 0% 0%) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border text-xs font-semibold mb-6 uppercase tracking-wider text-muted-foreground animate-fade-in">
            <Sparkles className="w-3.5 h-3.5" />
            {t("tech.badge")}
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] text-foreground mb-6 animate-fade-up">
            {t("tech.heroTitle1")}
            <br />
            <span className="text-gradient">{t("tech.heroTitle2")}</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: "0.1s" }}>
            {t("tech.heroSubtitle")}
          </p>

          <div className="mt-16 flex flex-wrap justify-center gap-3 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            {heroCards.map(({ icon: Icon, label, tag }) => (
              <div key={label} className="flex items-center gap-2.5 px-4 py-2.5 bg-card border border-border rounded-xl shadow-card text-sm">
                <div className="w-7 h-7 rounded-lg bg-foreground flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5 text-background" />
                </div>
                <span className="font-semibold text-foreground">{label}</span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-[hsl(150_55%_50%)] animate-pulse" />
                  {tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsSection.ref} className="py-4 border-b border-border bg-secondary/30">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {statsConfig.map((s) => (
            <StatCard key={s.labelKey} value={s.value} suffix={s.suffix} label={t(s.labelKey)} start={statsSection.inView} />
          ))}
        </div>
      </section>

      {/* SEO vs GEO */}
      <section className="py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-14 mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border text-xs font-semibold mb-4 uppercase tracking-wider text-muted-foreground">
              {t("tech.seoVsGeo.badge")}
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4 text-foreground">
              {t("tech.seoVsGeo.title")}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t("tech.seoVsGeo.subtitle")}
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border shadow-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary">
                  <th className="text-left px-6 py-4 font-semibold text-foreground w-[22%]">{t("tech.seoVsGeo.dimension")}</th>
                  <th className="text-left px-6 py-4 w-[39%]">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-foreground flex items-center justify-center">
                        <Search className="w-3.5 h-3.5 text-background" />
                      </div>
                      <span className="font-semibold text-foreground">SEO</span>
                      <span className="text-xs text-muted-foreground font-normal">{t("tech.seoVsGeo.seoLabel")}</span>
                    </div>
                  </th>
                  <th className="text-left px-6 py-4 w-[39%]">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-foreground flex items-center justify-center">
                        <Globe className="w-3.5 h-3.5 text-background" />
                      </div>
                      <span className="font-semibold text-foreground">GEO</span>
                      <span className="text-xs text-muted-foreground font-normal">{t("tech.seoVsGeo.geoLabel")}</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {geoVsSeoKeys.map((row, i) => (
                  <tr key={row.dimKey} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-background" : "bg-secondary/40"}`}>
                    <td className="px-6 py-4 font-semibold text-foreground text-xs uppercase tracking-wide">{t(row.dimKey)}</td>
                    <td className="px-6 py-4 text-muted-foreground leading-relaxed">{t(row.seoKey)}</td>
                    <td className="px-6 py-4 text-muted-foreground leading-relaxed">{t(row.geoKey)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex items-start gap-3 max-w-2xl mx-auto p-5 bg-secondary rounded-xl border border-border">
            <CheckCircle2 className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">{t("tech.seoVsGeo.note")}</strong>{t("tech.seoVsGeo.noteDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* Optimization Signals */}
      <section ref={signalSection.ref} className="py-24 border-b border-border bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-14 mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background border border-border text-xs font-semibold mb-4 uppercase tracking-wider text-muted-foreground">
              {t("tech.signals.badge")}
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4 text-foreground">
              {t("tech.signals.title")}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t("tech.signals.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-foreground flex items-center justify-center">
                  <Search className="w-4.5 h-4.5 text-background" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{t("tech.signals.seoEngine")}</h3>
                  <p className="text-xs text-muted-foreground">{t("tech.signals.seoEngineDesc")}</p>
                </div>
              </div>
              <div className="space-y-4">
                {seoSignals.map((s, i) => (
                  <SignalBar key={s.label} {...s} delay={i * 120} start={signalSection.inView} />
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 shadow-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-foreground flex items-center justify-center">
                  <Globe className="w-4.5 h-4.5 text-background" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{t("tech.signals.geoEngine")}</h3>
                  <p className="text-xs text-muted-foreground">{t("tech.signals.geoEngineDesc")}</p>
                </div>
              </div>
              <div className="space-y-4">
                {geoSignals.map((s, i) => (
                  <SignalBar key={s.label} {...s} delay={i * 120 + 60} start={signalSection.inView} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Layers */}
      <section ref={techSection.ref} className="py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-14 mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border text-xs font-semibold mb-4 uppercase tracking-wider text-muted-foreground">
              {t("tech.arch.badge")}
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4 text-foreground">
              {t("tech.arch.title")}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t("tech.arch.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {techLayersMeta.map((layer, i) => {
              const Icon = layer.icon;
              return (
                <div
                  key={layer.titleKey}
                  className="feature-card group"
                  style={{
                    opacity: techSection.inView ? 1 : 0,
                    transform: techSection.inView ? "translateY(0)" : "translateY(24px)",
                    transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms`,
                  }}
                >
                  <div className="w-10 h-10 rounded-xl bg-foreground flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-background" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">{t(layer.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{t(layer.descKey)}</p>
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
                    {layer.tags.map((tag) => (
                      <span key={tag} className={`px-2 py-0.5 rounded-md text-[11px] font-medium ${layer.color}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How the pipeline works */}
      <section className="py-24 border-b border-border bg-foreground text-background">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background/10 border border-background/20 text-xs font-semibold mb-4 uppercase tracking-wider text-background/70">
              {t("tech.pipeline.badge")}
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-4">
              {t("tech.pipeline.title1")}<br />{t("tech.pipeline.title2")}
            </h2>
            <p className="text-lg text-background/60 max-w-xl mx-auto">
              {t("tech.pipeline.subtitle")}
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-[27px] top-0 bottom-0 w-px bg-background/15 md:left-1/2" />

            <div className="space-y-10">
              {pipelineStepsMeta.map((step, i) => {
                const Icon = step.icon;
                const isRight = i % 2 !== 0;
                return (
                  <div key={step.n} className={`relative flex items-start gap-6 md:gap-0 ${isRight ? "md:flex-row-reverse" : ""}`}>
                    <div className="relative z-10 shrink-0 w-14 h-14 rounded-2xl bg-background/10 border border-background/20 flex items-center justify-center md:absolute md:left-1/2 md:-translate-x-1/2">
                      <Icon className="w-6 h-6 text-background" />
                    </div>
                    <div className={`flex-1 pl-0 md:max-w-[calc(50%-56px)] ${isRight ? "md:pr-14 md:text-right" : "md:pl-14"}`}>
                      <div className="text-xs font-mono text-background/40 mb-1">{step.n}</div>
                      <h3 className="font-bold text-background mb-2">{t(step.titleKey)}</h3>
                      <p className="text-sm text-background/60 leading-relaxed">{t(step.descKey)}</p>
                    </div>
                    <div className="hidden md:block flex-1" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 border-b border-border">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border text-xs font-semibold mb-4 uppercase tracking-wider text-muted-foreground">
              <MessageSquare className="w-3.5 h-3.5" />
              {t("tech.faq.badge")}
            </div>
            <h2 className="text-4xl font-black tracking-tight leading-tight mb-4 text-foreground">
              {t("tech.faq.title")}
            </h2>
          </div>

          <div className="border border-border rounded-2xl overflow-hidden bg-card shadow-card px-6">
            {faqKeys.map((item) => (
              <TechFaqItem key={item.qKey} q={t(item.qKey)} a={t(item.aKey)} />
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </main>
  );
}
