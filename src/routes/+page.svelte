<script lang="ts">
	import supabase from '$lib/supabase';

	async function onSubmit() {
		if (inputFiles.files) {
			for (let i = 0; i < inputFiles.files.length; i++) {
				supabase.storage
					.from('photos-for-training')
					.upload(inputFiles.files[i].name, await inputFiles.files[i].arrayBuffer());
			}
		}
	}
	let inputFiles: HTMLInputElement;
</script>

<form on:submit={onSubmit}>
	<input bind:this={inputFiles} type="file" multiple />
	<button type="submit">Invia</button>
</form>

<h1 class="text-3xl font-bold underline">Hello world!</h1>
