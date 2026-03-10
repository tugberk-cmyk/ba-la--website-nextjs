import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Icerik Tipleri",
  description:
    "Blog, kategori ve urun icerikleri icin AI destekli icerik uretim cozumleri.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
