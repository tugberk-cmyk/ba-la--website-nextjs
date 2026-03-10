import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Baglac",
  description:
    "E-ticaret, SEO ve yapay zeka destekli icerik uretimi hakkinda en guncel yazilar.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
