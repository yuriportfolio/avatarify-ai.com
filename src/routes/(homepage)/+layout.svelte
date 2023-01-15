<script lang="ts">
	import '../../app.css';
	import { supabaseClient } from '$lib/db';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import Header from '$lib/layout/Header.svelte';
	import Footer from '$lib/layout/Footer.svelte';
	import Hero from '$lib/layout/Hero.svelte';
	import MessagesQueue from '$lib/components/MessagesQueue.svelte';

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

<svelte:head>
	<title>Avatarify AI</title>
	<meta
		name="description"
		content="Avatarify AI is a SaaS service that uses stable diffusion and Artificial Intelligence to generate an AI model trained on your photos. Create up to 100 personalized profile pictures with various themes available"
	/>
	<meta
		name="keywords"
		content="Avatarify AI, SaaS service, stable diffusion, Profile pictures, Avatar, Artificial Intelligence, AI model, personalized profile pictures, themes"
	/>
	<meta name="author" content="Pavanello Emanuele" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<div class="min-h-screen bg-gray-100 flex flex-col">
	<div class="w-full flex-1">
		<Header />

		<div class="h-full w-full flex flex-col justify-center sm:pt-4 pb-4">
			<Hero />
			<slot />
			<MessagesQueue />
		</div>
	</div>
	<Footer />
</div>
