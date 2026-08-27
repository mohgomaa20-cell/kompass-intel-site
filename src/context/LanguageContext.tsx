"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { content, ContentTranslation } from "@/data/content";
import { getSiteContentOverrides } from "@/lib/db";

type Locale = "en" | "ar";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: ContentTranslation;
  isRtl: boolean;
  refreshOverrides: () => Promise<void>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>("en");
  const [overrides, setOverrides] = useState<Record<string, string>>({});

  const refreshOverrides = async () => {
    try {
      const data = await getSiteContentOverrides();
      setOverrides(data);
    } catch (err) {
      console.error("Failed to load content overrides:", err);
    }
  };

  useEffect(() => {
    // Set HTML dir and lang attributes
    const dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    refreshOverrides();
  }, []);

  const baseT = content[locale];
  const isRtl = locale === "ar";

  // Merge overrides dynamically
  const t = useMemo(() => {
    const newT = { ...baseT };
    if (overrides.hero_title) newT.hero_title = overrides.hero_title;
    if (overrides.hero_desc) newT.hero_desc = overrides.hero_desc;
    
    // Image overrides
    if (overrides.img_hero) newT.img_hero = overrides.img_hero;
    if (overrides.img_corner) newT.img_corner = overrides.img_corner;
    if (overrides.img_kia) newT.img_kia = overrides.img_kia;
    if (overrides.img_team) newT.img_team = overrides.img_team;
    
    // Ecosystem overrides
    newT.products = baseT.products.map(prod => {
      const updated = { ...prod };
      if (prod.id === "kompass" && overrides.product_kompass_desc) {
        updated.desc = overrides.product_kompass_desc;
      }
      if (prod.id === "kontrol" && overrides.product_kontrol_desc) {
        updated.desc = overrides.product_kontrol_desc;
      }
      if (prod.id === "edge" && overrides.product_edge_desc) {
        updated.desc = overrides.product_edge_desc;
      }
      return updated;
    });

    return newT;
  }, [baseT, overrides]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, isRtl, refreshOverrides }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
