import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { API_URL } from '$env/static/private';
import { useSetCookies } from '$lib/utils/useSetCookies';

export const load: PageServerLoad = async () => {
	// we only use this endpoint for the api
	// and don't need to see the page
	throw redirect(302, '/');
};

export const actions: Actions = {
	default: async ({ cookies, fetch, locals }) => {
		const resp = await fetch(`${API_URL}/logout`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			credentials: 'include',
		});

		if (resp.status !== 204) {
			console.error('Logout failed somehow');
			const data = await resp.json();
			return fail(resp.status, { incorrect: true, errMessage: data.message });
		}

		// Set the new cookies after logging out
		await useSetCookies(resp.headers.getSetCookie(), cookies);
		locals.user = null;

		throw redirect(303, '/');
	},
};
