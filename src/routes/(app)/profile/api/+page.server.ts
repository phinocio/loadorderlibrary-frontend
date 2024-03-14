import { API_URL } from '$env/static/private';
import { apiTokenSchema } from '$lib/schemas';
import { error, fail } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const resp = await fetch(`${API_URL}/v1/user/api-tokens`, {
		headers: {
			Accept: 'application/json',
		},
		credentials: 'include',
	});

	if (resp.status !== 200) {
		const data = await resp.json();
		error(500, { message: data.message });
	}

	const form = await superValidate(zod(apiTokenSchema));

	return { form, apiTokens: await resp.json() };
};

export const actions = {
	default: async ({ request, fetch }) => {
		// TODO log the user in
		const form = await superValidate(request, zod(apiTokenSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const resp = await fetch(`${API_URL}/v1/user/api-tokens`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({ ...form.data }),
		});

		console.log(resp);

		if (resp.status !== 200) {
			return fail(resp.status, { form });
		}

		const data = await resp.json();
		return message(form, data.token.split('|')[1]);
	},
} satisfies Actions;
