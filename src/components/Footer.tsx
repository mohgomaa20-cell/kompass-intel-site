"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import Logo from "@/components/ui/Logo";

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
              {/* Official K Logo */}
              <Logo className="h-6 w-6" />
              <span className="font-condensed text-base font-bold tracking-[0.2em] text-kompass-text">
                KOMPASS
              </span>
            </div>
            <p className="text-[11px] text-kompass-text/50 max-w-xs leading-relaxed">
              {t.foot_desc}
            </p>
          </div>

          {/* Col 1: Ecosystem */}
          <div className="space-y-3">
            <h4 className="font-condensed text-[11px] font-bold text-kompass-teal uppercase tracking-wider">
              {t.foot_col_reports}
            </h4>
            <ul className="space-y-1.5 text-[11px] text-kompass-text/60 font-mono">
              <li>
                <Link href="#contact" className="hover:text-kompass-text transition-colors">KOMPASS</Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-kompass-text transition-colors">KONTROL</Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-kompass-text transition-colors">EDGE</Link>
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
                <Link href="#contact" className="hover:text-kompass-text transition-colors">For Federations</Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-kompass-text transition-colors">For Coaches</Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-kompass-text transition-colors">For Athletes</Link>
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
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-kompass-teal transition-colors font-mono text-[9px] uppercase tracking-wider">
              [ X ]
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-kompass-teal transition-colors font-mono text-[9px] uppercase tracking-wider">
              [ INSTAGRAM ]
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-kompass-teal transition-colors font-mono text-[9px] uppercase tracking-wider">
              [ LINKEDIN ]
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-kompass-teal transition-colors font-mono text-[9px] uppercase tracking-wider">
              [ YOUTUBE ]
            </a>
          </div>

          <div className="flex gap-4 text-right">
            <Link href="#contact" className="hover:text-kompass-text transition-colors">Privacy Policy</Link>
            <Link href="#contact" className="hover:text-kompass-text transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
export default Footer;
