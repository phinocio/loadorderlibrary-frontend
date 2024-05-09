<script lang="ts">
	import BrowseList from '$lib/components/lists/BrowseList.svelte';
	import type { List } from '$lib/types/List';
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;
	let filterText: string;
	const { lists: allLists } = data;

	// Need to copy this to a new variable to not mutate the original when filtering.
	// This allows us to use .filter() on content and also have it show files again
	// when deleting a search, instead of mutating it with content = content.filter()
	// and ending up forcing the user to refresh the page to see original lines again.
	// Also the only important thing for displaying the lists, is the array of lists
	// contained in lists.data.
	let lists: List[] = allLists.data;

	function filterLists() {
		const filter = filterText.toLowerCase();
		lists = allLists.data.filter((list: List) => {
			return (
				list.name.toLowerCase().includes(filter) ||
				list.game.name.toLowerCase().includes(filter) ||
				list.author?.name.toLowerCase().includes(filter)
			);
		});
	}
</script>

<svelte:head>
	<title>Compare - Load Order Library</title>

	<meta name="description" content="Compare lists." />

	<!-- FB Meta -->
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:title" content={$page.data.title} />
	<meta property="og:description" content="Compare lists." />
	<meta property="og:image" content="/images/logo.png" />
	<meta property="og:type" content="website" />

	<!-- Twitter Meta -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:url" content={$page.url.href} />
	<meta name="twitter:title" content={$page.data.title} />
	<meta name="twitter:description" content="Compare lists." />
	<meta name="twitter:image" content="/images/logo.png" />
</svelte:head>

<h1 class="mb-4 text-3xl font-bold">Compare Lists</h1>
<h2 class="mb-4 text-2xl font-bold">Choose the First List</h2>

<div class="mb-8 w-full">
	<input
		type="text"
		class="flex w-full min-w-full rounded-xl bg-gray-200 p-4 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#26263a] md:w-auto"
		placeholder="Filter..."
		id="filter-lists"
		bind:value={filterText}
		on:input={filterLists}
	/>
	<button
		class="ml-2 text-gray-500 dark:text-gray-300"
		on:click={() => {
			filterText = '';
			filterLists();
		}}>Clear Filter</button
	>
</div>

<div class="grid grid-cols-1 gap-10 md:grid-cols-3">
	{#if lists.length > 0}
		{#each lists as list}
			<BrowseList {list} includeManageButtons={false} includeComparisonLink={true} />
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
</div>
