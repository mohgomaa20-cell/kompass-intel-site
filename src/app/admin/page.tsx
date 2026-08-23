"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";
import { useLanguage } from "@/context/LanguageContext";
import { 
  Lead, 
  CompetitorProfile, 
  getLeads, 
  updateLeadStatus, 
  getSiteContentOverrides, 
  saveSiteContentOverride, 
  getCompetitorProfiles, 
  saveCompetitorProfile, 
  deleteCompetitorProfile 
} from "@/lib/db";

type Tab = "leads" | "content" | "dossiers";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { refreshOverrides } = useLanguage();
  const [authorized, setAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("leads");

  // Leads state
  const [leads, setLeads] = useState<Lead[]>([]);
  
  // Site Content state
  const [siteText, setSiteText] = useState({
    hero_title: "",
    hero_desc: "",
    product_kompass_desc: "",
    product_kontrol_desc: "",
    product_edge_desc: ""
  });
  const [contentSavedMsg, setContentSavedMsg] = useState("");

  // Athlete Dossiers state
  const [dossiers, setDossiers] = useState<CompetitorProfile[]>([]);
  const [selectedDossier, setSelectedDossier] = useState<CompetitorProfile | null>(null);
  const [dossierForm, setDossierForm] = useState<Omit<CompetitorProfile, "id"> & { id?: string }>({
    name: "",
    country: "",
    weight: "",
    style: "",
    strengths: "",
    vulnerabilities: "",
    tendencies: ""
  });
  const [dossierMsg, setDossierMsg] = useState("");

  // Authenticate session on mount
  useEffect(() => {
    const session = sessionStorage.getItem("kompass_admin_session");
    if (session !== "active") {
      router.push("/admin/login");
    } else {
      setAuthorized(true);
      loadLeads();
      loadSiteContent();
      loadDossiers();
    }
  }, [router]);

  /* ============================================================================
     LEADS LOGIC
     ============================================================================ */
  const loadLeads = async () => {
    try {
      const data = await getLeads();
      setLeads(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (id: string, status: Lead["status"]) => {
    try {
      const success = await updateLeadStatus(id, status);
      if (success) {
        setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const exportLeadsToCSV = () => {
    if (leads.length === 0) return;
    
    const headers = ["ID", "Name", "Contact", "Role", "Division", "Weight Category", "Notes", "Status", "Date"];
    const rows = leads.map(l => [
      l.id,
      l.name,
      l.contact,
      l.role,
      l.division,
      l.weight,
      l.notes.replace(/"/g, '""'),
      l.status,
      l.created_at
    ]);

    const csvContent = 
      "data:text/csv;charset=utf-8," + 
      [headers.join(","), ...rows.map(e => e.map(val => `"${val}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `kompass_leads_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* ============================================================================
     SITE CONTENT EDIT LOGIC
     ============================================================================ */
  const loadSiteContent = async () => {
    try {
      const overrides = await getSiteContentOverrides();
      setSiteText({
        hero_title: overrides.hero_title || "",
        hero_desc: overrides.hero_desc || "",
        product_kompass_desc: overrides.product_kompass_desc || "",
        product_kontrol_desc: overrides.product_kontrol_desc || "",
        product_edge_desc: overrides.product_edge_desc || ""
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveContent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveSiteContentOverride("hero_title", siteText.hero_title);
      await saveSiteContentOverride("hero_desc", siteText.hero_desc);
      await saveSiteContentOverride("product_kompass_desc", siteText.product_kompass_desc);
      await saveSiteContentOverride("product_kontrol_desc", siteText.product_kontrol_desc);
      await saveSiteContentOverride("product_edge_desc", siteText.product_edge_desc);
      
      // Update the client context dynamically
      await refreshOverrides();
      
      setContentSavedMsg("CHANGES PERSISTED & OVERRIDES PROPAGATED SECURELY.");
      setTimeout(() => setContentSavedMsg(""), 3000);
    } catch (err) {
      console.error(err);
      setContentSavedMsg("ERROR PERSISTING CHANGES.");
    }
  };

  /* ============================================================================
     COMPETITOR DOSSIERS CRUD LOGIC
     ============================================================================ */
  const loadDossiers = async () => {
    try {
      const data = await getCompetitorProfiles();
      setDossiers(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDossierSelect = (dos: CompetitorProfile) => {
    setSelectedDossier(dos);
    setDossierForm({
      name: dos.name,
      country: dos.country,
      weight: dos.weight,
      style: dos.style,
      strengths: dos.strengths,
      vulnerabilities: dos.vulnerabilities,
      tendencies: dos.tendencies
    });
  };

  const handleCreateNewDossier = () => {
    setSelectedDossier(null);
    setDossierForm({
      name: "",
      country: "",
      weight: "",
      style: "",
      strengths: "",
      vulnerabilities: "",
      tendencies: ""
    });
  };

  const handleSaveDossier = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dossierForm.name || !dossierForm.country || !dossierForm.weight) {
      setDossierMsg("REQUIRED: ATHLETE NAME, COUNTRY, & WEIGHT CLASS.");
      return;
    }

    try {
      const saved = await saveCompetitorProfile({
        ...dossierForm,
        id: selectedDossier?.id
      });

      setDossierMsg("DOSSIER SAVE SECURED.");
      loadDossiers();
      
      // Select the newly saved dossier or reset
      setSelectedDossier(saved);
      setTimeout(() => setDossierMsg(""), 2500);
    } catch (err) {
      console.error(err);
      setDossierMsg("ERROR SECURING DOSSIER.");
    }
  };

  const handleDeleteDossier = async (id: string) => {
    if (!window.confirm("CONFIRM COMMAND: DELETE ATHLETE PROFILE?")) return;
    try {
      const success = await deleteCompetitorProfile(id);
      if (success) {
        setDossierMsg("DOSSIER PURGED.");
        loadDossiers();
        handleCreateNewDossier();
        setTimeout(() => setDossierMsg(""), 2500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("kompass_admin_session");
    router.push("/admin/login");
  };

  if (!authorized) {
    return (
      <div className="min-h-screen bg-[#0B0F16] text-[#E6E6E6] flex items-center justify-center font-mono text-xs uppercase">
        VERIFYING PORTAL SESSION CONNECTIVITY...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F16] text-[#E6E6E6] flex flex-col justify-between selection:bg-[#00D6C6] selection:text-[#0B0F16]">
      
      {/* Admin Top Header Navigation */}
      <header className="border-b border-kompass-border bg-[#111722]/90 h-16 w-full flex items-center shadow-lg">
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Logo width={28} height={28} className="object-contain animate-pulse" />
            <h1 className="font-condensed text-lg font-bold tracking-widest text-[#E6E6E6]">
              KOMPASS COMMAND CENTER
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={handleLogout}
              className="border border-kompass-border hover:border-intel-orange text-kompass-text hover:text-intel-orange px-3 py-1 font-condensed text-xs uppercase tracking-wider transition-all bg-[#0B0F16]/50"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Tab Selector Links */}
        <div className="flex border-b border-kompass-border mb-8 gap-2 bg-[#111722]/30 p-1">
          <button 
            onClick={() => setActiveTab("leads")}
            className={`font-condensed text-sm font-extrabold uppercase tracking-widest px-4 py-2 border transition-all ${activeTab === "leads" ? "border-kompass-teal bg-[#00D6C6]/10 text-kompass-teal" : "border-transparent text-kompass-text/60 hover:text-kompass-text"}`}
          >
            Leads & Inquiries
          </button>
          <button 
            onClick={() => setActiveTab("content")}
            className={`font-condensed text-sm font-extrabold uppercase tracking-widest px-4 py-2 border transition-all ${activeTab === "content" ? "border-kompass-teal bg-[#00D6C6]/10 text-kompass-teal" : "border-transparent text-kompass-text/60 hover:text-kompass-text"}`}
          >
            Site Content Editor
          </button>
          <button 
            onClick={() => setActiveTab("dossiers")}
            className={`font-condensed text-sm font-extrabold uppercase tracking-widest px-4 py-2 border transition-all ${activeTab === "dossiers" ? "border-kompass-teal bg-[#00D6C6]/10 text-kompass-teal" : "border-transparent text-kompass-text/60 hover:text-kompass-text"}`}
          >
            Athlete Dossier Manager
          </button>
        </div>

        {/* Tab Content Panel */}
        <div className="bg-[#111722] border border-kompass-border p-6 sm:p-8 relative min-h-[500px]">
          {/* Corner Brackets */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-kompass-border" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-kompass-border" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-kompass-border" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-kompass-border" />

          {/* TAB 1: LEADS & INQUIRIES VIEW */}
          {activeTab === "leads" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-kompass-border pb-4">
                <div>
                  <h3 className="font-condensed text-xl font-extrabold text-kompass-text">LEADS INTAKE SYSTEM</h3>
                  <p className="text-[11px] font-mono text-kompass-text/50 uppercase mt-1">Logs of WKF access consultation requests</p>
                </div>
                <button 
                  onClick={exportLeadsToCSV}
                  className="bg-kompass-teal border border-kompass-teal text-kompass-bg px-4 py-1.5 font-condensed text-xs uppercase tracking-widest font-bold hover:bg-transparent hover:text-kompass-teal transition-all"
                >
                  Export CSV
                </button>
              </div>

              {leads.length === 0 ? (
                <div className="py-20 text-center font-mono text-xs text-kompass-text/45">
                  NO ACTIVE INQUIRIESSurfaced.
                </div>
              ) : (
                <div className="overflow-x-auto border border-kompass-border bg-[#0B0F16]/30">
                  <table className="w-full text-left font-mono text-xs text-[#E6E6E6]">
                    <thead>
                      <tr className="border-b border-kompass-border bg-[#0B0F16]/65 text-kompass-text/50">
                        <th className="p-3 font-semibold uppercase">Athlete / Lead</th>
                        <th className="p-3 font-semibold uppercase">Contact</th>
                        <th className="p-3 font-semibold uppercase">Role</th>
                        <th className="p-3 font-semibold uppercase">Weight Category</th>
                        <th className="p-3 font-semibold uppercase">Notes</th>
                        <th className="p-3 font-semibold uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-kompass-border/40">
                      {leads.map((l) => (
                        <tr key={l.id} className="hover:bg-kompass-cardLight">
                          <td className="p-3">
                            <span className="font-sans font-bold text-kompass-text block">{l.name}</span>
                            <span className="text-[10px] text-kompass-text/40">{new Date(l.created_at).toLocaleString()}</span>
                          </td>
                          <td className="p-3">{l.contact}</td>
                          <td className="p-3 text-[10px] uppercase font-bold text-kompass-teal">{l.role}</td>
                          <td className="p-3">{l.weight}</td>
                          <td className="p-3 max-w-[200px] truncate hover:text-clip hover:whitespace-normal font-sans text-kompass-text/70">{l.notes}</td>
                          <td className="p-3">
                            <select 
                              value={l.status}
                              onChange={(e) => handleStatusChange(l.id, e.target.value as Lead["status"])}
                              className={`border bg-[#0B0F16] px-2 py-1 text-[10px] font-bold uppercase rounded-none focus:outline-none ${
                                l.status === "New" ? "border-intel-orange text-intel-orange" :
                                l.status === "Contacted" ? "border-intel-blue text-intel-blue" :
                                l.status === "Proposal Sent" ? "border-intel-violet text-intel-violet" :
                                "border-intel-green text-intel-green"
                              }`}
                            >
                              <option value="New" className="text-intel-orange">New</option>
                              <option value="Contacted" className="text-intel-blue">Contacted</option>
                              <option value="Proposal Sent" className="text-intel-violet">Proposal Sent</option>
                              <option value="Closed" className="text-intel-green">Closed</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SITE CONTENT EDITOR VIEW */}
          {activeTab === "content" && (
            <div className="space-y-6">
              <div className="border-b border-kompass-border pb-4">
                <h3 className="font-condensed text-xl font-extrabold text-kompass-text">HOMEPAGE CONTENT EDITOR</h3>
                <p className="text-[11px] font-mono text-kompass-text/50 uppercase mt-1">Manage content copy overrides dynamically</p>
              </div>

              <form onSubmit={handleSaveContent} className="space-y-6 max-w-3xl text-left">
                
                {/* Hero Headline */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-condensed text-xs uppercase tracking-wider text-kompass-teal font-extrabold">
                    HERO MAIN HEADLINE (H1)
                  </label>
                  <input 
                    type="text"
                    value={siteText.hero_title}
                    onChange={(e) => setSiteText(prev => ({ ...prev, hero_title: e.target.value }))}
                    className="border border-kompass-border bg-[#0B0F16] px-3 py-2 text-sm text-[#E6E6E6] focus:border-kompass-teal focus:outline-none rounded-none w-full font-sans"
                    placeholder="WIN BEFORE IT HAPPENS."
                  />
                </div>

                {/* Hero Subtitle */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-condensed text-xs uppercase tracking-wider text-kompass-teal font-extrabold">
                    HERO SUB-TAGLINE DESCRIPTION
                  </label>
                  <textarea 
                    rows={3}
                    value={siteText.hero_desc}
                    onChange={(e) => setSiteText(prev => ({ ...prev, hero_desc: e.target.value }))}
                    className="border border-kompass-border bg-[#0B0F16] px-3 py-2 text-sm text-[#E6E6E6] focus:border-kompass-teal focus:outline-none rounded-none w-full resize-none font-sans"
                    placeholder="FROM DATA TO DIRECTION..."
                  />
                </div>

                <div className="border-t border-kompass-border/40 pt-4">
                  <span className="text-[11px] font-mono text-kompass-text/45 uppercase tracking-widest block mb-4">Ecosystem Descriptions</span>
                  <div className="grid grid-cols-1 gap-4">
                    
                    {/* KOMPASS Plan Description */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-condensed text-[10px] uppercase tracking-wider text-kompass-text/60">
                        KOMPASS PLAN DESCRIPTION
                      </label>
                      <input 
                        type="text"
                        value={siteText.product_kompass_desc}
                        onChange={(e) => setSiteText(prev => ({ ...prev, product_kompass_desc: e.target.value }))}
                        className="border border-kompass-border bg-[#0B0F16] px-3 py-2 text-sm text-[#E6E6E6] focus:border-kompass-teal focus:outline-none rounded-none w-full font-sans"
                      />
                    </div>

                    {/* KONTROL Plan Description */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-condensed text-[10px] uppercase tracking-wider text-kompass-text/60">
                        KONTROL PLAN DESCRIPTION
                      </label>
                      <input 
                        type="text"
                        value={siteText.product_kontrol_desc}
                        onChange={(e) => setSiteText(prev => ({ ...prev, product_kontrol_desc: e.target.value }))}
                        className="border border-kompass-border bg-[#0B0F16] px-3 py-2 text-sm text-[#E6E6E6] focus:border-kompass-teal focus:outline-none rounded-none w-full font-sans"
                      />
                    </div>

                    {/* EDGE Plan Description */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-condensed text-[10px] uppercase tracking-wider text-kompass-text/60">
                        EDGE PLAN DESCRIPTION
                      </label>
                      <input 
                        type="text"
                        value={siteText.product_edge_desc}
                        onChange={(e) => setSiteText(prev => ({ ...prev, product_edge_desc: e.target.value }))}
                        className="border border-kompass-border bg-[#0B0F16] px-3 py-2 text-sm text-[#E6E6E6] focus:border-kompass-teal focus:outline-none rounded-none w-full font-sans"
                      />
                    </div>

                  </div>
                </div>

                {contentSavedMsg && (
                  <div className="p-3 bg-intel-green/10 border border-intel-green/20 text-intel-green font-mono text-[10px]">
                    {contentSavedMsg}
                  </div>
                )}

                <button 
                  type="submit"
                  className="bg-kompass-teal border border-kompass-teal text-kompass-bg px-6 py-3.5 font-condensed text-xs uppercase tracking-widest font-bold hover:bg-transparent hover:text-kompass-teal transition-all"
                >
                  SAVE OVERRIDES
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: ATHLETE DOSSIER MANAGER */}
          {activeTab === "dossiers" && (
            <div className="space-y-6">
              <div className="border-b border-kompass-border pb-4 flex justify-between items-center">
                <div>
                  <h3 className="font-condensed text-xl font-extrabold text-kompass-text">ATHLETE & COMPETITOR DOSSIER CRUD</h3>
                  <p className="text-[11px] font-mono text-kompass-text/50 uppercase mt-1">Manage target profiling profiles database</p>
                </div>
                <button 
                  onClick={handleCreateNewDossier}
                  className="bg-kompass-teal border border-kompass-teal text-kompass-bg px-4 py-1.5 font-condensed text-xs uppercase tracking-widest font-bold hover:bg-transparent hover:text-kompass-teal transition-all"
                >
                  Create New Profile
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Dossier List Panel */}
                <div className="lg:col-span-4 border border-kompass-border bg-[#0B0F16]/30 divide-y divide-kompass-border/30 h-[450px] overflow-y-auto">
                  {dossiers.map(dos => (
                    <button 
                      key={dos.id}
                      onClick={() => handleDossierSelect(dos)}
                      className={`w-full text-left p-4 hover:bg-kompass-cardLight transition-all block ${selectedDossier?.id === dos.id ? "bg-[#00D6C6]/5 border-l-2 border-l-kompass-teal" : ""}`}
                    >
                      <span className="font-sans font-bold text-kompass-text block uppercase tracking-wide text-xs">{dos.name}</span>
                      <span className="text-[9px] font-mono text-kompass-text/45 block mt-1">{dos.country} / {dos.weight}</span>
                    </button>
                  ))}
                </div>

                {/* Dossier Editor Form */}
                <div className="lg:col-span-8 bg-[#0B0F16]/30 border border-kompass-border p-6 text-left relative">
                  <div className="absolute top-2 right-2 flex gap-2">
                    {selectedDossier?.id && (
                      <button 
                        onClick={() => handleDeleteDossier(selectedDossier.id)}
                        className="border border-intel-orange text-intel-orange hover:bg-intel-orange hover:text-[#0B0F16] px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest transition-all"
                      >
                        Delete Profile
                      </button>
                    )}
                    <span className="text-[8px] font-mono text-kompass-text/30 px-2 py-0.5 border border-kompass-border/30 uppercase">
                      {selectedDossier?.id ? "EDITING MODE" : "NEW RECORD"}
                    </span>
                  </div>

                  <form onSubmit={handleSaveDossier} className="space-y-4">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Athlete Name */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-condensed text-[10px] uppercase tracking-wider text-kompass-teal font-extrabold">
                          ATHLETE NAME *
                        </label>
                        <input 
                          type="text"
                          required
                          value={dossierForm.name}
                          onChange={(e) => setDossierForm(prev => ({ ...prev, name: e.target.value }))}
                          className="border border-kompass-border bg-[#0B0F16] px-3 py-2 text-xs text-[#E6E6E6] focus:border-kompass-teal focus:outline-none rounded-none font-sans"
                        />
                      </div>

                      {/* Country */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-condensed text-[10px] uppercase tracking-wider text-kompass-teal font-extrabold">
                          COUNTRY *
                        </label>
                        <input 
                          type="text"
                          required
                          value={dossierForm.country}
                          onChange={(e) => setDossierForm(prev => ({ ...prev, country: e.target.value }))}
                          className="border border-kompass-border bg-[#0B0F16] px-3 py-2 text-xs text-[#E6E6E6] focus:border-kompass-teal focus:outline-none rounded-none font-sans"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Weight Category */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-condensed text-[10px] uppercase tracking-wider text-kompass-text/70">
                          WEIGHT CATEGORY *
                        </label>
                        <input 
                          type="text"
                          required
                          value={dossierForm.weight}
                          onChange={(e) => setDossierForm(prev => ({ ...prev, weight: e.target.value }))}
                          className="border border-kompass-border bg-[#0B0F16] px-3 py-2 text-xs text-[#E6E6E6] focus:border-kompass-teal focus:outline-none rounded-none font-sans"
                          placeholder="e.g. Male Kumite -75kg"
                        />
                      </div>

                      {/* Tactical Style */}
                      <div className="flex flex-col gap-1.5">
                        <label className="font-condensed text-[10px] uppercase tracking-wider text-kompass-text/70">
                          TACTICAL COMBAT STYLE
                        </label>
                        <input 
                          type="text"
                          value={dossierForm.style}
                          onChange={(e) => setDossierForm(prev => ({ ...prev, style: e.target.value }))}
                          className="border border-kompass-border bg-[#0B0F16] px-3 py-2 text-xs text-[#E6E6E6] focus:border-kompass-teal focus:outline-none rounded-none font-sans"
                          placeholder="e.g. Counter-Striker"
                        />
                      </div>
                    </div>

                    {/* Strengths */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-condensed text-[10px] uppercase tracking-wider text-kompass-text/70">
                        VERIFIED STRENGTHS
                      </label>
                      <textarea 
                        rows={2}
                        value={dossierForm.strengths}
                        onChange={(e) => setDossierForm(prev => ({ ...prev, strengths: e.target.value }))}
                        className="border border-kompass-border bg-[#0B0F16] px-3 py-2 text-xs text-[#E6E6E6] focus:border-kompass-teal focus:outline-none rounded-none resize-none font-sans"
                        placeholder="Core strengths and high scoring efficiency parameters..."
                      />
                    </div>

                    {/* Vulnerabilities / Tells */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-condensed text-[10px] uppercase tracking-wider text-kompass-text/70">
                        VERIFIED VULNERABILITIES & PHYSICAL TELLS
                      </label>
                      <textarea 
                        rows={2}
                        value={dossierForm.vulnerabilities}
                        onChange={(e) => setDossierForm(prev => ({ ...prev, vulnerabilities: e.target.value }))}
                        className="border border-kompass-border bg-[#0B0F16] px-3 py-2 text-xs text-[#E6E6E6] focus:border-kompass-teal focus:outline-none rounded-none resize-none font-sans"
                        placeholder="Shoulder drop, gaze tells, stance alignment indices..."
                      />
                    </div>

                    {/* First-move tendencies */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-condensed text-[10px] uppercase tracking-wider text-kompass-text/70">
                        FIRST-MOVE TENDENCIES & DANGER TIMES
                      </label>
                      <textarea 
                        rows={2}
                        value={dossierForm.tendencies}
                        onChange={(e) => setDossierForm(prev => ({ ...prev, tendencies: e.target.value }))}
                        className="border border-kompass-border bg-[#0B0F16] px-3 py-2 text-xs text-[#E6E6E6] focus:border-kompass-teal focus:outline-none rounded-none resize-none font-sans"
                        placeholder="Action vectors, final 30 seconds behaviors..."
                      />
                    </div>

                    {dossierMsg && (
                      <div className="p-3 bg-intel-green/10 border border-intel-green/20 text-intel-green font-mono text-[10px]">
                        {dossierMsg}
                      </div>
                    )}

                    <button 
                      type="submit"
                      className="bg-kompass-teal border border-kompass-teal text-kompass-bg px-6 py-2 font-condensed text-xs uppercase tracking-widest font-bold hover:bg-transparent hover:text-kompass-teal transition-all"
                    >
                      SECURE PROFILE
                    </button>

                  </form>
                </div>

              </div>
            </div>
          )}

        </div>

      </main>

      {/* Footer copyright */}
      <footer className="border-t border-kompass-border bg-[#111722]/50 py-6 text-center text-[10px] text-kompass-text/40">
        &copy; 2026 KOMPASS COMMAND PORTAL. ALL RIGHTS RESERVED. SECURE CHANNEL.
      </footer>

    </div>
  );
}
