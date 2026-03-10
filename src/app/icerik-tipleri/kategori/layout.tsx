import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kategori Icerigi",
  description:
    "E-ticaret kategori sayfalari icin SEO odakli, donusum arttiran icerikler olusturun.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
