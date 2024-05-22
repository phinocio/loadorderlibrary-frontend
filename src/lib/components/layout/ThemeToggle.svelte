<script lang="ts">
	import LightModeIcon from '$lib/components/icons/LightMode.svelte';
	import DarkModeIcon from '$lib/components/icons/DarkMode.svelte';
	import { browser } from '$app/environment';
	import toast from 'svelte-french-toast';

	let theme = 'system';

	if (browser) {
		theme = localStorage.theme ?? 'system';
	}

	function setTheme() {
		if (theme.toLowerCase() === 'system') {
			localStorage.removeItem('theme');
		} else {
			localStorage.theme = theme.toLowerCase();
		}

		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}

		toast.success(`Theme set to ${theme.toLowerCase()}!`);
	}
</script>

<section class="mt-4 flex md:ml-4 md:mt-0">
	<!-- Shows current theme -->
	<label for="theme" class="inline-flex rounded-l-full bg-gray-200 px-4 py-2 dark:bg-[#26263a]">
		<LightModeIcon class="inline h-6 w-6 dark:hidden" />
		<DarkModeIcon class="hidden h-6 w-6 dark:inline" />
	</label>

	<select
		name="theme"
		id="theme"
		class="appearance-none rounded-r-full bg-gray-200 pr-4 dark:bg-[#26263a]"
		bind:value={theme}
		on:change={() => setTheme()}
	>
		<option value="light" selected={theme === 'light'}>Light</option>
		<option value="dark" selected={theme === 'dark'}>Dark</option>
		<option value="system" selected={theme === 'system'}>System</option>
	</select>
</section>
