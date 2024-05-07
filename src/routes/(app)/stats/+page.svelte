<script lang="ts">
	import { formatDistanceToNow } from 'date-fns';
	import type { PageData } from './$types';

	export let data: PageData;

	const { stats } = data;
	console.log(stats);
	console.log(new Date(stats.meta.last_updated));
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

<div class="flex w-full justify-between gap-10">
	<article
		class="flex w-full flex-col space-y-4 rounded-xl bg-gray-200 p-4 text-text-light dark:bg-[#26263a] dark:text-text-dark"
	>
		<h2 class="text-2xl font-bold">List Stats</h2>
		<section class="flex items-center justify-between">
			<p class="font-bold">Total</p>
			<span class="rounded-full bg-blue-500 px-4 py-2 text-sm text-white">{stats.data.lists.total}</span>
		</section>
		<section class="flex items-center justify-between">
			<p class="font-bold">Private</p>
			<span class="rounded-full bg-blue-500 px-4 py-2 text-sm text-white">{stats.data.lists.private_lists}</span>
		</section>
		<section class="flex items-center justify-between">
			<p class="font-bold">Anonymous</p>
			<span class="rounded-full bg-blue-500 px-4 py-2 text-sm text-white">{stats.data.lists.anonymous_lists}</span
			>
		</section>
	</article>

	<article
		class="flex w-full flex-col space-y-4 rounded-xl bg-gray-200 p-4 text-text-light dark:bg-[#26263a] dark:text-text-dark"
	>
		<h2 class="text-2xl font-bold">User Stats</h2>
		<section class="flex items-center justify-between">
			<p class="font-bold">Total</p>
			<span class="rounded-full bg-blue-500 px-4 py-2 text-sm text-white">{stats.data.users.total}</span>
		</section>
		<section class="flex items-center justify-between">
			<p class="font-bold">Without Email</p>
			<span class="rounded-full bg-blue-500 px-4 py-2 text-sm text-white">{stats.data.users.without_email}</span>
		</section>
		<section class="flex items-center justify-between">
			<p class="font-bold">Verified</p>
			<span class="rounded-full bg-blue-500 px-4 py-2 text-sm text-white"
				>{stats.data.users.verified_authors}</span
			>
		</section>
		<section class="flex items-center justify-between">
			<p class="font-bold">With Lists</p>
			<span class="rounded-full bg-blue-500 px-4 py-2 text-sm text-white">{stats.data.users.with_lists}</span>
		</section>
		<section class="flex items-center justify-between">
			<p class="font-bold">Last Registered</p>
			<span class="rounded-full bg-blue-500 px-4 py-2 text-sm text-white">{stats.data.users.last_registered}</span
			>
		</section>
	</article>

	<article
		class="flex w-full flex-col space-y-4 rounded-xl bg-gray-200 p-4 text-text-light dark:bg-[#26263a] dark:text-text-dark"
	>
		<h2 class="text-2xl font-bold">File Stats</h2>
		<section class="flex items-center justify-between">
			<p class="font-bold">Total</p>
			<span class="rounded-full bg-blue-500 px-4 py-2 text-sm text-white">{stats.data.files.total}</span>
		</section>
		<section class="flex items-center justify-between">
			<p class="font-bold">Total Size</p>
			<span class="rounded-full bg-blue-500 px-4 py-2 text-sm text-white"
				>{stats.data.files.total_size_in_bytes}</span
			>
		</section>
		<section class="flex items-center justify-between">
			<p class="font-bold">Temp Size</p>
			<span class="rounded-full bg-blue-500 px-4 py-2 text-sm text-white"
				>{stats.data.files.total_tmp_size_in_bytes}</span
			>
		</section>
	</article>
</div>
