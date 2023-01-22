<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	const manAvatars = Array.from({ length: 10 }, (_, index) => `avatars/man (${index + 1}).jpeg`);
	const womanAvatars = Array.from(
		{ length: 12 },
		(_, index) => `avatars/woman (${index + 1}).jpeg`
	);
</script>

<div class="prose px-2 lg:prose-xl text-center py-16 min-w-full">
	<h2>Some generated avatars</h2>
	<p>
		Tag us on social media and use our hashtag to share your AI-generated images and get noticed
	</p>
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
	<h2>What Does It Cost?</h2>
</div>

<div
	class="mt-12 m-auto -space-y-4 items-center justify-center md:flex md:space-y-0 md:-space-x-4 xl:w-10/12 px-8"
>
	<div class="relative z-10 -mx-4 group md:w-6/12 md:mx-0 lg:w-5/12">
		<div
			aria-hidden="true"
			class="absolute top-0 w-full h-full rounded-2xl bg-white shadow-xl transition duration-500 group-hover:scale-105 lg:group-hover:scale-110"
		/>
		<div class="relative p-6 space-y-6 lg:p-8">
			<h3 class="text-3xl text-gray-700 font-semibold text-center">100 avatars</h3>
			<div>
				<div class="relative flex justify-center gap-8">
					<div class="flex items-end">
						<span class="text-6xl text-gray-800 font-bold leading-0">40</span>
						<div class="pb-1">
							<span class="block text-lg text-gray-700 font-bold">%</span>
							<span class="block text-sm text-blue-500 font-bold">Off</span>
						</div>
					</div>
					<div class="relative flex justify-around mb-2">
						<div class="flex flex-row items-end gap-1">
							<span class="text-4xl text-gray-800 font-bold leading-0">5.99</span>
							<span class="block text-sm text-blue-500 font-bold">EUR</span>
						</div>
					</div>
				</div>
			</div>

			<Button type="button" link="/checkout" block>Buy now</Button>
		</div>
	</div>

	<div class="relative group md:w-6/12 lg:w-7/12">
		<div
			aria-hidden="true"
			class="absolute top-0 w-full h-full rounded-2xl bg-white shadow-lg transition duration-500 group-hover:scale-105"
		/>
		<div
			class="relative p-6 pt-16 md:p-8 md:pl-12 md:rounded-r-2xl lg:pl-20 lg:p-16 prose px-2 lg:prose-xl text-center"
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
	<h2>Who is behind this project?</h2>
	<p class="max-w-2xl mx-auto">
		I am the sole creator of this service. As an independent Developer, I own and operate all of my
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
