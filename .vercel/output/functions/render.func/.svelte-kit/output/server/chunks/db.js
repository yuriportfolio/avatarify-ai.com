import { createClient } from "@supabase/auth-helpers-sveltekit";
import { e as env } from "./env-public.js";
const supabaseClient = createClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_KEY, {});
export {
  supabaseClient as s
};
