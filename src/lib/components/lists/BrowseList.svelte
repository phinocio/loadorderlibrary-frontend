<script lang="ts">
	import ExternalIcon from '$lib/components/icons/External.svelte';
	import { formatDistanceToNow, format } from 'date-fns';
	import type { List } from '$lib/types/List';
	import ManageButtons from './ManageButtons.svelte';
	import VerifiedIcon from '../icons/Verified.svelte';

	export let list: List;
</script>

<article
	class="flex flex-col space-y-4 rounded-xl bg-gray-200 p-4 text-text-light dark:bg-[#26263a] dark:text-text-dark"
>
	<header class="flex justify-between">
		<section class="flex max-w-40 flex-col md:max-w-80">
			<h1 class="flex justify-start font-bold">
				<a
					class="text-xl leading-none text-green-600 hover:text-green-500 md:text-2xl md:leading-none"
					href="/lists/{list.slug}">{list.name}</a
				>
			</h1>
			<p class="font-bold">{list.version ? 'v' + list.version : ''}</p>
			<p class="mb-2">
				by <a
					class=" inline-flex items-center text-green-600 hover:text-green-500 active:text-green-500 dark:text-green-500 dark:hover:text-green-600 dark:active:text-green-600"
					href={list.author?.name ? '/lists?filter[author]=' + list.author.name : '/lists'}
					>{list.author?.name ?? 'Anonymous'}
					{#if list.author?.verified}
						<VerifiedIcon class="ml-1 inline h-4 w-4 text-blue-500" />{/if}
				</a>
			</p>
			{#if list.website}
				<a
					href={list.website}
					class="flex items-center text-green-600 hover:text-green-500 active:text-green-500 dark:text-green-500 dark:hover:text-green-600 dark:active:text-green-600"
					rel="noreferrer noopener"
					target="_blank"
					>{list.website} <ExternalIcon class="inline h-6 w-6 pl-2" />
				</a>
			{/if}

			{#if list.readme}
				<a
					href={list.readme}
					class="flex items-center text-green-600 hover:text-green-500 active:text-green-500 dark:text-green-500 dark:hover:text-green-600 dark:active:text-green-600"
					rel="noreferrer noopener"
					target="_blank"
					>{list.readme} <ExternalIcon class="inline h-6 w-6 pl-2" />
				</a>
			{/if}

			{#if list.discord}
				<a
					href={list.discord}
					class="flex items-center text-green-600 hover:text-green-500 active:text-green-500 dark:text-green-500 dark:hover:text-green-600 dark:active:text-green-600"
					rel="noreferrer noopener"
					target="_blank"
					>{list.discord}<ExternalIcon class="inline h-6 w-6 pl-2" />
				</a>
			{/if}
		</section>
		<section class="flex flex-col items-end justify-between space-y-1">
			<a
				class="font-bold text-blue-500 hover:text-blue-600"
				href="/lists?filter[game]={encodeURIComponent(list.game.name)}">{list.game.name}</a
			><em class="font-light">{list.private ? 'Private List' : ''}</em>
			<div class="flex flex-col items-end">
				<p
					title={format(new Date(list.created), 'PPpp')}
					class="flex text-sm text-slate-500 dark:text-slate-500"
				>
					Created{' '}
					{formatDistanceToNow(new Date(list.created), {
						addSuffix: true,
					})}
				</p>
				<p
					title={format(new Date(list.updated), 'PPpp')}
					class="flex text-sm text-slate-500 dark:text-slate-500"
				>
					Updated
					{formatDistanceToNow(new Date(list.updated), {
						addSuffix: true,
					})}
				</p>
				{#if list.expires}
					<p
						title={format(new Date(list.expires), 'PPpp')}
						class="flex text-sm text-slate-500 dark:text-slate-500"
					>
						Expires
						{formatDistanceToNow(new Date(list.expires), {
							addSuffix: true,
						})}
					</p>
				{/if}
			</div>
		</section>
	</header>
	<p class="flex flex-1 flex-col">
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
	</p>
	<ManageButtons {list} />
</article>
