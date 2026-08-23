"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/ui/Logo";

export const Navbar: React.FC = () => {
  const { locale, setLocale, t } = useLanguage();
  const [activeMenu, setActiveMenu] = useState<"solutions" | "reports" | "method" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  const toggleLanguage = () => {
    setLocale(locale === "en" ? "ar" : "en");
  };

  const handleMobileAccordion = (section: string) => {
    setMobileAccordion(mobileAccordion === section ? null : section);
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.18, ease: "linear" as const } },
    exit: { opacity: 0, y: -8, transition: { duration: 0.15, ease: "linear" as const } }
  };

  return (
    <header className="sticky top-0 z-50 h-16 w-full border-b border-kompass-border bg-kompass-bg/95 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Brand Logo & Wordmark */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group">
            {/* Official K-Mark Logo Mark */}
            <motion.div 
              className="relative flex h-9 w-9 items-center justify-center bg-transparent"
              whileHover={{ rotate: 10 }}
              transition={{ duration: 0.2, ease: "linear" as const }}
            >
              <Logo width={36} height={36} className="object-contain" priority={true} />
            </motion.div>
            <span className="font-condensed text-xl font-bold tracking-[0.2em] text-kompass-text group-hover:text-kompass-teal transition-colors">
              KOMPASS
            </span>
          </Link>

          {/* Navigation Items (Desktop) */}
          <nav className="hidden md:flex items-center gap-6" onMouseLeave={() => setActiveMenu(null)}>
            
            {/* Solutions Link & Mega-Menu */}
            <div 
              className="relative py-5"
              onMouseEnter={() => setActiveMenu("solutions")}
            >
              <button className={`font-condensed text-xs uppercase tracking-widest transition-colors ${activeMenu === "solutions" ? "text-kompass-teal" : "text-kompass-text/80 hover:text-kompass-text"}`}>
                {t.nav_ecosystem}
              </button>
            </div>

            {/* Reports Link & Mega-Menu */}
            <div 
              className="relative py-5"
              onMouseEnter={() => setActiveMenu("reports")}
            >
              <button className={`font-condensed text-xs uppercase tracking-widest transition-colors ${activeMenu === "reports" ? "text-kompass-teal" : "text-kompass-text/80 hover:text-kompass-text"}`}>
                {t.nav_pricing}
              </button>
            </div>

            {/* Method Dropdown */}
            <div 
              className="relative py-5"
              onMouseEnter={() => setActiveMenu("method")}
            >
              <button className={`font-condensed text-xs uppercase tracking-widest transition-colors ${activeMenu === "method" ? "text-kompass-teal" : "text-kompass-text/80 hover:text-kompass-text"}`}>
                {t.nav_method}
              </button>
            </div>

            {/* Insights Direct Link */}
            <div className="py-5">
              <Link href="#insights" className="font-condensed text-xs uppercase tracking-widest text-kompass-text/80 hover:text-kompass-text transition-colors">
                {t.nav_insight}
              </Link>
            </div>
          </nav>
        </div>

        {/* Right: Lang switcher + Access CTA */}
        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <button 
            onClick={toggleLanguage}
            className="border border-kompass-border px-3 py-1 font-condensed text-xs uppercase tracking-wider text-kompass-text hover:border-kompass-teal hover:text-kompass-teal transition-all bg-kompass-card/30"
          >
            {locale === "en" ? "العربية" : "EN"}
          </button>

          {/* CTAs */}
          <Link href="#contact" className="hidden sm:inline-block font-condensed text-xs uppercase tracking-widest text-kompass-text/70 hover:text-kompass-text transition-colors">
            {t.btn_login}
          </Link>
          <Link 
            href="#contact" 
            className="hidden sm:inline-block border border-kompass-teal bg-transparent px-4 py-2 font-condensed text-xs uppercase tracking-widest text-kompass-teal hover:bg-kompass-teal hover:text-kompass-bg transition-all"
          >
            {t.btn_request_access}
          </Link>

          {/* Mobile menu toggle (hamburger) */}
          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label="Toggle Menu"
          >
            <span className={`h-[2px] w-6 bg-kompass-text transition-transform ${mobileOpen ? "translate-y-[8px] rotate-45" : ""}`} />
            <span className={`h-[2px] w-6 bg-kompass-text transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`h-[2px] w-6 bg-kompass-text transition-transform ${mobileOpen ? "-translate-y-[8px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mega-Menus Panels (Desktop Overlay) */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            className="absolute left-0 top-16 w-full border-b border-kompass-border bg-kompass-card shadow-2xl z-40 hidden md:block"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onMouseEnter={() => setActiveMenu(activeMenu)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className="mx-auto max-w-7xl px-8 py-8">
              {activeMenu === "solutions" && (
                <div className="grid grid-cols-4 gap-8">
                  {/* Col 1 */}
                  <div className="border-r border-kompass-border/30 pr-6">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-kompass-teal">01 / NAVIGATE</span>
                    <h4 className="mt-1 font-condensed text-sm font-bold text-kompass-text">KOMPASS</h4>
                    <p className="mt-2 text-xs text-kompass-text/60 leading-relaxed">
                      Competitor video dossiers & high-precision opponent mapping footprint audits.
                    </p>
                    <Link href="/method" className="mt-4 inline-block text-[11px] font-bold text-kompass-teal hover:underline">
                      Review Program
                    </Link>
                  </div>
                  {/* Col 2 */}
                  <div className="border-r border-kompass-border/30 pr-6">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-kompass-teal">02 / PREPARE</span>
                    <h4 className="mt-1 font-condensed text-sm font-bold text-kompass-text">KONTROL</h4>
                    <p className="mt-2 text-xs text-kompass-text/60 leading-relaxed">
                      Translate competitor profiles into customized counter drills and templates.
                    </p>
                    <Link href="/method" className="mt-4 inline-block text-[11px] font-bold text-kompass-teal hover:underline">
                      See Coach Blueprint
                    </Link>
                  </div>
                  {/* Col 3 */}
                  <div className="border-r border-kompass-border/30 pr-6">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-kompass-teal">03 / ARM</span>
                    <h4 className="mt-1 font-condensed text-sm font-bold text-kompass-text">EDGE</h4>
                    <p className="mt-2 text-xs text-kompass-text/60 leading-relaxed">
                      Distilled sub-second target tells to review 10 minutes prior to mat.
                    </p>
                    <Link href="/method" className="mt-4 inline-block text-[11px] font-bold text-kompass-teal hover:underline">
                      Access Athlete Portal
                    </Link>
                  </div>
                  {/* Col 4 (Featured Case Study Spotlight) */}
                  <div className="bg-kompass-cardLight p-5 border border-kompass-border">
                    <span className="inline-block bg-intel-violet/20 border border-intel-violet/30 px-2 py-0.5 text-[9px] uppercase tracking-widest text-intel-violet">
                      FEATURED INTEL
                    </span>
                    <h5 className="mt-3 font-condensed text-xs font-semibold uppercase tracking-wider text-kompass-text">
                      The Samdan Formula
                    </h5>
                    <p className="mt-2 text-[11px] text-kompass-text/60 leading-relaxed">
                      How a national team coach deployed a 133ms reaction trigger analysis to sweep target matchups.
                    </p>
                    <Link href="#insights" className="mt-4 inline-block text-[11px] font-bold text-kompass-teal hover:text-kompass-teal/80">
                      Read Spotlight →
                    </Link>
                  </div>
                </div>
              )}

              {activeMenu === "reports" && (
                <div className="grid grid-cols-4 gap-8">
                  {/* Tier 1 */}
                  <div className="border-r border-kompass-border/30 pr-6">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-kompass-teal">TIER 01 / NAVIGATES YOU</span>
                    <h4 className="mt-1 font-condensed text-sm font-bold text-kompass-text">KOMPASS</h4>
                    <p className="mt-2 text-xs text-kompass-text/60 leading-relaxed">
                      Competitor video dossiers & high-precision opponent mapping footprint audits.
                    </p>
                    <Link href="#contact" className="mt-4 inline-block text-[11px] font-bold text-kompass-teal hover:underline">
                      View Sample
                    </Link>
                  </div>
                  {/* Tier 2 */}
                  <div className="border-r border-kompass-border/30 pr-6">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-kompass-teal">TIER 02 / PREPARES YOU</span>
                    <h4 className="mt-1 font-condensed text-sm font-bold text-kompass-text">KONTROL</h4>
                    <p className="mt-2 text-xs text-kompass-text/60 leading-relaxed">
                      The complete strategic preparation system for drills and counter scenarios.
                    </p>
                    <Link href="#contact" className="mt-4 inline-block text-[11px] font-bold text-kompass-teal hover:underline">
                      View Sample
                    </Link>
                  </div>
                  {/* Tier 3 */}
                  <div className="border-r border-kompass-border/30 pr-6">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-kompass-teal">TIER 03 / ARMS YOU</span>
                    <h4 className="mt-1 font-condensed text-sm font-bold text-kompass-text">EDGE</h4>
                    <p className="mt-2 text-xs text-kompass-text/60 leading-relaxed">
                      The match-day intelligence card containing critical sub-second cues.
                    </p>
                    <Link href="#contact" className="mt-4 inline-block text-[11px] font-bold text-kompass-teal hover:underline">
                      View Sample
                    </Link>
                  </div>
                  {/* Action Panel */}
                  <div className="bg-kompass-cardLight p-5 border border-kompass-border flex flex-col justify-between">
                    <div>
                      <h5 className="font-condensed text-xs font-semibold uppercase tracking-wider text-kompass-text">
                        Sample Dossier
                      </h5>
                      <p className="mt-2 text-[11px] text-kompass-text/60 leading-relaxed">
                        Download a redacted competitor intelligence report to examine the telemetry structure.
                      </p>
                    </div>
                    <Link href="#contact" className="mt-4 block w-full text-center border border-kompass-teal py-1.5 text-xs uppercase tracking-widest text-kompass-teal hover:bg-kompass-teal hover:text-kompass-bg transition-all">
                      Download PDF (6.2MB)
                    </Link>
                  </div>
                </div>
              )}

              {activeMenu === "method" && (
                <div className="grid grid-cols-4 gap-6">
                  <div className="flex flex-col gap-1 border-r border-kompass-border/30 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-none bg-kompass-teal/10 text-[10px] font-bold text-kompass-teal border border-kompass-teal/20">01</span>
                      <h4 className="font-condensed text-xs font-bold text-kompass-text uppercase tracking-wider">Observations</h4>
                    </div>
                    <p className="mt-2 text-[11px] text-kompass-text/60 leading-relaxed">
                      Video capture and high-frequency stance/combat telemetry extraction.
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 border-r border-kompass-border/30 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-none bg-kompass-teal/10 text-[10px] font-bold text-kompass-teal border border-kompass-teal/20">02</span>
                      <h4 className="font-condensed text-xs font-bold text-kompass-text uppercase tracking-wider">Strengths</h4>
                    </div>
                    <p className="mt-2 text-[11px] text-kompass-text/60 leading-relaxed">
                      Profiling core combinations, movement velocity, and preferred fight ranges.
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 border-r border-kompass-border/30 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-none bg-kompass-teal/10 text-[10px] font-bold text-kompass-teal border border-kompass-teal/20">03</span>
                      <h4 className="font-condensed text-xs font-bold text-kompass-text uppercase tracking-wider">Weaknesses</h4>
                    </div>
                    <p className="mt-2 text-[11px] text-kompass-text/60 leading-relaxed">
                      Mapping sub-second physical tells (gaze, shoulders, heel lift) with timing ratings.
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-none bg-kompass-teal/10 text-[10px] font-bold text-kompass-teal border border-kompass-teal/20">04</span>
                      <h4 className="font-condensed text-xs font-bold text-kompass-text uppercase tracking-wider">Exploit & Win</h4>
                    </div>
                    <p className="mt-2 text-[11px] text-kompass-text/60 leading-relaxed">
                      Formulating exact counters and custom drills to beat verified weaknesses.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            className="fixed inset-0 top-16 w-full bg-kompass-bg z-30 md:hidden overflow-y-auto px-6 py-8 border-t border-kompass-border"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: "linear" as const }}
          >
            <div className="flex flex-col gap-6 text-left">
              
              {/* Accordion: Ecosystem/Solutions */}
              <div className="border-b border-kompass-border/55 pb-4">
                <button 
                  onClick={() => handleMobileAccordion("solutions")}
                  className="flex w-full items-center justify-between font-condensed text-base font-bold uppercase tracking-wider text-kompass-text"
                >
                  <span>{t.nav_ecosystem}</span>
                  <span className="text-kompass-teal">{mobileAccordion === "solutions" ? "—" : "+"}</span>
                </button>
                {mobileAccordion === "solutions" && (
                  <div className="mt-4 flex flex-col gap-4 pl-4 border-l border-kompass-border">
                    <div>
                      <h5 className="font-condensed text-xs font-bold text-kompass-teal uppercase">KOMPASS</h5>
                      <p className="text-[11px] text-kompass-text/60">Competitor video dossiers & high-precision opponent mapping.</p>
                    </div>
                    <div>
                      <h5 className="font-condensed text-xs font-bold text-kompass-teal uppercase">KONTROL</h5>
                      <p className="text-[11px] text-kompass-text/60">Complete strategic preparation platform.</p>
                    </div>
                    <div>
                      <h5 className="font-condensed text-xs font-bold text-kompass-teal uppercase">EDGE</h5>
                      <p className="text-[11px] text-kompass-text/60">Match-day intelligence cards & tells list.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion: Pricing/Packages */}
              <div className="border-b border-kompass-border/55 pb-4">
                <button 
                  onClick={() => handleMobileAccordion("reports")}
                  className="flex w-full items-center justify-between font-condensed text-base font-bold uppercase tracking-wider text-kompass-text"
                >
                  <span>{t.nav_pricing}</span>
                  <span className="text-kompass-teal">{mobileAccordion === "reports" ? "—" : "+"}</span>
                </button>
                {mobileAccordion === "reports" && (
                  <div className="mt-4 flex flex-col gap-4 pl-4 border-l border-kompass-border">
                    <div>
                      <h5 className="font-condensed text-xs font-bold text-kompass-teal uppercase">Tier 1: KOMPASS</h5>
                      <p className="text-[11px] text-kompass-text/60">Competitor video dossiers.</p>
                    </div>
                    <div>
                      <h5 className="font-condensed text-xs font-bold text-kompass-teal uppercase">Tier 2: KONTROL</h5>
                      <p className="text-[11px] text-kompass-text/60">Complete strategic prep platform.</p>
                    </div>
                    <div>
                      <h5 className="font-condensed text-xs font-bold text-kompass-teal uppercase">Tier 3: EDGE</h5>
                      <p className="text-[11px] text-kompass-text/60">Match-day intelligence cards.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion: Method */}
              <div className="border-b border-kompass-border/55 pb-4">
                <button 
                  onClick={() => handleMobileAccordion("method")}
                  className="flex w-full items-center justify-between font-condensed text-base font-bold uppercase tracking-wider text-kompass-text"
                >
                  <span>{t.nav_method}</span>
                  <span className="text-kompass-teal">{mobileAccordion === "method" ? "—" : "+"}</span>
                </button>
                {mobileAccordion === "method" && (
                  <div className="mt-4 flex flex-col gap-4 pl-4 border-l border-kompass-border text-xs text-kompass-text/60 font-mono">
                    <p>1. Observations (telemetry data)</p>
                    <p>2. Strengths (combative footprint)</p>
                    <p>3. Weaknesses (sub-second tells)</p>
                    <p>4. Exploit & Win (blueprints)</p>
                  </div>
                )}
              </div>

              {/* Direct link: Insights */}
              <div className="border-b border-kompass-border/55 pb-4">
                <Link 
                  href="#insights" 
                  onClick={() => setMobileOpen(false)}
                  className="block w-full font-condensed text-base font-bold uppercase tracking-wider text-kompass-text"
                >
                  {t.nav_insight}
                </Link>
              </div>

              {/* Mobile CTAs */}
              <div className="mt-8 flex flex-col gap-4">
                <Link 
                  href="#contact" 
                  onClick={() => setMobileOpen(false)}
                  className="block w-full border border-kompass-border py-3 text-center font-condensed text-sm uppercase tracking-widest text-kompass-text hover:bg-kompass-card"
                >
                  {t.btn_login}
                </Link>
                <Link 
                  href="#contact" 
                  onClick={() => setMobileOpen(false)}
                  className="block w-full border border-kompass-teal bg-kompass-teal py-3 text-center font-condensed text-sm uppercase tracking-widest text-kompass-bg hover:bg-transparent hover:text-kompass-teal transition-all"
                >
                  {t.btn_request_access}
                </Link>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
export default Navbar;
