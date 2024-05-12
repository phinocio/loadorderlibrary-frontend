import { API_URL } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const route = `${API_URL}/v1/lists/${params.slug}/embed/${params.file}`;

	const resp = await fetch(route, {
		headers: { Accept: 'application/json' },
		credentials: 'include',
	});

	if (resp.status !== 200) {
		if (resp.status === 404) {
			error(404, 'File not found');
		}
		error(resp.status, await resp.text());
	}

	return {
		file: await resp.json(),
	};
};
