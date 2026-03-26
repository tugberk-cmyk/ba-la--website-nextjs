import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Category Content",
  description: "Create SEO-focused, conversion-boosting content for e-commerce category pages.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
