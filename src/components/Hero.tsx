"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between overflow-hidden border-b border-kompass-border bg-[#0B0F16] pt-12 pb-8">
      {/* Background patterns */}
      <div className="absolute inset-0 tactical-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 tactical-dots opacity-40 pointer-events-none" />
      
      {/* Radar sweep glows using Teal */}
      <div className="absolute -left-[10%] -top-[10%] w-[50%] h-[50%] rounded-full bg-kompass-teal/5 blur-[120px] pointer-events-none" />
      <div className="absolute -right-[10%] -bottom-[10%] w-[50%] h-[50%] rounded-full bg-intel-blue/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex-grow flex items-center z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 border border-kompass-border bg-kompass-card px-3 py-1 font-condensed text-[10px] md:text-xs font-semibold tracking-wider text-kompass-teal">
              <span className="h-1.5 w-1.5 rounded-full bg-kompass-teal animate-pulse" />
              {t.hero_tagline}
            </div>

            {/* H1 Title - White & Silver gradient / solid styling */}
            <h1 className="font-condensed text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#E6E6E6] to-[#8A95A5] leading-[1.05] text-balance">
              {t.hero_title}
            </h1>

            {/* Paragraph Subhead */}
            <p className="text-base sm:text-lg text-kompass-text/75 leading-relaxed max-w-xl">
              {t.hero_desc}
            </p>

            <p className="text-base sm:text-lg text-kompass-text/75 leading-relaxed max-w-xl">
              {t.hero_credentials}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                href="#contact" 
                className="bg-kompass-teal border border-kompass-teal text-kompass-bg px-6 py-3 font-condensed text-xs uppercase tracking-widest font-bold hover:bg-transparent hover:text-kompass-teal transition-all"
              >
                {t.btn_cta_hero}
              </Link>
              <Link 
                href="/method" 
                className="border border-kompass-border hover:border-kompass-teal text-kompass-text hover:text-kompass-teal px-6 py-3 font-condensed text-xs uppercase tracking-widest transition-all"
              >
                {t.btn_cta_sec}
              </Link>
            </div>

          </div>

          {/* Hero Right Visual: Silhouette overlaid with vector telemetry lines */}
          <div className="lg:col-span-5 flex justify-center items-center w-full">
            <div className="w-full max-w-[550px] border border-cyan-500/20 shadow-2xl rounded-xl bg-kompass-card/30 overflow-hidden">
              <Image 
                src="https://ckrdgxlakkyrzajkmmwy.supabase.co/storage/v1/object/public/Kompass/Kompass%20website.jpeg"
                alt="WKF Tactical Telemetry Analysis"
                width={700}
                height={450}
                priority
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Below the Fold Quick Nav Pills */}
      <div className="w-full mt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-kompass-border/60 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <span className="font-condensed text-[10px] uppercase tracking-wider text-kompass-text/45 font-mono">
              DIRECT ACCESS PATHS:
            </span>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Link 
                href="#contact" 
                className="bg-kompass-teal hover:bg-transparent border border-kompass-teal text-kompass-bg hover:text-kompass-teal px-5 py-2.5 font-condensed text-xs uppercase tracking-wider font-extrabold transition-all shadow-md shadow-kompass-teal/10"
              >
                For Federations
              </Link>
              <Link 
                href="#contact" 
                className="bg-kompass-card hover:bg-kompass-cardLight border border-kompass-border hover:border-kompass-teal/60 text-kompass-text px-4 py-2 font-condensed text-xs uppercase tracking-wider transition-all"
              >
                For Coaches
              </Link>
              <Link 
                href="#contact" 
                className="bg-kompass-card hover:bg-kompass-cardLight border border-kompass-border hover:border-kompass-teal/60 text-kompass-text px-4 py-2 font-condensed text-xs uppercase tracking-wider transition-all"
              >
                For Athletes
              </Link>
              <Link 
                href="#contact" 
                className="bg-kompass-card/30 hover:bg-kompass-cardLight border border-kompass-teal/40 hover:border-kompass-teal text-kompass-teal px-4 py-2 font-condensed text-xs uppercase tracking-wider transition-all"
              >
                Sample Report
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
