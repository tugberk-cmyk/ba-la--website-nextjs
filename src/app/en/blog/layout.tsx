import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Baglac",
  description: "Latest articles on e-commerce, SEO, and AI-powered content generation.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
