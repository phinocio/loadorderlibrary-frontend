import { API_URL } from '$env/static/private';
import { PUBLIC_APP_URL } from '$env/static/public';
import type { List } from '$lib/types/List';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ fetch }) => {
	const resp = await fetch(`${API_URL}/v1/lists?page[size]=all`, {
		headers: { Accept: 'application/json' },
		credentials: 'include',
	});

	if (!resp.ok) {
		Error('Failed fetching lists');
	}
	const lists = await resp.json();
	return new Response(
		`
		<?xml version="1.0" encoding="UTF-8" ?>
		<urlset
			xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
			xmlns:xhtml="https://www.w3.org/1999/xhtml"
			xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
			xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
			xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
			xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
		>
		<url>
			<loc>${PUBLIC_APP_URL}</loc>
			<lastmod>${lists.data[0].updated.split('T')[0]}</lastmod>
		</url>
		<url>
			<loc>${PUBLIC_APP_URL}/login</loc>
			<lastmod>2024-05-23</lastmod>
		</url>
		<url>
			<loc>${PUBLIC_APP_URL}/register</loc>
			<lastmod>2024-05-23</lastmod>
		</url>
		<url>
			<loc>${PUBLIC_APP_URL}/upload</loc>
			<lastmod>2024-05-23</lastmod>
		</url>
		<url>
			<loc>${PUBLIC_APP_URL}/stats</loc>
			<lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
		</url>
		<url>
			<loc>${PUBLIC_APP_URL}/transparency</loc>
			<lastmod>2024-05-07</lastmod>
		</url>
		<url>
			<loc>${PUBLIC_APP_URL}/compare</loc>
			<lastmod>${lists.data[0].updated.split('T')[0]}</lastmod>
		</url>
		${lists.data
			.map(
				(list: List) =>
					`<url>
				<loc>${PUBLIC_APP_URL}/compare/${list.slug}</loc>
				<lastmod>${list.updated.split('T')[0]}</lastmod>
			</url>`
			)
			.join('')}
		${lists.data
			.map(
				(list: List) =>
					`<url>
				<loc>${PUBLIC_APP_URL}/lists/${list.slug}</loc>
				<lastmod>${list.updated.split('T')[0]}</lastmod>
			</url>`
			)
			.join('')}
		</urlset>`.trim(),
		{
			headers: {
				'Content-Type': 'application/xml',
			},
		}
	);
};
