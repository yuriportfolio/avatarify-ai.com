// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from 'https://deno.land/std@0.131.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.2.2';
// TODO replace with https://deno.land/x/amqp/mod.ts when pull request fix is merged
import { connect } from 'https://raw.githubusercontent.com/epavanello/deno-amqp/patch-1/mod.ts';

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey'
};

serve(async (req) => {
	// read a text file from storage and print its contents
	// This is needed if you're planning to invoke your function from a browser.
	if (req.method === 'OPTIONS') {
		return new Response('ok', { headers: corsHeaders });
	}

	try {
		const supabaseClient = createClient(
			Deno.env.get('SUPABASE_URL') ?? '',
			Deno.env.get('SUPABASE_ANON_KEY') ?? '',
			// Create client with Auth context of the user that called the function.
			// This way your row-level-security (RLS) policies are applied.
			{ global: { headers: { Authorization: req.headers.get('Authorization')! } } }
		);

		// Now we can get the session or user object
		const {
			data: { user }
		} = await supabaseClient.auth.getUser();
		if (!user) {
			console.error('Missing user');
			throw new Error('Unauthorized');
		}

		console.log('Connect to', Deno.env.get('RABBITMQ_HOST'));

		const connection = await connect({
			hostname: `${Deno.env.get('RABBITMQ_HOST')}`,
			port: parseInt(Deno.env.get('RABBITMQ_PORT') ?? ''),
			username: Deno.env.get('RABBITMQ_USERNAME') ?? '',
			password: Deno.env.get('RABBITMQ_PASSWORD') ?? '',
			tls: true
		});
		const channel = await connection.openChannel();

		const { data: photos, error } = await supabaseClient.storage
			.from('photos-for-training')
			.list(user.id);

		if (error) {
			console.error("Can't list photos");
			throw error;
		}

		const listToSend: { base64: string; filename: string }[] = [];

		for (const image of photos) {
			const { data: photo, error } = await supabaseClient.storage
				.from('photos-for-training')
				.download(user.id + '/' + image.name, {
					/* transform: {
						height: 512,
						width: 512,
						resize: 'contain'
					} */
				});
			if (error) {
				console.error("Can't download photo");
				throw error;
			}
			if (photo) {
				listToSend.push({
					base64: btoa(
						new Uint8Array(await photo.arrayBuffer()).reduce(
							(data, byte) => data + String.fromCharCode(byte),
							''
						)
					),
					filename: image.name
				});
			}
		}
		channel.publish(
			{ routingKey: 'train_photos' },
			{ contentType: 'application/json' },
			new TextEncoder().encode(JSON.stringify(listToSend))
		);

		return new Response(JSON.stringify({ message: 'Ready for training', data: listToSend }), {
			headers: { ...corsHeaders, 'Content-Type': 'application/json' },
			status: 200
		});
	} catch (error) {
		console.error(error);

		return new Response(JSON.stringify({ error: error.message }), {
			headers: { ...corsHeaders, 'Content-Type': 'application/json' },
			status: 500
		});
	}
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
