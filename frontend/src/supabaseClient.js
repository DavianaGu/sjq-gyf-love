// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? null;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? null;

console.log("DEBUG_SUPABASE_ENV -> VITE_SUPABASE_URL:", supabaseUrl);
console.log("DEBUG_SUPABASE_ENV -> VITE_SUPABASE_ANON_KEY present?:", !!supabaseAnonKey);

let supabase = null;
try {
  if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log("DEBUG_SUPABASE -> client created");
  } else {
    console.warn("DEBUG_SUPABASE -> env variables missing, supabase client NOT created");
  }
} catch (e) {
  console.error("DEBUG_SUPABASE -> createClient error", e);
}

export { supabase };