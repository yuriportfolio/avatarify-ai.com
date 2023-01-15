<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
</script>

<div class="sm:px-4 w-full">
	<div
		class="navbar bg-base-100 drop-shadow-xl sm:rounded-xl mx-auto container max-w-6xl sm:mt-4 w-full"
	>
		<div class="navbar-start">
			<Button ghost link="/" class="text-xl text-gradient font-bold" normalCase>
				<img src="logo.png" class="w-60" alt="Avatarify AI" />
			</Button>
		</div>
		<div class="navbar-end gap-2">
			{#if $page.data.session}
				<Button link="/login" href="/logout" ghost data-sveltekit-preload-data="off">Logout</Button>
				<Button type="button" link="/app" endIcon="arrow_right">Launch</Button>
			{:else}
				<Button link="/login" href="/login" ghost>Login</Button>
				<Button type="button" link="/checkout" endIcon="arrow_right">Start now</Button>
			{/if}
			<!-- <Button circle icon="search" ghost />
            <Button circle icon="notification_important" ghost /> -->
		</div>
	</div>
</div>
