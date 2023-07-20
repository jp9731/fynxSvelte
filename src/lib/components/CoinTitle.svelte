<script lang="ts">
	import { pbImgAPI } from '$lib/config';
	import { Avatar } from '@skeletonlabs/skeleton';
	export let coinId: string;
	export let coinLogo: string;
	export let coinName: string;
	export let flexColumnWrap = false;
	export let flexColumnName = false;
</script>

<div class="flex items-center {flexColumnWrap === true ?? '_flex-column'}">
	<Avatar src={pbImgAPI + 'coins/' + coinId + '/' + coinLogo} width="w-12" rounded="rounded-full" />
	<div class="coin-name flex items-center {flexColumnName === true && '_flex-column'}">
		<h3 class="ms-3">
			{coinName.includes('_') ? coinName.substring(0, coinName.indexOf('_')) : coinName}
		</h3>
		{#if coinName.includes('_')}
			<div class="ms-2">
				<span class="badge variant-filled-surface"
					>{coinName.substring(coinName.indexOf('_') + 1)}</span
				>
			</div>
		{/if}
	</div>
</div>
