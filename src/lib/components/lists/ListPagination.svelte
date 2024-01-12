<script lang="ts">
	import type { ListMeta } from '$lib/types/ListMeta';
	import { PUBLIC_API_URL, PUBLIC_APP_URL } from '$env/static/public';
	export let listsMeta: ListMeta;
</script>

<section class="mt-8 flex items-center justify-center space-x-4 font-bold">
	{#if listsMeta.links.length > 2}
		{#each listsMeta.links as link}
			{#if link.url === null}
				<span class="cursor-not-allowed text-slate-500"
					>{link.label.replace('&laquo;', '«').replace('&raquo;', '»')}</span
				>
			{:else}
				<a
					href={link.url.replace(PUBLIC_API_URL + '/v1', PUBLIC_APP_URL)}
					class={link.active ? 'rounded-xl bg-blue-500 px-4 py-2 text-white' : ''}
					>{link.label.replace('&laquo;', '«').replace('&raquo;', '»')}</a
				>
			{/if}
		{/each}
	{/if}
</section>

<section class="mt-4 flex items-center justify-center text-slate-500">
	<p>Showing {listsMeta.from} to {listsMeta.to} of {listsMeta.total}</p>
</section>
