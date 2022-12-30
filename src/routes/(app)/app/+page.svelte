<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import { handleError, supabaseClient } from '$lib/db';
	import type { Database } from '$lib/supabase-types';
	import { onMount } from 'svelte';
	async function onSubmit() {
		if (inputFiles.files) {
			for (let i = 0; i < inputFiles.files.length; i++) {
				await supabaseClient.storage
					.from('photos-for-training')
					.upload(
						$page.data.session?.user.id + '/' + inputFiles.files[i].name,
						await inputFiles.files[i].arrayBuffer()
					);
			}
		}
	}
	let inputFiles: HTMLInputElement;

	async function train() {
		await supabaseClient.functions.invoke('train');
	}
	async function generate() {
		await supabaseClient.functions.invoke('generate');
	}

	let imagesForTrain: { url: string; name: string }[] = [];
	let imagesGenerated: { url: string; name: string }[] = [];

	async function getSignedUrl(bucket: string, filename: string) {
		return handleError(
			await supabaseClient.storage
				.from(bucket)
				.createSignedUrl($page.data.session?.user.id + '/' + filename, 60)
		).signedUrl;
	}

	onMount(async () => {
		if (browser) {
			imagesForTrain = await Promise.all(
				handleError(
					await supabaseClient.storage.from('photos-for-training').list($page.data.session?.user.id)
				).map(async (file) => ({
					url: await getSignedUrl('photos-for-training', file.name),
					name: file.name
				}))
			);
			imagesGenerated = await Promise.all(
				handleError(
					await supabaseClient.storage.from('photos-generated').list($page.data.session?.user.id)
				).map(async (file) => ({
					url: await getSignedUrl('photos-generated', file.name),
					name: file.name
				}))
			);

			const subscription = supabaseClient
				.channel('public:photos')
				.on<Database['public']['Tables']['photos']['Row']>(
					'postgres_changes',
					{ event: 'INSERT', schema: 'public', table: 'photos' },
					async (payload) => {
						if ('uid' in payload.new) {
							imagesGenerated = [
								...imagesGenerated,
								{
									url: await getSignedUrl('photos-generated', payload.new.name),
									name: payload.new.name
								}
							];
						}
					}
				)
				.subscribe();

			return () => {
				subscription.unsubscribe();
			};
		}
	});
</script>

<div class="w-full max-w-xl mx-auto my-16 px-2 gap-4 flex flex-col items-center">
	<div class="w-full max-w-sm bg-white shadow rounded-lg divide-y divide-gray-200">
		<form on:submit={onSubmit} class="px-5 py-7 flex flex-col items-center gap-4">
			<Input bind:input={inputFiles} type="file" label="Photos" id="photos" multiple />
			<Button size="small" type="submit">Invia</Button>
			<Button size="small" type="button" on:click={() => train()} disabled>Addestra</Button>
			<Button size="small" type="button" on:click={() => generate()} disabled>Genera</Button>
		</form>
	</div>
	<div class="w-full bg-white shadow rounded-lg divide-y divide-gray-200 p-6">
		<article class="prose">
			<h1>Photos for training</h1>
		</article>
		<div class="carousel carousel-center p-4 space-x-4 bg-neutral">
			{#each imagesForTrain as image, i}
				<div class="carousel-item">
					<img
						src={image.url}
						loading="eager"
						alt={image.name}
						class="rounded-box aspect-square h-10"
					/>
				</div>
			{/each}
		</div>
	</div>
	<div class="w-full bg-white shadow rounded-lg divide-y divide-gray-200 p-6">
		<article class="prose">
			<h1>Photos generated</h1>
		</article>
		{#each imagesGenerated as image}
			<img src={image.url} alt={image.name} />
		{/each}
	</div>
</div>
