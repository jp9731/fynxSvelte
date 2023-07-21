<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import { scale } from 'svelte/transition';
	import ChartCoins from '$lib/components//ChartCoins.svelte';
</script>

<div in:scale={{ duration: 150 }}>
	<ChartCoins coinsList={data.coinsList} />
</div>

<style lang="postcss">
	@keyframes glow {
		0% {
			@apply bg-primary-400/50;
		}
		33% {
			@apply bg-secondary-400/50;
		}
		66% {
			@apply bg-tertiary-400/50;
		}
		100% {
			@apply bg-primary-400/50;
		}
	}
	@keyframes pulse {
		50% {
			transform: scale(1.5);
		}
	}
</style>
