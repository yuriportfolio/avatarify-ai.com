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
			await supabaseClient.functions.invoke('train');
		}
	}
	let inputFiles: HTMLInputElement;

	async function train() {
		await supabaseClient.functions.invoke('train');
	}
	async function generate() {
		await supabaseClient.functions.invoke('generate');
	}

	let images: { url: string; name: string }[] = [];

	async function getSignedUrl(filename: string) {
		return handleError(
			await supabaseClient.storage
				.from('photos-generated')
				.createSignedUrl($page.data.session?.user.id + '/' + filename, 60)
		).signedUrl;
	}

	onMount(async () => {
		if (browser) {
			images = await Promise.all(
				handleError(
					await supabaseClient.storage.from('photos-generated').list($page.data.session?.user.id)
				).map(async (file) => ({ url: await getSignedUrl(file.name), name: file.name }))
			);

			const subscription = supabaseClient
				.channel('public:photos')
				.on<Database['public']['Tables']['photos']['Row']>(
					'postgres_changes',
					{ event: 'INSERT', schema: 'public', table: 'photos' },
					async (payload) => {
						if ('uid' in payload.new) {
							images = [
								...images,
								{ url: await getSignedUrl(payload.new.name), name: payload.new.name }
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

<form on:submit={onSubmit} class="flex flex-col gap-2 items-start">
	<Input bind:input={inputFiles} type="file" label="Photos" id="photos" multiple />
	<Button size="small" type="submit">Invia</Button>
	<Button size="small" type="button" on:click={() => train()}>Addestra</Button>
	<Button size="small" type="button" on:click={() => generate()}>Genera</Button>
</form>

{#each images as image}
	<img src={image.url} alt={image.name} />
{/each}
