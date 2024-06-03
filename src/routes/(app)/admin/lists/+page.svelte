<script lang="ts">
	import { formatDistanceToNow } from 'date-fns';
	import type { PageData } from './$types';
	import type { List } from '$lib/types/List';

	export let data: PageData;

	const { lists: allLists } = data;

	let filterText: string;
	let lists: List[] = allLists.data;
	function filterLists() {
		const filter = filterText.toLowerCase();
		lists = allLists.data.filter((list: List) => {
			return list.name.toLowerCase().includes(filter);
		});
	}
</script>

<svelte:head>
	<title>Lists Admin - Load Order Library</title>
</svelte:head>

<h1 class="mb-4 text-3xl font-bold">Manage Lists</h1>

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

<div class="rounded-xl border border-border-light bg-gray-200 pb-8 dark:border-border-dark dark:bg-[#26263a]">
	<table class="w-full table-auto border-collapse">
		<thead>
			<tr class="text-left text-xl">
				<th class="p-2 pl-4">Name</th>
				<th class="p-2">Author</th>
				<th class="p-2">Created</th>
				<th class="p-2">Updated</th>
				<th class="p-2 pr-4 text-right">Actions</th>
			</tr>
		</thead>
		<tbody class="bg-light dark:bg-dark">
			{#each lists as list}
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4"
						><a
							class="inline-flex items-center text-green-600 hover:text-green-500 active:text-green-500 dark:text-green-500 dark:hover:text-green-600 dark:active:text-green-600"
							href="/lists/{list.slug}">{list.name}</a
						></td
					>
					<td class="p-2"
						><a
							class="inline-flex items-center text-blue-600 hover:text-blue-500 active:text-blue-500 dark:text-blue-500 dark:hover:text-blue-600 dark:active:text-blue-600"
							href={list.author ? `/admin/users/${list.author.name}` : '/admin/users'}
							>{list.author?.name ?? 'Anonymous'}</a
						></td
					>
					<td class="p-2"
						>{formatDistanceToNow(new Date(list.created), {
							addSuffix: true,
						})}</td
					>
					<td class="p-2"
						>{formatDistanceToNow(new Date(list.updated), {
							addSuffix: true,
						})}</td
					>
					<td class="p-2 py-4 pr-4 text-right">
						<a
							href="/admin/lists/{list.slug}"
							class="rounded-full border border-blue-500 px-4 py-2 text-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-500 active:text-white"
							>Manage List</a
						>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
