import { pb } from '$lib/config';
import type { PageLoad } from './$types';

export const load = (async () => {
	const coinsList = await pb.collection('coins').getFullList({
		sort: 'code',
		filter: 'active = true'
	});
	return { coinsList };
}) satisfies PageLoad;
