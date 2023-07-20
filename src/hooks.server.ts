import { pb } from '$lib/config';
// import PocketBase from 'pocketbase';
// import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
// import { redirect } from '@sveltejs/kit';

import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// if (event.url.pathname.startsWith('/exch'))
	event.locals.pb = pb;
	// event.locals.pb = new PocketBase('http://localhost:8090');
	// const userInfo = async (event:any) => await event.locals.pb.collection('users').getOne(event);

	// event.lacals.something = 'Whatever I want!';

	const response = resolve(event);
	return response;
};
