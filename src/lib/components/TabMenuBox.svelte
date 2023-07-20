<script lang="ts">
	import { resetTimer, setInitAmount } from '$lib/config';
	import { page } from '$app/stores';
	const pathName = $page.url.pathname.split('/');
	export let tabsArr: { link: string; name: string }[];
	export let logId: string;
	export let targetParam: string;
	export let targetVal: string;
	const setParam = (pageUrl: URL, val: string) => {
		let tabUrl = logId === 'non' ? pageUrl : String(pageUrl).replace(`/${logId}`, '');
		let url = new URL(tabUrl);
		url.searchParams.set(targetParam, val);
		return url.href;
	};
	const setInit = (): void => {
		if (pathName[3] !== 'request') return;
		setInitAmount();
	};
</script>

<div id="tabMenuBox">
	<div class="tabMenuBox btn-group variant-ringed">
		{#each tabsArr as tab}
			{@const getTabUrl = () => setParam($page.url, tab.link)}
			{@const tabUrl = getTabUrl()}
			<a
				href={tabUrl}
				class="btn {tab.link === targetVal ? 'variant-ghost-tertiary' : ''}"
				on:click={resetTimer}
				on:click={setInit}
				>{tab.name}
			</a>
		{/each}
	</div>
</div>

<style>
	#tabMenuBox {
		width: 100%;
		display: flex;
		justify-content: end;
		margin-bottom: 15px;
	}
</style>
