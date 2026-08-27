"use client";

import React, { useState, useEffect } from "react";
import { Lead, getLeads, updateLeadStatus } from "@/lib/db";

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const loadLeads = async () => {
    try {
      const data = await getLeads();
      setLeads(data);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to retrieve leads logs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

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

  if (loading) {
    return (
      <div className="py-20 text-center font-mono text-xs text-kompass-teal animate-pulse">
        CONNECTING SECURE LEADS FEED...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-kompass-border/30 pb-4 gap-4">
        <div className="text-left">
          <h2 className="font-condensed text-xl font-extrabold text-[#E6E6E6] uppercase tracking-wider">
            Leads Intake System
          </h2>
          <p className="text-xs text-kompass-text/60 mt-1 uppercase font-mono">
            Logs of WKF access consultation requests
          </p>
        </div>
        <button 
          onClick={exportLeadsToCSV}
          className="bg-kompass-teal border border-kompass-teal text-kompass-bg px-4 py-2 font-condensed text-xs uppercase tracking-widest font-bold hover:bg-transparent hover:text-kompass-teal transition-all"
        >
          Export CSV
        </button>
      </div>

      {errorMsg && (
        <div className="p-3 bg-intel-orange/10 border border-intel-orange/20 text-intel-orange font-mono text-[10px] uppercase">
          {errorMsg}
        </div>
      )}

      {leads.length === 0 ? (
        <div className="py-20 text-center font-mono text-xs text-kompass-text/45 uppercase">
          No active inquiries received.
        </div>
      ) : (
        <div className="overflow-x-auto border border-kompass-border/30 bg-[#0B0F16]/30">
          <table className="w-full text-left font-mono text-xs text-[#E6E6E6]">
            <thead>
              <tr className="border-b border-kompass-border/30 bg-[#0B0F16]/65 text-kompass-text/50">
                <th className="p-3 font-semibold uppercase">Athlete / Lead</th>
                <th className="p-3 font-semibold uppercase">Contact</th>
                <th className="p-3 font-semibold uppercase">Role</th>
                <th className="p-3 font-semibold uppercase">Weight Category</th>
                <th className="p-3 font-semibold uppercase">Notes</th>
                <th className="p-3 font-semibold uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-kompass-border/20">
              {leads.map((l) => (
                <tr key={l.id} className="hover:bg-[#1e293b]/20 transition-colors">
                  <td className="p-3 text-left">
                    <span className="font-sans font-bold text-kompass-text block">{l.name}</span>
                    <span className="text-[9px] text-kompass-text/40">{new Date(l.created_at).toLocaleString()}</span>
                  </td>
                  <td className="p-3 text-left">{l.contact}</td>
                  <td className="p-3 text-left text-[10px] uppercase font-bold text-kompass-teal">{l.role}</td>
                  <td className="p-3 text-left">{l.weight}</td>
                  <td className="p-3 text-left max-w-[200px] truncate hover:text-clip hover:whitespace-normal font-sans text-kompass-text/75">{l.notes}</td>
                  <td className="p-3 text-left">
                    <select 
                      value={l.status}
                      onChange={(e) => handleStatusChange(l.id, e.target.value as Lead["status"])}
                      className={`border bg-[#0B0F16] px-2 py-1 text-[10px] font-bold uppercase rounded-none focus:outline-none cursor-pointer ${
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
  );
}
