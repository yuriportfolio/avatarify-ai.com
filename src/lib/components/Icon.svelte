<script lang="ts">
	import type IconTypes from '$lib/icon-types';
	import cn from 'classnames';

	export let name: IconTypes;
	export let size: 'tiny' | 'small' | 'normal' | 'large' = 'normal';
</script>

<span
	class={cn('material-symbols-outlined', {
		'text-xs': size == 'tiny',
		'text-sm': size == 'small',
		'text-lg': size == 'large'
	})}
>
	{name}
</span>
