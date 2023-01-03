<script lang="ts">
	import type { IconTypes } from '$lib/icon-types';
	import cn from 'classnames';
	import Icon from './Icon.svelte';

	export let icon: IconTypes | undefined = undefined;
	export let startIcon: IconTypes | undefined = undefined;
	export let endIcon: IconTypes | undefined = undefined;
	export let size: 'tiny' | 'small' | 'normal' | 'large' = 'normal';
	export let primary = false;
	export let ghost = false;
	export let block = false;
	export let circle = false;
	export let outline = false;
	export let normalCase = false;
	export let gradient = false;
	export let loading = false;
	export let noAnimation = false;
	export let disabled = false;
	let classes: string | undefined = undefined;
	export { classes as class };
	export let link: string | undefined = undefined;
</script>

<svelte:element
	this={link ? 'a' : 'button'}
	href={link}
	disabled={link ? undefined : disabled}
	data-sveltekit-preload-data="off"
	on:click
	class={cn(
		'btn gap-1',
		{
			'btn-xs': size == 'tiny',
			'btn-sm': size == 'small',
			'btn-lg': size == 'large'
		},
		{
			'btn-primary': primary,
			'btn-ghost': ghost,
			'btn-block': block,
			'btn-circle': circle,
			'btn-outline': outline,
			'btn-disabled': disabled
		},
		{
			'normal-case': normalCase,
			'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-1 border-pink-100 hover:border-pink-100 text-white':
				gradient,
			loading: loading,
			'no-animation': noAnimation || disabled,
			'cursor-not-allowed': disabled
		},
		classes
	)}
	type="button"
	{...$$restProps}
>
	{#if startIcon}
		<Icon name={startIcon} {size} />
	{/if}
	{#if icon}
		<Icon name={icon} {size} />
	{:else}
		<slot />
	{/if}
	{#if endIcon}
		<Icon name={endIcon} {size} />
	{/if}
</svelte:element>
