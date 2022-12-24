<script lang="ts">
	import cn from 'classnames';

	export let id: string;
	export let value: string | number;
	export let label: string;
	export let type: 'text' | 'password' = 'text';
	export let inputClass = '';
	export let containerClass = '';
	const handleInput = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
		// in here, you can switch on type and implement
		// whatever behaviour you need
		value = type.match(/^(number|range)$/) ? +e.currentTarget.value : e.currentTarget.value;
	};
</script>

<div class={cn('form-control w-full max-w-xs', containerClass)}>
	<label class="label" for={id}>
		<span class="label-text">{label}</span>
	</label>
	<input
		{value}
		{id}
		{type}
		on:input={handleInput}
		class={cn('input input-bordered w-full max-w-xs', inputClass)}
	/>
</div>
