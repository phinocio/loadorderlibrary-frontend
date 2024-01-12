<script lang="ts">
	import type { PageData } from './$types';
	import '../../../../../../app.css';
	import FileView from '$lib/components/lists/FileView.svelte';

	export let data: PageData;

	const { file } = data;
</script>

<svelte:head>
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="manifest" href="/site.webmanifest" />
	<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
	<meta name="msapplication-TileColor" content="#2b5797" />
	<meta name="theme-color" content="#ffffff" />

	<script>
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			document.documentElement.classList.add('dark');
		}

		// This allows something like changing prefers-color-scheme to work right away instead of relying on
		// a page refresh.
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
			if (event.matches) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		});
	</script>
</svelte:head>

<section class="text-text-light dark:text-text-dark">
	<FileView content={file.data.content} />
</section>
