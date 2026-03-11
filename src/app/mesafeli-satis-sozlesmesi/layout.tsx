import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mesafeli Satis Sozlesmesi — Baglac",
  description:
    "Baglac dijital hizmet sozlesmesi. Taraflar, hizmet kapsami, odeme sartlari ve feshine iliskin bilgiler.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
