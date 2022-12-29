import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { r as redirect } from "../../../../chunks/index2.js";
const load = async (event) => {
  const { session } = await getSupabase(event);
  if (session) {
    throw redirect(303, "/");
  }
};
export {
  load
};
