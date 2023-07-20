<script lang="ts">
	import { page } from '$app/stores';
	import { pb, addCommas, resetTimer } from '$lib/config';
	import { afterUpdate } from 'svelte';
	import CoinTitle from '$lib/components/CoinTitle.svelte';
	export let filterTrSort: string;
	let tradeCoinLogArr: any[] = [];
	afterUpdate(async () => {
		const getTradeCoinLog = async () => {
			const tradeCoinLog = await pb.collection('tradeCoinLog').getList(1, 15, {
				sort: '-created',
				filter: `trSort="${filterTrSort}"`,
				expand: 'coin,seller,buyer'
			});
			return tradeCoinLog.items;
		};
		tradeCoinLogArr = await getTradeCoinLog();
	});
	$: pathName = $page.url.pathname.split('/');
	$: trChipColor = filterTrSort === 'buy' ? 'variant-filled-warning' : 'variant-filled-primary';
</script>

<h3 class="mb-3">{filterTrSort.toUpperCase()} LIST</h3>

{#await tradeCoinLogArr}
	Loading...
{:then value}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	{#each tradeCoinLogArr as logInfo}
		<a
			class="card flex justify-between items-center mb-3 {pathName[3] === logInfo.id
				? 'variant-ringed-surface'
				: 'variant-ghost-tertiary'}"
			href="//{$page.url.host}/market/coin/{logInfo.id}?trSort={filterTrSort}"
			on:click={resetTimer}
		>
			<header class="card-header grow pb-4">
				<span class="chip {trChipColor}">{filterTrSort}</span>
				<div class="mt-3">
					<CoinTitle
						coinId={logInfo.coin}
						coinLogo={logInfo.expand.coin.logo}
						coinName={logInfo.expand.coin.name}
						flexColumnName={true}
					/>
				</div>
			</header>
			<section class="flex flex-col items-end justify-center">
				<strong>{addCommas(30040)}</strong>
				<strong>{addCommas(30040)}</strong>
			</section>
			<footer class="card-footer">(footer)</footer>
		</a>
	{/each}
{/await}

<style>
	.card {
		vertical-align: middle;
	}
	header {
		height: 100%;
		vertical-align: middle;
	}
	section {
		text-align: right;
		font-size: 1.5rem;
		height: 100%;
	}
	.coin-name {
		display: flex;
		align-items: center;
	}
	footer {
		width: 150px;
		text-align: center;
	}
	@media (max-width: 499.98px) {
		.coin-name {
			flex-direction: column;
		}
		footer {
			width: 120px;
		}
	}
</style>
