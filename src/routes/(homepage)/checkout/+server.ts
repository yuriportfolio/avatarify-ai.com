import { PRIVATE_STRIPE_API_KEY } from '$env/static/private';
import { PUBLIC_STRIPE_PRICE_ID } from '$env/static/public';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error as svelteError } from '@sveltejs/kit';

import { Stripe } from 'stripe';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
	try {
		const { session, supabaseClient } = await getSupabase(event);

		if (session) {
			if (
				(await supabaseClient.from('user_info').select('*', { count: 'exact' }).eq('paid', true))
					.count == 1
			) {
				return Response.redirect(`${event.url.origin}/app`, 303);
			}
		}

		const stripe = new Stripe(PRIVATE_STRIPE_API_KEY, {
			apiVersion: '2022-11-15'
		});

		console.log('stripe');

		const stripeSession = await stripe.checkout.sessions.create({
			success_url: `${event.url.origin}/payment_success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${event.url.origin}#cancel_payment`,
			line_items: [
				{
					price: PUBLIC_STRIPE_PRICE_ID,
					quantity: 1
				}
			],
			customer_email: session?.user.email,
			client_reference_id: session?.user.id,
			mode: 'payment',
			allow_promotion_codes: true
		});

		if (stripeSession.url) {
			return Response.redirect(stripeSession.url, 303);
		} else {
			throw new Error('Stripe session not valid', {
				cause: stripeSession
			});
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
