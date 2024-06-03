import { API_URL } from '$env/static/private';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
	const route = `${API_URL}/v1/admin/lists`;

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

	return {
		lists: await resp.json(),
	};
};
