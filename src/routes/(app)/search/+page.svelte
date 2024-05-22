<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_API_URL } from '$env/static/public';
	import SearchIcon from '$lib/components/icons/Search.svelte';
	import BrowseList from '$lib/components/lists/BrowseList.svelte';
	import ListPagination from '$lib/components/lists/ListPagination.svelte';
	import type { Lists } from '$lib/types/Lists';

	let searchText: string;
	let lists: Lists;

	async function searchLists() {
		const resp = await fetch(`${PUBLIC_API_URL}/v1/search?query=${searchText}`, {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				'X-XSRF-Token': document.cookie.split(';')[0].replace('XSRF-TOKEN=', '').replace('%3D', '='),
			},
			credentials: 'include',
		});

		if (resp.ok) {
			lists = await resp.json();
			console.log(lists);
		}
	}
</script>

<svelte:head>
	<title>Search - Load Order Library</title>

	<meta name="description" content="A modlist files site to help with support." />

	<!-- FB Meta -->
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:title" content="Search - Load Order Library" />
	<meta property="og:description" content="A modlist files site to help with support." />
	<meta property="og:image" content="/images/logo.png" />
	<meta property="og:type" content="website" />

	<!-- Twitter Meta -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:url" content={$page.url.href} />
	<meta name="twitter:title" content="Search - Load Order Library" />
	<meta name="twitter:description" content="A modlist files site to help with support." />
	<meta name="twitter:image" content="/images/logo.png" />
</svelte:head>

<div class="mb-4">
	<h1 class="text-3xl font-bold">Search Lists</h1>
	<span>Searching will look for matches in a list Name, Game, Description, or Author.</span>
</div>

<form class="flex w-full min-w-full">
	<label for="name" class="relative block w-full">
		<SearchIcon class="pointer-events-none absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 transform" />

		<input
			type="text"
			name="name"
			id="name"
			bind:value={searchText}
			class="flex w-full min-w-full rounded-l-xl bg-gray-200 p-4 pl-14 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#26263a] md:w-auto"
			placeholder="List Name..."
			autocomplete="off"
			required
		/>
	</label>
	<button
		class="rounded-r-xl bg-blue-500 px-8 py-4 text-white hover:bg-blue-600"
		on:click|preventDefault={() => searchLists()}
	>
		<SearchIcon class="pointer-events-none h-6 w-6" />
	</button>
</form>

<div class="flex flex-grow flex-col bg-red-500">
	<p>No results for current search...</p>
	{#if lists}
		<section class="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-10">
			{#each lists.data as list}
				<BrowseList {list} />
			{/each}
		</section>

		<ListPagination listsMeta={lists.meta} />
	{/if}
</div>
