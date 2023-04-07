/* eslint-disable import/no-extraneous-dependencies */
/** The above disable stops eslint from complaining about
 * vite and vitejs/plugin-react being listed in devDependencies
 */

/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: { host: '0.0.0.0' },
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./src/setupTests.ts'],
	},
	resolve: {
		alias: [
			{
				find: '@',
				replacement: fileURLToPath(new URL('./src', import.meta.url)),
			},
			{
				find: '@lib',
				replacement: fileURLToPath(
					new URL('./src/lib', import.meta.url)
				),
			},
			{
				find: '@types',
				replacement: fileURLToPath(
					new URL('./src/types', import.meta.url)
				),
			},
		],
	},
});
