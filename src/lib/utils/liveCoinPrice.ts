// import { onMount } from 'svelte';
// import PocketBase from 'pocketbase';
// const pb = new PocketBase('http://127.0.0.1:8090');
import { pb, siteDomain, getSiteInfo } from '$lib/config.server';

export interface CoinsArr {
	name: string;
	subName: string;
	logo: string;
	price: number;
	id: string;
}
export const siteCoinsArr: CoinsArr[] = [];

const updateLiveCoinsPrice = async () => {
	const siteInfo = await getSiteInfo('domain', siteDomain);
	const siteId = siteInfo['id'];
	const siteCoins = await pb.collection('siteCoins').getFullList({
		sort: 'code',
		filter: 'site = "' + siteId + '" && active = true'
	});
	const logo_src = 'http://local:8090/api/files/coins/';
	const api_usdt = 'https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD';
	const response_usdt = await fetch(api_usdt);
	const data_usdt = await response_usdt.json();
	const usdt_price = Math.round(data_usdt[0]['basePrice']);
	for (const coin of siteCoins) {
		const coins = await pb.collection('coins').getFirstListItem('id="' + coin.coin + '"');
		const coinName = coins.name.split('_');
		const api_coin = 'https://api.bithumb.com/public/orderbook/' + coinName[0];
		const response_coin = await fetch(api_coin);
		const data_coins = await response_coin.json();
		const coin_price = Math.round(data_coins['data']['bids'][0]['price']);

		const livePrice = coin.name === 'USDT' ? usdt_price : coin_price;
		siteCoinsArr.push({
			name: coinName[0],
			subName: coinName[1],
			logo: logo_src + coins.id + '/' + coins.logo + '?thumb=100x100&token=',
			price: livePrice,
			id: coin.id
		});
		if (coin.price !== livePrice) {
			await pb.collection('siteCoins').update(coin.id, { price: livePrice });
		}
	}
};
// const updateInterval = 10000;
// setInterval(updateLiveCoinsPrice, updateInterval);

// onMount(() => {
// 	getCoinsArr();
// });

// 일정 주기마다 API를 호출하여 코인 시세를 업데이트하는 함수
// export async function updateLiveCoinsPrice2(): Promise<void> {
// 	try {
// 		// API 호출하여 코인 시세 가져오기
// 		const api_usdt = 'https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD';
// 		const response_usdt = await fetch(api_usdt);
// 		const data_usdt = await response_usdt.json();
// 		const usdt_price = data_usdt[0]['basePrice'];
// 		for (const coin of siteCoinsArr) {
// 			const api_coins = 'https://api.bithumb.com/public/orderbook/' + coin.name;
// 			const response_coins = await fetch(api_coins);
// 			const data_coins = await response_coins.json();
// 			const coins_price = data_coins['data']['bids'][0]['price'];
// 			coin.price = coin.name === 'USDT' ? Math.round(usdt_price) : Math.round(coins_price);
// 			const siteCoin = await pb.collection('siteCoins').getOne(coin.id);
// 			// 가져온 코인 시세의 값이 다를 때 배열과 DB 업데이트
// 			if (coin.price !== siteCoin.price) {
// 				await pb.collection('siteCoins').update(coin.id, { price: coin.price });
// 				// const data = {
// 				// 	coin: coin.id,
// 				// 	price: coin.price
// 				// };
// 				// await pb.collection('coinsPrice').create(data);
// 			}
// 		}
// 	} catch (error) {
// 		console.log(error);
// 	}
// }

// 주기적으로 코인시세 업데이트 함수 실행
// const updateInterval = 10000;
// setInterval(updateLiveCoinsPrice, updateInterval);
