import { API_URL } from '$env/static/private';
import type { PageServerLoad, Actions } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { gameSchema } from '$lib/schemas';
import { error, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
	const route = `${API_URL}/v1/games`;

	const resp = await fetch(route, {
		headers: { Accept: 'application/json' },
		credentials: 'include',
	});

	if (resp.status !== 200) {
		if (resp.status === 404) {
			error(404, 'List not found');
		}
		error(resp.status, await resp.text());
	}

	const form = await superValidate(zod(gameSchema));

	return {
		games: await resp.json(),
		form,
	};
};

export const actions = {
	default: async ({ request, fetch }) => {
		const form = await superValidate(request, zod(gameSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const resp = await fetch(`${API_URL}/v1/games`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({ ...form.data }),
			});

			const respData = await resp.json();

			if (resp.status !== 201) {
				form.errors = respData.errors;
				return fail(resp.status, { form });
			}
		} catch (err: unknown) {
			error(500, 'Something went wrong trying to create a game.');
		}
	},
} satisfies Actions;
