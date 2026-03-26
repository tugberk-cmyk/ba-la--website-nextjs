"use client";

import { useState } from "react";
import { MapPin, Mail, Phone, Send, CheckCircle } from "lucide-react";
import CtaSection from "@/components/CtaSection";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const { t } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError(t("contact.error"));
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "API error");
      }
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setError(t("contact.errorSend"));
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: MapPin, label: t("contact.address"), value: "Fulya Mah. Büyükdere Cad. Hukukçular Sitesi No:24 Kat:3 D:24 Şişli / İstanbul" },
    { icon: Mail, label: t("contact.email"), value: "hey@baglac.com.tr", href: "mailto:hey@baglac.com.tr" },
    { icon: Phone, label: t("contact.phone"), value: "+90 850 308 49 80", href: "tel:+908503084980" },
  ];

  return (
    <main className="pt-[60px]">
      <section className="py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">{t("contact.badge")}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">{t("contact.title")}</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">{t("contact.subtitle")}</p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-semibold text-foreground">{t("contact.infoTitle")}</h2>
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-md bg-foreground flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-background" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm text-foreground hover:text-muted-foreground transition-colors">{item.value}</a>
                      ) : (
                        <p className="text-sm text-foreground leading-relaxed">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-xl overflow-hidden border border-border h-48 bg-secondary flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Şişli / İstanbul</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <h2 className="text-xl font-semibold text-foreground mb-6">{t("contact.formTitle")}</h2>
              {sent ? (
                <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-foreground flex items-center justify-center">
                    <CheckCircle className="w-7 h-7 text-background" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{t("contact.successTitle")}</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">{t("contact.successDesc")}</p>
                  <button onClick={() => setSent(false)} className="mt-2 text-sm font-medium text-foreground underline underline-offset-4 hover:opacity-70 transition-opacity">
                    {t("contact.newMessage")}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                        {t("contact.name")} <span className="text-foreground">{t("contact.required")}</span>
                      </label>
                      <input name="name" value={form.name} onChange={handleChange} placeholder={t("contact.namePlaceholder")} maxLength={100}
                        className="w-full px-3.5 py-2.5 text-sm rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                        {t("contact.emailLabel")} <span className="text-foreground">{t("contact.required")}</span>
                      </label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} placeholder={t("contact.emailPlaceholder")} maxLength={255}
                        className="w-full px-3.5 py-2.5 text-sm rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">{t("contact.subject")}</label>
                    <input name="subject" value={form.subject} onChange={handleChange} placeholder={t("contact.subjectPlaceholder")} maxLength={200}
                      className="w-full px-3.5 py-2.5 text-sm rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
                      {t("contact.message")} <span className="text-foreground">{t("contact.required")}</span>
                    </label>
                    <textarea name="message" value={form.message} onChange={handleChange} placeholder={t("contact.messagePlaceholder")} maxLength={2000} rows={6}
                      className="w-full px-3.5 py-2.5 text-sm rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all resize-none" />
                  </div>
                  {error && <p className="text-sm text-destructive">{error}</p>}
                  <button type="submit" disabled={loading}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-foreground text-background text-sm font-semibold hover:bg-foreground/85 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                    {loading ? (
                      <><span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />{t("contact.sending")}</>
                    ) : (
                      <><Send className="w-4 h-4" />{t("contact.send")}</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      <CtaSection />
    </main>
  );
}
