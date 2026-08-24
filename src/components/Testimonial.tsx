"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export const Testimonial: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-kompass-bg py-16 border-b border-kompass-border">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-kompass-teal">
            {t.testimonials_subtitle}
          </span>
          <h2 className="font-condensed text-3xl font-extrabold tracking-wider text-kompass-text mt-1 uppercase">
            {t.testimonials_title}
          </h2>
        </div>

        {/* Card Area (Single Line as requested) */}
        <div className="relative border border-kompass-border bg-kompass-card p-8 sm:p-12 overflow-hidden flex flex-col justify-center items-center shadow-xl shadow-kompass-teal/5 text-center">
          
          {/* Corner brackets */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-kompass-border/60" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-kompass-border/60" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-kompass-border/60" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-kompass-border/60" />

          <p className="text-sm sm:text-base text-kompass-text/90 leading-relaxed font-sans max-w-2xl">
            {t.testimonials_fallback}
          </p>
        </div>

      </div>
    </section>
  );
};
export default Testimonial;
