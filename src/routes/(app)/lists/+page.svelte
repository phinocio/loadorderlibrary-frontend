<script lang="ts">
	import BrowseList from '$lib/components/lists/BrowseList.svelte';
	import ListPagination from '$lib/components/lists/ListPagination.svelte';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import SortAscIcon from '$lib/components/icons/SortAsc.svelte';
	import HashStraightIcon from '$lib/components/icons/HashStraight.svelte';
	import SearchIcon from '$lib/components/icons/Search.svelte';

	export let data: PageData;
	let searchText: string = $page.url.searchParams.get('query') ?? '';
	let listsPerPage: string = $page.url.searchParams.get('page[size]') ?? '30';

	$: ({ author, game, lists } = data);
	$: params = $page.url.searchParams;

	function sortLists(sort: string) {
		let urlParams = $page.url.searchParams;
		urlParams.set('sort', sort);
		goto(`/lists?${urlParams.toString()}`, { invalidateAll: true });
	}

	function perPage() {
		let urlParams = $page.url.searchParams;
		urlParams.set('page[size]', listsPerPage);
		goto(`/lists?${urlParams.toString()}`, { invalidateAll: true });
	}

	function searchLists() {
		let urlParams = $page.url.searchParams;
		if (searchText) {
			urlParams.set('query', searchText);
		} else {
			urlParams.delete('query');
		}
		goto(`/lists?${urlParams.toString()}`, { invalidateAll: true });
	}
</script>

<svelte:head>
	<title>Lists - Load Order Library</title>

	<meta name="description" content="A modlist files site to help with support." />

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

<div class="mb-6 flex flex-col items-center justify-between md:flex-row">
	<h1 class="text-3xl font-bold">
		{game ?? 'All'} Lists {#if author}
			by <a
				href="/lists?author={author}"
				class="text-green-600 hover:text-green-500 active:text-green-500 dark:text-green-500 dark:hover:text-green-600 dark:active:text-green-600"
				>{author}</a
			>
		{/if}
		<span class="text-base text-blue-500">{lists.meta.total} total</span>
	</h1>

	<div class="flex">
		<section class="mt-4 flex md:ml-4 md:mt-0">
			<!-- Shows current theme -->
			<label
				for="per-page"
				class="inline-flex items-center rounded-l-full bg-gray-200 px-4 py-2 dark:bg-[#26263a]"
			>
				<HashStraightIcon class="inline h-6 w-6" />
				<span class="text-sm">Per Page</span>
			</label>

			<select
				name="per-page"
				id="per-page"
				class="appearance-none rounded-r-full bg-gray-200 pr-4 text-right dark:bg-[#26263a]"
				bind:value={listsPerPage}
				on:change={() => perPage()}
				aria-label="Lists Per Page"
			>
				<option value="5" selected={listsPerPage === '5'}>5</option>
				<option value="15" selected={listsPerPage === '15'}>15</option>
				<option value="30" selected={listsPerPage === '30'}>30</option>
				<option value="60" selected={listsPerPage === '60'}>60</option>
				<option value="90" selected={listsPerPage === '90'}>90</option>
			</select>
		</section>

		<section class="mt-4 flex md:ml-4 md:mt-0">
			<!-- Shows current theme -->
			<label for="sort" class="inline-flex items-center rounded-l-full bg-gray-200 px-4 py-2 dark:bg-[#26263a]">
				<SortAscIcon class="inline h-6 w-6" />
				<span class="text-sm">Sort</span>
			</label>

			<select
				name="sort"
				id="sort"
				class="appearance-none rounded-r-full bg-gray-200 pr-4 text-right dark:bg-[#26263a]"
				on:change={({ target }) => sortLists(target?.value)}
			>
				<option
					value="-created"
					selected={browser && (params.get('sort') === '-created' || !params.get('sort'))}
					>Newest First</option
				>
				<option value="created" selected={browser && params.get('sort') === 'created'}>Oldest First</option>
				<option value="-updated" selected={browser && params.get('sort') === '-updated'}>Updated First</option>
			</select>
		</section>
	</div>
</div>
<div class="mb-6">
	<form class="flex w-full min-w-full">
		<label for="name" class="relative block w-full">
			<SearchIcon class="pointer-events-none absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 transform" />

			<input
				type="text"
				name="name"
				id="name"
				bind:value={searchText}
				class="flex w-full min-w-full rounded-l-xl bg-gray-200 p-4 pl-14 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#26263a] md:w-auto"
				placeholder="Filter..."
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

	<span>Searching will look for matches in a list Name, Game, Description, or Author.</span>
</div>
<section class="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
	{#if lists.data.length > 0}
		{#each lists.data as list}
			<BrowseList {list} />
		{/each}
	{:else}
		<p class="md:col-spane-2 lg:col-span-3">
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
