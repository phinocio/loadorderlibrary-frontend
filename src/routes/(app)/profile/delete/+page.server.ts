import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { API_URL } from '$env/static/private';
import { useSetCookies } from '$lib/utils/useSetCookies';

export const actions: Actions = {
	default: async ({ cookies, fetch, locals }) => {
		const resp = await fetch(`${API_URL}/v1/user/${locals.user?.name}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			credentials: 'include',
		});

		if (resp.status !== 204) {
			const data = await resp.json();
			return fail(resp.status, { incorrect: true, errMessage: data.message });
		}

		// Set the new cookies after logging out
		await useSetCookies(resp.headers.getSetCookie(), cookies);
		locals.user = null;

		throw redirect(303, '/');
	},
};
