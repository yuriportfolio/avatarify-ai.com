import type { RequestHandler } from './$types';
import { error as svelteError, json } from '@sveltejs/kit';

import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import { AMQPClient } from '@cloudamqp/amqp-client';
import {
	PRIVATE_RABBITMQ_HOST,
	PRIVATE_RABBITMQ_PASSWORD,
	PRIVATE_RABBITMQ_PORT,
	PRIVATE_RABBITMQ_PROTOCOL,
	PRIVATE_RABBITMQ_USERNAME
} from '$env/static/private';
import { getSupabaseClient, supabaseClientAdmin } from '$lib/db.server';
import { checkUserPaid } from '$lib/db';

export const POST: RequestHandler = async (event) => {
	try {
		const session = await getServerSession(event as any);

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
		console.log(url);

		const amqp = new AMQPClient(url);
		const conn = await amqp.connect();
		const ch = await conn.channel();
		const q = await ch.queue('train_photos');

		const { data: photos, error } = await supabaseClientAdmin.storage
			.from('photos-for-training')
			.list(user.id);

		if (error) {
			throw new Error("Can't list photos", { cause: error });
		}

		const listToSend: { base64: string; filename: string }[] = [];

		if (photos.length == 0 || photos.length > 100) {
			throw new Error('Wrong photos number');
		}

		for (const image of photos) {
			const { data: photo, error } = await supabaseClientAdmin.storage
				.from('photos-for-training')
				.download(user.id + '/' + image.name);
			if (error) {
				throw new Error("Can't download photo", { cause: error });
			}
			if (photo) {
				listToSend.push({
					base64: Buffer.from(await photo.text()).toString('base64'),
					filename: image.name
				});
			}
		}
		await q.publish(JSON.stringify(listToSend), {
			contentType: 'application/json',
			headers: { session: user.id }
		});
		await conn.close();

		const { count, error: updateError } = await supabaseClientAdmin
			.from('user_info')
			.update({
				trained: true
			})
			.eq('id', user.id);
		if (updateError) {
			throw new Error("Can't update user state", { cause: updateError });
		}
		if (count == 0) {
			throw new Error("Can't find user info");
		}

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
