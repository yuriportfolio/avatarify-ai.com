import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { r as redirect } from "../../../chunks/index2.js";
const load = async (event) => {
  const { session, supabaseClient } = await getSupabase(event);
  if ((await supabaseClient.from("user_info").select("*", { count: "exact" }).eq("paid", true)).count != 1) {
    throw redirect(303, "/checkout");
  }
  return { session };
};
export {
  load
};
