<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status} - Load Order Library</title>
</svelte:head>

<section class="flex flex-col items-center text-xl">
	<header class="mb-10 text-center">
		<h1 class="text-6xl font-bold">{$page.status}</h1>
		<p class="text-4xl">{$page.error?.message}</p>
	</header>
	<p>
		This can occur because the list expired or does not exist. Double check the spelling, or look for another list.
	</p>
</section>
