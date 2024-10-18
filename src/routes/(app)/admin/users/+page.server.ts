import type { PageServerLoad } from './$types';

import { API_URL } from '$env/static/private';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
	const resp = await fetch(`${API_URL}/v1/admin/users`, {
		headers: { Accept: 'application/json' },
		credentials: 'include',
	});

	if (resp.status !== 200) {
		if (resp.status === 404) {
			error(404, 'User not found.');
		}
		error(resp.status, await resp.text());
	}

	return { users: await resp.json() };
};
