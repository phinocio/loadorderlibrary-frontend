import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		csp: {
			directives: {
				'script-src': ['self'],
				'style-src': ['self'],
				'img-src': ['self'],
				'frame-src': ['none'],
				'frame-ancestors': ['none'],
			},
		},
		adapter: adapter(),
	},
};

export default config;
