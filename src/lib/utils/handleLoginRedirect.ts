export function handleLoginRedirect(url: URL) {
	const redirectTo = url.pathname + url.search;
	return `/login?redirectTo=${redirectTo}`;
}
