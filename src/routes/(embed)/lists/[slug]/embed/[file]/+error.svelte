<script>
	import { page } from '$app/stores';
</script>

<section class="flex flex-col items-center text-xl">
	<header class="mb-10 text-center">
		<h1 class="text-6xl font-bold">{$page.status}</h1>
		<p class="text-4xl">{$page.error?.message}</p>
	</header>
	<p>The list either does not exist, or does not include the file.</p>
</section>
