import type { PageServerLoad } from './$types';

import { API_URL } from '$env/static/private';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
	const resp = await fetch(`${API_URL}/v1/admin/users`, {
		headers: { Accept: 'application/json' },
		credentials: 'include',
	});

	if (resp.status !== 200) {
		error(500, 'Something went wrong fetching users');
	}

	return { users: await resp.json() };
};
