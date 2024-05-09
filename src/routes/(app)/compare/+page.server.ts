import { API_URL } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	// TODO: This should be made a specific /comparison route that also returns private lists of the logged in user.
	const route = `${API_URL}/v1/compare`;

	const resp = await fetch(route, {
		headers: { Accept: 'application/json' },
		credentials: 'include',
	});

	if (resp.status !== 200) {
		if (resp.status === 404) {
			error(404, 'One or both lists not found');
		}
		error(resp.status, await resp.text());
	}

	return {
		lists: await resp.json(),
	};
};
