<script lang="ts">
	import { page } from '$app/stores';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import { writable } from 'svelte/store';
	export const showSubMenuBox = writable(true);
	let value: number = 0;
	const code = String(30);
	let tabSet: number = 0;
</script>

<!-- <div id="subMenuBox">
	<RadioGroup>
		<RadioItem bind:group={value} name="justify" value={0}>(label)</RadioItem>
		<RadioItem bind:group={value} name="justify" value={1}>(label)</RadioItem>
		<RadioItem bind:group={value} name="justify" value={2}>(label)</RadioItem>
	</RadioGroup>
</div> -->
{#if showSubMenuBox}
	<TabGroup justify="justify-end">
		<Tab bind:group={tabSet} name="tab1" value={0}>(label)</Tab>
		<Tab bind:group={tabSet} name="tab2" value={1}>(label)</Tab>
		<Tab bind:group={tabSet} name="tab3" value={2}>(label)</Tab>
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			{#if tabSet === 0}
				(tab panel 1 contents)
			{:else if tabSet === 1}
				(tab panel 2 contents)
			{:else if tabSet === 2}
				(tab panel 3 contents)
			{/if}
		</svelte:fragment>
	</TabGroup>
{/if}

<style>
</style>
