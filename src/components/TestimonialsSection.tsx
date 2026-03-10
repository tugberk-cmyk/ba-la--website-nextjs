"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    brand: "Penti",
    name: "Ayşe Kaya",
    title: "E-ticaret Direktörü",
    quote:
      "Bağlaç ile 500'den fazla ürün açıklamasını tek günde oluşturduk. SEO skoru ortalama 92'nin üzerinde çıktı. Rakiplerimizi geçmek artık çok daha kolay.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    brand: "Watsons",
    name: "Mehmet Arslan",
    title: "Dijital Pazarlama Müdürü",
    quote:
      "Kategori metinlerimizi manuel yazmak saatler alıyordu. Bağlaç bu süreci dakikaya indirdi ve içerik kalitesi hiç beklemediğimiz kadar yüksek oldu.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    brand: "Under Armour",
    name: "Selin Doğan",
    title: "SEO Uzmanı",
    quote:
      "Anahtar kelime araştırmasından başlık yapısına, soru-cevap bölümlerine kadar her şey tek platformda. Başka bir araca ihtiyaç duymuyorum artık.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    brand: "Denizbank",
    name: "Can Yıldırım",
    title: "İçerik Stratejisti",
    quote:
      "Finansal içerik üretmek hassas bir alan ama Bağlaç'ın ton ayarı özelliği kurumsal dilimize mükemmel uyum sağlıyor. Ekibimiz çok memnun.",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
  },
];

const PAIRS = [
  [testimonials[0], testimonials[1]],
  [testimonials[2], testimonials[3]],
];

const TestimonialsSection = () => {
  const [page, setPage] = useState(0);

  const prev = () => setPage((p) => (p === 0 ? PAIRS.length - 1 : p - 1));
  const next = () => setPage((p) => (p === PAIRS.length - 1 ? 0 : p + 1));

  const pair = PAIRS[page];

  return (
    <section className="py-24 border-y border-border">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header row */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border text-xs font-semibold mb-4 uppercase tracking-wider text-muted-foreground">
              Müşteri Yorumları
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-foreground">
              Markalar ne diyor?
            </h2>
          </div>

          {/* Arrows — Peec style: simple bordered circles */}
          <div className="flex gap-2 mt-2">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
              aria-label="Önceki"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all"
              aria-label="Sonraki"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2-column cards */}
        <div key={page} className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in">
          {pair.map((t) => (
            <div
              key={t.name}
              className="bg-card border border-border rounded-2xl p-8 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              {/* Quote */}
              <blockquote className="text-base text-foreground leading-relaxed mb-8">
                "{t.quote}"
              </blockquote>

              {/* Author — avatar left, name/title/brand stacked right */}
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-border flex-shrink-0"
                />
                <div>
                  <p className="text-sm font-bold text-foreground leading-tight">{t.name}</p>
                  <p className="text-xs text-muted-foreground leading-tight">{t.title}</p>
                  <p className="text-xs font-semibold text-foreground/60 leading-tight">{t.brand}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex gap-2 mt-8 justify-center">
          {PAIRS.map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === page ? "w-6 bg-foreground" : "w-1.5 bg-border hover:bg-muted-foreground"
              }`}
              aria-label={`Sayfa ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
