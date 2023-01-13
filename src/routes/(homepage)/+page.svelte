<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	const avatars = Array.from({ length: 19 }, (_, index) => `avatars/me_${index + 1}.jpg`);

	const first = avatars.slice(0, 10);
	const second = avatars.slice(10);
</script>

<div class="prose px-2 lg:prose-xl text-center py-16 min-w-full">
	<h2>Some generated avatars</h2>
	<p>
		Tag us on social media and use our hashtag to share your AI-generated images and get noticed
	</p>
</div>
<div class="marquee w-full">
	<div class="carousel carousel-center p-4 space-x-4 bg-neutral marquee__group">
		{#each first as image}
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
		{#each second as image}
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
		<li>💸 Make a payment with Stripe</li>
		<li>🔓 Activate your account using the confirmation link sent to your email</li>
		<li>📸 Upload your photos</li>
		<li>👩🏽‍🏫 Start the AI training process (this may take up to 24 hours)</li>
		<li>⚙️ Generate unlimited high-definition photos from a wide range of available themes</li>
	</ol>
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
		<Button type="button" link="/checkout" gradient endIcon="arrow_right">Start now</Button>
		<Button type="button" link="/login" ghost>Login</Button>
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
