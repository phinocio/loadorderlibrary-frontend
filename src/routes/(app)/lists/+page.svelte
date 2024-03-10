<script lang="ts">
	import BrowseList from '$lib/components/lists/BrowseList.svelte';
	import ListPagination from '$lib/components/lists/ListPagination.svelte';
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;

	$: ({ author, game, lists } = data);
</script>

<svelte:head>
	<title>Lists - Load Order Library</title>
	<!-- FB Meta -->
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:title" content="Lists - Load Order Library" />
	<meta property="og:description" content="A modlist files site to help with support." />
	<meta property="og:image" content="/images/logo.png" />
	<meta property="og:type" content="website" />

	<!-- Twitter Meta -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:url" content={$page.url.href} />
	<meta name="twitter:title" content="Lists - Load Order Library" />
	<meta name="twitter:description" content="A modlist files site to help with support." />
	<meta name="twitter:image" content="/images/logo.png" />
</svelte:head>

<h1 class="mb-4 text-3xl font-bold">
	{game ?? 'All'} Lists {#if author}
		by <a
			href="/lists?author={author}"
			class=" text-green-600 hover:text-green-500 active:text-green-500 dark:text-green-500 dark:hover:text-green-600 dark:active:text-green-600"
			>{author}</a
		>
	{/if}
	<span class="text-base text-blue-500">{lists.meta.total} total</span>
</h1>

<section class="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-10">
	{#if lists.data.length > 0}
		{#each lists.data as list}
			<BrowseList {list} />
		{/each}
	{:else}
		<p>
			No lists available to show, why not <a
				href="/upload"
				class="text-blue-600 hover:text-blue-400 active:text-blue-400 dark:text-blue-400 dark:hover:text-blue-600 dark:active:text-blue-600"
			>
				create one?
			</a>
		</p>
	{/if}
</section>

<ListPagination listsMeta={lists.meta} />
