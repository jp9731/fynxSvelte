import { pb } from '$lib/config';
import type { PageLoad } from './$types';

export const load = (async ({ url }) => {
	const coinId = String(url.searchParams.get('coinId'));
	const coinInfo = async () => await pb.collection('coins').getOne(coinId);
	return {
		coinInfo: coinInfo()
	};
}) satisfies PageLoad;
