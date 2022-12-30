<script lang="ts">
	export let message: string;
</script>

<div class="tooltip" data-tip={message}>
	<slot />
</div>
