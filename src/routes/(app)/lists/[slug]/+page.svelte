<script lang="ts">
	import type { PageData } from './$types';
	import FullList from '$lib/components/lists/FullList.svelte';

	export let data: PageData;

	const { list } = data;
</script>

<svelte:head>
	<title>{list.data.name} - Load Order Library</title>
</svelte:head>

<FullList list={list.data} />
