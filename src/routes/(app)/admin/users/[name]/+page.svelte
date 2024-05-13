<script lang="ts">
	import type { PageData } from './$types';
	import BrowseList from '$lib/components/lists/BrowseList.svelte';
	import UpdateUserPasswordForm from '$lib/components/admin/UpdateUserPasswordForm.svelte';
	import { PUBLIC_API_URL } from '$env/static/public';
	import { invalidateAll } from '$app/navigation';
	import toast from 'svelte-french-toast';
	import AdminDeleteUser from '$lib/components/admin/AdminDeleteUser.svelte';

	export let data: PageData;

	// When we update verified, this then lets the page react to that.
	$: ({ user } = data);

	async function verifyUser() {
		const resp = await fetch(`${PUBLIC_API_URL}/v1/admin/users/${user.data.name}`, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'X-XSRF-Token': document.cookie.split(';')[0].replace('XSRF-TOKEN=', '').replace('%3D', '='),
			},
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify({ _method: 'PUT', verified: user.data.verified ? null : 'on' }),
		});

		if (resp.ok) {
			toast.success('Updated user verification!');
			invalidateAll();
		} else {
			const data = await resp.json();
			toast.error(`Failed to update user verification!\n Error: ${data.message}`);
		}
	}
</script>

<svelte:head>
	<title>Manage {user.data.name} - Load Order Library</title>
</svelte:head>

<h1 class="mb-4 text-3xl font-bold">Managing {user.data.name}</h1>

<div class="grid gap-10 md:grid-cols-3">
	<article class="col-span-2">
		<h2 class="mb-4 text-2xl font-bold">User's Lists</h2>

		{#if user.data.lists.length > 0}
			<section class="grid grid-cols-1 gap-10 md:grid-cols-2">
				{#each user.data.lists as list}
					<BrowseList {list} />
				{/each}
			</section>
		{:else}
			<p>User has no lists.</p>
		{/if}
	</article>
	<article class="col-span-2 space-y-4 md:col-span-1">
		<h2 class="mb-4 text-2xl font-bold">Manage Account</h2>

		<section>
			<p class="mb-4">
				Verified: <span
					class={user.data.verified ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}
					>{user.data.verified}</span
				>
			</p>
			<button
				on:click={() => verifyUser()}
				class="rounded-full border border-blue-500 px-4 py-2 text-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-500 active:text-white"
				>Toggle Verified</button
			>
		</section>
		<section>
			<UpdateUserPasswordForm data={data.passwordUpdateForm} />
		</section>

		<section class="flex flex-col space-y-2">
			<AdminDeleteUser user={user.data} />
		</section>
	</article>
</div>
