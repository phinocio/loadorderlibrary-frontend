<script lang="ts">
	import 'diff2html/bundles/css/diff2html.min.css';
	import { Diff2HtmlUI } from 'diff2html/lib/ui/js/diff2html-ui-slim.js';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import BrowseList from '$lib/components/lists/BrowseList.svelte';
	import { page } from '$app/stores';

	export let data: PageData;

	const { comparison } = data;
	const { list1, list2 } = comparison.data;

	onMount(() => {
		const targetElement = document.getElementById('destination-elem-id');
		let theme = 'auto';

		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			theme = 'dark';
		}

		if (localStorage.theme === 'light') {
			theme = 'light';
		}

		const configuration = {
			drawFileList: true,
			outputFormat: 'side-by-side',
			highlight: false,
			colorScheme: theme,
		};

		if (!targetElement) {
			return;
		}

		// @ts-expect-error Don't want to deal with TS types for a thing that doesn't use TS.
		const diff2htmlUi = new Diff2HtmlUI(targetElement, comparison.data.diffs.join(''), configuration);
		diff2htmlUi.draw();
	});
</script>

<svelte:head>
	<title>Comparison Results - Load Order Library</title>

	<meta name="description" content="Results of {list1.name} vs {list2.name}" />

	<!-- FB Meta -->
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:title" content={$page.data.title} />
	<meta property="og:description" content="Results of {list1.name} vs {list2.name}" />
	<meta property="og:image" content="/images/logo.png" />
	<meta property="og:type" content="website" />

	<!-- Twitter Meta -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:url" content={$page.url.href} />
	<meta name="twitter:title" content={$page.data.title} />
	<meta name="twitter:description" content="Results of {list1.name} vs {list2.name}" />
	<meta name="twitter:image" content="/images/logo.png" />
</svelte:head>

<h1 class="mb-4 text-3xl font-bold">Comparison Results</h1>

<article class="mb-8 flex max-w-full flex-col justify-between gap-10 md:flex-row">
	<section class="md:w-1/2">
		<BrowseList list={list1} files={list1.files} />
	</section>
	<p class="flex items-center justify-center text-4xl font-bold text-blue-500">vs.</p>
	<section class="md:w-1/2">
		<BrowseList list={list2} files={list2.files} />
	</section>
</article>

<div id="destination-elem-id" />
