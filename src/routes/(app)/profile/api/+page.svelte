<script lang="ts">
	import { apiTokenSchema } from '$lib/schemas';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import UserIcon from '$lib/components/icons/User.svelte';
	import SuperDebug from 'sveltekit-superforms';
	import { format, formatDistanceToNow } from 'date-fns';

	export let data: PageData;

	const { form, errors, enhance, constraints, message } = superForm(data.form, {
		taintedMessage: null,
		validators: zodClient(apiTokenSchema),
		validationMethod: 'auto',
		resetForm: true,
	});
</script>

<svelte:head>
	<title>Api - Load Order Library</title>
</svelte:head>

<!-- <SuperDebug data={$form} /> -->
{#if $message}
	<div class="mb-5 w-full rounded-full bg-green-500 p-5 text-white">
		Token created. Save it somewhere safe as it will not be shown again.
		<code class="font-bold">{$message}</code>
	</div>
{/if}

<article class="grid grid-cols-1 gap-10 md:grid-cols-4">
	<section class="md:col-span-3">
		<h2 class="mb-4 text-2xl font-bold">Your Tokens</h2>

		{#if data.apiTokens.length > 0}
			<div class="grid grid-cols-1 gap-10 md:grid-cols-2">
				{#each data.apiTokens as token}
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
								type="submit"
								class="rounded-full border border-red-500 px-4 py-2 text-red-500 hover:bg-red-500 hover:text-white active:bg-red-500 active:text-white"
								>Delete Token</button
							>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<p>You have no tokens.</p>
		{/if}
	</section>
	<section class="">
		<h2 class="mb-4 text-2xl font-bold">Create Token</h2>
		<form method="POST" class="space-y-4" use:enhance>
			<section class="flex">
				<label for="name" class="relative block w-full">
					<UserIcon
						class="pointer-events-none absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 transform {$errors?.token_name
							? 'text-red-500'
							: 'text-green-500'}"
					/>

					<input
						type="text"
						name="token_name"
						aria-invalid={$errors.token_name ? 'true' : undefined}
						id="token_name"
						bind:value={$form.token_name}
						class="w-full rounded-full {$errors?.token_name
							? 'border border-red-500'
							: ''} bg-gray-200 px-4 py-3 pl-14 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#26263a]"
						placeholder="Token Name..."
						{...$constraints.token_name}
					/>
				</label>
				{#if $errors?.token_name}
					{#each $errors?.token_name as error}
						<p class="ml-4 text-sm text-red-500">{error}</p>
					{/each}
				{/if}
			</section>
			<section class="">
				<h2 class="font-bold">Token Abilities</h2>
				<div class="flex justify-between pr-4">
					<div>
						<label for="create" class="flex items-center">
							<input
								type="checkbox"
								name="create"
								id="create"
								bind:checked={$form.create}
								class=" h-5 w-5 cursor-pointer text-white accent-green-500"
							/>

							<span class="ml-4">Create</span>
						</label>
						<label for="read" class="flex items-center">
							<input
								type="checkbox"
								name="read"
								id="read"
								bind:checked={$form.read}
								class=" h-5 w-5 cursor-pointer text-white accent-green-500"
							/>

							<span class="ml-4">Read</span>
						</label>
					</div>
					<div>
						<label for="update" class="flex items-center">
							<input
								type="checkbox"
								name="update"
								id="update"
								bind:checked={$form.update}
								class=" h-5 w-5 cursor-pointer text-white accent-green-500"
							/>

							<span class="ml-4">Update</span>
						</label>
						<label for="delete" class="flex items-center">
							<input
								type="checkbox"
								name="delete"
								id="delete"
								bind:checked={$form.delete}
								class=" h-5 w-5 cursor-pointer text-white accent-green-500"
							/>

							<span class="ml-4">Delete</span>
						</label>
					</div>
				</div>
			</section>

			<section class="flex flex-col justify-end md:flex-row">
				<button
					type="submit"
					class="rounded-full bg-blue-500 px-8 py-3 text-white hover:bg-blue-600 active:bg-blue-700"
					>Create Token</button
				>
			</section>
		</form>
	</section>
</article>
