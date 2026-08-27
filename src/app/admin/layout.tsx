"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { checkSession, signOutUser } from "@/lib/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    const verify = async () => {
      const active = await checkSession();
      if (!active) {
        router.push("/admin/login");
      } else {
        setAuthorized(true);
      }
      setLoading(false);
    };

    verify();
  }, [router, isLoginPage]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F16] text-[#E6E6E6] flex items-center justify-center font-mono text-xs uppercase tracking-wider">
        VERIFYING PORTAL SESSION CONNECTIVITY...
      </div>
    );
  }

  // If it's the login page, just render it without dashboard frame
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!authorized) {
    return null; // Prevents flashing content while redirecting
  }

  const handleLogout = async () => {
    await signOutUser();
    router.push("/admin/login");
  };

  const navLinks = [
    { label: "Leads & Inquiries", href: "/admin" },
    { label: "Media Manager", href: "/admin/media" },
    { label: "Insights CMS", href: "/admin/insights" },
    { label: "Dossiers Manager", href: "/admin/dossiers" }
  ];

  return (
    <div className="min-h-screen bg-[#0B0F16] text-[#E6E6E6] flex flex-col justify-between selection:bg-[#00D6C6] selection:text-[#0B0F16]">
      <div>
        {/* Top Portal Header */}
        <header className="bg-[#111722] border-b border-kompass-border/30 py-4 px-6 sm:px-8 flex justify-between items-center relative z-20">
          <div className="flex items-center gap-3">
            <Logo width={28} height={28} className="object-contain" />
            <div>
              <span className="font-condensed text-sm font-extrabold tracking-[0.25em] text-[#E6E6E6] block">
                KOMPASS COMMAND
              </span>
              <span className="font-mono text-[8px] uppercase tracking-widest text-kompass-teal block">
                ADMINISTRATION CONSOLE
              </span>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="border border-intel-orange/40 hover:border-intel-orange text-intel-orange bg-intel-orange/5 px-3 py-1 font-condensed text-[10px] uppercase tracking-wider transition-all"
          >
            TERMINATE SESSION
          </button>
        </header>

        {/* Dashboard Frame */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-3 space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block w-full text-left px-4 py-3 font-condensed text-xs uppercase tracking-widest font-bold border transition-all ${
                      isActive 
                        ? "bg-[#00D6C6] border-[#00D6C6] text-[#0B0F16]" 
                        : "bg-[#111722] border-kompass-border/40 hover:border-[#00D6C6]/60 text-[#E6E6E6]/70 hover:text-[#E6E6E6]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </aside>

            {/* Main Content Pane */}
            <main className="lg:col-span-9 bg-[#111722] border border-[#1e293b]/50 p-6 relative min-h-[500px]">
              {/* Corner brackets inside the dashboard panel */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-kompass-border/30" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-kompass-border/30" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-kompass-border/30" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-kompass-border/30" />

              {children}
            </main>

          </div>
        </div>
      </div>

      {/* Tiny Footer */}
      <footer className="border-t border-kompass-border/10 py-6 text-center font-mono text-[8px] text-kompass-text/25 uppercase tracking-widest bg-[#111722]/30">
        KOMPASS INTELLIGENCE SERVICES © 2026. ALL ACTIONS LOGGED.
      </footer>
    </div>
  );
}
