"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";
import { signIn, checkSession } from "@/lib/auth";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // If already logged in, redirect to dashboard
    const verifySession = async () => {
      const active = await checkSession();
      if (active) {
        router.push("/admin");
      }
    };
    verifySession();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await signIn(email, password);
      if (res.success) {
        router.push("/admin");
      } else {
        setErrorMsg(res.error || "ACCESS DENIED: INVALID PORTAL KEY");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("AUTHENTICATION PORTAL EXCEPTION DETECTED");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F16] text-[#E6E6E6] flex flex-col justify-center items-center p-4 selection:bg-[#00D6C6] selection:text-[#0B0F16]">
      <div className="w-full max-w-[400px] bg-[#111722] border border-[#1e293b]/60 p-8 relative shadow-2xl shadow-kompass-teal/5">
        
        {/* Corner Brackets */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-kompass-border/30" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-kompass-border/30" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-kompass-border/30" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-kompass-border/30" />

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-8">
          <Logo width={48} height={48} className="object-contain" priority={true} />
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
            <label htmlFor="auth-email" className="font-condensed text-xs uppercase tracking-wider text-kompass-text/75 font-semibold">
              SECURE EMAIL
            </label>
            <input 
              type="email" 
              id="auth-email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="analyst@kompass-analysis.com"
              className="border border-kompass-border/60 bg-[#0B0F16] px-3 py-2 text-sm text-[#E6E6E6] placeholder-kompass-text/20 focus:border-[#00D6C6] focus:outline-none rounded-none w-full font-mono"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="auth-key" className="font-condensed text-xs uppercase tracking-wider text-kompass-text/75 font-semibold">
              PORTAL PASSWORD
            </label>
            <input 
              type="password" 
              id="auth-key"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••••"
              className="border border-kompass-border/60 bg-[#0B0F16] px-3 py-2 text-sm text-[#E6E6E6] placeholder-kompass-text/20 focus:border-[#00D6C6] focus:outline-none rounded-none w-full"
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

        {/* Warning text */}
        <div className="mt-8 text-center text-[8px] font-mono text-kompass-text/30 uppercase leading-relaxed">
          WARNING: SYSTEM DETECTS UNAUTHORIZED CONNECTIONS. ALL IP ADDRESSES LOGGED.
        </div>

      </div>
    </div>
  );
}
