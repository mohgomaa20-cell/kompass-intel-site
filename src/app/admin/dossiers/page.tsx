"use client";

import React, { useState, useEffect } from "react";
import { 
  CompetitorProfile, 
  getCompetitorProfiles, 
  saveCompetitorProfile, 
  deleteCompetitorProfile 
} from "@/lib/db";

export default function DossiersManagerPage() {
  const [dossiers, setDossiers] = useState<CompetitorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDossier, setSelectedDossier] = useState<CompetitorProfile | null>(null);
  const [msg, setMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState<Omit<CompetitorProfile, "id"> & { id?: string }>({
    name: "",
    country: "",
    weight: "",
    style: "",
    strengths: "",
    vulnerabilities: "",
    tendencies: ""
  });

  const loadDossiers = async () => {
    try {
      const data = await getCompetitorProfiles();
      setDossiers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDossiers();
  }, []);

  const handleSelect = (dos: CompetitorProfile) => {
    setSelectedDossier(dos);
    setForm({
      id: dos.id,
      name: dos.name,
      country: dos.country,
      weight: dos.weight,
      style: dos.style,
      strengths: dos.strengths,
      vulnerabilities: dos.vulnerabilities,
      tendencies: dos.tendencies
    });
  };

  const handleCreateNew = () => {
    setSelectedDossier(null);
    setForm({
      name: "",
      country: "",
      weight: "",
      style: "",
      strengths: "",
      vulnerabilities: "",
      tendencies: ""
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.country || !form.weight) {
      setErrorMsg("REQUIRED: ATHLETE NAME, COUNTRY, & WEIGHT CLASS.");
      return;
    }

    try {
      const saved = await saveCompetitorProfile(form);
      setMsg("DOSSIER SAVE SECURED.");
      loadDossiers();
      setSelectedDossier(saved);
      setForm(prev => ({ ...prev, id: saved.id }));
      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      console.error(err);
      setErrorMsg("ERROR SAVING DOSSIER.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("CONFIRM COMMAND: PURGE ATHLETE DOSSIER?")) return;
    try {
      await deleteCompetitorProfile(id);
      setMsg("DOSSIER PURGED.");
      loadDossiers();
      handleCreateNew();
      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      console.error(err);
      setErrorMsg("ERROR DELETING DOSSIER.");
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center font-mono text-xs text-kompass-teal animate-pulse">
        CONNECTING SECURE DOSSIERS FEED...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-kompass-border/30 pb-4 text-left">
        <h2 className="font-condensed text-xl font-extrabold text-[#E6E6E6] uppercase tracking-wider">
          Athlete Dossier Manager
        </h2>
        <p className="text-xs text-kompass-text/60 mt-1 uppercase font-mono">
          Manage Kumite Competitor Target Profiles
        </p>
      </div>

      {msg && (
        <div className="p-3 bg-intel-green/10 border border-intel-green/20 text-intel-green font-mono text-[10px] uppercase text-left">
          {msg}
        </div>
      )}

      {errorMsg && (
        <div className="p-3 bg-intel-orange/10 border border-intel-orange/20 text-intel-orange font-mono text-[10px] uppercase text-left">
          {errorMsg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Dossier list */}
        <div className="md:col-span-4 space-y-4">
          <button 
            onClick={handleCreateNew}
            className="w-full bg-[#00D6C6] border border-[#00D6C6] text-[#0B0F16] py-2 font-condensed text-xs uppercase tracking-widest font-extrabold hover:bg-transparent hover:text-[#00D6C6] transition-all"
          >
            + Create New Dossier
          </button>
          
          <div className="space-y-2 max-h-[450px] overflow-y-auto pr-1">
            {dossiers.map((dos) => (
              <button 
                key={dos.id}
                onClick={() => handleSelect(dos)}
                className={`w-full text-left p-3 border font-mono text-xs transition-all relative ${
                  selectedDossier?.id === dos.id 
                    ? "bg-[#00D6C6]/10 border-[#00D6C6] text-kompass-teal font-bold"
                    : "bg-[#0B0F16]/50 border-kompass-border/30 hover:border-kompass-teal/40 text-kompass-text/80"
                }`}
              >
                <span className="block font-sans font-bold text-sm text-[#E6E6E6]">{dos.name}</span>
                <span className="text-[10px] text-kompass-text/45 uppercase mt-1 block">
                  {dos.country} · {dos.weight}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Add/Edit Form */}
        <div className="md:col-span-8 bg-[#0B0F16]/40 border border-kompass-border/30 p-6">
          <h3 className="font-condensed text-sm font-bold uppercase tracking-wider text-kompass-teal border-b border-kompass-border/30 pb-2 mb-4 text-left">
            {selectedDossier ? `EDIT PROFILE: ${selectedDossier.name}` : "CREATE NEW DOSSIER"}
          </h3>

          <form onSubmit={handleSave} className="space-y-4 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Athlete Name */}
              <div className="flex flex-col gap-1.5">
                <label className="font-condensed text-[10px] uppercase tracking-wider text-kompass-text/75 font-semibold">
                  ATHLETE NAME *
                </label>
                <input 
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Kenji Sato"
                  className="border border-kompass-border/60 bg-[#0B0F16] px-3 py-2 text-xs text-[#E6E6E6] focus:border-[#00D6C6] focus:outline-none rounded-none w-full"
                />
              </div>

              {/* Country */}
              <div className="flex flex-col gap-1.5">
                <label className="font-condensed text-[10px] uppercase tracking-wider text-kompass-text/75 font-semibold">
                  COUNTRY *
                </label>
                <input 
                  type="text"
                  required
                  value={form.country}
                  onChange={(e) => setForm(prev => ({ ...prev, country: e.target.value }))}
                  placeholder="e.g. Japan"
                  className="border border-kompass-border/60 bg-[#0B0F16] px-3 py-2 text-xs text-[#E6E6E6] focus:border-[#00D6C6] focus:outline-none rounded-none w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Weight Category */}
              <div className="flex flex-col gap-1.5">
                <label className="font-condensed text-[10px] uppercase tracking-wider text-kompass-text/75 font-semibold">
                  WEIGHT DIVISION *
                </label>
                <input 
                  type="text"
                  required
                  value={form.weight}
                  onChange={(e) => setForm(prev => ({ ...prev, weight: e.target.value }))}
                  placeholder="e.g. Male Kumite -75kg"
                  className="border border-kompass-border/60 bg-[#0B0F16] px-3 py-2 text-xs text-[#E6E6E6] focus:border-[#00D6C6] focus:outline-none rounded-none w-full"
                />
              </div>

              {/* Fighting Style */}
              <div className="flex flex-col gap-1.5">
                <label className="font-condensed text-[10px] uppercase tracking-wider text-kompass-text/75 font-semibold">
                  COMBAT STYLE
                </label>
                <input 
                  type="text"
                  value={form.style}
                  onChange={(e) => setForm(prev => ({ ...prev, style: e.target.value }))}
                  placeholder="e.g. Counter-Striker / Ma-ai Controller"
                  className="border border-kompass-border/60 bg-[#0B0F16] px-3 py-2 text-xs text-[#E6E6E6] focus:border-[#00D6C6] focus:outline-none rounded-none w-full"
                />
              </div>
            </div>

            {/* Strengths */}
            <div className="flex flex-col gap-1.5">
              <label className="font-condensed text-[10px] uppercase tracking-wider text-kompass-text/75 font-semibold">
                VERIFIED STRENGTHS & ALIGNMENT
              </label>
              <textarea 
                value={form.strengths}
                onChange={(e) => setForm(prev => ({ ...prev, strengths: e.target.value }))}
                rows={2}
                placeholder="Key offensive systems and positive footprint logs..."
                className="border border-kompass-border/60 bg-[#0B0F16] px-3 py-2 text-xs text-[#E6E6E6] focus:border-[#00D6C6] focus:outline-none rounded-none w-full font-sans"
              />
            </div>

            {/* Vulnerabilities */}
            <div className="flex flex-col gap-1.5">
              <label className="font-condensed text-[10px] uppercase tracking-wider text-kompass-text/75 font-semibold">
                VERIFIED VULNERABILITIES & CUES
              </label>
              <textarea 
                value={form.vulnerabilities}
                onChange={(e) => setForm(prev => ({ ...prev, vulnerabilities: e.target.value }))}
                rows={2}
                placeholder="Stance tells, physical indicators, and guard drops..."
                className="border border-kompass-border/60 bg-[#0B0F16] px-3 py-2 text-xs text-[#E6E6E6] focus:border-[#00D6C6] focus:outline-none rounded-none w-full font-sans"
              />
            </div>

            {/* Tendencies */}
            <div className="flex flex-col gap-1.5">
              <label className="font-condensed text-[10px] uppercase tracking-wider text-kompass-text/75 font-semibold">
                MATCH TACTICAL TENDENCIES
              </label>
              <textarea 
                value={form.tendencies}
                onChange={(e) => setForm(prev => ({ ...prev, tendencies: e.target.value }))}
                rows={2}
                placeholder="Warning triggers, end-of-match behaviors, spatial biases..."
                className="border border-kompass-border/60 bg-[#0B0F16] px-3 py-2 text-xs text-[#E6E6E6] focus:border-[#00D6C6] focus:outline-none rounded-none w-full font-sans"
              />
            </div>

            {/* Form actions */}
            <div className="flex justify-between items-center pt-2">
              {selectedDossier ? (
                <button
                  type="button"
                  onClick={() => handleDelete(selectedDossier.id)}
                  className="border border-intel-orange text-intel-orange hover:bg-intel-orange/10 px-4 py-2 font-condensed text-[10px] uppercase font-extrabold tracking-wider transition-all"
                >
                  Delete Dossier
                </button>
              ) : (
                <div />
              )}
              
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCreateNew}
                  className="border border-kompass-border text-kompass-text/60 hover:text-kompass-text px-4 py-2 font-condensed text-[10px] uppercase font-extrabold tracking-wider transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#00D6C6] border border-[#00D6C6] text-[#0B0F16] px-6 py-2 font-condensed text-[10px] uppercase tracking-widest font-extrabold hover:bg-transparent hover:text-[#00D6C6] transition-all"
                >
                  Save Dossier
                </button>
              </div>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
