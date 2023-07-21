// import { pb } from '$lib/config';
import PocketBase from 'pocketbase';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

export const actions: Actions = {
	listing: async ({ request }) => {
		// console.log(locals);
		const pb = new PocketBase(PUBLIC_POCKETBASE_URL);
		const data = await request.formData();
		const trSort = data.get('trSort');
		const getSeller = trSort === 'sell' ? data.get('seller') : '';
		const getBuyer = trSort === 'buy' ? data.get('buyer') : '';
		const getSellFee = trSort === 'sell' ? data.get('sellFee') : '';
		const getBuyFee = trSort === 'buy' ? data.get('buyFee') : '';
		const getSWallet = trSort === 'sell' ? data.get('sWallet') : '';
		const getBWallet = trSort === 'buy' ? data.get('bWallet') : '';
		const getSAmount = trSort === 'sell' ? data.get('sAmount') : '';
		const getBAmount = trSort === 'buy' ? data.get('bAmount') : '';
		const serverTime = new Date();
		const coinLog = {
			trSort: trSort,
			coin: data.get('coin'),
			price: data.get('price'),
			addRate: data.get('addRate'),
			quantity: data.get('quantity'),
			amount: data.get('amount'),
			seller: getSeller,
			buyer: getBuyer,
			sellFee: getSellFee,
			buyFee: getBuyFee,
			sAmount: getSAmount,
			bAmount: getBAmount,
			sWallet: getSWallet,
			bWallet: getBWallet,
			status: '0',
			history: `0:${serverTime}/`
		};
		// const record = await pb.collection('tradeCoinLog').create(coinLog);
		const record = await pb.collection('tradeCoinLog').create(coinLog);
		throw redirect(303, '../?trSort=' + trSort);
	}
	// update: async ({ request }) => {
	// 	// TODO register the user
	// },
	// delete: async ({ request }) => {
	// 	// TODO register the user
	// },
	// offer: async ({ request }) => {
	// 	// TODO register the user
	// },
	// cancel: async ({ request }) => {
	// 	// TODO register the user
	// }
};
