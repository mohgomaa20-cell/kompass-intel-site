"use client";

import React from "react";
import Link from "next/link";
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

        {/* 4-Card Grid (Content Preview Library, Clickable to Dynamic Pages) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.insights.map((item, i) => (
            <Link 
              key={i} 
              href={`/insights/${i + 1}`}
              className="flex flex-col justify-between bg-kompass-card border border-kompass-border border-t-2 border-t-kompass-teal p-6 transition-all group hover:border-kompass-teal/60 cursor-pointer"
            >
              <div>
                {/* Tag Only (Date Removed) */}
                <div className="flex justify-between items-center text-[9px] font-mono text-kompass-text/45 uppercase tracking-wider mb-4">
                  <span className="text-kompass-teal">{item.category}</span>
                </div>
                
                {/* Title */}
                <h3 className="font-condensed text-base font-bold text-kompass-text tracking-wide leading-snug text-left uppercase group-hover:text-kompass-teal transition-colors">
                  {item.title}
                </h3>
              </div>

              {/* Read Time Info & Click Indicator */}
              <div className="mt-8 flex justify-between items-center text-[10px] font-mono border-t border-kompass-border/30 pt-4 text-kompass-text/40">
                <span>READING TIME: {item.read_time}</span>
                <span className="text-kompass-teal font-sans text-sm font-extrabold transform group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
export default InsightsGrid;
