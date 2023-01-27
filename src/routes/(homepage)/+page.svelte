<script lang="ts">
	import { PUBLIC_STRIPE_PAYMENT_LINK } from '$env/static/public';
	import Button from '$lib/components/Button.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { showInfo } from '$lib/utilities';

	const manAvatars = Array.from({ length: 10 }, (_, index) => `avatars/man (${index + 1}).jpeg`);
	const womanAvatars = Array.from(
		{ length: 12 },
		(_, index) => `avatars/woman (${index + 1}).jpeg`
	);
</script>

<div class="prose px-2 lg:prose-xl text-center py-16 min-w-full">
	<h2>Create stunning photos with AI-based generation</h2>

	<p class="max-w-2xl mx-auto">
		Generate unique, professional-looking images tailored to your taste with our AI-based service.
		Try it now and see the possibilities.
	</p>
</div>
<div class="relative pb-28">
	<div class="absolute bottom-0 left-[20%] -ml-12 overflow-visible w-40 aspect-square">
		<img
			src="avatars/man_from.jpg"
			loading="lazy"
			alt="Demo source"
			class="absolute z-10 w-40 aspect-square rotate-12 shadow-md rounded-md"
		/>
		<img
			src="arrow.svg"
			alt="Arrow"
			class="absolute text-black left-40 -bottom-4 z-20 rotate-[240deg]"
		/>
	</div>
</div>
<div class="marquee w-full">
	<div class="carousel carousel-center p-4 space-x-4 bg-neutral marquee__group">
		{#each manAvatars as image}
			<div class="carousel-item">
				<img
					src={image}
					loading="eager"
					alt="Demo avatar"
					class="rounded-box aspect-square h-[30vh]"
				/>
			</div>
		{/each}
	</div>
</div>
<div class="marquee marquee--reverse w-full -mt-4">
	<div class="carousel carousel-center p-4 space-x-4 bg-neutral marquee__group">
		{#each womanAvatars as image}
			<div class="carousel-item">
				<img
					src={image}
					loading="eager"
					alt="Demo avatar"
					class="rounded-box aspect-square h-[30vh]"
				/>
			</div>
		{/each}
	</div>
</div>
<div class="relative pb-28">
	<div class="absolute top-0 right-[20%] -ml-12 overflow-visible w-40 aspect-square">
		<img
			src="avatars/woman_from.jpg"
			loading="lazy"
			alt="Demo source"
			class="absolute z-10 w-40 aspect-square rotate-12 shadow-md rounded-md"
		/>
		<img
			src="arrow.svg"
			alt="Arrow"
			class="absolute text-black right-44 bottom-8 z-20 rotate-[60deg]"
		/>
	</div>
</div>

<div class="prose px-2 lg:prose-xl text-center pt-16 min-w-full">
	<h2>What Does It Cost?</h2>
</div>

<div
	class="mt-12 m-auto -space-y-4 items-center justify-center md:flex md:space-y-0 md:-space-x-4 xl:w-10/12 px-8"
>
	<div class="relative z-10 -mx-4 group md:w-6/12 md:mx-0 lg:w-5/12">
		<div aria-hidden="true" class="absolute top-0 w-full h-full rounded-2xl bg-white shadow-xl" />
		<div class="relative p-6 space-y-6 lg:p-8">
			<h3 class="text-3xl text-gray-700 font-semibold text-center">100 avatars</h3>
			<div>
				<div class="relative flex justify-around items-center">
					<span class="block text-sm text-gray-800 font-bold line-through">9.99 EUR</span>
					<div class="relative flex justify-around mb-2">
						<div class="relative flex flex-row items-end gap-1">
							<span class="text-4xl text-gray-800 font-bold leading-0">5.99</span>
							<span class="block text-sm text-blue-500 font-bold">EUR</span>
						</div>
					</div>
					<Tooltip message="Copy the promo code">
						<Button
							size="tiny"
							startIcon="copy_all"
							class="text-xs"
							primary
							on:click={() => {
								navigator.clipboard.writeText('LESS40');
								showInfo('Promo code copied');
							}}>LESS40</Button
						>
					</Tooltip>
				</div>
			</div>

			<div>
				<Button type="button" link={PUBLIC_STRIPE_PAYMENT_LINK} block animated>Buy now</Button>
				<div class="flex flex-row gap-1 h-5 mt-3 mx-auto">
					<img src="mastercard-alt.svg" alt="Mastercard" />
					<img src="visa.svg" alt="Visa" />
					<img src="american-express.svg" alt="American Express" />
					<img src="apple-pay.svg" alt="Apple Pay" />
					<img src="google-pay.svg" alt="Google Pay" />
				</div>
			</div>
		</div>
	</div>

	<div class="relative group md:w-6/12 lg:w-7/12">
		<div aria-hidden="true" class="absolute top-0 w-full h-full rounded-2xl bg-white shadow-lg" />
		<div
			class="relative p-6 pt-10 md:p-8 md:pl-12 md:rounded-r-2xl lg:pl-20 lg:p-16 prose lg:prose-xl text-center"
		>
			<p class="max-w-2xl mx-auto">
				Training an AI model to understand the physiognomy of a specific subject requires a lot of
				computational power, so it is quite costly to create a model that can accurately reproduce
				the specified subject.
			</p>
		</div>
	</div>
</div>

<div class="prose px-2 lg:prose-xl text-center pt-16 min-w-full">
	<h2>How it works</h2>
	<ol class="max-w-xl mx-auto text-left">
		<li>👤 Sign up</li>
		<li>📸 Upload your photos</li>
		<li>💸 Make a payment with Stripe</li>
		<li>👩🏽‍🏫 Start the AI training process (this may take up to 2 hours)</li>
		<li>⚙️ Generate up to 100 high-definition photos from a wide range of available themes</li>
	</ol>
</div>

<div class="prose px-2 lg:prose-xl text-center pt-16 min-w-full">
	<h2>Who is behind this project?</h2>
	<p class="max-w-2xl mx-auto">
		I am <a href="https://twitter.com/e_pavanello" target="_blank" rel="noreferrer">Emanuele</a>,
		the sole creator of this service. As an independent Developer, I own and operate all of my
		sites. Your data is safe with me as I have no outside influence or agendas. Trust in the quality
		and care put into this service.
	</p>
</div>

<div class="prose px-2 lg:prose-xl text-center py-16 min-w-full">
	<h2 class="max-w-2xl mx-auto">
		Build a unique and personalized <span class="text-gradient">Avatar</span> with the help of AI
	</h2>
	<div class="gap-4">
		<Button type="button" link="/app" animated endIcon="arrow_forward">Start now</Button>
	</div>
</div>

<style>
	:root {
		--color-text: navy;
		--color-bg: papayawhip;
		--color-bg-accent: #ecdcc0;
		--duration: 60s;
		--scroll-start: 0;
		--scroll-end: calc(-100% + 100vw);
	}
	.marquee {
		display: flex;
		overflow: hidden;
		user-select: none;
	}

	.marquee__group {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: space-around;
		min-width: 100%;
		animation: scroll-x var(--duration) linear infinite;
	}
	.marquee--reverse .marquee__group {
		animation-direction: reverse;
		animation-delay: -3s;
	}

	@media (prefers-reduced-motion: reduce) {
		.marquee__group {
			animation-play-state: paused;
		}
	}
	@keyframes scroll-x {
		from {
			transform: translateX(var(--scroll-start));
		}
		to {
			transform: translateX(var(--scroll-end));
		}
	}
</style>
