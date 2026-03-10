import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo Talep Et — Bağlaç",
  description:
    "Bağlaç AI destekli içerik üretim platformunu keşfedin. Ekibimizle görüşme planlayın ve işletmenize nasıl değer katabileceğimizi öğrenin.",
  openGraph: {
    title: "Demo Talep Et — Bağlaç",
    description:
      "Bağlaç AI destekli içerik üretim platformunu keşfedin. Ekibimizle görüşme planlayın.",
  },
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
