import { refreshXSRFToken } from '$lib/utils/useSetCookies';
import type { LayoutServerLoad } from './$types';
import { API_URL } from '$env/static/private';

export const load: LayoutServerLoad = async ({ cookies, fetch }) => {
	if (!cookies.get('XSRF-TOKEN')) {
		await refreshXSRFToken(cookies);
	}

	const resp = await fetch(`${API_URL}/v1/user`, {
		headers: { Accept: 'application/json' },
		credentials: 'include',
	});

	if (!resp.ok) {
		return {
			user: null,
		};
	}

	const user = await resp.json();

	return {
		user: user.data ?? null,
	};
};
