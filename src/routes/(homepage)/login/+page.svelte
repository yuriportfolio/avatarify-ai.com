<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Title from '$lib/components/Title.svelte';
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
			<Title>Sign in</Title>
			<p class="italic text-center">
				Sign in now to create personalized avatars that represents you.
			</p>
			<Button
				type="button"
				normalCase
				on:click={loginWithGoogle}
				block
				loading={loadingGoogle}
				disco={loadingGoogle}
				disabled={loadingGoogle}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					viewBox="0 0 48 48"
					width="18"
					height="18"
					class="mr-2"
					><defs
						><path
							id="a"
							d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
						/></defs
					><clipPath id="b"><use xlink:href="#a" overflow="visible" /></clipPath><path
						clip-path="url(#b)"
						fill="#FBBC05"
						d="M0 37V11l17 13z"
					/><path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" /><path
						clip-path="url(#b)"
						fill="#34A853"
						d="M0 37l30-23 7.9 1L48 0v48H0z"
					/><path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" /></svg
				>
				Sign in with Google
			</Button>
			<p class="text-center -mb-8">or</p>
			<Input bind:value={email} id="email" label="E-mail" name="email" block />
			<Button
				outline
				endIcon="arrow_forward"
				block
				type="submit"
				disco={loadingSubmit}
				disabled={loadingSubmit}>Login with magic link</Button
			>
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
