<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import EmailIcon from '$lib/components/icons/Email.svelte';
	import { emailUpdateSchema, type EmailUpdateSchema } from '$lib/schemas';
	import toast from 'svelte-french-toast';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { getContext } from 'svelte';
	import type { User } from '$lib/types/User';
	import type { Writable } from 'svelte/store';

	export let data: SuperValidated<Infer<EmailUpdateSchema>>;

	const user: Writable<User> = getContext('user');

	const { form, errors, enhance, constraints } = superForm(data, {
		taintedMessage: null,
		validators: zodClient(emailUpdateSchema),
		validationMethod: 'auto',
		resetForm: true,
		onUpdated({ form }) {
			if (form.message) {
				// At this point it *should* only be a success.
				toast.success(form.message);
			}
			if (form.valid) {
				$user.email = form.data.email ?? null;
			}
		},
	});
</script>

<h2 class="text-xl font-bold">Update Email</h2>
<span class="text-gray-500">To remove the email, submit with the field blank.</span>

<form method="POST" action="?/updateEmail" class="mt-2 flex flex-col space-y-4" use:enhance>
	<label for="email" class="relative block"
		><EmailIcon
			class="pointer-events-none absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 transform {$errors?.email
				? 'text-red-500'
				: 'text-green-500'}"
		/><input
			type="email"
			name="email"
			aria-invalid={$errors.email ? 'true' : undefined}
			id="email"
			bind:value={$form.email}
			class="w-full rounded-full {$errors?.email
				? 'border border-red-500'
				: ''} bg-gray-200 px-4 py-3 pl-14 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#26263a]"
			placeholder="New Email"
			autocomplete="email"
			{...$constraints.email}
		/></label
	>
	{#if $errors?.email}
		{#each $errors?.email as error}
			<p class="ml-4 text-sm text-red-500">{error}</p>
		{/each}
	{/if}
	<section class="flex items-center justify-end">
		<button
			type="submit"
			class="rounded-full border border-blue-500 px-4 py-2 hover:bg-blue-500 hover:text-white active:bg-blue-500 active:text-white"
			>Update Email</button
		>
	</section>
</form>
