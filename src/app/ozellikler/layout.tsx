import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform Ozellikleri",
  description:
    "Anahtar kelime arastirmasindan toplu icerik uretimine, arsivlemeye kadar — tek bir platform, tam kontrol.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
