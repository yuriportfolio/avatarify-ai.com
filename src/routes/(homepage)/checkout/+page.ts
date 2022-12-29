import type { PageLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = async (event) => {
	const { session, supabaseClient } = await getSupabase(event);
	if (session) {
		if (
			(await supabaseClient.from('user_info').select('*', { count: 'exact' }).eq('paid', true))
				.count == 1
		) {
			throw redirect(303, '/app');
		}
	}
};
