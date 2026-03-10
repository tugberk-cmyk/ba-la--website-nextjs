import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Icerigi",
  description:
    "SEO uyumlu, uzman duzeyinde blog icerikleri uretin. E-E-A-T standartlarinda, yapilandirilmis ve okunabilir.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
