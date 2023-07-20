// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
import PocketBase from 'pocketbase';
// import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
// export const pb = new PocketBase(PUBLIC_POCKETBASE_URL);
declare global {
	namespace App {
		interface Locals {
			pb: PocketBase;
			user: string;
		}
	}
}

export {};
