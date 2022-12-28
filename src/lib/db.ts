import { createClient } from '@supabase/auth-helpers-sveltekit';
import { env } from '$env/dynamic/public';
// or use the static env
// import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

export const supabaseClient = createClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_KEY);

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
