<script lang="ts">
	import type { PageData } from './$types';
	import FullList from '$lib/components/lists/FullList.svelte';
	import { page } from '$app/stores';

	export let data: PageData;

	console.log($page);

	const { list } = data;
</script>

<svelte:head>
	<title>{list.data.name} - Load Order Library</title>

	<!-- FB Meta -->
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:title" content={list.data.game.name} />
	<meta
		property="og:description"
		content="A list for {list.data.game.name} by {list.data.author?.name ?? 'Anonymous'}"
	/>
	<meta property="og:image" content="{$page.url.origin}/images/{list.data.game.name}.png" />
	<meta property="og:type" content="website" />

	<!-- Twitter Meta -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:url" content={$page.url.href} />
	<meta name="twitter:title" content={$page.data.title} />
	<meta
		name="twitter:description"
		content="A list for {list.data.game.name} by {list.data.author?.name ?? 'Anonymous'}"
	/>
	<meta name="twitter:image" content="{$page.url.origin}/images/{list.data.game.name}.png" />
</svelte:head>

<FullList list={list.data} />
