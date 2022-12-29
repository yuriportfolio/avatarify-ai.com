<script lang="ts">
	import { supabaseClient } from '$lib/db';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import '../app.css';
	import Icon from '$lib/components/Icon.svelte';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';

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

	const themes = [
		'light',
		'dark',
		'cupcake',
		'bumblebee',
		'emerald',
		'corporate',
		'synthwave',
		'retro',
		'cyberpunk',
		'valentine',
		'halloween',
		'garden',
		'forest',
		'aqua',
		'lofi',
		'pastel',
		'fantasy',
		'wireframe',
		'black',
		'luxury',
		'dracula',
		'cmyk',
		'autumn',
		'business',
		'acid',
		'lemonade',
		'night',
		'coffee',
		'winter'
	];
	let theme = 'light';
</script>

<div class="min-h-screen bg-gray-100 flex flex-col" data-theme={theme}>
	<!-- 	<select on:change={(e) => (theme = e.currentTarget.value)}>
		{#each themes as t}
			<option value={t}>{t}</option>
		{/each}
	</select> -->
	<div class="w-full flex-1">
		<div class="navbar bg-base-100 drop-shadow-xl rounded-xl mx-auto container max-w-6xl mt-4">
			<div class="navbar-start">
				<Button ghost link="/" class="text-xl" normalCase>Better Avatar</Button>
			</div>
			<div class="navbar-end gap-2">
				<Button link="/login" href="/login" ghost>Login</Button>
				<Button type="button" link="/checkout" endIcon="arrow_right">Start now</Button>
				<!-- <Button circle icon="search" ghost />
				<Button circle icon="notification_important" ghost /> -->
			</div>
		</div>

		<div class="h-full w-full flex flex-col justify-center py-4">
			<div
				class="hero h-[40vh] w-full"
				style="background-image: url(/avatars/me_1.jpg); background-position: center 50%;"
			>
				<div class="hero-overlay bg-opacity-60" />
				<div class="hero-content text-center text-neutral-content">
					<div class="max-w-md flex flex-col gap-4 items-center">
						<!-- <h1 class="mb-5 text-3xl font-bold">AI-generated profile picture.</h1> -->
						<h1 class="mb-5 text-3xl font-bold">AI-generated avatars.</h1>
						<p class="mb-5">
							Elevate your visual content with our AI-powered image generation service.
							<!-- Create unique and
							high-quality graphics with ease and stand out in the online market. -->
						</p>
						<!-- <p class="mb-5">Unleash the power of AI on your images. Simple, unique, professional.</p> -->
						{#if $page.data.session}
							<Button type="button" link="/app" gradient>Go to the app</Button>
						{:else}
							<!-- <Button type="button" on:click={checkout} gradient>Start generating images</Button> -->
							<Button type="button" link="/checkout" gradient>Start generating images</Button>
						{/if}
					</div>
				</div>
			</div>
			<slot />
		</div>
	</div>
	<footer class="footer footer-center p-10 bg-neutral text-neutral-content rounded">
		<div class="grid grid-flow-col gap-4">
			<a class="link link-hover" href="/">Home</a>
			<a class="link link-hover" href="/login">Login</a>
			<a class="link link-hover" href="/contacts">Contacts</a>
		</div>
		<div>
			<div class="grid grid-flow-col gap-4">
				<a href="https://twitter.com/e_pavanello" target="_blank">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						class="fill-current"
					>
						<path
							d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
						/>
					</svg>
				</a>
				<a href="https://github.com/epavanello?" target="_blank">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						class="fill-current"
					>
						<path
							d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
						/>
					</svg>
				</a>
			</div>
		</div>
		<div>
			<p>Copyright © 2022 - All right reserved</p>
		</div>
	</footer>
	<!-- <footer class="footer p-10 bg-neutral text-neutral-content">
		<div>
			<span class="footer-title">Company</span>
			<a class="link link-hover" href="/about">About us</a>
			<a class="link link-hover" href="/contacts">Contact</a>
			<a class="link link-hover" href="/help">Help</a>
		</div>
		<div>
			<span class="footer-title">Legal</span>
			<a class="link link-hover" href="/legal/terms-and-conditions">Terms of use</a>
			<a class="link link-hover" href="/legal/privacy">Privacy policy</a>
			<a class="link link-hover" href="/legal/cookies">Cookie policy</a>
		</div>
		<div class="w-80">
			<span class="footer-title">Newsletter</span>
			<Input
				id="subscribe"
				label="Enter your email address"
				labelButton="Subscribe"
				placeholder="username@site.com"
			/>
		</div>
	</footer> -->
</div>
