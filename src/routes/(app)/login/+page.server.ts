import { API_URL } from '$env/static/private';
import { loginSchema } from '$lib/schemas';
import { refreshXSRFToken, useSetCookies } from '$lib/utils/useSetCookies';
import { fail, redirect } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { setError, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// Server API:
	const form = await superValidate(zod(loginSchema));

	return { form };
};

export const actions = {
	default: async ({ cookies, request, fetch, url }) => {
		const form = await superValidate(request, zod(loginSchema));

		if (!form.valid) {
			// Clear passwords since we shouldn't return them in the response
			form.data.password = '';
			return fail(400, { form });
		}

		const resp = await fetch(`${API_URL}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({ ...form.data }),
		});

		const respData = await resp.json();

		// HTTP 200 is returned on login, if that's not the
		// response status, an error occurred.
		if (resp.status !== 200) {
			if (resp.status === 419) {
				await refreshXSRFToken(cookies);
				return setError(
					form,
					'name',
					'Login failed. Please try again. If login continues to fail, clear all site data and try again.'
				);
			}
			// Set the errors as returned from the server. setError is the "proper" way to do this,
			// but I don't want to loop through multiple things, and username existing is the only
			// expected error, but may not be the only returned error in some edges cases I can't
			// think of atm.
			form.errors = respData.errors;

			// Clear passwords since we shouldn't return them in the response
			form.data.password = '';
			return fail(resp.status, { form });
		}

		// All faliure states have been handled, set the new cookies after logging in
		await useSetCookies(resp.headers.getSetCookie(), cookies);

		const redirectTo = url.searchParams.get('redirectTo') ?? '/profile';
		throw redirect(303, `/${redirectTo.slice(1)}`);
	},
} satisfies Actions;
