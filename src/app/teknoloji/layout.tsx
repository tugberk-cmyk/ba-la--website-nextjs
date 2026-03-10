import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teknoloji",
  description:
    "Baglac'in arkasindaki yapay zeka teknolojisini kesfedin. LLM tabanli icerik uretim mimarimiz.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
