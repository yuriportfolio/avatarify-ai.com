<script lang="ts">
	import { browser } from '$app/environment';
	import { stripe } from '$lib/stripe';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	onMount(() => {
		if (browser) {
			stripe?.redirectToCheckout({
				successUrl: 'http://127.0.0.1:5173/payment_success?session_id={CHECKOUT_SESSION_ID}',
				cancelUrl: 'http://127.0.0.1:5173/',
				mode: 'payment',
				lineItems: [
					{
						price: 'price_1MK2tvBlbhyeaEyqRQmMr8RI',
						quantity: 1
					}
				],
				customerEmail: $page.data.session?.user.email,
				clientReferenceId: $page.data.session?.user.id
			});
		}
	});
</script>

<article class="prose px-2 lg:prose-xl container max-w-3xl mx-auto text-center my-16">
	<h2>Start the payment process</h2>
	<p>Please wait while we redirect you to Stripe for payment...</p>
	<progress class="progress" />
</article>
