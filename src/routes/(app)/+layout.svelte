<script lang="ts">
	import { page } from '$app/stores';
	import '../../app.css';

	import Logo from '$lib/assets/Logo.svelte';

	import MenuIcon from '$lib/components/icons/Menu.svelte';
	import DiscordIcon from '$lib/components/icons/Discord.svelte';
	import GitHubIcon from '$lib/components/icons/GitHub.svelte';
	import BlueSkyIcon from '$lib/components/icons/BlueSky.svelte';
	import { enhance } from '$app/forms';
	import ThemeToggle from '$lib/components/layout/ThemeToggle.svelte';
	import toast, { Toaster } from 'svelte-french-toast';

	export let data;
	export let hidden = true;
	export let userMenuHidden = true;

	$: $page.url && (hidden = true);
	$: $page.url && (userMenuHidden = true);
</script>

<svelte:head>
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="manifest" href="/site.webmanifest" />
	<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
	<meta name="msapplication-TileColor" content="#2b5797" />
	<meta name="theme-color" content="#ffffff" />

	<script>
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
		}

		// This allows something like changing prefers-color-scheme to work right away instead of relying on
		// a page refresh.
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
			if (localStorage.theme === 'dark' || (!('theme' in localStorage) && event.matches)) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		});
	</script>
</svelte:head>

<header class="mb-6 border-b-2 border-green-400 dark:border-green-800 dark:text-white">
	<nav class="container mx-auto flex flex-col items-center px-4 py-4 text-xl md:flex-row lg:px-20">
		<div class="flex w-full items-center justify-between md:w-auto">
			<a href="/" class="text-2xl font-bold md:mr-4"
				><Logo class="h-8 w-8 text-green-500 hover:text-green-400" />
			</a>
			<p class="md:hidden">Load Order Library</p>
			<button
				type="button"
				on:click={() => (hidden = !hidden)}
				aria-label="Toggle menu"
				class="rounded text-green-500 hover:bg-blue-400 active:bg-blue-400 active:text-white md:hidden dark:hover:bg-blue-500 dark:active:bg-blue-500"
			>
				<MenuIcon class="h-8 w-8" />
			</button>
		</div>
		<div
			class="mt-2 hidden w-full flex-col text-center md:mt-0 md:flex md:flex-row md:items-center md:justify-between"
			class:hidden
		>
			<div class="flex flex-col border-t border-border-light md:flex-row md:border-none dark:border-border-dark">
				<a
					href="/upload"
					class="rounded-xl px-4 py-2 hover:bg-blue-500 hover:text-white active:bg-blue-500 active:text-white"
					>Upload</a
				>
				<a
					href="/lists"
					class="rounded-xl px-4 py-2 hover:bg-blue-500 hover:text-white active:bg-blue-500 active:text-white"
					>Browse</a
				>
				<a
					href="/compare"
					class="rounded-xl px-4 py-2 hover:bg-blue-500 hover:text-white active:bg-blue-500 active:text-white"
					>Compare</a
				>
			</div>
			<hr class="border-border-light dark:border-border-dark" />
			<div class="flex flex-col items-center md:flex-row">
				{#if data.user}
					<div class="relative hidden sm:block">
						<button
							on:click={() => (userMenuHidden = !userMenuHidden)}
							type="button"
							class="relative z-20 h-12 w-12 rounded-full border-2 border-green-500 bg-light hover:border-green-400 dark:bg-dark"
							>{data.user.name.charAt(0)}</button
						>
						<button
							type="button"
							aria-labelledby="Close Dropdown"
							class="fixed inset-0 z-10 hidden h-full w-full cursor-default bg-black opacity-50"
							class:hidden={userMenuHidden}
							on:click={() => (userMenuHidden = !userMenuHidden)}
							tabindex="-1"
						></button>
						<div
							class="absolute right-0 z-10 mt-2 w-48 rounded-lg border border-blue-500 bg-light dark:bg-dark"
							class:hidden={userMenuHidden}
						>
							<a
								aria-current="page"
								class=" block py-2 hover:bg-blue-500 hover:text-white active:bg-blue-500 active:text-white"
								href="/profile">Profile</a
							><a
								aria-current="page"
								class="block py-2 hover:bg-blue-500 hover:text-white active:bg-blue-500 active:text-white"
								href="/profile">My Lists</a
							>
							<hr class="my-2 border-border-light dark:border-border-dark" />
							<form method="POST" action="/logout">
								<button
									type="submit"
									class="block w-full py-2 hover:bg-blue-500 hover:text-white active:bg-blue-500 active:text-white"
									>Logout</button
								>
							</form>
						</div>
					</div>

					<!-- Mobile Account Dropdown -->
					<div class="relative mt-4 text-center sm:hidden">
						<button
							type="button"
							class=" h-12 w-12 rounded-full border-2 border-green-500 bg-light hover:border-green-400 dark:bg-dark"
							>{data.user.name.charAt(0)}</button
						>
						<div class="mt-2 rounded-lg">
							<a class="active block px-2 py-2 hover:bg-blue-500" href="/profile">Profile</a><a
								class="active block px-2 py-2 hover:bg-blue-500"
								href="/profile">My Lists</a
							>
							<hr class="my-2 border-border-light dark:border-border-dark" />
							<form method="POST" action="?/logout" use:enhance>
								<button type="button" class="block w-full px-2 py-2 text-center hover:bg-blue-500"
									>Logout</button
								>
							</form>
						</div>
					</div>
				{:else}
					<a
						href="/login"
						class="rounded-xl px-4 py-2 hover:bg-blue-500 hover:text-white active:bg-blue-500 active:text-white"
						>Login</a
					>
					<a
						href="/register"
						class="rounded-xl px-4 py-2 hover:bg-blue-500 hover:text-white active:bg-blue-500 active:text-white"
						>Register</a
					>
				{/if}
				<ThemeToggle />
			</div>
		</div>
	</nav>
</header>

<noscript>Enabled JS you fuck</noscript>

<main class="container mx-auto mb-20 flex h-full flex-grow flex-col px-4 lg:px-20">
	<Toaster />
	<slot />
</main>

<footer
	class="border-t-2 border-green-400 bg-[#dce0e8] text-center text-black dark:border-green-800 dark:bg-[#11111b] dark:text-white"
>
	<div class="px-4 py-5 text-center sm:container sm:mx-auto sm:flex sm:justify-between">
		<section class="space-y-2">
			<p class="font-bold text-green-600 dark:text-green-500">Load Order Library</p>
			<p>
				Created By <a
					href="https://phinocio.com"
					class="text-blue-600 hover:text-blue-400 active:text-blue-400 dark:text-blue-400 dark:hover:text-blue-600 dark:active:text-blue-600"
					rel="noreferrer noopener"
					target="_blank">Phinocio</a
				>
			</p>
		</section>
		<hr class="my-4 border-border-light sm:hidden dark:border-border-dark" />
		<section class="space-y-2">
			<p class="font-bold text-green-600 dark:text-green-500">Social</p>
			<p class="flex justify-center space-x-2">
				<a
					class="hover:text-blue-500"
					href="https://github.com/phinocio/loadorderlibrary"
					rel="noreferrer noopener"
					target="_blank"><GitHubIcon class="h-6 w-6" /></a
				><a
					class="hover:text-blue-500"
					href="https://discord.gg/K3KnEgrQE4"
					rel="noreferrer noopener"
					target="_blank"><DiscordIcon class="h-6 w-6" /></a
				>
				<a
					class="hover:text-blue-500"
					href="https://bsky.app/profile/phinoc.io"
					rel="noreferrer noopener"
					target="_blank"><BlueSkyIcon class="h-6 w-6" /></a
				>
			</p>
		</section>
		<hr class="my-4 border-border-light sm:hidden dark:border-border-dark" />
		<section class="space-y-2">
			<p class="font-bold text-green-600 dark:text-green-500">API Resources</p>
			<p class="flex justify-center space-x-2">
				<a
					class="hover:text-blue-500"
					href="https://docs.loadorderlibrary.com"
					rel="noreferrer noopener"
					target="_blank">Documentation</a
				>
			</p>
		</section>
		<hr class="my-4 border-border-light sm:hidden dark:border-border-dark" />
		<section class="space-y-2">
			<p class="font-bold text-green-600 dark:text-green-500">Support The Site</p>
			<p class="flex justify-center space-x-2">
				<a
					class="hover:text-blue-500"
					href="https://patreon.com/phinocio"
					rel="noreferrer noopener"
					target="_blank">Patreon</a
				><a
					class="hover:text-blue-500"
					href="https://ko-fi.com/phinocio"
					rel="noreferrer noopener"
					target="_blank">Ko-fi</a
				>
			</p>
		</section>
	</div>
</footer>
