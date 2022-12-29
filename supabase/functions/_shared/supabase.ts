import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.2.2';
import { Database } from './supabase-types.ts';

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

export const getSupabaseClient = (authorization: string) =>
	createClient<Database>(
		Deno.env.get('SUPABASE_URL') ?? '',
		Deno.env.get('SUPABASE_ANON_KEY') ?? '',
		{ global: { headers: { Authorization: authorization } } }
	);

export const getSupabaseClientAdmin = () =>
	createClient<Database>(
		Deno.env.get('SUPABASE_URL') ?? '',
		Deno.env.get('SUPABASE_SERVICE_ROLE') ?? ''
	);
