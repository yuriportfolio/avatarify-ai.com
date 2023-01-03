<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import { supabaseClient } from '$lib/db';
	import { getBaseUrl, showError } from '$lib/utilities';
	let email: string = '';

	async function login() {
		const { error } = await supabaseClient.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo: getBaseUrl() + '/app'
			}
		});
		if (error) {
			showError(error.message);
		} else {
			goto('/app');
		}
	}

	async function loginWithGoogle() {
		const { error } = await supabaseClient.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: getBaseUrl() + '/app'
			}
		});
		if (error) {
			showError(error.message);
		} else {
			goto('/app');
		}
	}
</script>

<div class="w-full max-w-sm mx-auto my-16 px-2">
	<div class="w-full bg-white shadow rounded-lg divide-y divide-gray-200">
		<form class="px-5 py-7 flex flex-col gap-4" on:submit={login}>
			<Input bind:value={email} id="email" label="E-mail" name="email" block />
			<Button endIcon="arrow_forward" block type="submit">Login with magic link</Button>

			<p class="text-center">or</p>
			<Button outline type="button" normalCase on:click={loginWithGoogle} block>
				Sign in with Google
			</Button>
		</form>
		<div class="py-5">
			<div class="flex flex-row justify-between px-4">
				<Button startIcon="arrow_back" ghost size="tiny" link="/" normalCase
					>Back to avatarify-ai.com</Button
				>
				<Button startIcon="contact_support" ghost size="tiny" link="/contacts" normalCase
					>Help</Button
				>
			</div>
		</div>
	</div>
</div>
