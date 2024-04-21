<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status} - Compare - Load Order Library</title>
</svelte:head>

<section class="flex flex-col items-center text-xl">
	<header class="mb-10 text-center">
		<h1 class="text-6xl font-bold">{$page.status}</h1>
		<p class="text-4xl">{$page.error?.message}</p>
	</header>
	{#if $page.status === 404}
		<p>
			This can occur because the list expired or does not exist. Double check the spelling, or look for another
			list.
		</p>
	{/if}

	<a class="mt-4 rounded-full bg-blue-500 px-8 py-3 text-white hover:bg-blue-600 active:bg-blue-700" href="/compare"
		>Go back to Compare</a
	>
</section>
