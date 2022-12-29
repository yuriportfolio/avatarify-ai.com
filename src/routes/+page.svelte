<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import { stripe } from '$lib/stripe';

	async function checkout() {
		stripe?.redirectToCheckout({
			successUrl: 'http://127.0.0.1:5173/payment_success?session_id={CHECKOUT_SESSION_ID}',
			cancelUrl: 'http://127.0.0.1:5173/payment_cancel',
			mode: 'payment',
			lineItems: [
				{
					price: 'price_1MK2tvBlbhyeaEyqRQmMr8RI',
					quantity: 1
				}
			]
		});
	}
</script>

{#if $page.data.session}
	<Button size="small" type="button" link="/app">Go to the app</Button>
{:else}
	<Button size="small" type="button" on:click={checkout}>Start generating images</Button>
{/if}
