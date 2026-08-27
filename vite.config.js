import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		tanstackRouter({ autoCodeSplitting: true }),
		viteReact(),
		tailwindcss(),
	],
	test: {
		globals: true,
		environment: "jsdom",
	},
	server: {
		host: true,
		allowedHosts: ["lol.phinoc.io"],
	},
	resolve: {
		alias: {
			"@": resolve(import.meta.dirname, "./src"),
		},
	},
});
