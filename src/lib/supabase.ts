import { createClient } from "@supabase/supabase-js";

// Untyped Supabase client for blog tables (not in generated types yet)
export const supabaseBlog = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
