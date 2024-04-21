<script lang="ts">
	import { formatDistanceToNow, format } from 'date-fns';
	import type { List } from '$lib/types/List';
	import type { ListFile } from '$lib/types/ListFile';
	import ManageButtons from './ManageButtons.svelte';
	import VerifiedIcon from '../icons/Verified.svelte';
	import { page } from '$app/stores';

	export let list: List;
	export let includeManageButtons: boolean = true;
	export let includeComparisonLink: boolean = false;
	export let files: ListFile[] = [];
</script>

<article
	class="flex flex-col space-y-4 rounded-xl bg-gray-200 p-4 text-text-light dark:bg-[#26263a] dark:text-text-dark"
>
	<header class={list.name.includes(' ') ? '' : 'truncate'}>
		<h1 class="col-span-2 font-bold">
			<a
				class="text-xl leading-none text-green-600 hover:text-green-500 md:text-2xl md:leading-none"
				href="/lists/{list.slug}">{list.name}</a
			>
		</h1>
		<section>
			<p class="font-bold">
				{list.version ? 'v' + list.version : ''}
			</p>

			<a
				class="inline font-bold text-blue-500 hover:text-blue-600"
				href="/lists?filter[game]={encodeURIComponent(list.game.name)}">{list.game.name}</a
			>
			<em class="text-sm text-slate-500 dark:text-slate-500">{list.private ? 'Private List' : ''}</em>
			<p class="mb-2">
				by <a
					class="inline-flex items-center text-green-600 hover:text-green-500 active:text-green-500 dark:text-green-500 dark:hover:text-green-600 dark:active:text-green-600"
					href={list.author?.name ? '/lists?filter[author]=' + list.author.name : '/lists'}
					>{list.author?.name ?? 'Anonymous'}
					{#if list.author?.verified}
						<VerifiedIcon class="ml-1 inline h-4 w-4 text-blue-500" />{/if}
				</a>
			</p>
		</section>
	</header>

	<section class="flex flex-1">
		<!-- This is better than nested ternary operators and I refuse to hear otherwise :P -->
		{#if list.description}
			{#if list.description.length > 300}
				{list.description.slice(0, 300) + '...'}
			{:else}
				{list.description}
			{/if}
		{:else}
			No description provided.
		{/if}
	</section>

	<section class="flex flex-col">
		<p title={format(new Date(list.created), 'PPpp')} class="flex text-sm text-slate-500">
			Created{' '}
			{formatDistanceToNow(new Date(list.created), {
				addSuffix: true,
			})}
		</p>
		<p title={format(new Date(list.updated), 'PPpp')} class="flex text-sm text-slate-500">
			Updated
			{formatDistanceToNow(new Date(list.updated), {
				addSuffix: true,
			})}
		</p>
		{#if list.expires}
			<p title={format(new Date(list.expires), 'PPpp')} class="flex text-sm text-slate-500">
				Expires
				{formatDistanceToNow(new Date(list.expires), {
					addSuffix: true,
				})}
			</p>
		{/if}
		{#if includeManageButtons}
			<ManageButtons {list} />
		{/if}
	</section>

	{#if includeComparisonLink}
		<section class="self-end">
			<a
				href="{$page.url.pathname}/{list.slug}"
				class="p-2 font-bold text-blue-500 hover:text-blue-600 active:text-blue-600">Compare List</a
			>
		</section>
	{/if}

	{#if files.length > 0}
		<section class="rounded-b-xl bg-gray-200 text-text-light dark:bg-[#26263a] dark:text-text-dark">
			<ul>
				{#each files as file}
					<li class="flex justify-between py-2">
						<span>{file.clean_name}</span>
						<span
							>{(Number(file.bytes) / 1024).toLocaleString(undefined, {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})} KiB</span
						>
					</li>
				{/each}
			</ul>
		</section>
	{/if}
</article>
