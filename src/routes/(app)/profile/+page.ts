import type { PageLoad } from './$types';
import { PUBLIC_API_URL } from '$env/static/public';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ fetch, data }) => {
	// we only use this endpoint for the api
	// and don't need to see the page

	const resp = await fetch(`${PUBLIC_API_URL}/v1/user/lists`, {
		headers: { Accept: 'application/json' },
		credentials: 'include',
	});

	const lists = await resp.json();

	if (resp.status !== 200) {
		error(resp.status, lists.message);
	}

	return { lists, title: 'Meow', emailUpdateForm: data.emailUpdateForm, passwordUpdateForm: data.passwordUpdateForm };
};
