import { API_URL } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const resp = await fetch(`${API_URL}/v1/admin/lists/${params.slug}`, {
		headers: { Accept: 'application/json' },
		credentials: 'include',
	});

	if (resp.status !== 200) {
		if (resp.status === 404) {
			error(404, 'List does not exist');
		}
		error(500, 'Something went wrong fetching the list');
	}

	// Return them both
	return { list: await resp.json() };
};
