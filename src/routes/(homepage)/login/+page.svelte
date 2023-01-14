<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import { handleError, supabaseClient } from '$lib/db';
	import { getBaseUrl, showError, showInfo } from '$lib/utilities';

	let email = '';
	let loadingSubmit = false;
	let loadingGoogle = false;

	async function login() {
		loadingSubmit = true;
		try {
			handleError(
				await supabaseClient.auth.signInWithOtp({
					email,
					options: {
						emailRedirectTo: getBaseUrl() + '/app'
					}
				})
			);
			showInfo('Please access the link we just sent you via email.');
		} catch (error) {
			if (error) {
				showError(error);
			}
		} finally {
			loadingSubmit = false;
		}
	}

	async function loginWithGoogle() {
		loadingGoogle = true;
		try {
			handleError(
				await supabaseClient.auth.signInWithOAuth({
					provider: 'google',
					options: {
						redirectTo: getBaseUrl() + '/app'
					}
				})
			);

			goto('/app');
		} catch (error) {
			showError(error);
		} finally {
			loadingGoogle = false;
		}
	}
</script>

<div class="w-full max-w-sm mx-auto my-16 px-2">
	<div class="w-full bg-white shadow rounded-lg divide-y divide-gray-200">
		<form class="px-5 py-7 flex flex-col gap-4" on:submit|preventDefault={login}>
			<Input bind:value={email} id="email" label="E-mail" name="email" block />
			<Button
				endIcon="arrow_forward"
				block
				type="submit"
				loading={loadingSubmit}
				disabled={loadingSubmit}>Login with magic link</Button
			>

			<p class="text-center">or</p>
			<Button
				outline
				type="button"
				normalCase
				on:click={loginWithGoogle}
				block
				loading={loadingGoogle}
				disabled={loadingGoogle}
			>
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
