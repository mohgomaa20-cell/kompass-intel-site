"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export const ClosingCta: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-kompass-bg via-kompass-card to-kompass-bg py-20 border-b border-kompass-border text-center">
      {/* Teal hairline lines bordering the top and bottom of the CTA band */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-kompass-teal/60 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-kompass-teal/60 to-transparent" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="font-condensed text-3xl sm:text-4xl font-extrabold tracking-wider text-kompass-text uppercase leading-none text-balance">
          {t.closing_title}
        </h2>
        <p className="text-sm sm:text-base text-kompass-text/65 max-w-xl mx-auto leading-relaxed text-balance">
          {t.closing_desc}
        </p>
        <div className="pt-4">
          <Link 
            href="#contact" 
            className="bg-kompass-teal border border-kompass-teal text-kompass-bg px-8 py-3.5 font-condensed text-xs uppercase tracking-widest font-bold hover:bg-transparent hover:text-kompass-teal transition-all inline-block"
          >
            {t.closing_btn}
          </Link>
        </div>
      </div>
    </section>
  );
};
export default ClosingCta;
