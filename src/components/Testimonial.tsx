"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

export const Testimonial: React.FC = () => {
  const { t, isRtl } = useLanguage();
  const [index, setIndex] = useState(0);

  const nextTestimonial = () => {
    setIndex((prev) => (prev + 1) % t.testimonials.length);
  };

  const prevTestimonial = () => {
    setIndex((prev) => (prev - 1 + t.testimonials.length) % t.testimonials.length);
  };

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

        {/* Carousel Area */}
        <div className="relative border border-kompass-border bg-kompass-card p-8 sm:p-12 overflow-hidden min-h-[300px] flex flex-col justify-between shadow-xl shadow-kompass-teal/5">
          
          {/* Corner brackets */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-kompass-border/60" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-kompass-border/60" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-kompass-border/60" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-kompass-border/60" />

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isRtl ? -15 : 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRtl ? 15 : -15 }}
              transition={{ duration: 0.18, ease: "linear" as const }}
              className="flex-grow flex flex-col justify-between"
            >
              <div>
                {/* Classification tag */}
                <div className="inline-block bg-[#0B0F16] border border-kompass-border px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest text-kompass-teal mb-6">
                  {t.testimonials[index].tag}
                </div>

                {/* Main Quote */}
                <blockquote className="text-lg sm:text-xl font-medium text-kompass-text leading-relaxed text-left italic border-l-2 border-kompass-teal pl-6">
                  &ldquo;{t.testimonials[index].quote}&rdquo;
                </blockquote>
              </div>

              {/* Author Info */}
              <div className="mt-8 flex items-center gap-4 text-left">
                {/* Visual Avatar Placeholder - Classified style silhouette */}
                <div className="h-12 w-12 border border-kompass-border bg-[#0B0F16] flex items-center justify-center font-mono text-[10px] text-kompass-text/40">
                  PHOTO
                </div>
                <div>
                  <cite className="not-italic font-condensed text-sm font-bold text-kompass-text block">
                    {t.testimonials[index].author}
                  </cite>
                  <span className="text-xs text-kompass-text/50">
                    {t.testimonials[index].role}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12 flex gap-2">
            <button 
              onClick={prevTestimonial}
              className="border border-kompass-border bg-[#0B0F16]/60 h-8 w-8 flex items-center justify-center hover:border-kompass-teal hover:text-kompass-teal transition-colors text-xs"
              aria-label="Previous Testimonial"
            >
              ←
            </button>
            <button 
              onClick={nextTestimonial}
              className="border border-kompass-border bg-[#0B0F16]/60 h-8 w-8 flex items-center justify-center hover:border-kompass-teal hover:text-kompass-teal transition-colors text-xs"
              aria-label="Next Testimonial"
            >
              →
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
export default Testimonial;
