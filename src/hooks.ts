import type { HandleClientError } from '@sveltejs/kit';

export const handleError: HandleClientError = ({ error, event }) => {
	// TODO: Proper error handling
	console.log(error);
};
