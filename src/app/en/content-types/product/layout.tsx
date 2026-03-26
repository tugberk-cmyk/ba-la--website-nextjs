import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Content",
  description: "Create bulk product descriptions. Upload Excel, get SEO-compatible product texts in minutes.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
