<script lang="ts">
	import { supabaseClient } from '$lib/db';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import '../app.css';
	import Icon from '$lib/components/Icon.svelte';
	import Button from '$lib/components/Button.svelte';

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

<div class="min-h-screen bg-gray-100 p-4">
	<div class="navbar bg-base-100 drop-shadow-xl rounded-xl">
		<div class="navbar-start">
			<div class="dropdown">
				<Button circle icon="menu" tabindex="0" size="normal" ghost />
				<ul class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
					{#if $page.data.session}
						<li>
							<a href="/app">Launch</a>
						</li>
						<li>
							<a data-sveltekit-preload-data="tap" href="/logout">Logout</a>
						</li>
					{:else}
						<li>
							<a href="/login">Login</a>
						</li>
					{/if}
				</ul>
			</div>
		</div>
		<div class="navbar-center">
			<Button ghost link="/" class="normal-case text-xl">Better Avatar</Button>
		</div>
		<div class="navbar-end">
			<Button circle icon="search" ghost />
			<Button circle icon="notification_important" ghost />
		</div>
	</div>

	<div class="h-full flex flex-col justify-center sm:py-12">
		<div class="p-10 xs:p-0 mx-auto">
			<slot />
		</div>
	</div>
</div>
