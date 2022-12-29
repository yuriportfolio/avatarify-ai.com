// src/routes/+layout.ts
import type { LayoutLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';

export const load: LayoutLoad = async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (
		(await supabaseClient.from('user_info').select('*', { count: 'exact' }).eq('paid', true))
			.count != 1
	) {
		throw redirect(303, '/checkout');
	}
	return { session };
};
