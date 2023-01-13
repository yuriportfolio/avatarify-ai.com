import { createClient } from '@supabase/auth-helpers-sveltekit';
// or use the static env
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from '$env/static/public';
import type { TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit/dist/types';
import type { Database } from './supabase-types';

export const supabaseClient = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);

export function handleError<TError extends { message: string }>({
	error
}:
	| {
			error: null;
	  }
	| {
			error: TError;
	  }) {
	if (error) {
		throw new Error(error.message, {
			cause: error
		});
	}
}
export function handleErrorAndGetData<TData, TError extends { message: string }>({
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
	if (error) {
		throw new Error(error.message, {
			cause: error
		});
	} else if (data) {
		return data;
	} else {
		throw new Error('Missig db data');
	}
}

export const getUserInfo = async () =>
	(await supabaseClient.from('user_info').select('*', { count: 'exact' }).single()).data;

export const getAdminUserInfo = async (userID: string, client: TypedSupabaseClient) =>
	handleErrorAndGetData(
		await client.from('user_info').select('*', { count: 'exact' }).eq('id', userID).single()
	);

export const checkUserPaid = async () => !!(await getUserInfo())?.paid;

export const checkUserInTraining = async () => !!(await getUserInfo())?.in_training;

export const checkUserTrained = async () => !!(await getUserInfo())?.trained;

export const updateAdminUserInfo = async (
	userID: string,
	body: Partial<Database['public']['Tables']['user_info']['Update']>,
	client: TypedSupabaseClient
) => {
	const { count, error } = await client.from('user_info').update(body).eq('id', userID);

	if (error) {
		throw new Error("Can't update user state", { cause: error });
	}
	if (count == 0) {
		throw new Error("Can't find user info");
	}
};
