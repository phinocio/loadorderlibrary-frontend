<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { PUBLIC_API_URL } from '$env/static/public';
	import toast from 'svelte-french-toast';

	let deleteDialog: HTMLDialogElement;

	async function deleteAcc() {
		const resp = await fetch(`${PUBLIC_API_URL}/v1/user/${$page.data.user.name}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				'X-XSRF-Token': document.cookie.split(';')[0].replace('XSRF-TOKEN=', '').replace('%3D', '='),
			},
			credentials: 'include',
		});

		if (resp.ok) {
			toast.success('Account successfully deleted!');
			await goto('/');
			await invalidateAll();
			document.cookie = '';
		} else {
			const data = await resp.json();
			toast.error(`Failed to delete list!\n Error: ${data.message}`);
		}
	}
</script>

<h2 class="text-xl font-bold text-red-500">Delete Account</h2>
<p>Deleting the account is permanent and can not be undone. All lists tied to the account will be deleted.</p>
<button
	on:click={() => deleteDialog.showModal()}
	type="submit"
	class="self-end rounded-full border border-red-500 px-4 py-2 text-red-500 hover:bg-red-500 hover:text-white active:bg-red-500 active:text-white"
	>Delete Account</button
>
<dialog
	id="delete-account"
	bind:this={deleteDialog}
	class="absolute top-1/4 max-w-3xl space-y-4 rounded-xl bg-light p-4 text-text-light shadow-xl backdrop:bg-black backdrop:opacity-50 backdrop:blur-md dark:bg-dark dark:text-text-dark"
>
	<header class="mb-4 flex justify-between">
		<h1 class="text-2xl font-bold text-blue-500">Delete Account</h1>

		<button
			on:click={() => deleteDialog.close()}
			class="self-start rounded-xl border border-blue-500 px-4 py-2 hover:bg-blue-500 hover:text-white active:bg-blue-500 active:text-white"
			>X</button
		>
	</header>
	<p>
		Are you sure you want to delete Your account? This action is permanent and cannot be undone. All lists tied to
		the account will be deleted.
	</p>
	<footer class="flex justify-end space-x-2">
		<button
			on:click={() => deleteDialog.close()}
			class="rounded-full border border-blue-500 px-4 py-2 text-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-500 active:text-white"
		>
			Cancel
		</button>
		<form>
			<button
				type="submit"
				class="rounded-full border border-red-500 px-4 py-2 text-red-500 hover:bg-red-500 hover:text-white active:bg-red-500 active:text-white"
				on:click={deleteAcc}>Delete</button
			>
		</form>
	</footer>
</dialog>
