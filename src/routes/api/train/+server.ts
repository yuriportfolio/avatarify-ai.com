import type { RequestHandler } from './$types';
import { error as svelteError, json } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { supabaseClientAdmin } from '$lib/db.server';
import { getAdminUserInfo, updateAdminUserInfo } from '$lib/db';
import { PUBLIC_ENV } from '$env/static/public';
import { train } from '$lib/replicate.server';

export const POST: RequestHandler = async (event) => {
	try {
		if (PUBLIC_ENV === 'STAGING') {
			throw new Error("Can't train in staging");
		}

		const body = await event.request.json();
		const instanceClass: string | undefined = body.instance_class;
		if (!instanceClass) {
			throw new Error('Subject not selected');
		}

		const { session } = await getSupabase(event);

		if (!session) {
			throw new Error('Session not valid');
		}
		const user = session.user;

		await updateAdminUserInfo(user.id, { instance_class: instanceClass }, supabaseClientAdmin);

		const userInfo = await getAdminUserInfo(session.user.id, supabaseClientAdmin);

		if (!userInfo.paid) {
			throw new Error('Payment required');
		}
		if (userInfo.in_training || userInfo.trained) {
			throw new Error('Can not train multiple times');
		}

		const trainResult = await train(instanceClass, user);
		console.log('Train result', trainResult);

		await updateAdminUserInfo(
			user.id,
			{ in_training: true, replicate_model_id: trainResult.id },
			supabaseClientAdmin
		);

		return json({ message: '' });
	} catch (error) {
		console.error(error);
		if (error instanceof Error) {
			console.error(error.cause);
			throw svelteError(500, { message: error.message });
		}
		throw svelteError(500);
	}
};
