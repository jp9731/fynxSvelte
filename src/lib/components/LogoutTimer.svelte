<script lang="ts">
	import { onMount } from 'svelte';
	import Clock from 'svelte-material-icons/Clock.svelte';
	import { Toast, toastStore } from '@skeletonlabs/skeleton';
	import iconLogout from '$lib/images/icon_logout.png';

	const logoutLimitedTime = 600; // 10분
	let logoutTime = logoutLimitedTime;
	const setLogoutTimer = (time: number): string => {
		if (time < 1) setLogout();
		const ToastSettings = {
			message:
				time + '초 후 로그아웃 됩니다. 로그인 시간을 연장하시려면 [시간 연장] 버튼을 클릭하세요.',
			timeout: 3000,
			action: {
				label: '시간 연장',
				response: () => timerReset()
			}
		};
		if (time === 60 || time === 30 || time === 10) {
			toastStore.trigger(ToastSettings);
		}
		let min, _min, sec, _sec;
		min = parseInt(String(time / 60));
		sec = time % 60;
		_min = min > 9 ? min : String('0' + min);
		_sec = sec > 9 ? sec : String('0' + sec);
		return _min + ':' + _sec;
	};

	let logoutTimer: NodeJS.Timeout;
	onMount(() => {
		logoutTimer = setInterval(() => {
			setLogoutTimer;
			logoutTime--;
		}, 1000);
	});

	const timerReset = (): void => {
		logoutTime = logoutLimitedTime;
	};

	const setLogout = (): void => {
		clearInterval(logoutTimer);
		console.log('logout');
	};

	const callLogout = (): void => {
		const LogoutSettings = {
			message: '로그아웃 하시겠습니까?',
			action: {
				label: 'Logout',
				response: () => setLogout()
			}
		};
		toastStore.trigger(LogoutSettings);
	};
</script>

<div id="logout-box">
	<button id="btnTimer" on:click={timerReset}>
		<Clock />
		<span class="timer">{setLogoutTimer(logoutTime)}</span>
	</button>
	<button id="btnIconLogout" on:click={callLogout}>
		<img src={iconLogout} class="icon-logout" alt="logout" />
	</button>
</div>

<Toast position="t" />

<style>
	#logout-box {
		font-size: 1.5rem;
		display: flex;
		align-items: center;
	}
	#btnTimer {
		display: flex;
		align-items: center;
	}
	.timer {
		font-size: 1.25rem;
		margin-left: 5px;
	}
	#btnIconLogout {
		margin-left: 10px;
	}
	.icon-logout {
		min-width: 40px;
		max-width: 40px;
	}
</style>
