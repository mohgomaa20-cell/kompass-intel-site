import { supabase, isSupabaseConfigured } from "./supabase";

export async function signIn(email: string, authKey: string): Promise<{ success: boolean; error?: string }> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: authKey
    });
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  }

  // Fallback
  const masterEmail = "admin@kompass-analysis.com";
  const masterKey = process.env.NEXT_PUBLIC_ADMIN_MASTER_KEY || "sente2026!";
  if (email === masterEmail && authKey === masterKey) {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("kompass_admin_session", "active");
    }
    return { success: true };
  }
  return { success: false, error: "ACCESS DENIED: INVALID DECRYPTION AUTH KEY" };
}

export async function checkSession(): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  }

  if (typeof window !== "undefined") {
    return sessionStorage.getItem("kompass_admin_session") === "active";
  }
  return false;
}

export async function signOutUser(): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    await supabase.auth.signOut();
  }
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("kompass_admin_session");
  }
}
