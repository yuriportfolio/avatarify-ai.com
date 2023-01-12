import type { RequestHandler } from './$types';
import { error as svelteError, json } from '@sveltejs/kit';
import type { ReplicateTrainPayload } from '$lib/replicate.server';
import { updateAdminUserInfo } from '$lib/db';
import { supabaseClientAdmin } from '$lib/db.server';

export const POST: RequestHandler = async (event) => {
	try {
		const payload = (await event.request.json()) as ReplicateTrainPayload;
		const userID = event.params.slug;

		if (!userID) {
			throw new Error('ID not valid');
		}

		updateAdminUserInfo(
			userID,
			{
				replicate_version_id: payload.version,
				replicate_train_status: payload.status
			},
			supabaseClientAdmin
		);

		return json({});
	} catch (error) {
		console.error(error);
		if (error instanceof Error) {
			console.error(error.cause);
			throw svelteError(500, { message: error.message });
		}
		throw svelteError(500);
	}
};
