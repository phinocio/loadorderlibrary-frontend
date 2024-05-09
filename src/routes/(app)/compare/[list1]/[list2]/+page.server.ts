import { API_URL } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const route = `${API_URL}/v1/compare/${params.list1}/${params.list2}`;

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
		comparison: await resp.json(),
	};
};
