"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // If already logged in, redirect to dashboard
    const session = sessionStorage.getItem("kompass_admin_session");
    if (session === "active") {
      router.push("/admin");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    setTimeout(() => {
      setLoading(false);
      // Hardcoded secure master key fallback
      const masterKey = process.env.NEXT_PUBLIC_ADMIN_MASTER_KEY || "sente2026!";
      
      if (password === masterKey) {
        sessionStorage.setItem("kompass_admin_session", "active");
        router.push("/admin");
      } else {
        setErrorMsg("ACCESS DENIED: INVALID DECRYPTION AUTH KEY");
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#0B0F16] text-[#E6E6E6] flex flex-col justify-center items-center p-4 selection:bg-[#00D6C6] selection:text-[#0B0F16]">
      <div className="w-full max-w-[400px] bg-[#111722] border border-kompass-border p-8 relative shadow-2xl shadow-kompass-teal/5">
        
        {/* Corner Brackets */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-kompass-border" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-kompass-border" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-kompass-border" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-kompass-border" />

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-8">
          <Logo className="h-12 w-12" />
          <div>
            <h1 className="font-condensed text-xl font-extrabold tracking-[0.2em] text-[#E6E6E6]">
              KOMPASS INTEL
            </h1>
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#00D6C6] mt-1 block">
              SECURE DECRYPTION PORTAL
            </span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="auth-key" className="font-condensed text-xs uppercase tracking-wider text-kompass-text/75 font-semibold">
              ADMIN MASTER AUTH KEY
            </label>
            <input 
              type="password" 
              id="auth-key"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••••"
              className="border border-kompass-border bg-[#0B0F16] px-3 py-2 text-sm text-[#E6E6E6] placeholder-kompass-text/30 focus:border-[#00D6C6] focus:outline-none rounded-none w-full"
            />
          </div>

          {errorMsg && (
            <div className="p-3 bg-intel-orange/10 border border-intel-orange/20 text-intel-orange font-mono text-[10px]">
              {errorMsg}
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#00D6C6] border border-[#00D6C6] text-[#0B0F16] py-3.5 font-condensed text-xs uppercase tracking-widest font-extrabold hover:bg-transparent hover:text-[#00D6C6] transition-all disabled:opacity-50"
          >
            {loading ? "DECRYPTING..." : "ACCESS PORTAL"}
          </button>
        </form>

        {/* Footer text */}
        <div className="mt-8 text-center text-[8px] font-mono text-kompass-text/30 uppercase leading-relaxed">
          WARNING: SYSTEM DETECTS UNAUTHORIZED CONNECTIONS. ALL IP ADDRESSES LOGGED.
        </div>

      </div>
    </div>
  );
}
