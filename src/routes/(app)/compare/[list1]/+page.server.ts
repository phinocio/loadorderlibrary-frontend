import { API_URL } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
	const route = `${API_URL}/v1/compare`;

	const resp = await fetch(route, {
		headers: { Accept: 'application/json' },
		credentials: 'include',
	});

	if (resp.status !== 200) {
		if (resp.status === 404) {
			error(404, 'Unable to fetch all lists');
		}
		error(resp.status, await resp.text());
	}

	const resp2 = await fetch(`${API_URL}/v1/lists/${params.list1}`, {
		headers: { Accept: 'application/json' },
		credentials: 'include',
	});

	if (resp2.status !== 200) {
		if (resp2.status === 404) {
			error(404, 'Unable to fetch first list');
		}
		error(resp2.status, await resp.text());
	}

	return {
		lists: await resp.json(),
		firstList: await resp2.json(),
	};
};
