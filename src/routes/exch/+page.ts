// import type { PageLoad } from './$types';
// import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
// import PocketBase from 'pocketbase';
// // export const pb = new PocketBase(PUBLIC_POCKETBASE_URL);
// // import { pb } from '$lib/config';

// export const load = (async ({ url }) => {
// 	const pb = new PocketBase(PUBLIC_POCKETBASE_URL);
// 	const pathName = url.pathname;
// 	const coinInfo = async () => await pb.collection('coins').getOne('6g4cvir8k6o1ln3');
// 	const _coinInfo = await coinInfo();
// 	return {
// 		pathName: pathName,
// 		coinInfo: _coinInfo
// 	};
// }) satisfies PageLoad;

// export const load: PageServerLoad = async ({ locals }) => {
// 	console.log(locals);
// 	// if (!locals.pb.authStore.isValid) {
// 	// throw redirect(303, '/');
// 	// }
// };
