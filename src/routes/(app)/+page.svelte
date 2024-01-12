<script lang="ts">
	import SimpleList from '$lib/components/lists/SimpleList.svelte';

	export let data;

	const { lists } = data;
</script>

<svelte:head>
	<title>Home - Load Order Library</title>
</svelte:head>

<div class="grid grid-cols-1 gap-10 md:grid-cols-2 md:grid-rows-2 md:gap-8">
	<article class="space-y-4">
		<h1 class="mb-4 text-3xl font-bold text-green-500">Load Order Library</h1>
		<p class="leading-8 md:text-xl">
			Load Order Library is a website/tool to share mod lists of - primarily Bethesda - games with other players.
			Intended mostly for troubleshooting purposes, the site can be quite useful for YouTubers to have mod lists
			for each of their let's play characters, modlist authors to share the list of mods with others, and many
			other uses.
		</p>
		<footer class="text-center text-xl font-bold">
			<a
				href="/upload"
				class="text-blue-600 hover:text-blue-400 active:text-blue-400 dark:text-blue-400 dark:hover:text-blue-600 dark:active:text-blue-600"
				>Create a List</a
			>
			|
			<a
				href="/lists"
				class="text-blue-600 hover:text-blue-400 active:text-blue-400 dark:text-blue-400 dark:hover:text-blue-600 dark:active:text-blue-600"
				>Browse Lists</a
			>
			|
			<a
				href="/compare"
				class="text-blue-600 hover:text-blue-400 active:text-blue-400 dark:text-blue-400 dark:hover:text-blue-600 dark:active:text-blue-600"
				>Compare Lists</a
			>
		</footer>
	</article>
	<section class="row-span-2 space-y-4">
		<h2 class="text-2xl font-bold">Recent Lists</h2>
		{#if lists.data.length > 0}
			{#each lists.data as list}
				<SimpleList {list} />
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
	<section class="space-y-2">
		<section>
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
		</section>
	</section>
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
