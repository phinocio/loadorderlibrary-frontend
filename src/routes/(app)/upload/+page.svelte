<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import UserIcon from '$lib/components/icons/User.svelte';
	import GameControllerIcon from '$lib/components/icons/GameController.svelte';
	import { uploadSchema } from '$lib/schemas';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import TimeIcon from '$lib/components/icons/Time.svelte';
	import BrowserIcon from '$lib/components/icons/Browser.svelte';
	import GitBranchIcon from '$lib/components/icons/GitBranch.svelte';
	import DiscordIcon from '$lib/components/icons/Discord.svelte';
	import BookOpenIcon from '$lib/components/icons/BookOpen.svelte';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import FileIcon from '$lib/components/icons/File.svelte';

	export let data: PageData;

	const { form, errors, enhance, constraints } = superForm(data.form, {
		taintedMessage: null,
		validators: zodClient(uploadSchema),
		validationMethod: 'auto',
	});
</script>

<svelte:head>
	<title>Upload - Load Order Library</title>
	<!-- FB Meta -->
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:title" content="Upload - Load Order Library" />
	<meta property="og:description" content="A modlist files site to help with support." />
	<meta property="og:image" content="/images/logo.png" />
	<meta property="og:type" content="website" />

	<!-- Twitter Meta -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:url" content={$page.url.href} />
	<meta name="twitter:title" content="Upload - Load Order Library" />
	<meta name="twitter:description" content="A modlist files site to help with support." />
	<meta name="twitter:image" content="/images/logo.png" />
</svelte:head>
<h1 class="mb-4 text-3xl font-bold">Upload a List</h1>

<article class="grid grid-cols-1 gap-10 md:grid-cols-6">
	<section class="col-span-4 flex flex-col">
		<h2 class="text-3xl">List Info</h2>

		<form method="POST" class="mt-5 flex flex-col space-y-4" use:enhance enctype="multipart/form-data">
			<section class="space-y-4">
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
						placeholder="List Name..."
						autocomplete="name"
						required
						{...$constraints.name}
					/>
				</label>
				{#if $errors?.name}
					{#each $errors?.name as error}
						<p class="ml-4 text-sm text-red-500">{error}</p>
					{/each}
				{/if}
				<label for="name" class="relative block">
					<GitBranchIcon
						class="pointer-events-none absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 transform {$errors?.name
							? 'text-red-500'
							: 'text-green-500'}"
					/>

					<input
						type="text"
						name="version"
						aria-invalid={$errors.version ? 'true' : undefined}
						id="version"
						bind:value={$form.version}
						class="w-full rounded-full {$errors?.version
							? 'border border-red-500'
							: ''} bg-gray-200 px-4 py-3 pl-14 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#26263a]"
						placeholder="Version (optional)..."
						{...$constraints.version}
					/>
				</label>
				{#if $errors?.version}
					{#each $errors?.version as error}
						<p class="ml-4 text-sm text-red-500">{error}</p>
					{/each}
				{/if}

				<label for="name" class="relative block">
					<GameControllerIcon
						class="pointer-events-none absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 transform {$errors?.name
							? 'text-red-500'
							: 'text-green-500'}"
					/>

					<select
						name="game"
						aria-invalid={$errors.game ? 'true' : undefined}
						id="game"
						bind:value={$form.game}
						class="w-full rounded-full {$errors?.game
							? 'border border-red-500'
							: ''} appearance-none bg-gray-200 px-4 py-3 pl-14 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#26263a]"
						placeholder="Version (optional)..."
						required
						{...$constraints.game}
					>
						<option value="">-- Choose Game -- </option>
						{#each data.games.data as game}
							<option value={game.id}>{game.name}</option>
						{/each}
					</select>
				</label>

				<label for="name" class="relative block">
					<TimeIcon
						class="pointer-events-none absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 transform {$errors?.name
							? 'text-red-500'
							: 'text-green-500'}"
					/>

					<select
						name="expires"
						aria-invalid={$errors.expires ? 'true' : undefined}
						id="expires"
						bind:value={$form.expires}
						class="w-full rounded-full {$errors?.expires
							? 'border border-red-500'
							: ''} appearance-none bg-gray-200 px-4 py-3 pl-14 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#26263a]"
						placeholder="Version (optional)..."
						required
						{...$constraints.expires}
					>
						<option value="3h">3 Hours</option>
						<option value="24h" selected={!$page.data.user ? true : false}>24 Hours</option>
						<option value="3d">3 Days</option>
						<option value="1w">1 Week</option>
						<option value="perm" selected={$page.data.user ? true : false}>Permanent</option>
					</select>
				</label>
				{#if $errors?.expires}
					{#each $errors?.expires as error}
						<p class="ml-4 text-sm text-red-500">{error}</p>
					{/each}
				{/if}

				<label for="name" class="relative block">
					<BrowserIcon
						class="pointer-events-none absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 transform {$errors?.name
							? 'text-red-500'
							: 'text-green-500'}"
					/>

					<input
						type="text"
						name="website"
						aria-invalid={$errors.website ? 'true' : undefined}
						id="website"
						bind:value={$form.website}
						class="w-full rounded-full {$errors?.website
							? 'border border-red-500'
							: ''} bg-gray-200 px-4 py-3 pl-14 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#26263a]"
						placeholder="Website (optional)..."
						{...$constraints.website}
					/>
				</label>
				{#if $errors?.website}
					{#each $errors?.website as error}
						<p class="ml-4 text-sm text-red-500">{error}</p>
					{/each}
				{/if}

				<label for="name" class="relative block">
					<DiscordIcon
						class="pointer-events-none absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 transform {$errors?.name
							? 'text-red-500'
							: 'text-green-500'}"
					/>

					<input
						type="text"
						name="discord"
						aria-invalid={$errors.discord ? 'true' : undefined}
						id="discord"
						bind:value={$form.discord}
						class="w-full rounded-full {$errors?.discord
							? 'border border-red-500'
							: ''} bg-gray-200 px-4 py-3 pl-14 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#26263a]"
						placeholder="Discord (optional)..."
						{...$constraints.discord}
					/>
				</label>
				{#if $errors?.discord}
					{#each $errors?.discord as error}
						<p class="ml-4 text-sm text-red-500">{error}</p>
					{/each}
				{/if}

				<label for="name" class="relative block">
					<BookOpenIcon
						class="pointer-events-none absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 transform {$errors?.name
							? 'text-red-500'
							: 'text-green-500'}"
					/>

					<input
						type="text"
						name="readme"
						aria-invalid={$errors.readme ? 'true' : undefined}
						id="readme"
						bind:value={$form.readme}
						class="w-full rounded-full {$errors?.readme
							? 'border border-red-500'
							: ''} bg-gray-200 px-4 py-3 pl-14 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#26263a]"
						placeholder="README (optional)..."
						{...$constraints.readme}
					/>
				</label>
				{#if $errors?.readme}
					{#each $errors?.readme as error}
						<p class="ml-4 text-sm text-red-500">{error}</p>
					{/each}
				{/if}

				<label for="description" class="relative block">
					<textarea
						name="description"
						id="description"
						bind:value={$form.description}
						class="w-full rounded-xl bg-gray-200 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#26263a]"
						placeholder="Description... (optional)"
						rows="5"
						{...$constraints.description}
					/>
				</label>
				{#if $errors?.description}
					{#each $errors?.description as error}
						<p class="ml-4 text-sm text-red-500">{error}</p>
					{/each}
				{/if}

				<label for="files" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
					<input
						type="file"
						name="files[]"
						id="files"
						accept=".txt, .ini"
						class="block w-full rounded-full bg-gray-200 file:rounded-l-full file:border-none file:bg-blue-500 file:p-4 file:text-white file:hover:cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#26263a]"
						multiple
						required
						on:input={(e) => ($form['files[]'] = Array.from(e.currentTarget.files ?? []))}
					/>
				</label>

				<p class="pl-4 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">
					.txt or .ini (Max 512KB)
				</p>

				{#if $errors['files[]']}
					{#each Object.entries($errors['files[]']) as [index, error]}
						<p class="ml-4 text-sm text-red-500">File {Number(index) + 1}: {error}</p>
					{/each}
				{/if}
			</section>
			<section class="flex flex-col justify-between md:flex-row">
				<div class="flex flex-col items-start pl-4">
					<label for="private" class="flex items-center">
						<input
							type="checkbox"
							name="private"
							id="private"
							bind:checked={$form.private}
							class=" h-5 w-5 cursor-pointer text-white accent-green-500"
						/>

						<span class="ml-4">Private List</span>
					</label>
					<p class="mb-4 text-sm text-gray-500 dark:text-gray-300 md:m-0" id="file_input_help">
						A private list is viewable by anyone with the link.
					</p>
				</div>
				<button
					type="submit"
					class="rounded-full bg-blue-500 px-8 py-3 text-white hover:bg-blue-600 active:bg-blue-700"
					>Upload</button
				>
			</section>
		</form>
	</section>

	<section class="col-span-2">
		<h2 class="mb-5 text-3xl">Files</h2>

		{#if $form['files[]'].length > 0}
			{#each $form['files[]'] as file}
				<section
					class="mt-5 flex w-full justify-between bg-gray-200 px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#26263a]"
				>
					<p>
						<FileIcon class="inline h-6 w-6 text-green-500" />
						{file.name}
					</p>
					<p>
						<span>
							{(Number(file.size) / 1024).toLocaleString(undefined, {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})} KiB
						</span>
					</p>
				</section>
			{/each}
		{:else}
			<p>No files selected yet.</p>
		{/if}
	</section>
</article>
