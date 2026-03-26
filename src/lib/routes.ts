export type RouteKey =
  | "home"
  | "features"
  | "contentTypes"
  | "contentTypesBlog"
  | "contentTypesCategory"
  | "contentTypesProduct"
  | "howItWorks"
  | "pricing"
  | "contact"
  | "technology"
  | "demo"
  | "blog"
  | "helpCenter"
  | "privacyPolicy"
  | "termsOfUse"
  | "refundPolicy"
  | "distanceSelling";

export const routeMap: Record<RouteKey, { tr: string; en: string }> = {
  home:                { tr: "/",                          en: "/en" },
  features:            { tr: "/ozellikler",                en: "/en/features" },
  contentTypes:        { tr: "/icerik-tipleri",            en: "/en/content-types" },
  contentTypesBlog:    { tr: "/icerik-tipleri/blog",       en: "/en/content-types/blog" },
  contentTypesCategory:{ tr: "/icerik-tipleri/kategori",   en: "/en/content-types/category" },
  contentTypesProduct: { tr: "/icerik-tipleri/urun",       en: "/en/content-types/product" },
  howItWorks:          { tr: "/nasil-calisir",             en: "/en/how-it-works" },
  pricing:             { tr: "/fiyatlandirma",             en: "/en/pricing" },
  contact:             { tr: "/iletisim",                  en: "/en/contact" },
  technology:          { tr: "/teknoloji",                 en: "/en/technology" },
  demo:                { tr: "/demo",                      en: "/en/demo" },
  blog:                { tr: "/blog",                      en: "/en/blog" },
  helpCenter:          { tr: "/yardim-merkezi",            en: "/en/help-center" },
  privacyPolicy:       { tr: "/gizlilik-politikasi",       en: "/en/privacy-policy" },
  termsOfUse:          { tr: "/kullanim-kosullari",        en: "/en/terms-of-use" },
  refundPolicy:        { tr: "/iptal-ve-iade",             en: "/en/refund-policy" },
  distanceSelling:     { tr: "/mesafeli-satis-sozlesmesi",  en: "/en/distance-selling-agreement" },
};

// Build reverse lookup: path -> { key, lang }
const pathToRoute = new Map<string, { key: RouteKey; lang: "tr" | "en" }>();
for (const [key, paths] of Object.entries(routeMap)) {
  pathToRoute.set(paths.tr, { key: key as RouteKey, lang: "tr" });
  pathToRoute.set(paths.en, { key: key as RouteKey, lang: "en" });
}

export function getLangFromPath(pathname: string): "tr" | "en" {
  return pathname.startsWith("/en") ? "en" : "tr";
}

export function getLocalizedPath(routeKey: RouteKey, lang: "tr" | "en"): string {
  return routeMap[routeKey][lang];
}

export function getAlternatePath(currentPath: string, targetLang: "tr" | "en"): string {
  // Exact match
  const exact = pathToRoute.get(currentPath);
  if (exact) return routeMap[exact.key][targetLang];

  // Blog detail: /blog/[slug] <-> /en/blog/[slug]
  if (currentPath.startsWith("/en/blog/")) {
    return targetLang === "tr" ? currentPath.replace("/en/blog/", "/blog/") : currentPath;
  }
  if (currentPath.startsWith("/blog/") && !currentPath.startsWith("/blog?")) {
    return targetLang === "en" ? "/en" + currentPath : currentPath;
  }

  // Fallback: just toggle /en prefix
  if (targetLang === "en" && !currentPath.startsWith("/en")) {
    return "/en" + currentPath;
  }
  if (targetLang === "tr" && currentPath.startsWith("/en")) {
    const stripped = currentPath.replace(/^\/en/, "") || "/";
    return stripped;
  }

  return currentPath;
}

export function getHrefLangs(currentPath: string): { tr: string; en: string } {
  const info = pathToRoute.get(currentPath);
  if (info) {
    return {
      tr: routeMap[info.key].tr,
      en: routeMap[info.key].en,
    };
  }
  // Blog detail pages
  if (currentPath.startsWith("/en/blog/")) {
    const slug = currentPath.replace("/en/blog/", "");
    return { tr: `/blog/${slug}`, en: currentPath };
  }
  if (currentPath.startsWith("/blog/")) {
    const slug = currentPath.replace("/blog/", "");
    return { tr: currentPath, en: `/en/blog/${slug}` };
  }
  return { tr: currentPath, en: `/en${currentPath}` };
}
