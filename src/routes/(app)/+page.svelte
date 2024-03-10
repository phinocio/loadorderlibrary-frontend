<script lang="ts">
	import BrowseList from '$lib/components/lists/BrowseList.svelte';
	import { page } from '$app/stores';

	export let data;

	const { lists } = data;
</script>

<svelte:head>
	<title>Home - Load Order Library</title>

	<!-- FB Meta -->
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:title" content="Home - Load Order Library" />
	<meta property="og:description" content="A modlist files site to help with support." />
	<meta property="og:image" content="/images/logo.png" />
	<meta property="og:type" content="website" />

	<!-- Twitter Meta -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:url" content={$page.url.href} />
	<meta name="twitter:title" content="Home - Load Order Library" />
	<meta name="twitter:description" content="A modlist files site to help with support." />
	<meta name="twitter:image" content="/images/logo.png" />
</svelte:head>

<div class="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8">
	<article class="space-y-4">
		<header class="mb-4">
			<h1 class=" text-3xl font-bold text-green-500">Load Order Library</h1>
		</header>
		<section class="flex flex-col space-y-4 md:text-xl">
			<p class="leading-8 md:leading-8">
				Load Order Library is a website/tool to share mod lists of - primarily Bethesda - games with other
				players. Intended mostly for troubleshooting purposes, the site can be quite useful for YouTubers to
				have mod lists for each of their let's play characters, modlist authors to share the list of mods with
				others, and many other uses.
			</p>
			<p class="flex justify-center space-x-4 text-center font-bold">
				<a
					href="/upload"
					class="text-blue-600 hover:text-blue-400 active:text-blue-400 dark:text-blue-400 dark:hover:text-blue-600 dark:active:text-blue-600"
					>Create a List</a
				>

				<a
					href="/lists"
					class="text-blue-600 hover:text-blue-400 active:text-blue-400 dark:text-blue-400 dark:hover:text-blue-600 dark:active:text-blue-600"
					>Browse Lists</a
				>

				<a
					href="/compare"
					class="text-blue-600 hover:text-blue-400 active:text-blue-400 dark:text-blue-400 dark:hover:text-blue-600 dark:active:text-blue-600"
					>Compare Lists</a
				>
			</p>
		</section>
		<footer>
			<p>
				Find a bug? Please report it on <a
					href="https://github.com/phinocio/loadorderlibrary/issues"
					class="text-blue-600 hover:text-blue-400 active:text-blue-400 dark:text-blue-400 dark:hover:text-blue-600 dark:active:text-blue-600"
					>GitHub</a
				>
			</p>
			<p>
				Enjoy the site? Please consider supporting on
				<a
					href="https://patreon.com/phinocio"
					class="text-blue-600 hover:text-blue-400 active:text-blue-400 dark:text-blue-400 dark:hover:text-blue-600 dark:active:text-blue-600"
					>Patreon</a
				>
				or
				<a
					href="https://ko-fi.com/phinocio"
					class="text-blue-600 hover:text-blue-400 active:text-blue-400 dark:text-blue-400 dark:hover:text-blue-600 dark:active:text-blue-600"
					>Ko-fi</a
				>
			</p>
		</footer>
	</article>
	<article class="space-y-4">
		<header class="mb-4">
			<h1 class="text-3xl font-bold">Recent Lists</h1>
		</header>
		<section class="space-y-4">
			{#if lists.data.length > 0}
				{#each lists.data as list}
					<BrowseList {list} />
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
		</section>
	</article>

	<!-- {#if user}
		{#if lists.data.length > 0}
			{#each lists.data as list}
				<ListSimple {list} />
			{/each}
		{:else}
			<p>
				You have no lists, why not <a
					href="/upload"
					class="font-bold text-green-600 hover:text-green-500 active:text-green-500 dark:text-green-500 dark:hover:text-green-600 dark:active:text-green-600"
					>create one.</a
				>
			</p>
		{/if}
	{:else}
		<p>You are not logged in.</p>
	{/if} -->
</div>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
