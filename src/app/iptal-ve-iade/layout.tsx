import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iptal ve Iade Politikasi — Baglac",
  description:
    "Baglac hizmet iptali, cayma hakki ve iade kosullari hakkinda bilgi.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
