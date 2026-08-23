"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export const InsightsGrid: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="insights" className="bg-kompass-bg py-16 border-b border-kompass-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left mb-12">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-kompass-teal">
            {t.insights_subtitle}
          </span>
          <h2 className="font-condensed text-3xl font-extrabold tracking-wider text-kompass-text mt-1 uppercase">
            {t.insights_title}
          </h2>
        </div>

        {/* 4-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.insights.map((item, i) => (
            <div 
              key={i} 
              className="flex flex-col justify-between bg-kompass-card border border-kompass-border border-t-2 border-t-kompass-teal p-6 hover:border-kompass-teal/60 transition-all cursor-pointer group"
            >
              <div>
                {/* Date & Tag */}
                <div className="flex justify-between items-center text-[9px] font-mono text-kompass-text/45 uppercase tracking-wider mb-4">
                  <span>{item.date}</span>
                  <span className="text-kompass-teal">{item.category}</span>
                </div>
                
                {/* Title */}
                <h3 className="font-condensed text-base font-bold text-kompass-text tracking-wide group-hover:text-kompass-teal transition-colors leading-snug text-left uppercase">
                  {item.title}
                </h3>
              </div>

              {/* Read Time Info */}
              <div className="mt-8 flex justify-between items-center text-[10px] font-mono border-t border-kompass-border/30 pt-4 text-kompass-text/40">
                <span>READING TIME: {item.read_time}</span>
                <span className="text-kompass-teal group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
export default InsightsGrid;
