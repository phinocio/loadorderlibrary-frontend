<script lang="ts">
	import { formatDistanceToNow } from 'date-fns';
	import type { PageData } from './$types';

	export let data: PageData;

	const { stats } = data;
</script>

<svelte:head>
	<title>Stats - Load Order Library</title>
</svelte:head>

<div class="mb-4 flex flex-col md:flex-row md:justify-between">
	<h1 class="text-3xl font-bold">Stats</h1>
	<p>
		Last Updated:
		{formatDistanceToNow(new Date(stats.meta.last_updated), {
			addSuffix: true,
		})}
	</p>
</div>

<div class="flex w-full flex-col justify-between gap-10 md:flex-row">
	<article
		class="w-full rounded-xl border border-border-light bg-gray-200 pb-8 dark:border-border-dark dark:bg-[#26263a]"
	>
		<h2 class="p-2 pl-4 text-2xl font-bold">List Stats</h2>
		<table class="w-full table-auto border-collapse">
			<tbody class="bg-light dark:bg-dark">
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">Total</td>
					<td class="p-2 text-right">{stats.data.lists.total}</td>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">Private</td>
					<td class="p-2 text-right">{stats.data.lists.private_lists} </td>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">Anonymous</td>
					<td class="p-2 text-right">{stats.data.lists.anonymous_lists}</td>
				</tr>
			</tbody>
		</table>
	</article>

	<article
		class="w-full rounded-xl border border-border-light bg-gray-200 pb-8 dark:border-border-dark dark:bg-[#26263a]"
	>
		<h2 class="p-2 pl-4 text-2xl font-bold">User Stats</h2>
		<table class="w-full table-auto border-collapse">
			<tbody class="bg-light dark:bg-dark">
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">Total</td>
					<td class="p-2 text-right">{stats.data.users.total}</td>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">Without Email</td>
					<td class="p-2 text-right">{stats.data.users.without_email} </td>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">Verified Authors</td>
					<td class="p-2 text-right">{stats.data.users.verified_authors}</td>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">With Lists</td>
					<td class="p-2 text-right">{stats.data.users.with_lists}</td>
				</tr>
			</tbody>
		</table>
	</article>

	<article
		class="w-full rounded-xl border border-border-light bg-gray-200 pb-8 dark:border-border-dark dark:bg-[#26263a]"
	>
		<h2 class="p-2 pl-4 text-2xl font-bold">File Stats</h2>
		<table class="w-full table-auto border-collapse">
			<tbody class="bg-light dark:bg-dark">
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">Total</td>
					<td class="p-2 text-right">{stats.data.files.total}</td>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">Total Size</td>
					<td class="p-2 text-right"
						>{(Number(stats.data.files.total_size_in_bytes) / 1024).toLocaleString(undefined, {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						})} KiB
					</td>
				</tr>
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">Temp Size</td>
					<td class="p-2 text-right"
						>{(Number(stats.data.files.total_tmp_size_in_bytes) / 1024).toLocaleString(undefined, {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						})} KiB</td
					>
				</tr>
			</tbody>
		</table>
	</article>
</div>
