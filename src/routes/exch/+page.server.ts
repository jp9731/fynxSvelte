import type { PageServerLoad } from './$types';
// import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
// import PocketBase from 'pocketbase';
// export const pb = new PocketBase(PUBLIC_POCKETBASE_URL);

// export const load = (async ({ url }) => {
export const load = (async ({ locals, url }) => {
	// const pb = new PocketBase(PUBLIC_POCKETBASE_URL);
	// const pb = new PocketBase('http://localhost:8090');
	const pathName = url.pathname;
	// const coinInfo = async () => await locals.pb.collection('coins').getOne('6g4cvir8k6o1ln3');
	// const coinInfo = await locals.pb.collection('coins').getOne('6g4cvir8k6o1ln3');
	const tradeCoinLog = await locals.pb.collection('tradeCoinLog').getFullList({
		sort: '-created'
	});
	// const { token, record } = await locals.pb.collection('users').authWithPassword(email, password);

	return {
		pathName: pathName
		// localsPb: locals
		// tradeCoinLog: tradeCoinLog
	};
}) satisfies PageServerLoad;

// export const load: PageServerLoad = async ({ locals }) => {
// 	console.log(locals);
// 	// if (!locals.pb.authStore.isValid) {
// 	// throw redirect(303, '/');
// 	// }
// };
