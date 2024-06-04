<script lang="ts">
	export let dialog: HTMLDialogElement | undefined;
</script>

<dialog
	bind:this={dialog}
	class="fixed min-w-0 max-w-sm space-y-4 rounded-xl border-2 border-border-light bg-light p-4 text-text-light backdrop:bg-black backdrop:opacity-60 dark:border-border-dark dark:bg-dark dark:text-text-dark lg:top-1/4 lg:max-w-4xl"
>
	<header class="">
		<slot name="header" />
	</header>

	<slot name="body" />

	<footer>
		<slot name="footer">
			<button
				on:click={() => dialog?.close()}
				class="rounded-xl border border-blue-500 px-4 py-2 hover:bg-blue-500 hover:text-white focus:ring-blue-500 active:bg-blue-500 active:text-white"
				>Close</button
			>
		</slot>
	</footer>
</dialog>
