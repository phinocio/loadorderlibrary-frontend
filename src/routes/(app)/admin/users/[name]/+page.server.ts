import { API_URL } from '$env/static/private';
import { error, fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { message, superValidate } from 'sveltekit-superforms/server';
import { adminPasswordUpdateSchema } from '$lib/schemas';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
	// Different schemas, so no id required.
	const passwordUpdateForm = await superValidate(zod(adminPasswordUpdateSchema));

	const resp = await fetch(`${API_URL}/v1/admin/users/${params.name}`, {
		headers: { Accept: 'application/json' },
		credentials: 'include',
	});

	if (resp.status !== 200) {
		if (resp.status === 404) {
			error(404, 'User does not exist');
		}
		error(500, 'Something went wrong fetching users');
	}

	// Return them both
	return { user: await resp.json(), passwordUpdateForm };
};

export const actions = {
	adminUpdatePassword: async ({ fetch, request, params }) => {
		const passwordUpdateForm = await superValidate(request, zod(adminPasswordUpdateSchema));

		if (!passwordUpdateForm.valid) {
			// Clear passwords since we shouldn't return them in the response
			passwordUpdateForm.data.password = '';
			passwordUpdateForm.data.password_confirmation = '';

			return fail(400, { passwordUpdateForm });
		}

		try {
			const resp = await fetch(`${API_URL}/v1/admin/users/${params.name}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({ ...passwordUpdateForm.data, _method: 'put' }),
			});

			const respData = await resp.json();

			// HTTP 200 is returned on update, if that's not the
			// response status, an error occurred.
			if (resp.status !== 200) {
				// Set the errors as returned from the server. setError is the "proper" way to do this,
				// but I don't want to loop through multiple things, and username existing is the only
				// expected error, but may not be the only returned error in some edges cases I can't
				// think of atm.
				passwordUpdateForm.errors = respData.errors;

				// Clear passwords since we shouldn't return them in the response
				passwordUpdateForm.data.password = '';
				passwordUpdateForm.data.password_confirmation = '';
				return fail(resp.status, { passwordUpdateForm });
			}

			return message(passwordUpdateForm, 'Password successfully updated!');
		} catch (err: unknown) {
			throw error(500, 'Something went wrong.');
		}
	},
} satisfies Actions;
