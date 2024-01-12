<script lang="ts">
	import type { List } from '$lib/types/List';
	import { page } from '$app/stores';
	import toast from 'svelte-french-toast';
	import { PUBLIC_API_URL } from '$env/static/public';
	import { invalidateAll } from '$app/navigation';

	export let list: List;

	async function deleteList() {
		const resp = await fetch(`${PUBLIC_API_URL}/v1/lists/${list.slug}`, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'X-XSRF-Token': document.cookie.split(';')[0].replace('XSRF-TOKEN=', '').replace('%3D', '='),
			},
			method: 'DELETE',
			credentials: 'include',
		});

		if (resp.ok) {
			toast.success('List successfully deleted!');
			invalidateAll();
		} else {
			const data = await resp.json();
			toast.error(`Failed to delete list!\n Error: ${data.message}`);
		}
	}

	let deleteDialog: HTMLDialogElement;
</script>

<section class="flex w-full justify-end space-x-2 text-center">
	<!-- Only the account owner is allowed to edit the list, but an admin can delete them. -->
	{#if list.author && list.author.name === $page.data.user?.name}
		<a
			href="/lists/{list.slug}/edit"
			class="rounded-full border border-blue-500 px-4 py-2 text-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-500 active:text-white"
			>Edit List</a
		>
	{/if}
	{#if (list.author && list.author.name === $page.data.user?.name) || $page.data.user?.admin}
		<button
			on:click={() => deleteDialog.showModal()}
			type="submit"
			class="rounded-full border border-red-500 px-4 py-2 text-red-500 hover:bg-red-500 hover:text-white active:bg-red-500 active:text-white"
			>Delete list</button
		>
	{/if}
</section>

<dialog
	id="delete-{list.slug}"
	bind:this={deleteDialog}
	class="absolute top-1/4 max-w-3xl space-y-4 rounded-xl border border-border-light bg-light p-4 text-text-light shadow-xl backdrop:bg-black backdrop:opacity-50 backdrop:blur-md dark:border-border-dark dark:bg-dark dark:text-text-dark"
>
	<header class="mb-4 flex justify-between">
		<h1 class="text-2xl font-bold text-blue-500">Delete {list.name}</h1>

		<button
			on:click={() => deleteDialog.close()}
			class="rounded-xl border border-blue-500 px-4 py-2 hover:bg-blue-500 hover:text-white active:bg-blue-500 active:text-white"
			>X</button
		>
	</header>
	<p>
		Are you sure you want to delete this list? <strong>This action is permanent and can not be undone.</strong> Unlike
		a lot of sites, the list is actually deleted from the database instead of being soft-deleted.
	</p>
	<footer class="flex justify-end space-x-2">
		<button
			on:click={() => deleteDialog.close()}
			class="rounded-full border border-blue-500 px-4 py-2 text-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-500 active:text-white"
		>
			Cancel
		</button>
		<form
			action="/lists/{list.slug}/delete?redirect={!$page.url.pathname.includes(list.slug)
				? $page.url.pathname
				: '/'} "
			method="POST"
		>
			<button
				on:click|preventDefault={() => {
					deleteList();
					deleteDialog.close();
				}}
				type="submit"
				class="rounded-full border border-red-500 px-4 py-2 text-red-500 hover:bg-red-500 hover:text-white active:bg-red-500 active:text-white"
				>Delete</button
			>
		</form>
	</footer>
</dialog>
