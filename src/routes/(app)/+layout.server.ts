import { refreshXSRFToken } from '$lib/utils/useSetCookies';
import type { LayoutServerLoad } from './$types';
import { getUser } from '$lib/auth/user';

export const load: LayoutServerLoad = async ({ cookies, fetch }) => {
	if (!cookies.get('XSRF-TOKEN')) {
		await refreshXSRFToken(cookies);
	}

	const user = await getUser(fetch, cookies);

	return {
		user,
	};
};
