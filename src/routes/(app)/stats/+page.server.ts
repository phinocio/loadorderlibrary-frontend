import { API_URL } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const route = `${API_URL}/v1/stats`;

	const resp = await fetch(route, {
		headers: { Accept: 'application/json' },
	});

	if (resp.status !== 200) {
		if (resp.status === 404) {
			error(404, 'List not found');
		}
		error(resp.status, await resp.text());
	}

	return {
		stats: await resp.json(),
	};
};
