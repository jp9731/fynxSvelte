<script lang="ts">
	import CoinTitle from '$lib/components/CoinTitle.svelte';
	export let coinsList: any[];
</script>

{#each coinsList as siteCoin}
	<aside class="alert variant-ghost mb-4 flex justify-between items-center _flex-column">
		<div class="flex">
			<CoinTitle coinId={siteCoin.id} coinLogo={siteCoin.logo} coinName={siteCoin.name} />
		</div>
		<div class="alert-message text-end px-4">
			<h2
				class="coin-price coin-{siteCoin.name.includes('_')
					? siteCoin.name.substring(0, siteCoin.name.indexOf('_'))
					: siteCoin.name} text-tertiary-500"
			>
				<!-- {addCommas(siteCoin.price)} -->Loading...
			</h2>
		</div>
		<div class="alert-actions flex justify-around">
			<a
				href="./market/coin/request?trSort=sell&coinId={siteCoin.id}"
				class="btn variant-ringed-success">SELL</a
			>
			<a
				href="./market/coin/request?trSort=buy&coinId={siteCoin.id}"
				class="btn variant-ringed-warning">BUY</a
			>
		</div>
	</aside>
{/each}
