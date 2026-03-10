"use client";

const stats = [
  { value: "40K+", label: "Üretilen İçerik" },
  { value: "3 dk", label: "Ort. Üretim Süresi" },
  { value: "%94", label: "Ortalama SEO Skoru" },
  { value: "500+", label: "Aktif Kullanıcı" },
];

const StatsSection = () => {
  return (
    <section>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {stats.map((stat, i) => (
            <div key={i} className="py-10 px-8 text-center">
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
