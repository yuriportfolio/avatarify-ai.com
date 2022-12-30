<script lang="ts">
	import cn from 'classnames';
	import Button from './Button.svelte';

	export let id: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let label: string | undefined = undefined;
	export let input: HTMLInputElement | undefined = undefined;
	export let value: string | undefined = undefined;
	export let type: 'text' | 'password' | 'file' = 'text';
	export let inputClass = '';
	export let containerClass = '';
	export let labelButton: string | undefined = undefined;
	export let block = false;
	const handleInput = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
		// in here, you can switch on type and implement
		// whatever behaviour you need
		value = e.currentTarget.value;
	};

	$: {
		if (input && value && type !== 'file') {
			input.value = value;
		}
	}
</script>

<div class={cn('form-control', containerClass)}>
	{#if label}
		<label class="label" for={id}>
			<span class="label-text text-inherit">{label}</span>
		</label>
	{/if}

	<div class="relative">
		<input
			bind:this={input}
			{id}
			{type}
			{name}
			on:input={handleInput}
			class={cn(
				'w-full',
				{
					'file-input file-input-bordered': type == 'file',
					'input input-bordered': type != 'file',
					'max-w-xs': !block
				},
				inputClass
			)}
			{...$$restProps}
		/>
		{#if labelButton}
			<Button class="absolute top-0 right-0 rounded-l-none" primary on:click>{labelButton}</Button>
		{/if}
	</div>
</div>
