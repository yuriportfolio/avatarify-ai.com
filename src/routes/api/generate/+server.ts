import type { RequestHandler } from './$types';
import { error as svelteError, json } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { supabaseClientAdmin } from '$lib/db.server';
import { getAdminUserInfo, handleError } from '$lib/db';
import { getNegativePrompt, getPrompt, getSubjectName } from '$lib/prompts.server';
import { PUBLIC_ENV } from '$env/static/public';
import { Themes } from '$lib/themes';
import { predict } from '$lib/replicate.server';

interface GeneratePayload {
	theme: string | undefined;
	prompt: string | undefined;
	seed: string | undefined;
}

export const POST: RequestHandler = async (event) => {
	try {
		const body = (await event.request.json()) as GeneratePayload;
		let { theme, prompt, seed } = body;

		if (prompt) {
			if (prompt.indexOf('SUBJECT') > -1) {
				prompt = prompt.replaceAll('SUBJECT', getSubjectName());
			}
		} else if (theme) {
			if (!(theme in Themes)) {
				throw new Error('Theme not valid');
			}
			prompt = getPrompt(theme as keyof typeof Themes);
		} else {
			throw new Error('Theme not selected');
		}
		const { session } = await getSupabase(event);

		if (!session) {
			throw new Error('Session not valid');
		}

		const user_info = await getAdminUserInfo(session.user.id, supabaseClientAdmin);

		if (!user_info.paid) {
			throw new Error('Payment required');
		}

		if (user_info.in_training || !user_info.trained || !user_info.replicate_version_id) {
			throw new Error('Model not trained');
		}

		const negativePrompt = getNegativePrompt();
		console.log({ prompt, negativePrompt, seed });

		const predictResponse = await predict(
			user_info.replicate_version_id,
			prompt,
			negativePrompt,
			seed
		);
		console.log('Predict response', predictResponse);

		supabaseClientAdmin.from('predictions').insert({
			id: predictResponse.id,
			user_id: session.user.id
		});

		if (PUBLIC_ENV == 'DEV') {
			return json({ done: true, data: { theme, prompt, negative_prompt: negativePrompt, seed } });
		} else {
			return json({ done: true });
		}
	} catch (error) {
		console.error(error);
		if (error instanceof Error) {
			console.error(error.cause);
			throw svelteError(500, { message: error.message });
		}
		throw svelteError(500);
	}
};
