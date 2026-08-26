"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

export const ProductShowcase: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-kompass-bg py-16 border-b border-kompass-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left mb-12">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-kompass-teal">
            {t.products_subtitle}
          </span>
          <h2 className="font-condensed text-3xl font-extrabold tracking-wider text-kompass-text mt-1 uppercase">
            {t.products_title}
          </h2>
        </div>

        {/* 3-Tile Grid (Overhauled from 4-Tile to 3-Tile Ecosystem) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.products.map((prod) => (
            <div 
              key={prod.id} 
              className="flex flex-col justify-between border border-kompass-border bg-kompass-card p-6 relative hover:border-kompass-teal/60 transition-all group min-h-[350px]"
            >
              {/* Card Header */}
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-kompass-teal">
                  {prod.badge}
                </span>
                <h3 className="font-condensed text-xl font-bold text-kompass-text mt-2 uppercase tracking-wide">
                  {prod.title}
                </h3>
                <p className="text-xs text-kompass-text/60 mt-3 leading-relaxed">
                  {prod.desc}
                </p>
              </div>

              {/* Product Telemetry Mockup Teaser */}
              <div className={`my-6 border border-kompass-border/60 bg-kompass-bg/40 font-mono text-[9px] text-kompass-text/75 h-[120px] flex flex-col justify-between shadow-inner overflow-hidden ${prod.id === "kompass" ? "p-0" : "p-4"}`}>
                {prod.id === "kompass" && (
                  <div className="relative w-full h-full">
                    <Image 
                      src="/images/kia_report.png"
                      alt="KOMPASS KIA Report Screenshot (Redacted)"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                    />
                  </div>
                )}

                {prod.id === "kontrol" && (
                  <div className="grid grid-cols-2 gap-2 h-full items-center">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-intel-violet rounded-full" />
                        <span>BIOMECH</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-intel-blue rounded-full" />
                        <span>DISTANCE</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-intel-green rounded-full" />
                        <span>TELLS LOG</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-intel-orange rounded-full" />
                        <span>PSYCH</span>
                      </div>
                    </div>
                  </div>
                )}

                {prod.id === "edge" && (
                  <div className="space-y-1">
                    <div className="text-[8px] text-kompass-text/40 border-b border-kompass-border/30 pb-0.5">MATCHDAY BRIEFING CARD</div>
                    <div className="flex justify-between">
                      <span>KIZAMI-ZUKI TRIGGER</span>
                      <span className="text-kompass-teal">-220ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GYAKU-ZUKI COUNTER</span>
                      <span className="text-kompass-teal">-310ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span>MAWASHI EXIT</span>
                      <span className="text-intel-orange">AUDITING</span>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center border-t border-kompass-border/30 pt-1.5 text-[8px] text-kompass-text/45">
                  <span>{prod.metric_label}</span>
                  <span className="text-kompass-teal font-bold">{prod.metric_value}</span>
                </div>
              </div>

              {/* Card Action */}
              <div className="border-t border-kompass-border/55 pt-4">
                <Link 
                  href="#contact" 
                  className="font-condensed text-xs uppercase tracking-widest text-kompass-teal group-hover:text-kompass-teal/80 transition-colors flex items-center justify-between"
                >
                  <span>{prod.link_text}</span>
                  <span>→</span>
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
export default ProductShowcase;
