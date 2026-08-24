"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

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
            <div className="relative border border-kompass-border bg-kompass-card/65 p-6 w-full max-w-[420px] aspect-[4/3] flex flex-col justify-between overflow-hidden shadow-xl shadow-kompass-teal/5">
              {/* Corner brackets */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-kompass-teal/60" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-kompass-teal/60" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-kompass-teal/60" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-kompass-teal/60" />

              {/* Status Bar */}
              <div className="flex justify-between items-center text-[9px] font-mono text-kompass-text/45 uppercase tracking-wider">
                <span>INTEL-SOURCE: WKF_PL_2026</span>
                <span className="text-kompass-teal animate-pulse">● LIVE CONNECTION</span>
              </div>

              {/* Central Vector Stance Visualization */}
              <div className="relative flex-grow flex items-center justify-center my-4 select-none">
                {/* SVG Silhouette overlay */}
                <svg className="w-[85%] h-[85%] text-kompass-text/10" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Stance Silhouette Stencil lines */}
                  <path d="M 120 280 L 150 180 L 140 100 L 195 50 L 260 90 L 250 170 L 290 280" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
                  <path d="M 140 100 L 110 115 L 80 100" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M 260 90 L 295 105 L 325 90" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />

                  {/* Redacted Block Overlay */}
                  <rect x="175" y="42" width="40" height="15" fill="#0B0F16" stroke="#00D6C6" strokeWidth="0.5" />
                  <text x="180" y="53" fill="#00D6C6" fontSize="9" fontWeight="bold" fontFamily="monospace">REDACTED</text>

                  {/* Telemetry Tracking lines */}
                  {/* Lead arm strike trajectory */}
                  <path d="M 80 100 C 60 80, 40 120, 20 105" stroke="#00D6C6" strokeWidth="1" />
                  <circle cx="20" cy="105" r="3" fill="#00D6C6" />
                  
                  {/* Reaction Time timing bracket */}
                  <line x1="20" y1="130" x2="80" y2="130" stroke="#78b0e2" strokeWidth="0.5" />
                  <line x1="20" y1="126" x2="20" y2="134" stroke="#78b0e2" strokeWidth="0.5" />
                  <line x1="80" y1="126" x2="80" y2="134" stroke="#78b0e2" strokeWidth="0.5" />
                  <text x="35" y="125" fill="#78b0e2" fontSize="8" fontFamily="monospace">Δt = 133ms</text>

                  {/* Foot stance distance - Ma-ai marker */}
                  <line x1="120" y1="285" x2="290" y2="285" stroke="#6454c8" strokeWidth="0.5" />
                  <line x1="120" y1="281" x2="120" y2="289" stroke="#6454c8" strokeWidth="0.5" />
                  <line x1="290" y1="281" x2="290" y2="289" stroke="#6454c8" strokeWidth="0.5" />
                  <text x="180" y="280" fill="#6454c8" fontSize="8" fontFamily="monospace">MA-AI: 2.18m</text>

                  {/* Center Target crosshair */}
                  <circle cx="195" cy="110" r="15" stroke="#e08a64" strokeWidth="0.5" strokeDasharray="2 2" />
                  <line x1="195" y1="90" x2="195" y2="130" stroke="#e08a64" strokeWidth="0.5" />
                  <line x1="175" y1="110" x2="215" y2="110" stroke="#e08a64" strokeWidth="0.5" />
                  <circle cx="195" cy="110" r="1.5" fill="#e08a64" />

                  {/* Floating Telemetry Box */}
                  <rect x="260" y="160" width="105" height="50" fill="#111722" stroke="rgba(0, 214, 198, 0.2)" strokeWidth="0.5" />
                  <text x="265" y="172" fill="#E6E6E6" fontSize="8" fontFamily="monospace">STANCE: HIDARI</text>
                  <text x="265" y="184" fill="#E6E6E6" fontSize="8" fontFamily="monospace">WEIGHT: 68% REAR</text>
                  <text x="265" y="196" fill="#00D6C6" fontSize="8" fontFamily="monospace">SIG-RELIA: 94%</text>
                </svg>
              </div>

              {/* Lower HUD display */}
              <div className="flex justify-between items-center text-[9px] font-mono text-kompass-text/45 uppercase tracking-wider">
                <span>AUDIT: M. GOMAA (2X WKF CHAMP)</span>
                <span>SYSTEM-MD-KIA_v4.2</span>
              </div>
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
                className="bg-kompass-card hover:bg-kompass-cardLight border border-kompass-border hover:border-kompass-teal/60 text-kompass-text px-4 py-2 font-condensed text-xs uppercase tracking-wider transition-all"
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
