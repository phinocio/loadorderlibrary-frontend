<script lang="ts">
	import CompareList from '$lib/components/lists/CompareList.svelte';
	import 'diff2html/bundles/css/diff2html.min.css';
	import { Diff2HtmlUI } from 'diff2html/lib/ui/js/diff2html-ui-slim.js';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

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

		// This error is stupid.
		// @ts-ignore
		const diff2htmlUi = new Diff2HtmlUI(targetElement, comparison.data.diffs.join(''), configuration);
		diff2htmlUi.draw();
	});
</script>

<svelte:head>
	<title>Comparison Results - Load Order Library</title>
</svelte:head>

<h1 class="mb-4 text-3xl font-bold">Comparison Results</h1>

<article class="mb-8 flex flex-col justify-between gap-10 md:flex-row">
	<section class="md:w-1/2">
		<CompareList list={list1} />
	</section>
	<p class="flex items-center justify-center text-4xl font-bold text-blue-500">vs.</p>
	<section class="md:w-1/2">
		<CompareList list={list2} />
	</section>
</article>

<div id="destination-elem-id" />
