"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export const ProofStrip: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-kompass-bg py-12 border-b border-kompass-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.proof_items.map((item, i) => (
            <div 
              key={i} 
              className="flex flex-col justify-between border-l border-kompass-border pl-6 py-2 text-left"
            >
              <div>
                {/* Metric pill tag */}
                <div className="inline-block bg-kompass-card border border-kompass-border px-2 py-0.5 text-[9px] font-mono font-bold uppercase tracking-widest text-kompass-teal mb-3">
                  {item.tag}
                </div>
                {/* Metric value */}
                <div className="font-condensed text-4xl sm:text-5xl font-extrabold text-kompass-text tracking-tight mt-1">
                  {item.value}
                </div>
              </div>
              {/* Metric description */}
              <p className="text-xs sm:text-sm text-kompass-text/60 mt-3 max-w-xs leading-relaxed">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ProofStrip;
