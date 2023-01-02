import { createClient } from '@supabase/auth-helpers-sveltekit';
// or use the static env
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from '$env/static/public';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit/dist/types';

export const supabaseClient = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);

export function handleError<TData, TError extends { message: string }>({
	data,
	error
}:
	| {
			data: TData;
			error: null;
	  }
	| {
			data: null;
			error: TError;
	  }) {
	if (data) {
		return data;
	} else {
		throw error?.message || '';
	}
}

export const checkUserPaid = async (customClient?: TypedSupabaseClient) =>
	(
		await (customClient ? customClient : supabaseClient)
			.from('user_info')
			.select('*', { count: 'exact' })
			.eq('paid', true)
	).count == 1;

export const checkUserInTraining = async (customClient?: TypedSupabaseClient) =>
	(
		await (customClient ? customClient : supabaseClient)
			.from('user_info')
			.select('*', { count: 'exact' })
			.eq('in_training', true)
	).count == 1;

export const checkUserTrained = async (customClient?: TypedSupabaseClient) =>
	(
		await (customClient ? customClient : supabaseClient)
			.from('user_info')
			.select('*', { count: 'exact' })
			.eq('trained', true)
	).count == 1;
