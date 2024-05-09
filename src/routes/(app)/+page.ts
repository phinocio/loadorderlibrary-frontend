import type { PageLoad } from './$types';

import { PUBLIC_API_URL } from '$env/static/public';

export const load: PageLoad = async ({ fetch }) => {
	const resp = await fetch(`${PUBLIC_API_URL}/v1/lists?page[size]=5`, {
		headers: { Accept: 'application/json' },
		credentials: 'include',
	});

	return { lists: await resp.json() };
};
