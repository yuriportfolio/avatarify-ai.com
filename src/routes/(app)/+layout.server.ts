// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types';
import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import { supabaseClient } from '$lib/db';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async (event) => {
	if ((await supabaseClient.from('user_info').select('').eq('paid', true)).count != 1) {
		throw redirect(303, '/checkout');
	}
	return {
		session: await getServerSession(event)
	};
};
