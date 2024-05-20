<script lang="ts">
	import BrowseList from '$lib/components/lists/BrowseList.svelte';
	import ListPagination from '$lib/components/lists/ListPagination.svelte';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import SortAscIcon from '$lib/components/icons/SortAsc.svelte';
	import HashStraightIcon from '$lib/components/icons/HashStraight.svelte';

	export let data: PageData;

	$: ({ author, game, lists } = data);
	$: params = $page.url.searchParams;

	function sortLists(sort: string) {
		let urlParams = $page.url.searchParams;
		urlParams.set('sort', sort);
		goto(`/lists?${urlParams.toString()}`, { invalidateAll: true });
	}

	function perPage(num: string) {
		let urlParams = $page.url.searchParams;
		urlParams.set('page[size]', num);
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

<div class="mb-4 flex flex-col items-center justify-between md:flex-row">
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
				on:change={({ target }) => perPage(target?.value)}
				aria-label="Lists Per Page"
			>
				<option value="5" selected={browser && params.get('page[size]') === '5'}>5</option>
				<option value="15" selected={browser && params.get('page[size]') === '15'}>15</option>
				<option
					value="30"
					selected={(browser && params.get('page[size]') === '30') || !params.get('page[size]')}>30</option
				>
				<option value="60" selected={browser && params.get('page[size]') === '60'}>60</option>
				<option value="90" selected={browser && params.get('page[size]') === '90'}>90</option>
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
