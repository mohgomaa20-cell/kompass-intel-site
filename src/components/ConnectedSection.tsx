"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export const ConnectedSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"profile" | "distance" | "tells">("profile");

  return (
    <section className="bg-kompass-bg py-20 border-b border-kompass-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive Product Report Preview Dashboard */}
          <div className="lg:col-span-6 w-full space-y-2">
            <div className="font-mono text-[9px] sm:text-[10px] text-kompass-teal uppercase tracking-wider text-left">
              SAMPLE PROFILE — ILLUSTRATIVE DATA ONLY · NOT A REAL COMPETITOR
            </div>
            <div className="border border-kompass-border bg-kompass-card rounded-none overflow-hidden shadow-2xl flex flex-col shadow-kompass-teal/5">
              
              {/* Dashboard Top Header */}
              <div className="border-b border-kompass-border bg-[#0B0F16]/60 p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-intel-orange animate-pulse" />
                    <span className="font-mono text-[9px] font-bold text-kompass-teal uppercase tracking-widest">
                      CLASSIFIED TARGET PROFILE
                    </span>
                  </div>
                  <h3 className="font-condensed text-base font-bold text-kompass-text mt-1">
                    {t.prof_name}
                  </h3>
                  <span className="text-[10px] text-kompass-text/50 font-mono">
                    {t.prof_cat}
                  </span>
                </div>

                {/* Dashboard Tabs */}
                <div className="flex gap-1 border border-kompass-border p-0.5 bg-[#0B0F16]/30">
                  <button 
                    onClick={() => setActiveTab("profile")}
                    className={`font-condensed text-[10px] uppercase tracking-widest px-2.5 py-1 transition-all ${activeTab === "profile" ? "bg-kompass-teal text-kompass-bg font-bold" : "text-kompass-text/60 hover:text-kompass-text"}`}
                  >
                    {t.tab_profile}
                  </button>
                  <button 
                    onClick={() => setActiveTab("distance")}
                    className={`font-condensed text-[10px] uppercase tracking-widest px-2.5 py-1 transition-all ${activeTab === "distance" ? "bg-kompass-teal text-kompass-bg font-bold" : "text-kompass-text/60 hover:text-kompass-text"}`}
                  >
                    {t.tab_telemetry}
                  </button>
                  <button 
                    onClick={() => setActiveTab("tells")}
                    className={`font-condensed text-[10px] uppercase tracking-widest px-2.5 py-1 transition-all ${activeTab === "tells" ? "bg-kompass-teal text-kompass-bg font-bold" : "text-kompass-text/60 hover:text-kompass-text"}`}
                  >
                    {t.tab_tells}
                  </button>
                </div>
              </div>

              {/* Dashboard Body Content */}
              <div className="p-5 min-h-[260px] bg-kompass-card">
                
                {/* Tab 1: Opponent Profile */}
                {activeTab === "profile" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border border-kompass-border bg-[#0B0F16]/40 p-3">
                        <span className="text-[9px] uppercase text-kompass-text/45 font-mono block">{t.prof_lbl1}</span>
                        <span className="font-condensed text-sm font-bold text-kompass-text mt-0.5 block">{t.prof_val1}</span>
                      </div>
                      <div className="border border-kompass-border bg-[#0B0F16]/40 p-3">
                        <span className="text-[9px] uppercase text-kompass-text/45 font-mono block">{t.prof_lbl2}</span>
                        <span className="font-condensed text-sm font-bold text-kompass-text mt-0.5 block">{t.prof_val2}</span>
                      </div>
                      <div className="border border-kompass-border bg-[#0B0F16]/40 p-3">
                        <span className="text-[9px] uppercase text-kompass-text/45 font-mono block">{t.prof_lbl3}</span>
                        <span className="font-condensed text-sm font-bold text-kompass-text mt-0.5 block">{t.prof_val3}</span>
                      </div>
                      <div className="border border-kompass-border bg-[#0B0F16]/40 p-3">
                        <span className="text-[9px] uppercase text-kompass-text/45 font-mono block">{t.prof_lbl4}</span>
                        <span className="font-condensed text-sm font-bold text-kompass-text mt-0.5 block text-intel-orange">{t.prof_val4}</span>
                      </div>
                    </div>

                    <div className="border-t border-kompass-border pt-3">
                      <div className="flex gap-4">
                        <div className="text-center bg-[#0B0F16]/85 border border-kompass-border px-3 py-1.5 min-w-[70px]">
                          <span className="text-xl font-condensed font-extrabold text-kompass-teal block">{t.m_val1}</span>
                          <span className="text-[8px] uppercase tracking-wider text-kompass-text/45 font-mono block">{t.m_lbl1}</span>
                        </div>
                        <div className="text-center bg-[#0B0F16]/85 border border-kompass-border px-3 py-1.5 min-w-[70px]">
                          <span className="text-xl font-condensed font-extrabold text-kompass-teal block">{t.m_val2}</span>
                          <span className="text-[8px] uppercase tracking-wider text-kompass-text/45 font-mono block">{t.m_lbl2}</span>
                        </div>
                        {/* Narrative counter paragraph removed as requested */}
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Distance & Footwork (Ma-ai Chart + Direction Bars) */}
                {activeTab === "distance" && (
                  <div className="space-y-4">
                    <span className="text-[9px] uppercase text-kompass-text/45 font-mono block">
                      {t.chart_t1}
                    </span>
                    {/* SVG Spatial Distribution Chart */}
                    <div className="w-full bg-[#0B0F16]/40 border border-kompass-border p-2 relative h-[100px] flex items-center justify-center">
                      <svg className="w-full h-full text-kompass-teal/20" viewBox="0 0 400 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="10" y1="80" x2="390" y2="80" stroke="rgba(222, 218, 210, 0.15)" strokeWidth="0.5" />
                        <line x1="10" y1="40" x2="390" y2="40" stroke="rgba(222, 218, 210, 0.05)" strokeWidth="0.5" />
                        <line x1="10" y1="10" x2="390" y2="10" stroke="rgba(222, 218, 210, 0.05)" strokeWidth="0.5" />

                        {/* Chart Grid Areas */}
                        <path d="M 10 80 L 100 50 L 200 15 L 300 65 L 390 80" stroke="#00D6C6" strokeWidth="1.5" fill="none" />
                        <circle cx="200" cy="15" r="3" fill="#00D6C6" />
                        
                        {/* Zone divisions */}
                        <line x1="130" y1="5" x2="130" y2="80" stroke="rgba(222, 218, 210, 0.1)" strokeWidth="0.5" strokeDasharray="2 2" />
                        <line x1="270" y1="5" x2="270" y2="80" stroke="rgba(222, 218, 210, 0.1)" strokeWidth="0.5" strokeDasharray="2 2" />

                        <text x="50" y="93" fill="rgba(222, 218, 210, 0.4)" fontSize="8" fontFamily="monospace">TO-MA (SAFE)</text>
                        <text x="180" y="93" fill="#00D6C6" fontSize="8" fontFamily="monospace">MA-AI (CRITICAL)</text>
                        <text x="300" y="93" fill="rgba(222, 218, 210, 0.4)" fontSize="8" fontFamily="monospace">CHIKA-MA (CLINCH)</text>
                      </svg>
                    </div>

                    {/* Directional Footwork Telemetry */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="border border-kompass-border bg-[#0B0F16]/30 p-2 text-left">
                        <span className="text-[8px] text-kompass-text/45 font-mono uppercase block">{t.lbl_d1}</span>
                        <span className="font-condensed text-xs font-bold text-kompass-text mt-0.5 block">68%</span>
                        <div className="w-full h-1 bg-[#0B0F16] mt-1">
                          <div className="h-full bg-kompass-teal" style={{ width: "68%" }} />
                        </div>
                      </div>
                      <div className="border border-kompass-border bg-[#0B0F16]/30 p-2 text-left">
                        <span className="text-[8px] text-kompass-text/45 font-mono uppercase block">{t.lbl_d2}</span>
                        <span className="font-condensed text-xs font-bold text-kompass-text mt-0.5 block">48%</span>
                        <div className="w-full h-1 bg-[#0B0F16] mt-1">
                          <div className="h-full bg-kompass-teal" style={{ width: "48%" }} />
                        </div>
                      </div>
                      <div className="border border-kompass-border bg-[#0B0F16]/30 p-2 text-left">
                        <span className="text-[8px] text-kompass-text/45 font-mono uppercase block">{t.lbl_d3}</span>
                        <span className="font-condensed text-xs font-bold text-kompass-text mt-0.5 block">18%</span>
                        <div className="w-full h-1 bg-[#0B0F16] mt-1">
                          <div className="h-full bg-kompass-teal" style={{ width: "18%" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 3: Signals & Tells Table */}
                {activeTab === "tells" && (
                  <div className="space-y-3">
                    <p className="text-[11px] text-kompass-text/60 italic leading-relaxed text-left">
                      {t.tells_p}
                    </p>

                    <div className="overflow-x-auto border border-kompass-border bg-[#0B0F16]/30">
                      <table className="w-full text-left font-mono text-[10px] text-kompass-text">
                        <thead>
                          <tr className="border-b border-kompass-border bg-[#0B0F16]/60 text-kompass-text/50">
                            <th className="p-2 font-semibold uppercase">{t.th_tell}</th>
                            <th className="p-2 font-semibold uppercase">{t.th_trigger}</th>
                            <th className="p-2 font-semibold uppercase">{t.th_timing}</th>
                            <th className="p-2 font-semibold uppercase">{t.th_reliability}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-kompass-border/50">
                          {t.tells_list.map((tell, i) => (
                            <tr key={i} className="hover:bg-kompass-cardLight">
                              <td className="p-2 text-kompass-text font-sans">{tell.tell}</td>
                              <td className="p-2 text-kompass-text/75">{tell.trigger}</td>
                              <td className="p-2 text-intel-blue">{tell.timing}</td>
                              <td className="p-2">
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
                )}

              </div>

              {/* Dashboard Lower Bar */}
              <div className="border-t border-kompass-border bg-[#0B0F16]/60 px-5 py-3 flex justify-between items-center text-[8px] font-mono text-kompass-text/45 uppercase">
                <span>VERIFICATION-AUDIT: PASSED</span>
                <span>SECURE ARCHIVE SYSTEM</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Copy & AI Expert workflow description */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-kompass-teal">
              {t.solutions_subtitle}
            </span>
            <h2 className="font-condensed text-3xl sm:text-4xl font-extrabold tracking-tight text-kompass-text uppercase leading-none">
              {t.solutions_title}
            </h2>
            <p className="text-sm sm:text-base text-kompass-text/70 leading-relaxed text-balance">
              {t.solutions_desc}
            </p>

            <div className="pt-4">
              <Link 
                href="/method" 
                className="bg-transparent border border-kompass-teal text-kompass-teal hover:bg-kompass-teal hover:text-kompass-bg px-6 py-3 font-condensed text-xs uppercase tracking-widest font-bold transition-all inline-block"
              >
                {t.solutions_learn_more}
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
export default ConnectedSection;
