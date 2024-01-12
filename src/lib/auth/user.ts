import { API_URL } from '$env/static/private';
import type { RequestEvent } from '@sveltejs/kit';

//TODO: Proper error handling
export async function getUser(event: RequestEvent) {
	try {
		const resp = await event.fetch(`${API_URL}/v1/user`, {
			headers: { Accept: 'application/json' },
			credentials: 'include',
		});

		const user = await resp.json();

		if (resp.status !== 200) {
			return null;
		}
		return user.data;
	} catch (error) {
		console.log(error);
	}
}
