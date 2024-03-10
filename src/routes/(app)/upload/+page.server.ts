import { superValidate, withFiles } from 'sveltekit-superforms/server';
import { uploadSchema } from '$lib/schemas';
import { API_URL } from '$env/static/private';
import { fail, type Actions, redirect, error } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';

// Todo, error if games request fails.
export const load: PageServerLoad = async () => {
	// Different schemas, so no id required.
	const form = await superValidate(zod(uploadSchema));
	const resp = await fetch(`${API_URL}/v1/games`, {
		headers: { Accept: 'application/json' },
		credentials: 'include',
	});

	// Return them both
	return { games: await resp.json(), form };
};

export const actions = {
	default: async ({ request, fetch }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(uploadSchema));

		if (!form.valid) {
			return fail(400, withFiles({ form }));
		}

		let slug = '';
		try {
			const resp = await fetch(`${API_URL}/v1/lists`, {
				method: 'POST',
				headers: {
					// 'Content-Type': request.headers.get('content-type'),
					Accept: 'application/json',
				},
				credentials: 'include',
				body: formData,
			});

			if (resp.status !== 201) {
				return fail(resp.status, withFiles({ form }));
			}

			const data = await resp.json();
			slug = data.data.slug;
		} catch (err) {
			console.log('upload error occurred:', err);
			throw error(500, 'Something went wrong uploading.');
		}

		redirect(303, `/lists/${slug}`);
	},
} satisfies Actions;
