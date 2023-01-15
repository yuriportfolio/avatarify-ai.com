<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
</script>

<div class="sm:px-4 w-full">
	<div
		class="navbar bg-base-100 drop-shadow-xl sm:rounded-xl mx-auto container max-w-6xl sm:mt-4 w-full"
	>
		<div class="navbar-start">
			<Button ghost link="/" class="text-xl text-gradient font-bold" normalCase>Avatarify AI</Button
			>
		</div>
		<div class="navbar-end gap-2">
			{#if $page.data.session}
				<div class="dropdown dropdown-end">
					<div class="tooltip tooltip-left" data-tip={$page.data.session.user.email}>
						<Button type="button" ghost icon="person" circle />
					</div>
					<ul class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
						<Button link="/logout" ghost data-sveltekit-preload-data="off">Logout</Button>
					</ul>
				</div>
				{#if !$page.url.pathname.startsWith('/app')}
					<Button type="button" link="/app" endIcon="arrow_right">Launch</Button>
				{/if}
			{:else}
				<Button type="button" link="/login" endIcon="arrow_right">Start now</Button>
			{/if}
			<!-- <Button circle icon="search" ghost />
            <Button circle icon="notification_important" ghost /> -->
		</div>
	</div>
</div>
