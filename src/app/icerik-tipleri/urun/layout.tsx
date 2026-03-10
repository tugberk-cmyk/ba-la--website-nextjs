import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Urun Icerigi",
  description:
    "Toplu urun aciklamalari olusturun. Excel yukleyin, dakikalar icinde SEO uyumlu urun metinleri alin.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
