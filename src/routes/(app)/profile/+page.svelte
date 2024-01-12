<script lang="ts">
	import type { PageData } from './$types';
	import BrowseList from '$lib/components/lists/BrowseList.svelte';
	import UpdateEmailForm from '$lib/components/auth/UpdateEmailForm.svelte';
	import UpdatePasswordForm from '$lib/components/auth/UpdatePasswordForm.svelte';
	import type { ActionData } from '../lists/[slug]/delete/$types';

	export let data: PageData;

	export let form: ActionData;

	// const { user, lists } = data;

	// When we update the email, this then lets the page reacte to that.
	$: ({ user, lists } = data);
</script>

<svelte:head>
	<title>Profile - Load Order Library</title>
</svelte:head>

<h1 class="mb-4 text-3xl font-bold">Hello, {user?.name}</h1>

<div class="grid gap-10 md:grid-cols-3">
	<article class="col-span-2">
		<h2 class="mb-4 text-2xl font-bold">Your Lists</h2>

		{#if lists.data.length > 0}
			<section class="grid grid-cols-1 gap-10 md:grid-cols-2">
				{#each lists.data as list}
					<BrowseList {list} />
				{/each}
			</section>
		{:else}
			<p>
				You have no lists, why not <a
					href="/upload"
					class="text-blue-600 hover:text-blue-400 active:text-blue-400 dark:text-blue-400 dark:hover:text-blue-600 dark:active:text-blue-600"
				>
					create one?
				</a>
			</p>
		{/if}
	</article>
	<article class="col-span-2 md:col-span-1">
		<h2 class="mb-4 text-2xl font-bold">Manage Account</h2>

		<section>
			<h2 class="text-xl font-bold">Update Email</h2>
			<span class="text-gray-500">To remove the email, submit with the field blank.</span>
			<p>Your email: {user?.email ?? 'N/A'}</p>
			<UpdateEmailForm data={data.emailUpdateForm} />
		</section>

		<section>
			<UpdatePasswordForm data={data.passwordUpdateForm} />
		</section>
	</article>
</div>
