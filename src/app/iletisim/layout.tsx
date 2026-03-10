import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iletisim",
  description:
    "Baglac ekibiyle iletisime gecin. Sorularinizi yanitlayalim, ihtiyaclariniza uygun cozumu birlikte bulalim.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
