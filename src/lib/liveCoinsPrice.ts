// import { pb, getCoinsList } from '$lib/config';

// const updateLiveCoinsPrice = async (): Promise<void> => {
// 	console.log('start console');
// 	const api_usdt = 'https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD';
// 	const siteCoinsList = await getCoinsList();
// 	try {
// 		for (const siteCoinObj of siteCoinsList) {
// 			const coinObj = siteCoinObj.expand.coin;
// 			const coinName = Array.isArray(coinObj)
// 				? coinObj[0].name
// 				: coinObj?.name || 'defaultCoinName';
// 			const _coinName = coinName.includes('_')
// 				? coinName.substring(0, coinName.indexOf('_'))
// 				: coinName;
// 			const api_coins = 'https://api.bithumb.com/public/orderbook/' + _coinName;
// 			const api_url = _coinName === 'USDT' ? api_usdt : api_coins;
// 			const response = await fetch(api_url);
// 			const data = await response.json();
// 			const price = _coinName === 'USDT' ? data[0]['basePrice'] : data['data']['bids'][0]['price'];
// 			// const price = data[0]['basePrice'];
// 			if (siteCoinObj.price !== price) {
// 				await pb.collection('siteCoins').update(siteCoinObj.id, { price: price });
// 				const data = {
// 					name: coinName,
// 					price: price
// 				};
// 				await pb.collection('coinPriceLog').create(data);
// 			}
// 			console.log(coinName, price);
// 		}
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// const updateLiveCoinsPrice2 = () => {
// 	console.log('start console.log');
// };

// // 주기적으로 코인시세 업데이트 함수 실행
// const updateInterval = 10000;
// export const setLiveCoinsPrice = setInterval(updateLiveCoinsPrice2, updateInterval);
