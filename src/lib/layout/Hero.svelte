<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
</script>

<div
	class="hero h-[40vh] w-full"
	style="background-image: url('/avatars/man (7).jpeg'); background-position: center 50%;"
>
	<div class="hero-overlay bg-black bg-opacity-70" />
	<div class="hero-content text-center text-neutral-content">
		<div class="max-w-md flex flex-col gap-4 items-center">
			<!-- <h1 class="mb-5 text-3xl font-bold">AI-generated profile picture.</h1> -->
			<h1 class="mb-5 text-3xl font-bold">AI-generated <span class="">avatars</span>.</h1>
			<p class="mb-5">
				Elevate your visual content with our AI-powered image generation service.
				<!-- Create unique and
							high-quality graphics with ease and stand out in the online market. -->
			</p>
			<!-- <p class="mb-5">Unleash the power of AI on your images. Simple, unique, professional.</p> -->
			{#if $page.data.session}
				<Button type="button" link="/app" animated endIcon="arrow_forward">Go to the app</Button>
			{:else}
				<!-- <Button type="button" on:click={checkout} gradient>Start generating images</Button> -->
				<Button type="button" link="/login" animated endIcon="arrow_forward"
					>Start generating images</Button
				>
			{/if}
		</div>
	</div>
</div>
