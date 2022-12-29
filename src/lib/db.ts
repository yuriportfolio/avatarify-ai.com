import { createClient } from '@supabase/auth-helpers-sveltekit';
// or use the static env
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from '$env/static/public';

export const supabaseClient = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY, {});

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
