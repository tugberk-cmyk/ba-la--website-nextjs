"use client";

import { usePathname } from "next/navigation";
import { getHrefLangs } from "@/lib/routes";

const BASE_URL = "https://baglac.com.tr";

export default function HrefLangTags() {
  const pathname = usePathname();
  const { tr, en } = getHrefLangs(pathname);

  return (
    <>
      <link rel="alternate" hrefLang="tr" href={`${BASE_URL}${tr}`} />
      <link rel="alternate" hrefLang="en" href={`${BASE_URL}${en}`} />
      <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}${tr}`} />
    </>
  );
}
