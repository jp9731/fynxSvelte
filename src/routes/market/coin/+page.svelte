<script lang="ts">
	import { writableTrSort } from '$lib/config';
	import CoinLog from '$lib/components/CoinLog.svelte';
</script>

<CoinLog filterTrSort={$writableTrSort} />
