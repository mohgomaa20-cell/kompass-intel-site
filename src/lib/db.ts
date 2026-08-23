import { supabase, isSupabaseConfigured } from "./supabase";

export interface Lead {
  id: string;
  name: string;
  contact: string;
  role: string;
  division: string;
  weight: string;
  notes: string;
  status: "New" | "Contacted" | "Proposal Sent" | "Closed";
  created_at: string;
}

export interface CompetitorProfile {
  id: string;
  name: string;
  country: string;
  weight: string;
  style: string;
  strengths: string;
  vulnerabilities: string;
  tendencies: string;
  created_at?: string;
}

// Initial mock data for fallback
const INITIAL_LEADS: Lead[] = [
  {
    id: "lead-1",
    name: "Malek Gomaa",
    contact: "malek.gomaa@wkf-egypt.org",
    role: "National Team Coach",
    division: "seniors_male",
    weight: "Male Kumite: -75 kg",
    notes: "Requesting full tactical briefing roster for three main rivals prior to World Championships in Budapest.",
    status: "Proposal Sent",
    created_at: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: "lead-2",
    name: "Aisha Al-Sayed",
    contact: "+971 50 123 4567",
    role: "Athlete",
    division: "seniors_female",
    weight: "Female Kumite: -61 kg",
    notes: "Interested in the EDGE match-day card subscription for WKF Premier League Cairo.",
    status: "New",
    created_at: new Date(Date.now() - 36000000).toISOString()
  }
];

const INITIAL_PROFILES: CompetitorProfile[] = [
  {
    id: "profile-1",
    name: "Kenji Sato",
    country: "Japan",
    weight: "Male Kumite -75kg",
    style: "Counter-Striker / Ma-ai Controller",
    strengths: "Chudan Gyaku-Zuki counters (92% accuracy), lateral right escape route.",
    vulnerabilities: "Unconscious lead shoulder drop (220ms window) before Kizami-Zuki; rear heel lift (310ms window) before Gyaku-Zuki.",
    tendencies: "Draws opponents into mid-zone, commits to warning sequences in the final 30 seconds if score is level."
  },
  {
    id: "profile-2",
    name: "Rafael Aghayev",
    country: "Azerbaijan",
    weight: "Male Kumite -75kg",
    style: "In-fighter / Tactical Equalizer",
    strengths: "Elite close-range sweep (Ashi-Barai), rapid head-line Mawashi-Geri hooks.",
    vulnerabilities: "Gaze lock bias right before launching sweep, slight hip rotation drop under double feints.",
    tendencies: "Uses high lateral pressure to trap opponents against boundary line, initiates clinches immediately."
  }
];

// Helper to access localStorage safely
const getStorageItem = (key: string): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(key);
};

const setStorageItem = (key: string, value: string) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, value);
};

/* ============================================================================
   LEADS API
   ============================================================================ */
export async function getLeads(): Promise<Lead[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) return data as Lead[];
    console.error("Supabase leads error:", error);
  }

  // Fallback
  const stored = getStorageItem("kompass_leads");
  if (!stored) {
    setStorageItem("kompass_leads", JSON.stringify(INITIAL_LEADS));
    return INITIAL_LEADS;
  }
  return JSON.parse(stored);
}

export async function saveLead(lead: Omit<Lead, "id" | "status" | "created_at">): Promise<Lead> {
  const newLead: Lead = {
    ...lead,
    id: "lead-" + Math.random().toString(36).substr(2, 9),
    status: "New",
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("leads")
      .insert([newLead])
      .select();
    if (!error && data && data[0]) return data[0] as Lead;
    console.error("Supabase save lead error:", error);
  }

  // Fallback
  const leads = await getLeads();
  leads.unshift(newLead);
  setStorageItem("kompass_leads", JSON.stringify(leads));
  return newLead;
}

export async function updateLeadStatus(id: string, status: Lead["status"]): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from("leads")
      .update({ status })
      .eq("id", id);
    if (!error) return true;
    console.error("Supabase update status error:", error);
  }

  // Fallback
  const leads = await getLeads();
  const index = leads.findIndex((l) => l.id === id);
  if (index !== -1) {
    leads[index].status = status;
    setStorageItem("kompass_leads", JSON.stringify(leads));
    return true;
  }
  return false;
}

/* ============================================================================
   SITE CONTENT OVERRIDES API
   ============================================================================ */
export async function getSiteContentOverrides(): Promise<Record<string, string>> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("site_content")
      .select("key, value");
    if (!error && data) {
      const overrides: Record<string, string> = {};
      data.forEach((item: { key: string; value: string }) => {
        overrides[item.key] = item.value;
      });
      return overrides;
    }
    console.error("Supabase site content error:", error);
  }

  // Fallback
  const stored = getStorageItem("kompass_site_content");
  return stored ? JSON.parse(stored) : {};
}

export async function saveSiteContentOverride(key: string, value: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from("site_content")
      .upsert({ key, value }, { onConflict: "key" });
    if (!error) return true;
    console.error("Supabase save site content error:", error);
  }

  // Fallback
  const overrides = await getSiteContentOverrides();
  overrides[key] = value;
  setStorageItem("kompass_site_content", JSON.stringify(overrides));
  return true;
}

/* ============================================================================
   COMPETITOR DOSSIERS CRUD API
   ============================================================================ */
export async function getCompetitorProfiles(): Promise<CompetitorProfile[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("competitor_profiles")
      .select("*")
      .order("name", { ascending: true });
    if (!error && data) return data as CompetitorProfile[];
    console.error("Supabase profiles error:", error);
  }

  // Fallback
  const stored = getStorageItem("kompass_profiles");
  if (!stored) {
    setStorageItem("kompass_profiles", JSON.stringify(INITIAL_PROFILES));
    return INITIAL_PROFILES;
  }
  return JSON.parse(stored);
}

export async function saveCompetitorProfile(profile: Omit<CompetitorProfile, "id"> & { id?: string }): Promise<CompetitorProfile> {
  const isEdit = !!profile.id;
  const targetProfile: CompetitorProfile = {
    ...profile,
    id: isEdit ? (profile.id as string) : "profile-" + Math.random().toString(36).substr(2, 9),
    created_at: profile.created_at || new Date().toISOString()
  } as CompetitorProfile;

  if (isSupabaseConfigured && supabase) {
    const { data, error } = isEdit
      ? await supabase.from("competitor_profiles").update(targetProfile).eq("id", profile.id).select()
      : await supabase.from("competitor_profiles").insert([targetProfile]).select();
    if (!error && data && data[0]) return data[0] as CompetitorProfile;
    console.error("Supabase profile save error:", error);
  }

  // Fallback
  const profiles = await getCompetitorProfiles();
  if (isEdit) {
    const index = profiles.findIndex((p) => p.id === profile.id);
    if (index !== -1) {
      profiles[index] = targetProfile;
    }
  } else {
    profiles.push(targetProfile);
  }
  setStorageItem("kompass_profiles", JSON.stringify(profiles));
  return targetProfile;
}

export async function deleteCompetitorProfile(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from("competitor_profiles")
      .delete()
      .eq("id", id);
    if (!error) return true;
    console.error("Supabase profile delete error:", error);
  }

  // Fallback
  const profiles = await getCompetitorProfiles();
  const filtered = profiles.filter((p) => p.id !== id);
  setStorageItem("kompass_profiles", JSON.stringify(filtered));
  return true;
}
