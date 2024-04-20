<script lang="ts">
	import { page } from '$app/stores';
	import { PUBLIC_API_URL } from '$env/static/public';
	import type { List } from '$lib/types/List';
	import { format, formatDistanceToNow } from 'date-fns';
	import DownloadIcon from '../icons/Download.svelte';
	import EmbedIcon from '../icons/Embed.svelte';
	import ExternalIcon from '../icons/External.svelte';
	import PlusIcon from '../icons/Plus.svelte';
	import VerifiedIcon from '../icons/Verified.svelte';
	import FileView from './FileView.svelte';
	import ManageButtons from './ManageButtons.svelte';

	export let list: List;

	// TODO: find better solution for toggling hidden states of lists.
	let fileToggles: Record<string, { hidden: boolean }> = {};

	if (list.files) {
		for (const file of list.files) {
			fileToggles[file.clean_name] = {
				hidden: $page.url.searchParams.get('show') === file.clean_name ? false : true,
			};
		}
	}

	// TODO: Find better solution for toggling embed dialogs
	let embedToggles: Record<string, undefined | HTMLDialogElement> = {};

	if (list.files) {
		for (const file of list.files) {
			embedToggles[file.clean_name] = undefined;
		}
	}
</script>

<article class="space-y-8">
	<section class="space-y-4">
		<header>
			<h1 class="font-bold">
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
				<em class="block text-sm text-slate-500 dark:text-slate-500">{list.private ? 'Private List' : ''}</em>
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

			<section>
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
			<section class="mt-4 flex space-x-4">
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
			</section>
		</header>
		<p class="border-y border-border-light py-4 leading-10 dark:border-border-dark md:text-xl md:leading-10">
			{list.description ?? 'No description provided.'}
		</p>

		<ManageButtons {list} />

		<section class="flex space-x-2">
			<form class="" method="GET" action={PUBLIC_API_URL + '/v1/lists/' + list.slug + '/download'}>
				<button
					class="flex rounded-full border border-blue-500 px-4 py-2 hover:bg-blue-500 hover:text-white active:bg-blue-500 active:text-white"
					>All Files <DownloadIcon class="ml-2 inline h-6 w-6 " /></button
				>
			</form>
		</section>
	</section>

	<section class="flex flex-col space-y-6">
		{#if list.files}
			{#each list.files as file}
				<section
					class="{fileToggles[file.clean_name].hidden
						? 'rounded-xl'
						: 'rounded-t-xl'} border border-blue-500 text-text-light dark:text-text-dark"
				>
					<header class="flex items-center justify-between">
						<section>
							<button
								class="mr-2 {fileToggles[file.clean_name].hidden
									? 'rounded-l-xl'
									: 'rounded-tl-xl'} bg-blue-500 p-4 text-white hover:bg-blue-600"
								on:click={() =>
									(fileToggles[file.clean_name].hidden = !fileToggles[file.clean_name].hidden)}
							>
								<PlusIcon class="inline h-6 w-6 " />
							</button>
							<button
								class="font-bold text-green-600 dark:text-green-500"
								on:click={() =>
									(fileToggles[file.clean_name].hidden = !fileToggles[file.clean_name].hidden)}
							>
								{file.clean_name}
							</button>
						</section>
						<section class="flex items-center">
							<!-- Undefined here uses the user's browser locale -->
							<span
								>{(Number(file.bytes) / 1024).toLocaleString(undefined, {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								})} KiB</span
							>
							<button
								class="ml-2 border-r border-border-light bg-blue-500 p-4 text-white dark:border-border-dark"
								on:click={() => embedToggles[file.clean_name]?.showModal()}
								><EmbedIcon class="inline h-6 w-6 " /></button
							>
							<form
								class="inline"
								method="GET"
								action={PUBLIC_API_URL + '/v1/lists/' + list.slug + '/download/' + file.clean_name}
							>
								<button
									class="{fileToggles[file.clean_name].hidden
										? 'rounded-r-xl'
										: 'rounded-tr-xl'} bg-blue-500 p-4 text-white hover:bg-blue-600"
									><DownloadIcon class="inline h-6 w-6 " /></button
								>
							</form>
						</section>
					</header>
					<FileView
						content={file.clean_name === 'modlist.txt' ? file.content : file.content}
						class={fileToggles[file.clean_name].hidden ? 'hidden' : ''}
						fileName={file.clean_name}
					/>
				</section>

				<dialog
					bind:this={embedToggles[file.clean_name]}
					class="absolute top-1/4 max-w-3xl space-y-4 rounded-xl border border-border-light bg-light p-4 text-text-light shadow-xl backdrop:bg-black backdrop:opacity-50 backdrop:blur-md dark:border-border-dark dark:bg-dark dark:text-text-dark"
				>
					<header class="mb-4 flex justify-between">
						<h1 class="text-2xl font-bold text-blue-500">Embed {file.clean_name}</h1>
						<button
							on:click={() => embedToggles[file.clean_name]?.close()}
							class="rounded-xl border border-blue-500 px-4 py-2 hover:bg-blue-500 hover:text-white active:bg-blue-500 active:text-white"
							>X</button
						>
					</header>

					<p>
						If you want to have a quick way for users to view your list on your own site or elsewhere, use
						this iframe.
					</p>
					<p>
						Feel free to remove the `allow-scripts` from the sandbox attribute. It's used to have the theme
						of the embed match the user's system theme, collapse separators on modlist.txt, and toggle
						showing of disabled mods on modlist.txt.
					</p>
					<div class="rounded-xl bg-gray-200 p-4 dark:bg-[#26263a]">
						<code class="text-green-500"
							>&lt;iframe title="Load Order Library iframe" src="http://testing.lol.wonderland/lists/{list.slug}/embed/{file.clean_name}"
							width="875" height="1000" sandbox="allow-scripts allow-same-origin" &gt;&lt;/iframe&gt;</code
						>
					</div>
				</dialog>
			{/each}
		{/if}
	</section>
</article>
