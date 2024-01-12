import type { Actions } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { error, fail, redirect } from '@sveltejs/kit';
import { API_URL } from '$env/static/private';
import { useSetCookies } from '$lib/utils/useSetCookies';
import { registerSchema } from '$lib/schemas';

export const load = async () => {
	// Server API:
	const form = await superValidate(registerSchema);

	return { form };
};

export const actions = {
	default: async ({ cookies, request, fetch, url }) => {
		const form = await superValidate(request, registerSchema);

		if (!form.valid) {
			// Clear passwords since we shouldn't return them in the response
			form.data.password = '';
			form.data.password_confirmation = '';
			return fail(400, { form });
		}

		try {
			const resp = await fetch(`${API_URL}/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({ ...form.data }),
			});

			const respData = await resp.json();

			// HTTP 201 is returned on successfully creating a user, if that's not the
			// response status, an error occurred.
			if (resp.status !== 201) {
				// Set the errors as returned from the server. setError is the "proper" way to do this,
				// but I don't want to loop through multiple things, and username existing is the only
				// expected error, but may not be the only returned error in some edges cases I can't
				// think of atm.
				form.errors = respData.errors;

				// Clear passwords since we shouldn't return them in the response
				form.data.password = '';
				form.data.password_confirmation = '';
				return fail(resp.status, { form });
			}

			// All faliure states have been handled, set the new cookies after logging in
			await useSetCookies(resp.headers.getSetCookie(), cookies);
		} catch (err: unknown) {
			console.log('error occurred:', err);
			throw error(500, 'Something went wrong.');
		}

		const redirectTo = url.searchParams.get('redirectTo') ?? '/profile';
		throw redirect(303, `/${redirectTo.slice(1)}`);
	},
} satisfies Actions;
