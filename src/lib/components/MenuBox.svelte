<script lang="ts">
	import { page } from '$app/stores';
	import { resetTimer } from '$lib/config';
	const siteLogoSrc = '//' + $page.url.host + '/src/lib/images/logo_fynx.png';
	const menuList = [
		{ slug: 'chart', name: 'Chart', icon: 'M22,21H2V3H4V19H6V10H10V19H12V6H16V19H18V14H22V21Z' },
		{
			slug: 'market',
			name: 'Market',
			icon: 'M8,10V13H14V18H8V21L2,15.5L8,10M22,8.5L16,3V6H10V11H16V14L22,8.5Z'
		},
		{
			slug: 'exch',
			name: 'Exch',
			icon: 'M2 12A10 10 0 1 0 12 2A10 10 0 0 0 2 12M15.6 13.72A4 4 0 0 0 16 12A4 4 0 0 0 12 8V10L8.88 7L12 4V6A6 6 0 0 1 18 12A5.9 5.9 0 0 1 17.07 15.19M6 12A5.9 5.9 0 0 1 6.93 8.81L8.4 10.28A4 4 0 0 0 8 12A4 4 0 0 0 12 16V14L15 17L12 20V18A6 6 0 0 1 6 12Z'
		},
		{
			slug: 'office',
			name: 'Office',
			icon: 'M21.1,12.5L22.5,13.91L15.97,20.5L12.5,17L13.9,15.59L15.97,17.67L21.1,12.5M10,17L13,20H3V18C3,15.79 6.58,14 11,14L12.89,14.11L10,17M11,4A4,4 0 0,1 15,8A4,4 0 0,1 11,12A4,4 0 0,1 7,8A4,4 0 0,1 11,4Z'
		},
		{
			slug: 'sys',
			name: 'Sys',
			icon: 'M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z'
		}
	];
</script>

<div id="menu-wrap">
	<div id="logo-box">
		<a href="/" on:click={resetTimer}>
			<img src={siteLogoSrc} alt="logo" />
		</a>
	</div>
	<nav id="menu-box">
		{#each menuList as siteMenu, i}
			{@const menuHref = '//' + $page.url.host + '/' + siteMenu.slug}
			{@const toSell = siteMenu.slug === 'market' ? '/coin?trSort=sell' : ''}
			<a href={i === 0 ? '/' : menuHref + toSell} on:click={resetTimer}>
				<li
					class={(i === 0 && $page.url.pathname === '/') ||
					$page.url.pathname.startsWith('/' + siteMenu.slug)
						? 'current'
						: undefined}
				>
					<svg viewBox="-5 -5 35 35">
						<path
							d={siteMenu.icon}
							fill={(i === 0 && $page.url.pathname === '/') ||
							$page.url.pathname.startsWith('/' + siteMenu.slug)
								? '#151547'
								: '#60cdf8'}
						/>
					</svg>
					<div class="menuName">
						{siteMenu.name}
					</div>
				</li>
			</a>
		{/each}
	</nav>
</div>

<style>
	#menu-wrap {
		position: fixed;
		top: 0px;
		left: 0px;
		display: flex;
		flex-direction: column;
		align-items: end;
		width: 320px;
		height: 100vh;
		background: #151547;
		z-index: 100;
	}
	#logo-box {
		width: 100%;
		padding: 25px 0;
		text-align: center;
	}
	#logo-box img {
		width: 180px;
		margin: 0 auto;
	}
	#menu-box {
		width: 220px;
	}
	#menu-box a {
		text-decoration: none;
	}
	#menu-box li {
		position: relative;
		list-style-type: none;
		height: 50px;
		line-height: 50px;
		padding-right: 15px;
		text-align: right;
		border-radius: 25px 0 0 25px;
		color: #60cdf8;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 15px;
		font-size: 1.5rem;
	}
	#menu-box li:hover {
		text-decoration: none;
		background: rgba(73, 73, 245, 0.3);
	}
	#menu-box li.current {
		background: rgba(73, 73, 245, 0.8);
		color: #151547;
	}
	#menu-box li svg {
		max-width: 50px;
		max-height: 50px;
	}
	@media (max-width: 1020.98px) {
		#menu-wrap {
			position: fixed;
			left: 0px;
			bottom: 0px;
			top: auto;
			width: 100%;
			height: 80px;
		}
		#logo-box {
			display: none;
		}
		#menu-box {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			height: 100%;
		}
		#menu-box a {
			flex-grow: 1;
			height: 100%;
		}
		#menu-box li {
			height: 100%;
			line-height: 100%;
			text-align: center;
			border-radius: 0;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 0.75rem;
		}
		#menu-box li .menuName {
			position: absolute;
			bottom: 15px;
			left: 0px;
			width: 100%;
			text-align: center;
		}
	}
</style>
