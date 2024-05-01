<script lang="ts">
	import type { PageData } from './$types';
	import UserIcon from '$lib/components/icons/User.svelte';
	import { gameSchema } from '$lib/schemas';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { superForm } from 'sveltekit-superforms';
	export let data: PageData;

	const { games } = data;

	const { form, errors, enhance, constraints } = superForm(data.form, {
		taintedMessage: null,
		validators: zodClient(gameSchema),
		validationMethod: 'auto',
	});
</script>

<!-- TODO: Refresh page automatically when game is created (invalidateall) -->

<svelte:head>
	<title>Add Game - Load Order Library</title>
</svelte:head>

<h1 class="mb-4 text-3xl font-bold">Manage Games</h1>

<div class="flex justify-between">
	<div>
		<h2 class="text-xl font-bold">All Games</h2>
		{#each games.data as game}
			<article class="flex">
				<p>{game.name}</p>
			</article>
		{/each}
	</div>
	<aside>
		<h2 class="text-xl font-bold">Add a Game</h2>
		<form method="POST" class="mt-5 flex flex-col space-y-4" use:enhance>
			<label for="name" class="relative block">
				<UserIcon
					class="pointer-events-none absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 transform {$errors?.name
						? 'text-red-500'
						: 'text-green-500'}"
				/>

				<input
					type="text"
					name="name"
					aria-invalid={$errors.name ? 'true' : undefined}
					id="name"
					bind:value={$form.name}
					class="w-full rounded-full {$errors?.name
						? 'border border-red-500'
						: ''} bg-gray-200 px-4 py-3 pl-14 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#26263a]"
					placeholder="Name..."
					autocomplete="off"
					required
					{...$constraints.name}
				/>
			</label>

			<button
				type="submit"
				class="rounded-full bg-blue-500 px-8 py-3 text-white hover:bg-blue-600 active:bg-blue-700"
				>Create Game</button
			>
		</form>
	</aside>
</div>
