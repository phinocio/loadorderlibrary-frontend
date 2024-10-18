import { API_URL } from '$env/static/private';
import { refreshXSRFToken } from '$lib/utils/useSetCookies';
import type { Cookies } from '@sveltejs/kit';

//TODO: Proper error handling
export async function getUser(fetch: typeof globalThis.fetch, cookies?: Cookies) {
	try {
		const resp = await fetch(`${API_URL}/v1/user`, {
			headers: { Accept: 'application/json' },
			credentials: 'include',
		});

		const user = await resp.json();

		if (resp.status !== 200) {
			if (cookies) {
				await refreshXSRFToken(cookies);
			}
			return null;
		}
		return user.data;
	} catch (error) {
		// console.log(error);
	}
}
