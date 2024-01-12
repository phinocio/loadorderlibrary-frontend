<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { SuperValidated } from 'sveltekit-superforms';
	import EmailIcon from '$lib/components/icons/Email.svelte';
	import { emailUpdateSchema, type EmailUpdateSchema } from '$lib/schemas';
	import toast from 'svelte-french-toast';

	export let data: SuperValidated<EmailUpdateSchema>;

	const { form, errors, enhance, constraints } = superForm(data, {
		taintedMessage: null,
		validators: emailUpdateSchema,
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

<form method="POST" action="?/updateEmail" class="mt-5 flex flex-col space-y-4" use:enhance>
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
