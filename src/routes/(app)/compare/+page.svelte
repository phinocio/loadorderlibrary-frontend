<script lang="ts">
	import VerifiedIcon from '$lib/components/icons/Verified.svelte';
	import type { List } from '$lib/types/List';
	import type { PageData } from './$types';

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
</svelte:head>

<h1 class="mb-4 text-3xl font-bold">Compare Lists</h1>
<h2 class="mb-4 text-2xl font-bold">Choose the First List</h2>

<input
	type="text"
	class="mb-8 flex w-full rounded-xl bg-gray-200 p-4 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#26263a] md:w-auto"
	placeholder="Filter..."
	id="filter-lists"
	bind:value={filterText}
	on:input={filterLists}
/>

<article class="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-4">
	{#each lists as list}
		<section
			class="flex justify-between rounded-xl bg-gray-200 p-4 text-text-light dark:bg-[#26263a] dark:text-text-dark"
		>
			<header class="">
				<h1 class="col-span-2 font-bold">
					<a
						class="text-xl leading-none text-green-600 hover:text-green-500 md:text-2xl md:leading-none"
						href="/lists/{list.slug}">{list.name}</a
					>
				</h1>
				<a
					class="inline font-bold text-blue-500 hover:text-blue-600"
					href="/lists?filter[game]={encodeURIComponent(list.game.name)}">{list.game.name}</a
				>
				<em class="block text-sm text-slate-500 dark:text-slate-500">{list.private ? 'Private List' : ''}</em>
				<p class="mb-2">
					by <a
						class=" inline-flex items-center text-green-600 hover:text-green-500 active:text-green-500 dark:text-green-500 dark:hover:text-green-600 dark:active:text-green-600"
						href={list.author?.name ? '/lists?filter[author]=' + list.author.name : '/lists'}
						>{list.author?.name ?? 'Anonymous'}
						{#if list.author?.verified}
							<VerifiedIcon class="ml-1 inline h-4 w-4 text-blue-500" />{/if}
					</a>
				</p>
			</header>
			<a
				class="self-end rounded-xl p-2 font-bold text-blue-500 hover:text-blue-600 active:text-blue-600"
				href="/compare/{list.slug}">Compare</a
			>
		</section>
	{/each}
</article>
