// vite.config.js
import { sveltekit } from '@sveltejs/kit/vite';

export default {
	plugins: [sveltekit()],
	server: {
		fs: {
			strict: false,
			allow: ['..']
		}
	},
	resolve: {
		alias: {
			'@': '/src'
		},
		extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.svelte']
	}
};
