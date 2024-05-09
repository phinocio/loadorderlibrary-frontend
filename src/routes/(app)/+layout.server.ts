import { refreshXSRFToken } from '$lib/utils/useSetCookies';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
	if (!cookies.get('XSRF-TOKEN')) {
		await refreshXSRFToken(cookies);
	}

	return {
		user: locals.user,
	};
};
