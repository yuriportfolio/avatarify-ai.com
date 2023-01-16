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
		content="Create personalized avatars with Avatarify AI's SaaS service using stable diffusion and AI. Generate up to 100 profile pictures with different themes."
	/>
	<meta
		name="keywords"
		content="Avatarify AI, SaaS service, stable diffusion, Profile pictures, Avatar, Artificial Intelligence, AI model, personalized profile pictures, themes"
	/>
	<meta name="author" content="Pavanello Emanuele" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<meta property="og:title" content="Avatarify AI" />
	<meta
		property="og:description"
		content="Create personalized avatars with Avatarify AI's SaaS service using stable diffusion and AI. Generate up to 100 profile pictures with different themes."
	/>

	<!-- Twitter Card data -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="https://twitter.com/e_pavanello" />
	<meta name="twitter:title" content="Avatarify AI" />
	<meta
		name="twitter:description"
		content="Create personalized avatars with Avatarify AI's SaaS service using stable diffusion and AI. Generate up to 100 profile pictures with different themes."
	/>
	<meta name="twitter:creator" content="@e_pavanello" />
	<meta name="twitter:image:src" content="https://avatarify-ai.com/og.jpg" />
	<!-- Open Graph data -->
	<meta property="og:title" content="Avatarify AI" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://avatarify-ai.com" />
	<meta property="og:image" content="https://avatarify-ai.com/og.jpg" />
	<meta property="og:site_name" content="Avatarify AI" />
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
