<script lang="ts">
	import { supabaseClient } from '$lib/db';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import '../app.css';

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

<div class="min-h-screen bg-gray-100">
	<nav>
		<ul>
			<li>
				<a href="/">Home</a>
			</li>
			{#if $page.data.session}
				<li>
					<a data-sveltekit-preload-data="tap" href="/logout">Logout</a>
				</li>
			{:else}
			<li>
				<a href="/login">Login</a>
			</li>
			<li>
				<a href="/signup">Signup</a>
			</li>
			{/if}
		</ul>
	</nav>
	<div class="h-full flex flex-col justify-center sm:py-12">
		<div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
			<slot />
		</div>
	</div>
</div>
