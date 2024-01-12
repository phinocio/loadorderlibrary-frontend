// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				name: string;
				email: string | null;
			} | null;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
