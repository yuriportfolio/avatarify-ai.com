<script lang="ts">
	import { goto } from '$app/navigation';
	import Alert from '$lib/components/Alert.svelte';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import { supabaseClient } from '$lib/db';
	import { getBaseUrl } from '$lib/utilities';
	import type { AuthError } from '@supabase/supabase-js';
	let email: string = '';

	let error: AuthError | null;
	async function login() {
		({ error } = await supabaseClient.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo: getBaseUrl()
			}
		}));
		if (!error) {
			goto('/');
		}
	}
</script>

<div class="w-full max-w-sm mx-auto my-16 px-2">
	<div class="w-full bg-white shadow rounded-lg divide-y divide-gray-200">
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
			<div class="flex flex-row justify-between px-4">
				<Button startIcon="arrow_back" ghost size="tiny" link="/" normalCase
					>Back to betteravatar.app</Button
				>
				<Button startIcon="contact_support" ghost size="tiny" link="/contacts" normalCase
					>Help</Button
				>
			</div>
		</div>
	</div>
</div>
