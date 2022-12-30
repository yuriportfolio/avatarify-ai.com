<script lang="ts">
	import { browser } from '$app/environment';
	import { getGtripe } from '$lib/stripe';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { PUBLIC_STRIPE_PRICE_ID } from '$env/static/public';
	import { getBaseUrl } from '$lib/utilities';

	onMount(async () => {
		if (browser) {
			const baseUrl = getBaseUrl();
			(await getGtripe())?.redirectToCheckout({
				successUrl: `${baseUrl}payment_success?session_id={CHECKOUT_SESSION_ID}`,
				cancelUrl: baseUrl,
				mode: 'payment',
				lineItems: [
					{
						price: PUBLIC_STRIPE_PRICE_ID,
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
