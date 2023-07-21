<script lang="ts">
	import type { PageData } from './$types';
	import { writableTrSort, addCommas, setInitAmount } from '$lib/config';
	import CoinTitle from '$lib/components/CoinTitle.svelte';
	import { SlideToggle, popup, storePopup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { scale, fly, fade, slide } from 'svelte/transition';
	export let data: PageData;
	const coinInfo = data.coinInfo;
	$: trSortUserFld = $writableTrSort === 'sell' ? 'seller' : 'buyer';
	$: trSortColor = $writableTrSort === 'sell' ? 'variant-ghost-primary' : 'variant-ghost-warning';
	$: trSortWalletFld = $writableTrSort === 'sell' ? 'sWallet' : 'bWallet';
	$: trSortFeeFld = $writableTrSort === 'sell' ? 'sellFee' : 'buyFee';
	$: trSortAmountFld = $writableTrSort === 'sell' ? 'sAmount' : 'bAmount';
	$: trSortPriceTxt = $writableTrSort === 'sell' ? '판매가' : '구매가';
	$: trSortQuantityTxt = $writableTrSort === 'sell' ? '판매수량' : '구매수량';
	$: trSortAmountTxt = $writableTrSort === 'sell' ? '예상수령액' : '예상구매액';
	$: trSortFee = $writableTrSort === 'sell' ? coinInfo.sellFee : coinInfo.buyFee;
	$: trSortSymbol = $writableTrSort === 'sell' ? '-' : '+';
	$: trSortTxt = $writableTrSort === 'sell' ? '판매' : '구매';
	$: trSortCalcClass = $writableTrSort === 'sell' ? 'lastCalcSell' : 'lastCalcBuy';
	const elmMarginTop = 'mt-6';
	let setRate: boolean = false;
	const setAddRate = (): void => {
		quantityValue = '';
		const liveCoinPriceTxt = document.querySelector('#liveCoinPriceTxt') as HTMLInputElement;
		if (setRate === false) {
			liveCoinPriceTxt.classList.add('smaller');
			liveCoinPriceTxt.classList.remove('blink');
		} else {
			liveCoinPriceTxt.classList.add('blink');
			liveCoinPriceTxt.classList.remove('smaller');
		}
		initRate();
	};
	const setAmountValue = () => {
		// const inputQuantity = document.getElementById('quantity') as HTMLInputElement;
		amountValue = Number(liveCoinPrice2) * Number(quantityValue);
		// (document.getElementById('amount') as HTMLInputElement).innerText = addCommas(amountValue);
		feeValue = (amountValue * trSortFee) / 100;
		totalAmountValue = $writableTrSort === 'sell' ? amountValue - feeValue : amountValue + feeValue;
	};
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	const popupFeatured: PopupSettings = {
		event: 'click',
		target: 'popupFeatured',
		placement: 'left'
	};
	const plusRate = () => {
		addRateVal += 0.5;
		liveCoinPrice2 = liveCoinPrice + (liveCoinPrice * addRateVal) / 100;
		setInitAmount();
	};
	const minusRate = () => {
		addRateVal -= 0.5;
		liveCoinPrice2 = liveCoinPrice + (liveCoinPrice * addRateVal) / 100;
		setInitAmount();
	};
	const initRate = () => {
		addRateVal = 0.0;
		liveCoinPrice2 = liveCoinPrice;
		setInitAmount();
	};
	let liveCoinPrice = 1350;
	let quantityValue = '';
	$: addRateVal = 0;
	$: liveCoinPrice2 = liveCoinPrice;
	$: amountValue = 0;
	$: feeValue = 0;
	$: totalAmountValue = 0;
</script>

<form method="POST" action="?/listing">
	<input type="hidden" name={trSortUserFld} value="" />
	<input type="hidden" name="trSort" class="input" value={$writableTrSort} />
	<label class="label">
		<span class="title">지갑주소</span>
		<input
			class="input"
			name={trSortWalletFld}
			type="text"
			placeholder={trSortWalletFld}
			required
		/>
	</label>
	<div class="alert {trSortColor} {elmMarginTop}" id="coinBox">
		<div class="flex justify-between items-center">
			<CoinTitle
				coinId={coinInfo.id}
				coinLogo={coinInfo.logo}
				coinName={coinInfo.name}
				flexColumnName={true}
			/>
			<div class="flex justify-center items-center ms-5">
				<span class="chip {trSortColor}">{trSortPriceTxt}</span>
				<div class="ms-3 flex flex-col justify-center">
					<strong
						id="liveCoinPriceTxt"
						class="text-tertiary-500 liveCoinPriceTxt _{coinInfo.name} blink"
						>{addCommas(liveCoinPrice)}</strong
					>
					{#if setRate === true}
						<strong id="liveCoinPriceTxt2">{addCommas(liveCoinPrice2)}</strong>
					{/if}
				</div>
			</div>
		</div>
		<input id="coin" name="coin" type="hidden" value={coinInfo.id} />
		<input id="price" name="price" type="hidden" value={liveCoinPrice2} />
	</div>
	<li><small class="text-tertiary-300">실제 거래에서는 거래시점의 현재가가 적용됩니다.</small></li>

	<div class="flex justify-between items-center mt-2">
		<SlideToggle
			name="toggleAddRate"
			bind:checked={setRate}
			active="bg-tertiary-500"
			size="sm"
			on:click={setAddRate}>지정요율 적용</SlideToggle
		>
		<button type="button" class="btn btn-sm variant-ringed" use:popup={popupFeatured}>?</button>
		<div class="card p-4 w-72 shadow-xl" data-popup="popupFeatured">
			<small
				>{trSortPriceTxt}에 임의의 요율을 가감할 수 있습니다.<br />
				∴ {trSortPriceTxt} ± ({trSortPriceTxt} × 지정요율(%))
			</small>
		</div>
	</div>
	{#if setRate === true}
		<div transition:scale={{ duration: 300 }} class="btn-group flex justify-center mt-2">
			<button type="button" class="btn btn-sm variant-ringed-secondary btnRate" on:click={minusRate}
				>-</button
			>
			<input
				class="input inputRate"
				name="addRate"
				id="addRate"
				value={addRateVal.toFixed(1) + ' %'}
				readonly
			/>
			<button type="button" class="btn btn-sm variant-ringed-secondary btnRate" on:click={plusRate}
				>+</button
			>
		</div>
	{/if}
	<label class="label {elmMarginTop}">
		<span class="title">{trSortQuantityTxt}</span>
		<input
			id="quantity"
			class="input"
			name="quantity"
			type="number"
			bind:value={quantityValue}
			placeholder={trSortQuantityTxt}
			on:keyup={setAmountValue}
			required
		/>
		<li><small class="text-error-300">전송 가스비(수수료)는 보내는사람 부담입니다.</small></li>
		{#if $writableTrSort === 'buy'}
			<li><small class="text-surface-300">보유 캐시: </small></li>
			<li><small class="text-surface-300">구매가능수량: <kbd class="kbd">6,400</kbd></small></li>
		{/if}
	</label>
	<div class="mt-4">
		<span class="title">{trSortAmountTxt} 계산</span>

		<div class="logo-cloud grid-cols-3 gap-1">
			<div class="logo-item">
				<li><small>거래금액</small></li>
				<li>
					<input class="input lastCalc {trSortCalcClass}" value={addCommas(amountValue)} readonly />
					<input type="hidden" class="lastCalc" name="amount" value={amountValue} />
				</li>
			</div>
			<div class="logo-item">
				<li><small>수수료({trSortFee}%)</small></li>
				<li>
					<input
						class="input lastCalc {trSortCalcClass}"
						value={trSortSymbol + ' ' + addCommas(feeValue)}
						readonly
					/>
					<input type="hidden" name={trSortFeeFld} value={trSortFee} />
				</li>
			</div>
			<div class="logo-item">
				<li><small>{trSortAmountTxt}</small></li>
				<li>
					<input
						class="input lastCalc {trSortCalcClass}"
						value={addCommas(Math.round(totalAmountValue))}
						readonly
					/>
					<input type="hidden" class="lastCalc" name={trSortAmountFld} value={totalAmountValue} />
				</li>
			</div>
		</div>
		<li class="text-right">
			<small class="text-surface-300">{trSortAmountTxt}은 소수점 이하를 반올림한 값입니다. </small>
		</li>
	</div>
	<div class="flex justify-end mt-5">
		<button type="submit" class="btn {trSortColor}">{trSortTxt} 등록</button>
	</div>
</form>

<style>
	#coinBox strong {
		font-size: 1.5rem;
	}
	#coinBox .smaller {
		font-size: 1rem;
	}
	form {
		color: #ccc;
	}
	form input {
		color: aliceblue;
		font-size: 1.25rem;
	}
	form .lastCalcSell {
		@apply text-primary-300;
	}
	form .lastCalcBuy {
		@apply text-warning-300;
	}
	.title {
		font-size: 0.8rem;
		@apply text-surface-400;
	}
	.btnRate {
		width: 50px;
	}
	.inputRate {
		width: 100px;
		text-align: center;
		margin: 0 5px;
	}
	li {
		list-style-type: none;
	}
	.logo-item {
		display: flex;
		flex-direction: column;
		color: #ccc;
		text-align: center;
	}
	.logo-item li {
		text-align: center;
		margin: 0 auto;
		padding: 5px;
	}
	.logo-item input {
		text-align: center;
		margin: 0 auto;
		font-size: 0.85rem;
	}
</style>
