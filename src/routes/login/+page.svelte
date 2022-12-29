<script lang="ts">
	import { goto } from '$app/navigation';
	import Alert from '$lib/components/Alert.svelte';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import { supabaseClient } from '$lib/db';
	import type { AuthError } from '@supabase/supabase-js';
	let email: string = '';

	let error: AuthError | null;
	async function login() {
		({ error } = await supabaseClient.auth.signInWithOtp({
			email
		}));
		if (!error) {
			goto('/');
		}
	}
</script>

<div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200 max-w-sm mx-auto my-16">
	<form class="px-5 py-7 flex flex-col gap-4" on:submit={login}>
		<Input bind:value={email} id="email" label="E-mail" block />
		{#if error}
			<Alert type="error" on:close={() => (error = null)}>{error.message}</Alert>
		{/if}
		<Button endIcon="arrow_forward" block type="submit">Login with magic link</Button>
	</form>
	<!-- 	<div class="p-5">
		<div class="grid grid-cols-3 gap-1">
			<Button outline size="small" type="button" normalCase>Google</Button>
			<Button outline size="small" type="button" normalCase>Facebook</Button>
			<Button outline size="small" type="button" normalCase>Twitter</Button>
		</div>
	</div> -->
	<div class="py-5">
		<div class="text-center sm:text-left whitespace-nowrap px-4">
			<Button startIcon="arrow_back" ghost size="tiny" link="/" normalCase
				>Back to betteravatar.app</Button
			>
			<Button
				startIcon="contact_support"
				class="float-right"
				ghost
				size="tiny"
				link="/contacts"
				normalCase>Help</Button
			>
		</div>
	</div>
</div>
