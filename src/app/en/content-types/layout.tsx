import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content Types",
  description: "AI-powered content generation solutions for blog, category, and product content.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
