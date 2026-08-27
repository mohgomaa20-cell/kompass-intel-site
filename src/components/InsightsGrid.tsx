"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { InsightArticle, getInsightsArticles } from "@/lib/db";

export const InsightsGrid: React.FC = () => {
  const { t, locale } = useLanguage();
  const [articles, setArticles] = useState<InsightArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getInsightsArticles();
        // Limit to 4 articles on the grid
        setArticles(data.slice(0, 4));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const isArabic = locale === "ar";

  if (loading) {
    return (
      <section id="insights" className="bg-kompass-bg py-16 border-b border-kompass-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center font-mono text-xs text-kompass-teal animate-pulse uppercase">
          CONNECTING TACTICAL BRIEFINGS FEED...
        </div>
      </section>
    );
  }

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
          {articles.map((item) => {
            const category = isArabic ? item.category_ar : item.category_en;
            const title = isArabic ? item.title_ar : item.title_en;
            const readTime = isArabic ? item.read_time_ar : item.read_time_en;

            return (
              <Link 
                key={item.id} 
                href={`/insights/${item.id}`}
                className="flex flex-col justify-between bg-kompass-card border border-kompass-border border-t-2 border-t-kompass-teal p-6 transition-all group hover:border-kompass-teal/60 cursor-pointer"
              >
                <div>
                  {/* Tag Only */}
                  <div className="flex justify-between items-center text-[9px] font-mono text-kompass-text/45 uppercase tracking-wider mb-4">
                    <span className="text-kompass-teal">{category}</span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-condensed text-base font-bold text-kompass-text tracking-wide leading-snug text-left uppercase group-hover:text-kompass-teal transition-colors">
                    {title}
                  </h3>
                </div>

                {/* Read Time Info & Click Indicator */}
                <div className="mt-8 flex justify-between items-center text-[10px] font-mono border-t border-kompass-border/30 pt-4 text-kompass-text/40">
                  <span>{isArabic ? `وقت القراءة: ${readTime}` : `READING TIME: ${readTime}`}</span>
                  <span className="text-kompass-teal font-sans text-sm font-extrabold transform group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};
export default InsightsGrid;
