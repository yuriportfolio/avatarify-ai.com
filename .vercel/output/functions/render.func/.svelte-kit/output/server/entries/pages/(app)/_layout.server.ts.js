import { getServerSession } from "@supabase/auth-helpers-sveltekit";
import { s as supabaseClient } from "../../../chunks/db.js";
const load = async (event) => {
  const session = await getServerSession(event);
  if (session) {
    await supabaseClient.auth.setSession({
      access_token: session.access_token,
      refresh_token: session.refresh_token
    });
  }
  console.log("1", await supabaseClient.auth.getSession());
  return {
    session
  };
};
export {
  load
};
