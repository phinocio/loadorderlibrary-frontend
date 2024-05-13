<script lang="ts">
	import { formatDistanceToNow } from 'date-fns';
	import type { PageData } from './$types';
	import type { User } from '$lib/types/User';

	export let data: PageData;

	const { users: allUsers } = data;

	let filterText: string;
	let users: User[] = allUsers.data;
	function filterUsers() {
		const filter = filterText.toLowerCase();
		users = allUsers.data.filter((user: User) => {
			return user.name.toLowerCase().includes(filter);
		});
	}
</script>

<svelte:head>
	<title>Users Admin - Load Order Library</title>
</svelte:head>

<h1 class="mb-4 text-3xl font-bold">Manage Users</h1>

<div class="mb-8 w-full">
	<input
		type="text"
		class="flex w-full min-w-full rounded-xl bg-gray-200 p-4 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#26263a] md:w-auto"
		placeholder="Filter..."
		id="filter-lists"
		bind:value={filterText}
		on:input={filterUsers}
	/>
	<button
		class="ml-2 text-gray-500 dark:text-gray-300"
		on:click={() => {
			filterText = '';
			filterUsers();
		}}>Clear Filter</button
	>
</div>

<div class="rounded-xl border border-border-light bg-gray-200 pb-8 dark:border-border-dark dark:bg-[#26263a]">
	<table class="w-full table-auto border-collapse">
		<thead>
			<tr class="text-left text-xl">
				<th class="p-2 pl-4">Name</th>
				<th class="p-2">Email</th>
				<th class="p-2">Verified</th>
				<th class="p-2">Admin</th>
				<th class="p-2">Created</th>
				<th class="p-2">Updated</th>
				<th class="p-2 pr-4 text-right">Actions</th>
			</tr>
		</thead>
		<tbody class="bg-light dark:bg-dark">
			{#each users as user}
				<tr class="even:bg-gray-200 even:dark:bg-[#26263a]">
					<td class="p-2 pl-4">{user.name}</td>
					<td
						class="p-2 {user.email
							? 'text-red-500 dark:text-red-400'
							: 'text-green-600 dark:text-green-400'}">{user.email}</td
					>
					<td
						class="p-2 {user.verified
							? 'text-green-600 dark:text-green-400'
							: 'text-red-500 dark:text-red-400'}">{user.verified}</td
					>
					<td
						class="p-2 {user.admin
							? 'text-green-600 dark:text-green-400'
							: 'text-red-500 dark:text-red-400'}">{user.admin}</td
					>
					<td class="p-2"
						>{formatDistanceToNow(new Date(user.created), {
							addSuffix: true,
						})}</td
					>
					<td class="p-2"
						>{formatDistanceToNow(new Date(user.updated), {
							addSuffix: true,
						})}</td
					>
					<td class="py-4 pl-2 pr-4 text-right">
						{#if user.name !== 'Phinocio'}
							<a
								href="/admin/users/{user.name}"
								class="rounded-full border border-blue-500 px-4 py-2 text-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-500 active:text-white"
								>Edit User</a
							>
						{/if}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
