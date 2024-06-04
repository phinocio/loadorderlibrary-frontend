<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import FullList from '$lib/components/lists/FullList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { list } = data;

	if (browser && $page.url.hash) {
		const el = document.getElementById($page.url.hash.slice(1))?.offsetTop;

		// There's better ways to ensure not undefined but eh, this is fine enough here.
		if (el && el > 0) {
			setTimeout(() => {
				window.scrollTo({
					top: el,
					behavior: 'smooth',
				});
			}, 500);
		}
	}
</script>

<svelte:head>
	<title>{list.data.name} - Load Order Library</title>

	<meta name="description" content="A list for {list.data.game.name} by {list.data.author?.name ?? 'Anonymous'}" />

	<!-- FB Meta -->
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:title" content={list.data.name} />
	<meta
		property="og:description"
		content="A list for {list.data.game.name} by {list.data.author?.name ?? 'Anonymous'}"
	/>
	<meta property="og:image" content="/images/{list.data.game.name}.png" />
	<meta property="og:type" content="website" />

	<!-- Twitter Meta -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:url" content={$page.url.href} />
	<meta name="twitter:title" content={$page.data.title} />
	<meta
		name="twitter:description"
		content="A list for {list.data.game.name} by {list.data.author?.name ?? 'Anonymous'}"
	/>
	<meta name="twitter:image" content="/images/{list.data.game.name}.png" />
</svelte:head>

<FullList list={list.data} />
