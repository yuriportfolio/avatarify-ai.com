// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types';
import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import { supabaseClient } from '$lib/db';

export const load: LayoutServerLoad = async (event) => {
	const session = await getServerSession(event);
	if (session) {
		const { data } = await supabaseClient.auth.setSession({
			access_token: session.access_token,
			refresh_token: session.refresh_token
		});
	}
	// TODO set session 
	console.log('1', await supabaseClient.auth.getSession());
	return {
		session
	};
};
