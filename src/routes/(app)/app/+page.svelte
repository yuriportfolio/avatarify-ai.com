<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Compressor from 'compressorjs';

	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Title from '$lib/components/Title.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import {
		handleError,
		supabaseClient,
		checkUserPaid,
		checkUserTrained,
		checkUserInTraining
	} from '$lib/db';
	import type { Database } from '$lib/supabase-types';
	import { getThemes } from '$lib/themes';
	import { showError } from '$lib/utilities';
	import { onMount } from 'svelte';
	import { PUBLIC_ENV } from '$env/static/public';

	let userPaid: boolean | null = null;
	function updateUserPaid() {
		checkUserPaid().then((value) => {
			userPaid = value;
		});
	}
	updateUserPaid();

	let userTrained: boolean | null = null;
	function updateUserTrained() {
		checkUserTrained().then((value) => {
			userTrained = value;
		});
	}
	updateUserTrained();

	let userInTraining: boolean | null = null;
	function updateUserInTraining() {
		checkUserInTraining().then((value) => {
			userInTraining = value;
		});
	}
	updateUserInTraining();

	let uploadLoading = false;
	let inputFiles: HTMLInputElement;

	let trainingPhotosLoading = false;
	let generatedPhotosLoading = false;
	let generating = false;
	let photosForTrain: { url: string; name: string }[] = [];
	let photosGenerated: ({ name: string } & (
		| { url: string; complete: true }
		| { complete: false }
	))[] = [];

	let instance_class = '';
	let theme = '';
	let prompt = '';
	let seed = '';

	async function onUploadSubmit() {
		uploadLoading = true;
		try {
			if (inputFiles.files) {
				const requests = [];
				for (let i = 0; i < inputFiles.files.length; i++) {
					requests.push(
						new Promise((resolve, reject) => {
							new Compressor(inputFiles.files![i], {
								width: 512,
								height: 512,
								resize: 'cover',
								quality: 1,
								error(error) {
									showError(error);
									reject();
								},
								async success(file) {
									supabaseClient.storage
										.from('photos-for-training')
										.upload($page.data.session?.user.id + '/' + file.name, await file.arrayBuffer())
										.then((result) => {
											if (result.error) {
												showError(result.error);
												reject();
											}
											resolve(result);
										});
								}
							});
						})
					);
				}
				await Promise.allSettled(requests);
				inputFiles.value = '';
			}
		} catch (error) {
			showError(error);
		} finally {
			uploadLoading = false;
			loadPhotosForTraining();
		}
	}

	async function train() {
		try {
			userInTraining = true;
			const response = await fetch('/api/train', {
				method: 'POST',
				body: JSON.stringify({ instance_class }),
				headers: {
					'content-type': 'application/json'
				}
			});
			if (!response.ok) {
				throw (await response.json()).message;
			}
		} catch (error) {
			showError(error);
		} finally {
			userInTraining = false;
		}
	}
	async function prediction() {
		if (!theme && !prompt) {
			showError('Theme not selected');
		} else {
			try {
				generating = true;
				const response = await fetch('/api/prediction', {
					body: JSON.stringify({ theme, prompt, seed }),
					method: 'POST',
					headers: {
						'content-type': 'application/json'
					}
				});
				if (!response.ok) {
					throw (await response.json()).message;
				}
			} catch (error) {
				showError(error);
			} finally {
				generating = false;
			}
		}
	}

	async function getSignedUrl(bucket: string, filename: string, thumbnail = true) {
		return handleError(
			await supabaseClient.storage.from(bucket).createSignedUrl(
				$page.data.session?.user.id + '/' + filename,
				60,
				thumbnail
					? {
							transform: {
								height: 96,
								width: 96,
								resize: 'cover'
							}
					  }
					: {}
			)
		).signedUrl;
	}

	async function loadPhotosForTraining() {
		trainingPhotosLoading = true;
		try {
			photosForTrain = await Promise.all(
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

	async function deletePhotoForTraining(index: number) {
		const photoToDelete = photosForTrain[index];
		photosForTrain = photosForTrain.filter((photo) => photo !== photoToDelete);
		try {
			await supabaseClient.storage
				.from('photos-for-training')
				.remove([$page.data.session?.user.id + '/' + photoToDelete.name]);
		} catch (error) {
			showError(error);
		}
	}

	async function deletePhotoGenerated(index: number) {
		const photoToDelete = photosGenerated[index];
		photosGenerated = photosGenerated.filter((photo) => photo !== photoToDelete);
		try {
			await supabaseClient.storage
				.from('photos-generated')
				.remove([$page.data.session?.user.id + '/' + photoToDelete.name]);
		} catch (error) {
			showError(error);
		}
	}

	async function loadPhotoGenerated() {
		generatedPhotosLoading = true;
		try {
			photosGenerated = await Promise.all(
				handleError(
					await supabaseClient.storage.from('photos-generated').list($page.data.session?.user.id, {
						sortBy: {
							column: 'created_at',
							order: 'asc'
						}
					})
				).map(async (file) => ({
					url: await getSignedUrl('photos-generated', file.name),
					name: file.name,
					complete: true
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
			const subscriptionPhotosChange = supabaseClient
				.channel('public:predictions')
				.on<Database['public']['Tables']['predictions']['Row']>(
					'postgres_changes',
					{ event: '*', schema: 'public', table: 'predictions' },
					async (payload) => {
						if (payload.eventType == 'UPDATE') {
							if (payload.old.status !== payload.new.status && payload.new.status === 'succeeded') {
								photosGenerated = [
									...photosGenerated,
									{
										complete: true,
										name: `${payload.new.id}.jpg`,
										url: await getSignedUrl('photos-generated', `${payload.new.id}.jpg`, false)
									}
								];
							}
						} else if (payload.eventType == 'INSERT' && payload.new.status !== 'succeeded') {
							photosGenerated = [
								...photosGenerated,
								{
									complete: false,
									name: `${payload.new.id}.jpg`
								}
							];
						}
					}
				)
				.subscribe();

			const subscriptionInfoChange = supabaseClient
				.channel('public:user_info')
				.on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'user_info' }, () => {
					updateUserInTraining();
				});

			return () => {
				subscriptionPhotosChange.unsubscribe();
				subscriptionInfoChange.unsubscribe();
			};
		}
	});
</script>

<div class="w-full max-w-2xl mx-auto my-16 px-2 gap-4 flex flex-col items-center">
	<ul class="steps">
		<li class="step" class:step-primary={!!userPaid}>Payment</li>
		<li class="step" class:step-primary={!!userPaid && photosForTrain.length > 0}>
			Upload your photos
		</li>
		<li class="step" class:step-primary={!!userPaid && userTrained}>Train the AI</li>
		<li class="step" class:step-primary={!!userPaid && photosGenerated.length > 0}>
			Generate your avatars
		</li>
	</ul>

	<div class="w-full bg-white shadow rounded-lg p-6">
		<Title class="mb-4">Pay with Stripe</Title>
		<div class="flex flex-row justify-center w-full">
			{#if userPaid == null}
				<progress class="progress" />
			{:else if userPaid}
				<Button size="small" disabled>Paid</Button>
			{:else}
				<Button size="small" link="/checkout" gradient>Pay now</Button>
			{/if}
		</div>
	</div>

	<form
		on:submit|preventDefault={onUploadSubmit}
		class="w-full bg-white shadow rounded-lg p-6 flex flex-col items-center gap-4"
	>
		<Title>Upload your photos</Title>
		<Input bind:input={inputFiles} type="file" name="photos" multiple disabled={!userPaid} />
		<Button size="small" type="submit" loading={uploadLoading} disabled={!userPaid}>Invia</Button>
	</form>
	<div
		class="w-full bg-white shadow rounded-lg p-6 flex flex-col items-center gap-4 overflow-hidden"
	>
		<Title>Photos for training</Title>
		{#if trainingPhotosLoading}
			<progress class="progress" />
		{:else if photosForTrain.length > 0}
			<div class="flex flex-col items-center">
				<div
					class="flex flex-row justify-center bg-neutral gap-2 p-2 flex-wrap max-h-[40vh] overflow-y-auto overflow-x-hidden rounded-md"
				>
					{#each photosForTrain as image, index}
						<div class="relative group">
							<img src={image.url} loading="eager" alt={image.name} class="aspect-square h-24" />

							{#if !userInTraining && !userTrained}
								<Button
									class="absolute -right-2 -top-2 text-white opacity-0 group-hover:opacity-100 z-10"
									icon="close"
									size="small"
									circle
									primary
									on:click={() => deletePhotoForTraining(index)}
								/>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		{:else}
			<p class="italic">There are not yet any images present.</p>
		{/if}

		{#if userTrained != null && !userTrained}
			<div class="form-control w-full max-w-xs">
				<label class="label" for="instance_class">
					<span class="label-text">Specify the subject</span>
				</label>
				<select class="select select-bordered" id="instance_class" bind:value={instance_class}>
					<option disabled selected />
					<option value="man">Man</option>
					<option value="woman">Woman</option>
					<option value="couple">Couple</option>
					<option value="dog">Dog</option>
					<option value="cat">Cat</option>
				</select>
			</div>
		{/if}

		<Tooltip
			message={userTrained
				? ''
				: 'Caution: If you continue, you will not be able to upload any more photos.'}
		>
			<Button
				size="small"
				type="button"
				on:click={() => train()}
				disabled={!userPaid ||
					photosForTrain.length == 0 ||
					userTrained == null ||
					userTrained ||
					userInTraining == null ||
					userInTraining}
				loading={userInTraining == null || userInTraining}
			>
				{#if userInTraining}
					In training
				{:else if userTrained}
					Trained
				{:else}
					Start training
				{/if}
			</Button>
		</Tooltip>
	</div>
	<div
		class="w-full bg-white shadow rounded-lg p-6 flex flex-col items-center gap-4 overflow-hidden"
	>
		<Title>Generate photos</Title>
		<div class="flex flex-row justify-center gap-4 flex-wrap w-full">
			{#if generatedPhotosLoading}
				<progress class="progress" />
			{:else if photosGenerated.length > 0}
				<div class="carousel carousel-center w-full p-8 space-x-4 bg-neutral rounded-box">
					{#each photosGenerated as image, index}
						<div class="carousel-item relative group" id={`photo_${index}`}>
							{#if image.complete}
								<img
									src={image.url}
									loading="eager"
									alt=""
									class="aspect-square rounded-box max-w-[60vw]"
								/>

								<Button
									class="absolute right-3 top-3 text-white opacity-0 group-hover:opacity-100"
									icon="close"
									size="small"
									circle
									primary
									on:click={() => deletePhotoGenerated(index)}
								/>

								<Button
									class="absolute right-3 bottom-3 text-white opacity-0 group-hover:opacity-100"
									icon="download"
									size="small"
									circle
									primary
									link={image.url}
									download
									target="_blank"
								/>
							{:else}
								<div class="aspect-square max-w-[60vw]">
									<progress class="progress w-56" />
								</div>
							{/if}
						</div>
					{/each}
				</div>
				<div class="flex flex-col items-center">
					<div
						class="flex flex-row justify-center bg-neutral gap-2 p-2 flex-wrap max-h-[40vh] overflow-y-auto overflow-x-hidden rounded-md"
					>
						{#each photosGenerated as image, index}
							<div class="relative group">
								<a href={`#photo_${index}`}>
									{#if image.complete}
										<img
											src={image.url}
											loading="eager"
											alt={image.name}
											class="aspect-square h-24"
										/>
									{:else}
										<div class="aspect-square h-24">
											<progress class="progress" />
										</div>
									{/if}
								</a>
								<Button
									class="absolute -right-2 -top-2 text-white opacity-0 group-hover:opacity-100 z-10"
									icon="close"
									size="small"
									circle
									primary
									on:click={() => deletePhotoGenerated(index)}
								/>
							</div>
						{/each}
					</div>
				</div>
			{:else}
				<p class="italic">There are not yet any images present.</p>
			{/if}
		</div>
		<!-- Move to component -->
		<div class="form-control w-full max-w-xs">
			<label class="label" for="theme">
				<span class="label-text">Choose the style</span>
			</label>
			<select class="select select-bordered" id="theme" bind:value={theme}>
				<option disabled selected />
				{#each getThemes() as theme}
					<option value={theme} class="capitalize">{theme}</option>
				{/each}
			</select>
		</div>
		{#if PUBLIC_ENV !== 'PRODUCTION'}
			<Input
				name="prompt"
				bind:value={prompt}
				type="textarea"
				placeholder="Prompt"
				block
				containerClass="w-full max-w-xs"
			/>
			<Input name="seed" bind:value={seed} placeholder="Seed" />
		{/if}
		<Button
			size="small"
			type="button"
			on:click={() => prediction()}
			disabled={!userPaid || !userTrained || generating || userInTraining == null || userInTraining}
			loading={generating}>Generate</Button
		>
	</div>
</div>
