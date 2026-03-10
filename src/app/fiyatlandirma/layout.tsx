import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fiyatlandirma",
  description:
    "Ihtiyaciniza uygun plani secin. Ucretsiz deneme ile baslayin, isletmeniz buyudukce olceklendirin.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
