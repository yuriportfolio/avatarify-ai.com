// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from 'https://deno.land/std@0.131.0/http/server.ts';
import { User } from 'https://esm.sh/v100/@supabase/supabase-js@2.2.2/dist/module/index';
/*
import Stripe from 'https://esm.sh/stripe@11.5.0?target=deno&no-check';
//*/
import { Stripe } from 'npm:stripe';
//*/
import { getSupabaseClientAdmin } from '../_shared/supabase.ts';

const stripe = new Stripe.Stripe(Deno.env.get('STRIPE_API_KEY')!, { apiVersion: '2022-11-15' });

// This is needed in order to use the Web Crypto API in Deno.
const cryptoProvider = Stripe.createSubtleCryptoProvider();

serve(async (req) => {
	console.log('Called');
	const signature = req.headers.get('stripe-signature') ?? '';

	try {
		const event = await stripe.webhooks.constructEventAsync(
			await req.text(),
			signature,
			Deno.env.get('STRIPE_ENDPOINT_SECRET')!,
			undefined,
			cryptoProvider
		);
		// Handle the event
		console.log('Event type: ', event.type);
		switch (event.type) {
			case 'checkout.session.completed': {
				const session = event.data.object as Stripe.Checkout.Session;
				const client_reference_id = session.client_reference_id;
				const email = session.customer_email;
				console.log('session: ', session);
				const supabaseClientAdmin = getSupabaseClientAdmin();
				if (client_reference_id || email) {
					let user: User;

					if (client_reference_id) {
						const { data, error } = await supabaseClientAdmin.auth.admin.getUserById(
							client_reference_id
						);
						if (error) {
							throw error;
						}
						user = data.user;
					} else if (email) {
						const { data, error } = await supabaseClientAdmin.auth.admin.inviteUserByEmail(email);
						if (error) {
							throw error;
						}
						user = data.user;
					}

					if (user) {
						const { error: errorUpsert } = await supabaseClientAdmin
							.from('user_info')
							.upsert({ id: user.id, paid: true });

						if (errorUpsert) {
							throw errorUpsert;
						}
					} else {
						throw new Error(`User not found: ref_id ${client_reference_id}, email:${email}`);
					}
				} else {
					throw new Error('Missing reference id and email');
				}

				// Then define and call a function to handle the event checkout.session.completed
				break;
			}
			// ... handle other event types
			default:
				console.log(`Unhandled event type ${event.type}`);
		}
	} catch (err) {
		console.error(err);
		return new Response(`Webhook Error: ${err.message}`, {
			status: 400
		});
	}

	return new Response(JSON.stringify({ message: 'Generation launched' }), {
		headers: { 'Content-Type': 'application/json' },
		status: 200
	});
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
