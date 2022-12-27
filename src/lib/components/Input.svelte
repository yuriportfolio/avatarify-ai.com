<script lang="ts">
	import cn from 'classnames';

	export let id: string;
	export let label: string;
	export let input: HTMLInputElement | undefined = undefined;
	export let value: string | undefined = undefined;
	export let type: 'text' | 'password' | 'file' = 'text';
	export let inputClass = '';
	export let containerClass = '';
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

<div class={cn('form-control w-full max-w-xs', containerClass)}>
	<label class="label" for={id}>
		<span class="label-text">{label}</span>
	</label>
	<input
		bind:this={input}
		{id}
		{type}
		on:input={handleInput}
		class={cn(
			' w-full max-w-xs',
			{ 'file-input file-input-bordered': type == 'file' },
			{ 'input input-bordered': type != 'file' },
			inputClass
		)}
		{...$$restProps}
	/>
</div>
