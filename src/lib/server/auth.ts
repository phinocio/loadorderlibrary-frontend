import { API_URL } from '$env/static/private';
import { useSetCookies } from '$lib/utils/useSetCookies';
import { fail, type Cookies } from '@sveltejs/kit';

export const loginUser = async (event) => {
	return await fetch(`${API_URL}/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify({ name, password, remember }),
	});
};

export const registerUser = async (name: string, password: string, cookies: Cookies) => {};

export const logoutUser = async (cookies: Cookies) => {};
