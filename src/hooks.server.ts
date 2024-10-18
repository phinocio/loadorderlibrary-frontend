import { API_URL } from '$env/static/private';
import { handleLoginRedirect } from '$lib/utils/handleLoginRedirect';
import { refreshXSRFToken } from '$lib/utils/useSetCookies';
import { redirect, type Handle, type HandleFetch, type HandleServerError } from '@sveltejs/kit';
import { getUser } from '$lib/auth/user';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/login') || event.url.pathname.startsWith('/register')) {
		const user = await getUser(event);

		if (user) {
			redirect(303, '/profile');
		}
	}

	// Auth protected routes
	if (event.url.pathname.startsWith('/profile') || event.url.pathname.startsWith('/admin')) {
		const user = await getUser(event);
		if (!user) {
			redirect(303, handleLoginRedirect(event.url));
		}
	}

	if (event.url.pathname.startsWith('/admin')) {
		const user = await getUser(event);

		if (!user) {
			redirect(303, handleLoginRedirect(event.url));
		}

		if (!user.admin) {
			redirect(303, '/');
		}
	}

	if (/^\/lists\/.+\/embed/i.test(event.url.pathname)) {
		const response = await resolve(event);
		response.headers.set('Access-Control-Allow-Origin', '*');
		return response;
	}

	return await resolve(event);
};

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
	// I think this makes the most sense here..
	if (!event.cookies.get('XSRF-TOKEN')) {
		await refreshXSRFToken(event.cookies);
	}

	if (request.url.startsWith(`${API_URL}/`)) {
		request.headers.set('cookie', event.request.headers.get('cookie')?.replace('%3D', '=') || '');
		request.headers.set(
			'X-XSRF-TOKEN',
			event.request.headers.get('cookie')?.split(';')[0].replace('XSRF-TOKEN=', '').replace('%3D', '=') || '',
		);
	}
	return fetch(request);
};

// TODO: Proper error handling.
export const handleError: HandleServerError = ({ error, event }) => {
	//console.log(error);
};
