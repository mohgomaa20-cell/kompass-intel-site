"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { saveSiteContentOverride } from "@/lib/db";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface MediaSlot {
  key: string;
  label: string;
  current: string;
  description: string;
}

export default function MediaManagerPage() {
  const { t, refreshOverrides } = useLanguage();
  const [loadingSlot, setLoadingSlot] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const slots: MediaSlot[] = [
    {
      key: "img_hero",
      label: "Hero Action Visual",
      current: t.img_hero,
      description: "Appears on the homepage fold next to the tagline, representing live competition analysis."
    },
    {
      key: "img_corner",
      label: "In-Corner Coaching Visual",
      current: t.img_corner,
      description: "Appears side-by-side with national federation cycle partnerships and security guidelines."
    },
    {
      key: "img_kia",
      label: "Ecosystem KIA Report Preview",
      current: t.img_kia,
      description: "Appears inside the KOMPASS ecosystem tier card as a redacted preview thumbnail."
    },
    {
      key: "img_team",
      label: "Footer Team Photo",
      current: t.img_team,
      description: "Appears in the left-hand branding column of the global footer."
    }
  ];

  const handleFileUpload = async (slotKey: string, file: File) => {
    setLoadingSlot(slotKey);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      let finalUrl = "";

      if (isSupabaseConfigured && supabase) {
        // Upload to Supabase Storage Bucket 'kompass'
        const fileExt = file.name.split(".").pop();
        const fileName = `${slotKey}_${Date.now()}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        const { error } = await supabase.storage
          .from("kompass")
          .upload(filePath, file, { cacheControl: "3600", upsert: true });

        if (error) throw error;

        // Get Public URL
        const { data: urlData } = supabase.storage
          .from("kompass")
          .getPublicUrl(filePath);

        finalUrl = urlData.publicUrl;
      } else {
        // Fallback simulation: read file as Base64 Data URL
        finalUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }

      // Save URL override in site_content table
      await saveSiteContentOverride(slotKey, finalUrl);
      
      // Update global context
      await refreshOverrides();

      setSuccessMsg(`ASSET SWAPPED SUCCESSFULLY FOR ${slotKey.toUpperCase()}.`);
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error(err);
      const errMsg = err instanceof Error ? err.message : "FAILED TO PERSIST ASSET.";
      setErrorMsg(`UPLOAD ERROR: ${errMsg}`);
    } finally {
      setLoadingSlot(null);
    }
  };

  const handleCustomUrlSubmit = async (slotKey: string, url: string) => {
    if (!url.trim()) return;
    setLoadingSlot(slotKey);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      await saveSiteContentOverride(slotKey, url);
      await refreshOverrides();
      setSuccessMsg(`CUSTOM URL OVERRIDE SECURED FOR ${slotKey.toUpperCase()}.`);
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error(err);
      setErrorMsg("FAILED TO SAVE URL OVERRIDE.");
    } finally {
      setLoadingSlot(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-condensed text-xl font-extrabold tracking-wider text-[#E6E6E6] uppercase">
          Media Asset Manager
        </h2>
        <p className="text-xs text-kompass-text/60 mt-1 uppercase font-mono">
          Decoupled upload hub connected to Supabase &apos;kompass&apos; storage bucket
        </p>
      </div>

      {successMsg && (
        <div className="p-3 bg-intel-green/10 border border-intel-green/20 text-intel-green font-mono text-[10px] uppercase">
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="p-3 bg-intel-orange/10 border border-intel-orange/20 text-intel-orange font-mono text-[10px] uppercase">
          {errorMsg}
        </div>
      )}

      <div className="space-y-6">
        {slots.map((slot) => (
          <div key={slot.key} className="border border-kompass-border/30 bg-[#0B0F16]/50 p-6 flex flex-col md:flex-row gap-6 items-start justify-between relative">
            
            {/* Slot Info and Controls */}
            <div className="flex-grow space-y-4 text-left max-w-xl">
              <div>
                <span className="font-mono text-[10px] text-kompass-teal uppercase font-bold tracking-wider">
                  SLOT: {slot.key.toUpperCase()}
                </span>
                <h3 className="font-condensed text-base font-extrabold text-[#E6E6E6] uppercase tracking-wide mt-1">
                  {slot.label}
                </h3>
                <p className="text-[11px] text-kompass-text/50 mt-1">
                  {slot.description}
                </p>
              </div>

              {/* Upload Input Group */}
              <div className="flex flex-col gap-2">
                <span className="font-condensed text-[10px] text-kompass-text/75 uppercase tracking-wider font-semibold">
                  Upload file (PNG/JPG):
                </span>
                <input 
                  type="file"
                  accept="image/*"
                  disabled={loadingSlot !== null}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(slot.key, file);
                  }}
                  className="block w-full text-xs text-kompass-text/60 file:mr-4 file:py-1.5 file:px-4 file:border file:border-kompass-border file:bg-[#111722] file:text-kompass-teal file:font-condensed file:text-[10px] file:uppercase file:tracking-wider file:font-bold hover:file:bg-[#00D6C6] hover:file:text-[#0B0F16] file:transition-all cursor-pointer disabled:opacity-50"
                />
              </div>

              {/* Direct URL Input Group */}
              <div className="flex flex-col gap-2">
                <span className="font-condensed text-[10px] text-kompass-text/75 uppercase tracking-wider font-semibold">
                  Or set direct URL:
                </span>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const input = form.elements.namedItem("custom-url") as HTMLInputElement;
                    handleCustomUrlSubmit(slot.key, input.value);
                  }}
                  className="flex gap-2"
                >
                  <input 
                    type="url"
                    name="custom-url"
                    defaultValue={slot.current.startsWith("data:") ? "" : slot.current}
                    placeholder="https://supabase.co/storage/v1/object/public/..."
                    className="flex-grow border border-kompass-border/60 bg-[#0B0F16] px-3 py-1.5 text-[11px] text-[#E6E6E6] placeholder-kompass-text/20 focus:border-[#00D6C6] focus:outline-none rounded-none font-mono"
                  />
                  <button
                    type="submit"
                    disabled={loadingSlot !== null}
                    className="border border-[#00D6C6] hover:bg-[#00D6C6] text-[#00D6C6] hover:text-[#0B0F16] px-4 py-1 font-condensed text-[10px] uppercase font-bold transition-all disabled:opacity-50"
                  >
                    BIND
                  </button>
                </form>
              </div>
            </div>

            {/* Thumbnail Preview Panel */}
            <div className="w-full md:w-[180px] flex flex-col items-center gap-2">
              <span className="font-mono text-[8px] text-kompass-text/30 uppercase tracking-widest">
                Active Preview
              </span>
              <div className="relative w-[180px] h-[120px] border border-kompass-border bg-[#111722] rounded overflow-hidden">
                {slot.current ? (
                  <Image 
                    src={slot.current}
                    alt={slot.label}
                    fill
                    sizes="180px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-mono text-[9px] text-kompass-text/35">
                    NO ACTIVE ASSET
                  </div>
                )}
                {loadingSlot === slot.key && (
                  <div className="absolute inset-0 bg-[#0B0F16]/80 flex items-center justify-center font-mono text-[10px] text-kompass-teal uppercase font-bold animate-pulse">
                    PROCESSING...
                  </div>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
