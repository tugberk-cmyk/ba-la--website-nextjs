import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Baglac | AI-Powered Content Production Platform",
    template: "%s | Baglac",
  },
  description: "AI platform that generates SEO-compatible, original content for e-commerce sites.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Baglac",
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return children;
}
