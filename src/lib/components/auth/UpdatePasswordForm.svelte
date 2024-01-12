<script lang="ts">
	import PasswordIcon from '$lib/components/icons/Password.svelte';
	import { passwordUpdateSchema, type PasswordUpdateSchema } from '$lib/schemas';
	import toast from 'svelte-french-toast';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms/client';
	export let data: SuperValidated<PasswordUpdateSchema>;

	const { form, errors, enhance, constraints } = superForm(data, {
		taintedMessage: null,
		validators: passwordUpdateSchema,
		validationMethod: 'auto',
		resetForm: true,
		onUpdated({ form }) {
			if (form.message) {
				// At this point it *should* only be a success.
				toast.success(form.message);
			}
		},
	});
</script>

<h2 class="text-xl font-bold">Update Password</h2>
<form method="post" action="?/updatePassword" class="mt-5 flex flex-col space-y-4" use:enhance>
	<label for="current_password" class="relative block">
		<PasswordIcon
			class="pointer-events-none absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 transform {$errors?.current_password
				? 'text-red-500'
				: 'text-green-500'}"
		/>
		<input
			type="password"
			name="current_password"
			aria-invalid={$errors.current_password ? 'true' : undefined}
			bind:value={$form.current_password}
			id="current_password"
			class="w-full rounded-full {$errors?.current_password && $form.current_password.length > 0
				? 'border border-red-500'
				: ''} bg-gray-200 px-4 py-3 pl-14 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#26263a]"
			placeholder="Current Password..."
			autocomplete="current-password"
			required
			{...$constraints.current_password}
		/>
	</label>
	{#if $errors?.current_password}
		{#each $errors.current_password as error}
			<p class="ml-4 text-sm text-red-500">{error}</p>
		{/each}
	{/if}
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
			class="block w-full rounded-full {$errors?.password && $form.password.length > 0
				? 'border border-red-500'
				: ''} bg-gray-200 px-4 py-3 pl-14 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#26263a]"
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
	<label for="password_confirmation" class="relative block"
		><PasswordIcon
			class="pointer-events-none absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 transform {$errors?.password_confirmation &&
			$form.password_confirmation.length > 0
				? 'text-red-500'
				: 'text-green-500'}"
		/><input
			type="password"
			name="password_confirmation"
			bind:value={$form.password_confirmation}
			aria-invalid={$errors.password_confirmation ? 'true' : undefined}
			id="password_confirmation"
			class="block w-full rounded-full {$errors?.password_confirmation && $form.password_confirmation.length > 0
				? 'border border-red-500'
				: ''} bg-gray-200 px-4 py-3 pl-14 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#26263a]"
			placeholder="Password Confirmation..."
			autocomplete="new-password"
			required
			{...$constraints.password_confirmation}
		/>
	</label>
	{#if $errors?.password_confirmation && $form.password_confirmation.length > 0}
		{#each $errors.password_confirmation as error}
			<p class="ml-4 block text-sm text-red-500">{error}</p>
		{/each}
	{/if}

	<section class="flex items-center justify-end">
		<button
			type="submit"
			class="rounded-full border border-blue-500 px-4 py-2 hover:bg-blue-500 hover:text-white active:bg-blue-500 active:text-white"
			>Update Password</button
		>
	</section>
</form>
