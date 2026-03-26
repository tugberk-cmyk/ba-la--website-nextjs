"use client";

import { useState } from "react";
import { Send, Zap, Globe, Layers, Settings } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

export default function DemoPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Lütfen tüm zorunlu alanları doldurun.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: "Demo Talebi",
          message: formData.message,
        }),
      });

      if (res.ok) {
        toast.success("Mesajınız başarıyla gönderildi!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Mesajınız gönderilemedi. Lütfen tekrar deneyin.");
      }
    } catch {
      toast.error("Mesajınız gönderilemedi. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    {
      icon: Zap,
      title: "Dakikalar içinde SEO içerik",
      description:
        "Blog, kategori ve ürün içeriklerinizi yapay zeka ile saniyeler içinde oluşturun.",
    },
    {
      icon: Globe,
      title: "Türkçe'ye özel optimizasyon",
      description:
        "Türkçe dil yapısına ve SEO dinamiklerine uygun, doğal akışlı metinler.",
    },
    {
      icon: Layers,
      title: "Toplu üretim gücü",
      description:
        "Excel yükleyin, yüzlerce ürün açıklamasını tek seferde oluşturun.",
    },
    {
      icon: Settings,
      title: "Tam kontrol, kolay kullanım",
      description:
        "Ton ayarı, başlık yapısı, uzunluk seçimi — her detay elinizde.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <span className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
            Demo
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Bağlaç&apos;ı keşfedin
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Ekibimizle bir görüşme planlayın ve AI destekli içerik üretiminin
            işletmenize nasıl değer katabileceğini öğrenin.
          </p>
        </div>
      </section>

      {/* Cal.com Booking Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Görüşme Planlayın
            </h2>
            <p className="mt-3 text-muted-foreground">
              Size en uygun zamanı seçin, ekibimiz sizi bekliyor olacak.
            </p>
          </div>
          <div className="bg-muted/30 rounded-2xl overflow-hidden">
            <iframe
              src="https://cal.eu/baglac?embed=true&layout=month_view"
              className="w-full border-0"
              title="Book a Demo — Cal.com"
              allow="payment"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation"
              style={{ height: "750px" }}
            />
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 border-t">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Hemen yazın
            </h2>
            <p className="mt-3 text-muted-foreground">
              Görüşme planlamak yerine doğrudan mesaj göndermek isterseniz
              aşağıdaki formu kullanın.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-2">
                  Ad Soyad <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Adınız ve soyadınız"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-2">
                  E-posta <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="ornek@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-2">
                Mesajınız <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={5}
                placeholder="Mesajınızı buraya yazın..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-medium rounded-lg hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? "Gönderiliyor..." : "Gönder"}
            </button>
          </form>
        </div>
      </section>

      {/* Why Baglac Section */}
      <section className="py-20 border-t">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Neden Bağlaç?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-border hover:border-foreground/20 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-foreground text-background flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
