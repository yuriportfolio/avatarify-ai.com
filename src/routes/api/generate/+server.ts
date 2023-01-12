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
import { supabaseClientAdmin } from '$lib/db.server';
import { getAdminUserInfo } from '$lib/db';
import { getNegativePrompt, getPrompt, getSubjectName } from '$lib/prompts.server';
import { PUBLIC_ENV } from '$env/static/public';
import { generatorIsAwake, startGenerator } from '$lib/aws.server';

export const POST: RequestHandler = async (event) => {
	try {
		const body = await event.request.json();
		const theme = body.theme;
		let prompt: string | undefined = body.prompt;
		const seed: string | undefined = body.seed;
		let negativePrompt = body.negativePrompt;
		if (!theme && !prompt) {
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

		if (!(await generatorIsAwake())) {
			await startGenerator();
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
		} else {
			if (prompt.indexOf('SUBJECT') > -1) {
				prompt.replaceAll('SUBJECT', getSubjectName());
			}
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
				seed: parseInt(seed || '') || null
			}),
			{
				contentType: 'application/json',
				headers: { session: user.id }
			}
		);
		await conn.close();

		if (PUBLIC_ENV == 'DEV') {
			return json({ done: true, data: { theme, prompt, negativePrompt, seed } });
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
