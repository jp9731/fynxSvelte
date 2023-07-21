import { pb } from '$lib/config';
import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const coinLog = async () => await pb.collection('tradeCoinLog').getOne(params.id);
	const logInfo = await coinLog();
	const coinInfo = async () => await pb.collection('coins').getOne(logInfo.coin);
	const sellerInfo = async () => await pb.collection('users').getOne(logInfo.seller);
	const buyerInfo = async () => await pb.collection('users').getOne(logInfo.buyer);
	return {
		logInfo,
		coinInfo: coinInfo(),
		sellerInfo: sellerInfo(),
		buyerInfo: buyerInfo()
	};
}) satisfies PageLoad;
