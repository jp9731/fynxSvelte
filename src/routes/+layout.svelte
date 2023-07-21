<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import './app.css';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import AccountCircle from 'svelte-material-icons/AccountCircle.svelte';
	import MenuBox from '$lib/components/MenuBox.svelte';
	import LogoutTimer from '$lib/components//LogoutTimer.svelte';
	import { beforeUpdate } from 'svelte';
	import { page } from '$app/stores';
	import { writableTrSort, writableCoinId } from '$lib/config';
	beforeUpdate(() => {
		writableTrSort.set($page.url.searchParams.get('trSort') ?? '');
		writableCoinId.set($page.url.searchParams.get('coinId') ?? '');
	});
</script>

<AppShell
	regionPage="relative"
	slotPageHeader="sticky top-0 z-10"
	slotSidebarLeft="bg-surface-900"
	slotPageFooter="bg-surface-900 z-10"
>
	<svelte:fragment slot="pageHeader">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<div class="paddingLeft320">
					<div id="user-box">
						<AccountCircle />
						<span class="user-cash">2,002,340</span>
					</div>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LogoutTimer />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<div class="paddingLeft320">
		<div id="container-box">
			<slot />
		</div>
	</div>
	<MenuBox />
</AppShell>

<style>
	.paddingLeft320 {
		padding-left: 320px;
	}
	#container-box {
		position: relative;
		max-width: 800px;
		width: 100%;
		height: 100%;
		padding: 15px;
		padding-bottom: 150px;
	}
	#user-box {
		display: flex;
		justify-content: start;
		align-items: center;
		font-size: 2rem;
	}
	#user-box .user-cash {
		margin-left: 10px;
		font-size: 1.25rem;
	}
	@media (max-width: 400.98px) {
	}
	@media (max-width: 1020.98px) {
		.paddingLeft320 {
			padding-left: 0px;
		}
		#container-box {
			margin: 0 auto;
		}
	}
</style>
