<script lang="ts">
	import { browser } from '$app/environment';
	import { stripe } from '$lib/stripe';
	import { onMount } from 'svelte';

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
				]
			});
		}
	});
</script>

<article class="prose container max-w-3xl mx-auto text-center my-16">
	<h1>Start the payment process</h1>
	<p>Please wait while we redirect you to Stripe for payment...</p>
	<progress class="progress" />
</article>
