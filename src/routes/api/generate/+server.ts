import type { RequestHandler } from './$types';
import { error as svelteError, json } from '@sveltejs/kit';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { AMQPClient } from '@cloudamqp/amqp-client';
import {
	PRIVATE_RABBITMQ_HOST,
	PRIVATE_RABBITMQ_PASSWORD,
	PRIVATE_RABBITMQ_PORT,
	PRIVATE_RABBITMQ_PROTOCOL,
	PRIVATE_RABBITMQ_USERNAME
} from '$env/static/private';
import { getSupabaseClient } from '$lib/db.server';
import { checkUserPaid } from '$lib/db';
import { getNegativePrompt, getPrompt } from '$lib/prompts.server';

export const POST: RequestHandler = async (event) => {
	try {
		const body = await event.request.json();
		const theme = body.theme;
		let prompt = body.prompt;
		let seed = body.seed;
		let negativePrompt = body.negativePrompt;
		if (!theme && !prompt) {
			throw new Error('Theme not selected');
		}
		const { session } = await getSupabase(event);

		if (!session) {
			throw new Error('Session not valid');
		}
		const supabaseClient = await getSupabaseClient({
			access_token: session.access_token,
			refresh_token: session.refresh_token
		});

		if (!(await checkUserPaid(supabaseClient))) {
			throw new Error('Payment required');
		}

		const user = session.user;

		const url = `${PRIVATE_RABBITMQ_PROTOCOL}://${encodeURIComponent(
			PRIVATE_RABBITMQ_USERNAME
		)}:${encodeURIComponent(
			PRIVATE_RABBITMQ_PASSWORD
		)}@${PRIVATE_RABBITMQ_HOST}:${PRIVATE_RABBITMQ_PORT}/`;

		const amqp = new AMQPClient(url);
		const conn = await amqp.connect();
		const ch = await conn.channel();
		const q = await ch.queue('generate_photos');

		if (!prompt) {
			prompt = getPrompt(theme);
		}
		if (!negativePrompt) {
			negativePrompt = getNegativePrompt(theme);
		}
		console.log(prompt, seed);
		await q.publish(
			JSON.stringify({
				theme,
				prompt,
				negative_prompt: negativePrompt,
				seed: parseInt(seed) || null
			}),
			{
				contentType: 'application/json',
				headers: { session: user.id }
			}
		);
		await conn.close();

		return json({ done: true });
	} catch (error) {
		console.error(error);
		if (error instanceof Error) {
			console.error(error.cause);
			throw svelteError(500, { message: error.message });
		}
		throw svelteError(500);
	}
};
