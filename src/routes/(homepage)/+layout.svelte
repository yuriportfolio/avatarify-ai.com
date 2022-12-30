<script lang="ts">
	import '../../app.css';
	import { supabaseClient } from '$lib/db';
	import { error, removeError } from '$lib/utilities';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import Header from '$lib/layout/Header.svelte';
	import Footer from '$lib/layout/Footer.svelte';
	import Hero from '$lib/layout/Hero.svelte';
	import Alert from '$lib/components/Alert.svelte';
	import { beforeNavigate } from '$app/navigation';

	beforeNavigate(() => {
		removeError();
	});

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<div class="min-h-screen bg-gray-100 flex flex-col">
	<div class="w-full flex-1">
		<Header />

		<div class="h-full w-full flex flex-col justify-center sm:pt-4 pb-4">
			<Hero />
			{#if $error}
				<div class="max-w-xl mx-auto mt-8 -mb-8">
					<Alert type="error" on:close={() => removeError()}>{$error}</Alert>
				</div>
			{/if}
			<slot />
		</div>
	</div>
	<Footer />
</div>
