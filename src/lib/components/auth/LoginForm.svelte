<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import PasswordIcon from '$lib/components/icons/Password.svelte';
	import UserIcon from '$lib/components/icons/User.svelte';
	import { loginSchema, type LoginSchema } from '$lib/schemas';
	import type { SuperValidated, Infer } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { PageData } from '../../../routes/(app)/login/$types';

	export let data: SuperValidated<Infer<LoginSchema>>;

	const { form, errors, enhance, constraints } = superForm(data, {
		taintedMessage: null,
		validators: zodClient(loginSchema),
		validationMethod: 'auto',
	});
</script>

<article class="flex w-full flex-col items-center">
	<h1 class="text-3xl">Login</h1>
	<form method="POST" class="mt-5 flex flex-col space-y-4" use:enhance>
		<div>
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
					placeholder="Username..."
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
		</div>
		<div>
			<label for="password" class="relative block"
				><PasswordIcon
					class="pointer-events-none absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 transform {$errors?.password &&
					$form.password.length > 0
						? 'text-red-500'
						: 'text-green-500'}"
				/><input
					type="password"
					name="password"
					bind:value={$form.password}
					aria-invalid={$errors.password ? 'true' : undefined}
					id="password"
					class="w-full rounded-full {$errors?.password
						? 'border border-red-500'
						: ''} bg-gray-200 px-4 py-3 pl-14 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#26263a]"
					placeholder="Password..."
					autocomplete="new-password"
					required
					{...$constraints.password}
				/>
			</label>
			{#if $errors?.password && $form.password.length > 0}
				{#each $errors.password as error}
					<p class="ml-4 text-sm text-red-500">{error}</p>
				{/each}
			{/if}
		</div>

		<section class="flex items-center justify-between">
			<a class="text-sm text-gray-400 underline hover:text-gray-600" href="/register">Not Registered?</a>
			<button
				type="submit"
				class="rounded-full border border-blue-500 px-4 py-2 hover:bg-blue-500 hover:text-white active:bg-blue-500 active:text-white"
				>Login</button
			>
		</section>
	</form>
</article>
