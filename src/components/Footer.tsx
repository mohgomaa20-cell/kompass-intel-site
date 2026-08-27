"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import Logo from "@/components/ui/Logo";
import Image from "next/image";

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-kompass-bg border-t border-kompass-border py-12 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Foot Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <Logo width={24} height={24} className="object-contain" />
              <span className="font-condensed text-base font-bold tracking-[0.2em] text-kompass-text">
                KOMPASS
              </span>
            </div>
            <p className="text-[11px] text-kompass-text/50 max-w-xs leading-relaxed whitespace-pre-line">
              {t.foot_desc}
            </p>
            {/* Real Professional Team Photo */}
            <div className="relative w-48 h-32 border border-kompass-border/30 rounded-lg overflow-hidden mt-3 shadow-md shadow-kompass-teal/5">
              <Image 
                src={t.img_team}
                alt="KOMPASS Founder Malek Salama and Technical Analysis Team"
                fill
                sizes="192px"
                className="object-cover object-top filter brightness-90 contrast-105"
              />
            </div>
          </div>

          {/* Col 1: Ecosystem */}
          <div className="space-y-3">
            <h4 className="font-condensed text-[11px] font-bold text-kompass-teal uppercase tracking-wider">
              {t.foot_col_reports}
            </h4>
            <ul className="space-y-1.5 text-[11px] text-kompass-text/60 font-mono">
              <li>
                <Link href="#contact" className="hover:text-kompass-text transition-colors">KOMPASS (Contact Us)</Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-kompass-text transition-colors">KONTROL (Contact Us)</Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-kompass-text transition-colors">EDGE (Contact Us)</Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Solutions */}
          <div className="space-y-3">
            <h4 className="font-condensed text-[11px] font-bold text-kompass-teal uppercase tracking-wider">
              {t.foot_col_solutions}
            </h4>
            <ul className="space-y-1.5 text-[11px] text-kompass-text/60">
              <li>
                <Link href="#contact" className="hover:text-kompass-text transition-colors">For Federations (Contact Us)</Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-kompass-text transition-colors">For Coaches (Contact Us)</Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-kompass-text transition-colors">For Athletes (Contact Us)</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Legal */}
          <div className="space-y-3">
            <h4 className="font-condensed text-[11px] font-bold text-kompass-teal uppercase tracking-wider">
              {t.foot_col_company}
            </h4>
            <ul className="space-y-1.5 text-[11px] text-kompass-text/60">
              <li>
                <Link href="/method" className="hover:text-kompass-text transition-colors">The Method</Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-kompass-text transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-kompass-text transition-colors">Careers</Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-kompass-text transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower footer row */}
        <div className="border-t border-kompass-border/40 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-kompass-text/40">
          <div>
            &copy; 2026 KOMPASS Intelligence. {t.foot_rights}
          </div>
          
          {/* Social Icons */}
          <div className="flex gap-4">
            <a href="https://instagram.com/kompass.intelligence" target="_blank" rel="noopener noreferrer" className="hover:text-kompass-teal transition-colors font-mono text-[9px] uppercase tracking-wider">
              [ INSTAGRAM ]
            </a>
            <a href="https://linkedin.com/company/kompass-analysis" target="_blank" rel="noopener noreferrer" className="hover:text-kompass-teal transition-colors font-mono text-[9px] uppercase tracking-wider">
              [ LINKEDIN ]
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
export default Footer;
