<script lang="ts">
	import type { List } from '$lib/types/List';
	import { format, formatDistanceToNow } from 'date-fns';
	import VerifiedIcon from '../icons/Verified.svelte';

	export let list: List;
</script>

<article class="items-center rounded-xl bg-gray-200 p-4 text-text-light dark:bg-[#26263a] dark:text-text-dark">
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
					>{list.author?.name ?? 'Anonymous'}{#if list.author?.verified}
						<VerifiedIcon class="ml-1 inline h-4 w-4 text-blue-500" />{/if}
				</a>
			</p>
		</section>
		<section class="flex flex-col items-end justify-between space-y-1">
			<a
				class="font-bold text-blue-500 hover:text-blue-600"
				href="/lists?filter[game]={list.game.name.replace('&', '%26')}">{list.game.name}</a
			>
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
			</div>
		</section>
	</header>
</article>
