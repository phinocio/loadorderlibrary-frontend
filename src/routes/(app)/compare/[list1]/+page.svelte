<script lang="ts">
	import BrowseList from '$lib/components/lists/BrowseList.svelte';
	import type { List } from '$lib/types/List';
	import type { PageData } from './$types';

	export let data: PageData;
	let filterText: string;
	const { lists: allLists, firstList } = data;

	/**
	 * Using a new variable allows it to filter on the original
	 * data every time (as opposed to doing allLists = filter()).
	 * Plus the only thing actually needed for displaying the lists
	 * is the allLists.data content.
	 */
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
	console.log(firstList);
</script>

<svelte:head>
	<title>Compare - Load Order Library</title>
</svelte:head>

<h1 class="mb-4 text-3xl font-bold">Compare Lists</h1>

<section class="flex flex-col justify-between gap-10 md:flex-row">
	<div class="md:w-1/2">
		<BrowseList list={firstList.data} includeManageButtons={false} files={firstList.data.files} />
	</div>
	<p class="flex items-center justify-center text-4xl font-bold text-blue-500">vs.</p>
	<div
		class="flex flex-col items-center justify-center space-y-4 rounded-xl bg-gray-200 p-4 text-text-light dark:bg-[#26263a] dark:text-text-dark md:w-1/2"
	>
		<p class="text-8xl font-bold">?</p>
	</div>
</section>

<div class="my-8 w-full">
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
