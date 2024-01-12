import { PUBLIC_API_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const route = `${PUBLIC_API_URL}/v1/lists/${params.slug}`;

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
		list: await resp.json(),
	};
};
