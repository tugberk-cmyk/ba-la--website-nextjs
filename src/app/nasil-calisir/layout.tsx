import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nasil Calisir",
  description:
    "Baglac ile icerik uretim surecinizi adim adim kesfedin. Anahtar kelimeden yayina 4 kolay adim.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
