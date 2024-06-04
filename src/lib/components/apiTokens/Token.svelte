<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { PUBLIC_API_URL } from '$env/static/public';
	import type { Token } from '$lib/types/Token';
	import { format, formatDistanceToNow } from 'date-fns';
	import toast from 'svelte-french-toast';
	import Dialog from '../layout/Dialog.svelte';

	export let token: Token;

	let deleteDialog: HTMLDialogElement;

	async function deleteToken() {
		const resp = await fetch(`${PUBLIC_API_URL}/v1/user/api-tokens/${token.id}`, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'X-XSRF-Token': document.cookie.split(';')[0].replace('XSRF-TOKEN=', '').replace('%3D', '='),
			},
			method: 'DELETE',
			credentials: 'include',
		});

		if (resp.ok) {
			toast.success('Token successfully deleted!');
			invalidateAll();
		} else {
			const data = await resp.json();
			toast.error(`Failed to delete token!\n Error: ${data.message}`);
		}
	}
</script>

<div class="flex justify-between rounded-xl bg-gray-200 p-4 dark:bg-[#26263a]">
	<div>
		<p class="text-xl font-bold text-green-600">
			{token.name}
		</p>
		<p class="italic">
			{#if token.abilities.length > 0}
				{token.abilities.join(', ')}
			{:else}
				No abilities.
			{/if}
		</p>
		<p class="text-sm text-slate-500">
			Last Used:
			{#if token.last_used_at !== null}
				<span title={format(new Date(token.last_used_at), 'PPpp')}>
					{formatDistanceToNow(new Date(token.last_used_at), {
						addSuffix: true,
					})}
				</span>
			{:else}
				<span>Never</span>
			{/if}
		</p>
		<p class="text-sm text-slate-500">
			Created:
			<span title={format(new Date(token.created_at), 'PPpp')}>
				{formatDistanceToNow(new Date(token.created_at), {
					addSuffix: true,
				})}
			</span>
		</p>
	</div>
	<div class="flex items-end">
		<button
			on:click={() => {
				deleteDialog.showModal();
			}}
			type="submit"
			class="rounded-full border border-red-500 px-4 py-2 text-red-500 hover:bg-red-500 hover:text-white active:bg-red-500 active:text-white"
			>Delete Token</button
		>
	</div>
</div>

<Dialog bind:dialog={deleteDialog}>
	<h1 slot="header" class="text-2xl font-bold text-blue-500">Delete {token.name}</h1>

	<article slot="body">
		<p>
			Are you sure you want to delete this token? <strong>This action is permanent and can not be undone.</strong>
		</p>
	</article>
	<footer slot="footer" class="flex justify-end space-x-2">
		<button
			on:click={() => deleteDialog.close()}
			class="rounded-full border border-blue-500 px-4 py-2 text-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-500 active:text-white"
		>
			Cancel
		</button>
		<form action="{PUBLIC_API_URL}/v1/user/api-tokens/{token.id}}" method="POST">
			<button
				on:click|preventDefault={() => {
					deleteToken();
					deleteDialog.close();
				}}
				type="submit"
				class="rounded-full border border-red-500 px-4 py-2 text-red-500 hover:bg-red-500 hover:text-white active:bg-red-500 active:text-white"
				>Delete</button
			>
		</form>
	</footer>
</Dialog>
