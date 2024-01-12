import { API_URL } from '$env/static/private';
import { error, fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { message, superValidate } from 'sveltekit-superforms/server';
import { emailUpdateSchema, passwordUpdateSchema } from '$lib/schemas';

export const load = async () => {
	// Different schemas, so no id required.
	const emailUpdateForm = await superValidate(emailUpdateSchema);
	const passwordUpdateForm = await superValidate(passwordUpdateSchema);

	// Return them both
	return { emailUpdateForm, passwordUpdateForm };
};

export const actions = {
	updateEmail: async ({ fetch, request, locals }) => {
		const emailUpdateForm = await superValidate(request, emailUpdateSchema);

		if (!emailUpdateForm.valid) {
			return fail(400, { emailUpdateForm });
		}

		if (emailUpdateForm.data.email === locals.user?.email) {
			return message(emailUpdateForm, 'This is already your email.');
		}

		try {
			if (!emailUpdateForm.data.email) {
				emailUpdateForm.data.email = undefined;
			}
			const resp = await fetch(`${API_URL}/user/profile-information`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({ email: emailUpdateForm.data.email ?? null, _method: 'put' }),
			});

			const respData = await resp.json();

			// HTTP 200 is returned on update, if that's not the
			// response status, an error occurred.
			if (resp.status !== 200) {
				// Set the errors as returned from the server. setError is the "proper" way to do this,
				// but I don't want to loop through multiple things, and username existing is the only
				// expected error, but may not be the only returned error in some edges cases I can't
				// think of atm.
				emailUpdateForm.errors = respData.errors;

				return fail(resp.status, { emailUpdateForm });
			}

			// Only need to update the email, saves a request to get all the new data.
			locals.user!.email = emailUpdateForm.data.email ?? null;

			return message(emailUpdateForm, 'Email successfully updated!');
		} catch (err: unknown) {
			console.log('error occurred:', err);
			throw error(500, 'Something went wrong.');
		}
	},
	updatePassword: async ({ fetch, request }) => {
		const passwordUpdateForm = await superValidate(request, passwordUpdateSchema);

		if (!passwordUpdateForm.valid) {
			// Clear passwords since we shouldn't return them in the response
			passwordUpdateForm.data.current_password = '';
			passwordUpdateForm.data.password = '';
			passwordUpdateForm.data.password_confirmation = '';

			return fail(400, { passwordUpdateForm });
		}

		try {
			const resp = await fetch(`${API_URL}/user/password`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({ ...passwordUpdateForm.data, _method: 'put' }),
			});

			const respData = await resp.json();
			console.log(resp.status);

			// HTTP 200 is returned on update, if that's not the
			// response status, an error occurred.
			if (resp.status !== 200) {
				// Set the errors as returned from the server. setError is the "proper" way to do this,
				// but I don't want to loop through multiple things, and username existing is the only
				// expected error, but may not be the only returned error in some edges cases I can't
				// think of atm.
				passwordUpdateForm.errors = respData.errors;

				// Clear passwords since we shouldn't return them in the response
				passwordUpdateForm.data.current_password = '';
				passwordUpdateForm.data.password = '';
				passwordUpdateForm.data.password_confirmation = '';
				return fail(resp.status, { passwordUpdateForm });
			}

			return message(passwordUpdateForm, 'Password successfully updated!');
		} catch (err: unknown) {
			console.log('error occurred:', err);
			throw error(500, 'Something went wrong.');
		}
	},
} satisfies Actions;
