import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-merriweather",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Baglac | AI Destekli Icerik Uretim Platformu",
    template: "%s | Baglac",
  },
  description: "E-ticaret siteleri icin SEO uyumlu, ozgun icerikler ureten yapay zeka platformu.",
  metadataBase: new URL("https://baglac.com.tr"),
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Baglac",
  },
  verification: {
    google: "RX6VKmnUW8S6mp4uqZ21gcklHtPLvyS74VdbwLFmc8c",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${inter.variable} ${merriweather.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
