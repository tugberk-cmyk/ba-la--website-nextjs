import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yardim Merkezi",
  description:
    "Baglac hakkinda sik sorulan sorular, kullanim rehberleri ve destek bilgileri.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
