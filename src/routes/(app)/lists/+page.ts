import { PUBLIC_API_URL } from '$env/static/public';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url, fetch }) => {
	// const filters = 'author|game';
	// const pageOptions = 'pageSize|pageNumber';
	// const filterRe = new RegExp(`${filters}`, 'g');
	// const pageRe = new RegExp(`${pageOptions}`, 'g');

	let apiRoute = `${PUBLIC_API_URL}/v1/lists`;

	if (url.search) {
		// const paramsForApi = new URLSearchParams();

		// for (const [key, value] of url.searchParams.entries()) {
		// 	if (key.match(filterRe)) {
		// 		paramsForApi.append(`filter[${key}]`, value);
		// 	} else if (key.match(pageRe)) {
		// 		paramsForApi.append(`page[${key.toLowerCase().replace('page', '')}]`, value);
		// 	}
		// }
		// apiRoute = `${apiRoute}?${paramsForApi.toString()}`;
		apiRoute = `${apiRoute}${url.search}`;
	}

	// TODO: Proper error handling
	const resp = await fetch(apiRoute, {
		headers: { Accept: 'application/json' },
		credentials: 'include',
	});

	const data = await resp.json();
	return {
		lists: data,
		game: url.searchParams.get('filter[game]') ?? null,
		author: url.searchParams.get('filter[author]') ?? null,
	};
};
