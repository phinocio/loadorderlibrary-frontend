import { message, setError, superValidate, withFiles } from 'sveltekit-superforms/server';
import { uploadSchema } from '$lib/schemas';
import { API_URL } from '$env/static/private';
import { fail, type Actions, redirect, error } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { refreshXSRFToken } from '$lib/utils/useSetCookies';

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
	default: async ({ cookies, request, fetch }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(uploadSchema));

		if (!form.valid) {
			return fail(400, withFiles({ form }));
		}

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
			const err = await resp.json();

			if (resp.status === 419) {
				await refreshXSRFToken(cookies);
				return message(
					form,
					`Error uploading list. Please clear site data, login again, and try uploading again. Additionally, you have been logged out. ERROR: ${err.message}`,
					{
						status: resp.status,
					},
				);
			}

			return message(form, err, {
				status: resp.status,
			});
		}

		const data = await resp.json();

		redirect(303, `/lists/${data.data.slug}`);
	},
} satisfies Actions;
