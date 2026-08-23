"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function MethodPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-kompass-bg text-kompass-text flex flex-col justify-between selection:bg-kompass-teal selection:text-kompass-bg">
      <Navbar />

      <main className="flex-grow py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          
          {/* Header Banner */}
          <div className="text-left mb-16 border-b border-kompass-border pb-8">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-kompass-teal">
              KIA METHODOLOGY
            </span>
            <h1 className="font-condensed text-4xl sm:text-5xl font-extrabold tracking-wider text-kompass-text mt-2 uppercase">
              The KID Framework
            </h1>
            <p className="text-sm sm:text-base text-kompass-text/70 mt-4 max-w-xl leading-relaxed">
              Karate Intelligence Data (KID) is a clinical, frame-level analysis method built specifically for WKF Kumite. We process raw sparring signals to form bulletproof pre-match preparations.
            </p>
          </div>

          {/* Section 1: Observations (Telemetry & Match Tape) */}
          <div className="py-12 border-b border-kompass-border space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-none border border-kompass-teal bg-kompass-card font-condensed text-lg font-bold text-kompass-teal">
                  01
                </span>
                <div>
                  <h2 className="font-condensed text-xl font-bold uppercase tracking-wider text-kompass-text">
                    Observations
                  </h2>
                  <span className="text-[10px] text-kompass-text/45 uppercase tracking-wider font-mono">
                    Phase 01: Raw Signal Extraction
                  </span>
                </div>
              </div>
              <span className="inline-block bg-intel-blue/10 border border-intel-blue/20 px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest text-intel-blue">
                DATA CAPTURE
              </span>
            </div>

            <p className="text-sm text-kompass-text/70 leading-relaxed text-left">
              Every analyst briefing starts with frame-by-frame match tape telemetry extraction. We track stance distribution bias, weight adjustments, and micro-movements of competitive WKF athletes.
            </p>

            {/* Stance visual example */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-kompass-border bg-kompass-card p-5 text-left">
                <span className="text-[10px] font-mono text-kompass-teal uppercase">Stance Shift Telemetry</span>
                <p className="text-xs text-kompass-text/60 mt-2">
                  Calculating body alignment indices and reaction readiness. Athletes exhibit unconscious muscle contractions up to 300ms before movement.
                </p>
              </div>
              <div className="border border-kompass-border bg-kompass-card p-5 text-left flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-kompass-text/40 uppercase block">Stance Ratio Stencil</span>
                  <span className="font-condensed text-lg font-bold text-kompass-text block mt-1">Hidari Shizentai (Left Stance)</span>
                </div>
                <div className="w-full h-2 bg-kompass-bg border border-kompass-border mt-4">
                  <div className="h-full bg-kompass-teal" style={{ width: "82%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Strengths (S&W Grid) */}
          <div className="py-12 border-b border-kompass-border space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-none border border-kompass-teal bg-kompass-card font-condensed text-lg font-bold text-kompass-teal">
                  02
                </span>
                <div>
                  <h2 className="font-condensed text-xl font-bold uppercase tracking-wider text-kompass-text">
                    Strengths & Footprint
                  </h2>
                  <span className="text-[10px] text-kompass-text/45 uppercase tracking-wider font-mono">
                    Phase 02: Footprint Identification
                  </span>
                </div>
              </div>
              <span className="inline-block bg-intel-violet/10 border border-intel-violet/20 px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest text-intel-violet">
                STRATEGIC MAP
              </span>
            </div>

            <p className="text-sm text-kompass-text/70 leading-relaxed text-left">
              We compile athlete footprint profiles mapping preferred combat ranges (Ma-ai) and sequence distributions.
            </p>

            {/* S&W Two-Column Grid (Direct Visual Link to Product) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Strengths Column */}
              <div className="border border-kompass-border bg-kompass-card p-6 text-left">
                <div className="flex justify-between items-center border-b border-kompass-border/60 pb-3 mb-4">
                  <h3 className="font-condensed text-sm font-bold uppercase tracking-wider text-intel-green">
                    VERIFIED STRENGTHS
                  </h3>
                  <span className="text-[8px] font-mono text-kompass-text/40">S-GRID v1.0</span>
                </div>
                <ul className="space-y-3 text-xs text-kompass-text/70 font-mono">
                  <li className="flex gap-2">
                    <span className="text-intel-green">✔</span>
                    <span>High counter efficiency (92% Gyaku-Zuki success) when opponent lunges flat-footed.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-intel-green">✔</span>
                    <span>Excellent lateral exit route to the right (68% escape rate under corner pressure).</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-intel-green">✔</span>
                    <span>Proactive front-foot containment that locks opponent in the To-ma (safe) boundary.</span>
                  </li>
                </ul>
              </div>

              {/* Weaknesses Column */}
              <div className="border border-kompass-border bg-kompass-card p-6 text-left">
                <div className="flex justify-between items-center border-b border-kompass-border/60 pb-3 mb-4">
                  <h3 className="font-condensed text-sm font-bold uppercase tracking-wider text-intel-orange">
                    VERIFIED WEAKNESSES
                  </h3>
                  <span className="text-[8px] font-mono text-kompass-text/40">W-GRID v1.0</span>
                </div>
                <ul className="space-y-3 text-xs text-kompass-text/70 font-mono">
                  <li className="flex gap-2">
                    <span className="text-intel-orange">✖</span>
                    <span>Unconscious drop of the lead shoulder 220ms before releasing a Kizami-Zuki.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-intel-orange">✖</span>
                    <span>Rear heel lift 310ms before executing rear Gyaku-Zuki, freezing hip rotation.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-intel-orange">✖</span>
                    <span>Exhibits high tactical panic (commits warnings) in final 30 seconds if score is level.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section 3: Weaknesses (Tells Inventory) */}
          <div className="py-12 border-b border-kompass-border space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-none border border-kompass-teal bg-kompass-card font-condensed text-lg font-bold text-kompass-teal">
                  03
                </span>
                <div>
                  <h2 className="font-condensed text-xl font-bold uppercase tracking-wider text-kompass-text">
                    Tells Inventory
                  </h2>
                  <span className="text-[10px] text-kompass-text/45 uppercase tracking-wider font-mono">
                    Phase 03: Signals & Tells Audit
                  </span>
                </div>
              </div>
              <span className="inline-block bg-intel-orange/10 border border-intel-orange/20 px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest text-intel-orange">
                TELLS DICTIONARY
              </span>
            </div>

            <p className="text-sm text-kompass-text/70 leading-relaxed text-left">
              The tells dictionary logs sub-second physical tells captured by video telemetry, validated by champion-level analysis. These cues are structured by timing windows and reliability ratings.
            </p>

            {/* Custom Tells Table */}
            <div className="overflow-x-auto border border-kompass-border bg-kompass-card">
              <table className="w-full text-left font-mono text-[11px] text-kompass-text">
                <thead>
                  <tr className="border-b border-kompass-border bg-[#0B0F16]/60 text-kompass-text/50">
                    <th className="p-3 font-semibold uppercase">{t.th_tell}</th>
                    <th className="p-3 font-semibold uppercase">{t.th_trigger}</th>
                    <th className="p-3 font-semibold uppercase">{t.th_timing}</th>
                    <th className="p-3 font-semibold uppercase">{t.th_reliability}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-kompass-border/50">
                  {t.tells_list.map((tell, i) => (
                    <tr key={i} className="hover:bg-kompass-cardLight transition-colors">
                      <td className="p-3 text-kompass-text font-sans">{tell.tell}</td>
                      <td className="p-3 text-kompass-text/75">{tell.trigger}</td>
                      <td className="p-3 text-intel-blue">{tell.timing}</td>
                      <td className="p-3">
                        <span className={`inline-block px-1.5 py-0.5 text-[8px] uppercase tracking-wider font-bold ${tell.rating === "high" ? "bg-intel-green/10 text-intel-green border border-intel-green/20" : "bg-intel-orange/10 text-intel-orange border border-intel-orange/20"}`}>
                          {tell.reliability}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: Exploit & Overcome (Sequence Timeline Rows) */}
          <div className="py-12 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-none border border-kompass-teal bg-kompass-card font-condensed text-lg font-bold text-kompass-teal">
                  04
                </span>
                <div>
                  <h2 className="font-condensed text-xl font-bold uppercase tracking-wider text-kompass-text">
                    Exploit & Overcome
                  </h2>
                  <span className="text-[10px] text-kompass-text/45 uppercase tracking-wider font-mono">
                    Phase 04: Tactical Corner blueprint
                  </span>
                </div>
              </div>
              <span className="inline-block bg-intel-green/10 border border-intel-green/20 px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest text-intel-green">
                ACTION BLUEPRINT
              </span>
            </div>

            <p className="text-sm text-kompass-text/70 leading-relaxed text-left">
              Knowing is only half the battle. We translate tells into micro-tactical execution blueprints that corners can call in real time.
            </p>

            {/* Sequence Timeline Rows (Direct Visual Link to Product) */}
            <div className="space-y-4 text-left">
              <span className="text-[10px] font-mono text-kompass-text/40 uppercase block">TACTICAL SEQUENCE TIMELINE</span>
              
              {/* Row 1 */}
              <div className="flex gap-4 border border-kompass-border bg-kompass-card p-4 relative">
                <div className="font-mono text-xs text-intel-blue font-bold min-w-[50px]">
                  -0.45s
                </div>
                <div>
                  <h4 className="font-condensed text-sm font-bold uppercase text-kompass-text">
                    Initiate Preparatory High Feint
                  </h4>
                  <p className="text-xs text-kompass-text/60 mt-1">
                    Athlete lunges high to Kizami-Zuki line. Forces target to register defensive response window.
                  </p>
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex gap-4 border border-kompass-border bg-kompass-card p-4 relative">
                <div className="font-mono text-xs text-intel-orange font-bold min-w-[50px]">
                  -0.31s
                </div>
                <div>
                  <h4 className="font-condensed text-sm font-bold uppercase text-kompass-text">
                    Target Unconscious Tell Triggered
                  </h4>
                  <p className="text-xs text-kompass-text/60 mt-1">
                    Target lifts rear heel and shifts weight forward to commit to Gyaku-Zuki counter block. Stance locked.
                  </p>
                </div>
              </div>

              {/* Row 3 */}
              <div className="flex gap-4 border border-kompass-border bg-kompass-card p-4 relative">
                <div className="font-mono text-xs text-intel-green font-bold min-w-[50px]">
                  -0.10s
                </div>
                <div>
                  <h4 className="font-condensed text-sm font-bold uppercase text-kompass-text">
                    Execute Low Foot sweep (Ashi-Barai)
                  </h4>
                  <p className="text-xs text-kompass-text/60 mt-1">
                    Due to locked heel alignment, target cannot sweep hips to dodge. Balance completely broken.
                  </p>
                </div>
              </div>

              {/* Row 4 */}
              <div className="flex gap-4 border border-kompass-teal bg-kompass-card p-4 relative">
                <div className="font-mono text-xs text-kompass-teal font-bold min-w-[50px]">
                  0.00s
                </div>
                <div>
                  <h4 className="font-condensed text-sm font-bold uppercase text-kompass-teal">
                    Secure Chudan Gyaku-Zuki (Score Point)
                  </h4>
                  <p className="text-xs text-kompass-text/65 mt-1">
                    Release rear-hand punch while opponent is on the mat. WKF certified 2-point or 3-point score window.
                  </p>
                </div>
              </div>

            </div>

            {/* Back Button */}
            <div className="pt-8 text-center">
              <a 
                href="/" 
                className="bg-kompass-teal border border-kompass-teal text-kompass-bg px-8 py-3.5 font-condensed text-xs uppercase tracking-widest font-bold hover:bg-transparent hover:text-kompass-teal transition-all inline-block"
              >
                Return to Command Center
              </a>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
