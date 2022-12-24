<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	let email: string = '';
	let password: string = '';
</script>

<div class="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
	<div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
		<h1 class="font-bold text-center text-2xl mb-5">BetterAvatar</h1>
		<div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
			<form class="px-5 py-7 flex flex-col gap-4">
				<Input bind:value={email} id="email" label="E-mail" />
				<Input bind:value={password} type="password" id="password" label="Password" />
				<button class="btn btn-block gap-2" type="submit">
					Login <span class="material-symbols-outlined text-sm"> arrow_forward </span>
				</button>
			</form>
			<div class="p-5">
				<div class="grid grid-cols-3 gap-1">
					<button class="btn btn-block btn-outline" type="button"> Google </button>
					<button class="btn btn-block btn-outline" type="button"> Facebook </button>
					<button class="btn btn-block btn-outline" type="button"> Twitter </button>
				</div>
			</div>
			<div class="py-5">
				<div class="text-center sm:text-left whitespace-nowrap px-4">
					<button class="btn btn-ghost btn-sm gap-2 text-xs" type="button">
						<span class="material-symbols-outlined text-sm"> lock </span>
						Forgot Password
					</button>
					<button class="float-right btn btn-ghost btn-sm gap-2 text-xs" type="button">
						<span class="material-symbols-outlined text-sm"> contact_support </span>
						Help
					</button>
				</div>
			</div>
		</div>
		<div class="py-5">
			<div class="text-center sm:text-left whitespace-nowrap">
				<button class="btn btn-ghost btn-sm gap-2 text-xs" type="button">
					<span class="material-symbols-outlined text-sm"> arrow_back </span>
					Back to betteravatar.app
				</button>
			</div>
		</div>
	</div>
</div>
