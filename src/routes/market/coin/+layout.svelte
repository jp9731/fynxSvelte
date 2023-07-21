<script lang="ts">
	import { writableTrSort } from '$lib/config';
	import { page } from '$app/stores';
	import { scale } from 'svelte/transition';
	import TabMenuBox from '$lib/components/TabMenuBox.svelte';
	let tabsArr = [
		{ link: 'sell', name: 'Sell' },
		{ link: 'buy', name: 'Buy' }
	];
	$: pathName = $page.url.pathname.split('/');
	$: isLogId = pathName[3] && pathName[3] !== 'request' ? pathName[3] : 'non';
</script>

<TabMenuBox {tabsArr} logId={isLogId} targetParam="trSort" targetVal={$writableTrSort} />
<div in:scale={{ duration: 150 }}>
	<slot />
</div>
