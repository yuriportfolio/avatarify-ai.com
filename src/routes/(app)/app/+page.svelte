<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Title from '$lib/components/Title.svelte';
	import { handleError, supabaseClient, checkUserPaid } from '$lib/db';
	import type { Database } from '$lib/supabase-types';
	import { showError } from '$lib/utilities';
	import { onMount } from 'svelte';

	let paymentIsOk = false;
	let userPaid = checkUserPaid().then((value) => {
		paymentIsOk = value;
		return paymentIsOk;
	});

	let uploadLoading = false;
	let inputFiles: HTMLInputElement;

	// TODO add spinners
	let trainingPhotosLoading = false;
	let generatedPhotosLoading = false;
	let imagesForTrain: { url: string; name: string }[] = [];
	let imagesGenerated: { url: string; name: string }[] = [];

	async function onUploadSubmit() {
		uploadLoading = true;
		try {
			if (inputFiles.files) {
				const requests = [];
				for (let i = 0; i < inputFiles.files.length; i++) {
					requests.push(
						supabaseClient.storage
							.from('photos-for-training')
							.upload(
								$page.data.session?.user.id + '/' + inputFiles.files[i].name,
								await inputFiles.files[i].arrayBuffer()
							)
							.then(({ error }) => {
								throw error;
							})
					);
				}
				await Promise.all(requests);
				inputFiles.value = '';
				loadPhotosForTraining();
			}
		} catch (error) {
			showError(error);
		} finally {
			uploadLoading = false;
		}
	}

	async function train() {
		await supabaseClient.functions.invoke('train');
	}
	async function generate() {
		await supabaseClient.functions.invoke('generate');
	}

	async function getSignedUrl(bucket: string, filename: string) {
		return handleError(
			await supabaseClient.storage
				.from(bucket)
				.createSignedUrl($page.data.session?.user.id + '/' + filename, 60, {
					transform: {
						height: 96,
						width: 96,
						resize: 'cover'
					}
				})
		).signedUrl;
	}

	async function loadPhotosForTraining() {
		trainingPhotosLoading = true;
		try {
			imagesForTrain = await Promise.all(
				handleError(
					await supabaseClient.storage
						.from('photos-for-training')
						.list($page.data.session?.user.id, {
							sortBy: {
								column: 'created_at',
								order: 'asc'
							}
						})
				).map(async (file) => ({
					url: await getSignedUrl('photos-for-training', file.name),
					name: file.name
				}))
			);
		} catch (error) {
			showError(error);
		} finally {
			trainingPhotosLoading = false;
		}
	}

	async function deletePhotoForTraining(name: string) {
		try {
			await supabaseClient.storage
				.from('photos-for-training')
				.remove([$page.data.session?.user.id + '/' + name]);
			await loadPhotosForTraining();
		} catch (error) {
			showError(error);
		}
	}

	async function loadPhotoGenerated() {
		generatedPhotosLoading = true;
		try {
			imagesGenerated = await Promise.all(
				handleError(
					await supabaseClient.storage.from('photos-generated').list($page.data.session?.user.id, {
						sortBy: {
							column: 'created_at',
							order: 'asc'
						}
					})
				).map(async (file) => ({
					url: await getSignedUrl('photos-generated', file.name),
					name: file.name
				}))
			);
		} catch (error) {
			showError(error);
		} finally {
			generatedPhotosLoading = false;
		}
	}

	onMount(async () => {
		if (browser) {
			loadPhotosForTraining();
			loadPhotoGenerated();

			// Subscribe for new generated photos and update the list
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
	<ul class="steps">
		<li class="step step-primary">Payment</li>
		<li class="step">Upload your photos</li>
		<li class="step">Train the AI</li>
		<li class="step">Generate your avatars</li>
	</ul>

	<div class="w-full bg-white shadow rounded-lg p-6">
		<Title class="mb-4">Pay with Stripe</Title>
		<div class="flex flex-row justify-center w-full">
			{#await userPaid}
				<progress class="progress w-56" />
			{:then isOk}
				{#if isOk}
					<Button size="small" disabled>Paid</Button>
				{:else}
					<Button size="small" link="/checkout" gradient>Pay now</Button>
				{/if}
			{/await}
		</div>
	</div>

	<form
		on:submit={onUploadSubmit}
		class="w-full bg-white shadow rounded-lg p-6 flex flex-col items-center gap-4"
	>
		<Title>Upload your photos</Title>
		<Input bind:input={inputFiles} type="file" name="photos" multiple disabled={!paymentIsOk} />
		<Button size="small" type="submit" loading={uploadLoading} disabled={!paymentIsOk}>Invia</Button
		>
	</form>
	<div class="w-full bg-white shadow rounded-lg p-6">
		<Title>Photos for training</Title>
		<div class="flex flex-col items-center">
			<div class="flex flex-row justify-center gap-4 flex-wrap mt-4">
				{#each imagesForTrain as image}
					<div class="relative group">
						<div class="tooltip" data-tip={image.name}>
							<img src={image.url} loading="eager" alt={image.name} class="aspect-square h-24" />
						</div>

						<Button
							class="absolute -right-3 -top-3 text-white opacity-0 group-hover:opacity-100"
							icon="close"
							size="small"
							circle
							on:click={() => deletePhotoForTraining(image.name)}
						/>
					</div>
				{/each}
			</div>
		</div>
		<Button size="small" type="button" on:click={() => train()} disabled>Addestra</Button>
	</div>
	<div class="w-full bg-white shadow rounded-lg p-6">
		<Title>Photos generated</Title>
		<Button size="small" type="button" on:click={() => generate()} disabled>Genera</Button>
		<div class="flex flex-row justify-center gap-4 flex-wrap w-full mt-4">
			{#each imagesGenerated as image}
				<img src={image.url} loading="eager" alt={image.name} class="aspect-square h-24" />
			{/each}
		</div>
	</div>
</div>
