import { API_URL } from '$env/static/private';
import { editSchema } from '$lib/schemas';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { message, setError, superValidate, withFiles } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';
import { refreshXSRFToken } from '$lib/utils/useSetCookies';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const route = `${API_URL}/v1/lists/${params.slug}`;

	const list = await fetch(route, {
		headers: { Accept: 'application/json' },
		credentials: 'include',
	});

	const games = await fetch(`${API_URL}/v1/games`, {
		headers: { Accept: 'application/json' },
		credentials: 'include',
	});

	if (list.status !== 200) {
		if (list.status === 404) {
			error(404, { message: 'List not found' });
		}

		const data = await list.json();
		error(500, { message: data.message });
	}

	const listData = await list.json();
	listData.data.game = listData.data.game.id; // Validation/editing only needs the ID
	const files = listData.data.files;
	listData.data.files = null;
	const form = await superValidate(listData.data, zod(editSchema));

	return {
		list: listData,
		files,
		games: await games.json(),
		form,
	};
};

export const actions = {
	default: async ({ cookies, request, fetch }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(editSchema));

		formData.append('_method', 'PUT');

		if (!form.valid) {
			return fail(400, withFiles({ form }));
		}

		const files = formData.getAll('files[]') as File[];
		if (files.length === 1 && files[0].size === 0) {
			formData.delete('files[]');
		}
		const resp = await fetch(`${API_URL}/v1/lists/${formData.get('slug')}`, {
			method: 'POST',
			headers: {
				// 'Content-Type': request.headers.get('content-type'),
				Accept: 'application/json',
			},
			credentials: 'include',
			body: formData,
		});

		if (resp.status !== 201) {
			const err = await resp.json();

			if (resp.status === 419) {
				await refreshXSRFToken(cookies);
				return message(form, `Error updating list. Please try again. ERROR: ${err.message}`, {
					status: resp.status,
				});
			}

			console.log(err);
			return message(form, err.message, {
				status: resp.status,
			});
		}

		redirect(303, `/lists/${formData.get('slug')}`);
	},
} satisfies Actions;
