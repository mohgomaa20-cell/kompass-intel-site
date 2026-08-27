"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export const Testimonial: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-kompass-bg py-16 border-b border-kompass-border">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left mb-10">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-kompass-teal">
            {t.testimonials_subtitle}
          </span>
          <h2 className="font-condensed text-3xl font-extrabold tracking-wider text-kompass-text mt-1 uppercase">
            {t.testimonials_title}
          </h2>
        </div>

        {/* Two-Column Grid: Left (Real Photo), Right (Text & Disclaimer) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Real Action Coaching Shot */}
          <div className="md:col-span-5 relative min-h-[260px] md:min-h-full border border-kompass-border/60 bg-kompass-card overflow-hidden shadow-lg shadow-kompass-teal/5">
            {/* Corner brackets */}
            <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-kompass-teal/30 z-10" />
            <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-kompass-teal/30 z-10" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-kompass-teal/30 z-10" />
            <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-kompass-teal/30 z-10" />
            
            <Image 
              src={t.img_corner} 
              alt="WKF In-Corner Technical Coaching Verification" 
              fill
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover object-center filter brightness-90 contrast-105"
            />
          </div>

          {/* Right Column: Text & Security Disclaimer */}
          <div className="md:col-span-7 flex flex-col justify-between border border-kompass-border bg-kompass-card p-6 sm:p-8 relative overflow-hidden space-y-6">
            {/* Corner brackets */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-kompass-border/60" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-kompass-border/60" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-kompass-border/60" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-kompass-border/60" />

            <div className="space-y-4">
              <span className="font-mono text-[9px] uppercase tracking-widest text-kompass-teal block">
                PARTNERSHIP LEVEL
              </span>
              <p className="text-sm sm:text-base text-kompass-text/90 leading-relaxed font-sans text-left">
                {t.testimonials_fallback}
              </p>
            </div>

            {/* Pulled Confidentiality Disclaimer Banner */}
            <div className="border border-dashed border-kompass-teal/30 bg-[#0B0F16]/50 p-4 relative">
              <span className="font-mono text-[8px] uppercase tracking-widest text-kompass-teal block mb-1 text-left">
                [ SECURITY & AUDIT PROTOCOL ]
              </span>
              <p className="text-xs text-kompass-text/60 leading-relaxed text-left font-mono">
                {t.contact_disclaimer}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Testimonial;
