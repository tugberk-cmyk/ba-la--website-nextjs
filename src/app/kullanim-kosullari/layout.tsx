import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kullanim Kosullari",
  description:
    "Baglac platformunun kullanim kosullari ve hizmet sartlari.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
