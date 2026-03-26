import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Content",
  description: "Generate SEO-compatible, expert-level blog content. Structured, readable, and aligned with E-E-A-T standards.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
