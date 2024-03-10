import { redirect, type Handle, type HandleFetch, type HandleServerError } from '@sveltejs/kit';
import { API_URL } from '$env/static/private';
import { getUser } from './lib/auth/user';
import { refreshXSRFToken } from '$lib/utils/useSetCookies';
import { handleLoginRedirect } from '$lib/utils/handleLoginRedirect';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.user = await getUser(event);

	if (event.locals.user && (event.url.pathname.startsWith('/login') || event.url.pathname.startsWith('/register'))) {
		throw redirect(303, '/profile');
	}

	// Auth protected routes
	if (!event.locals.user && event.url.pathname.startsWith('/profile')) {
		throw redirect(303, handleLoginRedirect(event.url));
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
			event.request.headers.get('cookie')?.split(';')[0].replace('XSRF-TOKEN=', '').replace('%3D', '=') || ''
		);
	}
	return fetch(request);
};

export const handleError: HandleServerError = ({ error, event }) => {
	console.error(error);
};
