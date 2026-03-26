"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { routeMap, RouteKey } from "@/lib/routes";

export function useLocalizedHref(routeKey: RouteKey): string {
  const { language } = useLanguage();
  return routeMap[routeKey][language];
}
