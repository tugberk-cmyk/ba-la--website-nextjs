import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikasi",
  description:
    "Baglac'in gizlilik politikasi. Verilerinizin nasil toplandigi ve korundugu hakkinda bilgi.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
