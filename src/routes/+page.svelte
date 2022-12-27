<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import { supabaseClient } from '$lib/db';

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

	async function log() {
		const { data: photos } = await supabaseClient.storage
			.from('photos-for-training')
			.list($page.data.session?.user.id);

		await supabaseClient.functions.invoke('train');
	}
	log();
</script>

<form on:submit={onSubmit} class="flex flex-col gap-2 items-start">
	<Input bind:input={inputFiles} type="file" label="Photos" id="photos" multiple />
	<Button size="small" type="submit">Invia</Button>
</form>

{#if !$page.data.session}
	<h1>I am not logged in</h1>
{:else}
	<h1>Welcome {$page.data.session.user.email}</h1>
	<p>I am logged in!</p>
{/if}
