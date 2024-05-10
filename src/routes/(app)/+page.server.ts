import type { PageServerLoad } from './$types';

import { API_URL } from '$env/static/private';

export const load: PageServerLoad = async ({ fetch }) => {
	const resp = await fetch(`${API_URL}/v1/lists?page[size]=5`, {
		headers: { Accept: 'application/json' },
		credentials: 'include',
	});

	return { lists: await resp.json() };
};
