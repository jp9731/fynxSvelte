<script lang="ts">
	import type { PageData } from './$types';
	import { writableTrSort } from '$lib/config';
	import CoinLog from '$lib/components/CoinLog.svelte';
	import CoinTitle from '$lib/components/CoinTitle.svelte';
	export let data: PageData;
	$: logInfo = data.logInfo;
	$: coinInfo = data.coinInfo;
	$: sellerInfo = data.sellerInfo;
	$: buyerInfo = data.buyerInfo;
</script>

{coinInfo.name}
<CoinTitle coinId={coinInfo.id} coinLogo={coinInfo.logo} coinName={coinInfo.name} />
{$writableTrSort === 'sell' ? sellerInfo.username : buyerInfo.username}

<div class="mt-5">
	<CoinLog filterTrSort={$writableTrSort} />
</div>

<style>
</style>
