import { createClient } from "@supabase/supabase-js";

// These are SERVER-SIDE only env vars (no VITE_ prefix)
// Used only in api/ serverless functions — never exposed to browser
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
