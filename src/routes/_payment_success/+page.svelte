<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { stripe } from '$lib/stripe';
	import { onMount } from 'svelte';

	onMount(async () => {
		if (browser) {
			const sessionID = $page.url.searchParams.get('session_id');
		}
	});
</script>

<p>Thank you for your payment! Your transaction has been completed successfully.</p>

<p>
	To complete your registration on our site and begin uploading photos for AI generation, you will
	receive an email with instructions on how to proceed. If you do not receive the email within the
	next hour, please check your spam folder or contact us for assistance.
</p>

<p>
	We appreciate your business and look forward to helping you create high-quality, AI-generated
	images. Thank you for choosing our service.
</p>
