import { writable } from 'svelte/store';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';
import PocketBase from 'pocketbase';
export const pb = new PocketBase(PUBLIC_POCKETBASE_URL);
export const pbPort = PUBLIC_POCKETBASE_URL;
export const pbAPI = pbPort + '/api/collections/';
export const pbImgAPI = pbPort + '/api/files/';
export const writableTrSort = writable('');
export const writableCoinId = writable('');
export const writablePriceValue = writable('');
export const currentUser = writable(pb.authStore.model);
export const siteDomain = 'fynx.cc'; //서브도메인 적용시 로직 추가할것...
pb.autoCancellation(false);
export const getSiteInfo = async (fld?: string) => {
	const site = await pb.collection('sites').getFirstListItem('domain="' + siteDomain + '"');
	return fld ? site[fld] : site;
};
export const getMenuList = async () => {
	const siteMenu = await pb.collection('menus').getFullList({
		sort: 'code',
		filter: 'active = true && code < 100'
	});
	return siteMenu;
};
export const getUserInfo = async (id: string) => {
	const response = await fetch(pbAPI + `users/records/${id}`);
	return await response.json();
};
export const getCoinInfo = async (id: string) => {
	const response = await fetch(pbAPI + `coins/records/${id}`);
	return await response.json();
};
export const resetTimer = (): void => {
	document.getElementById('btnTimer')?.click();
};
export const addCommas = (num: number): string => {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
export const setInitAmount = (): void => {
	const inputQuantity = document.getElementById('quantity') as HTMLInputElement;
	inputQuantity.value = '';
	const lastCalcs = document.getElementsByClassName('lastCalc');
	for (let i = 0; i < lastCalcs.length; i++) {
		const lastCalc = lastCalcs[i] as HTMLInputElement;
		lastCalc.value = '0';
	}
};
