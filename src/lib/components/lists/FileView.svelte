<script lang="ts">
	import MenuIcon from "$lib/components/icons/Menu.svelte";

	export let content: string[];
	export { className as class };
	export let fileName: string;

	let className: string = '';
	let filterText: string;
	let showDisabled: boolean = false;
	let timeoutId: number;
	let filteredMods: string[] = [];

    let miscOptionsHidden = true;

	function toggleSeparator(index: number) {
		// We need to add the index of the separator we are working with to the found nextSep index so it
		// matches the index in the original array, otherwise it's the index in the sliced array, which will
		// often be below the passed in index value.
		const nextSep = filteredMods.slice(index + 1).findIndex((line) => line.endsWith('_separator')) + index;
		const listUl = document.getElementById(`ul-${fileName}`);
		const listLi = listUl?.getElementsByTagName('li');

		if (!listUl || !listLi || listLi.length === 0) {
			return;
		}

		for (let i = index + 1; i < nextSep + 1; i++) {
			if (!listLi[i].classList.contains('disabled')) {
				listLi[i].classList.toggle('hidden');
			}
		}
	}

	function collapseExpandAll(type: 'collapse' | 'expand') {
		miscOptionsHidden = true;
		const listUl = document.getElementById(`ul-${fileName}`);
		const listLi = listUl?.getElementsByTagName('li');
		if (!listUl || !listLi || listLi.length === 0) {
			return;
		}
		for (let i = 0; i < listLi.length; i++) {
			if (!listLi[i].classList.contains("disabled")) {
				const isSeparator = filteredMods[i].endsWith("_separator");
				if (isSeparator) continue;
				if (type === 'collapse' && !listLi[i].classList.contains("hidden")) {
					listLi[i].classList.add('hidden');
				} else if (type === 'expand' && listLi[i].classList.contains("hidden")) {
					listLi[i].classList.remove('hidden');
				}
			}
		}
	}

	function debounceFilter(callback: () => void, delay: number): void {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(callback, delay);
	}

	$: {
		if (!filterText) {
			filteredMods = content;
		} else {
			const lowerFilter: string = filterText.toLowerCase();
			debounceFilter(() => {
				const newFilteredMods: string[] = [];

				for (let i = 0; i < content.length; i++) {
					const line = content[i];
					if (line.endsWith('_separator') || line.toLowerCase().includes(lowerFilter)) {
						newFilteredMods.push(line);
					}
				}

				if (newFilteredMods !== filteredMods) {
					filteredMods = newFilteredMods;
				}
			}, 200);
		}
	}
</script>

<section class={className}>
	<section class="flex flex-col items-center border border-blue-500 md:flex-row">
		<input
			type="text"
			class="w-full flex-1 bg-gray-200 p-4 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-[#26263a] md:w-auto"
			placeholder="Filter..."
			id="filter-{fileName}"
			bind:value={filterText}
		/>
		{#if fileName === 'modlist.txt'}
			<label class="flex items-center p-4">
				Show Disabled

				<input
					class="ml-2 h-5 w-5 cursor-pointer accent-green-500"
					type="checkbox"
					name="toggleDisabled"
					id="toggleDisabled"
					bind:checked={showDisabled}
				/>
			</label>
			<div class="relative hidden sm:block">
				<button
					on:click={() => (miscOptionsHidden = !miscOptionsHidden)}
					type="button"
					class="relative z-20 flex px-2 bg-light dark:bg-dark"
					title="View More Options"
					aria-label="View More Options"
					>
						<MenuIcon class="h-8 w-8" />
					</button
				>
				<button
					type="button"
					aria-labelledby="Close Dropdown"
					class="fixed inset-0 z-10 hidden h-full w-full cursor-default"
					class:hidden={miscOptionsHidden}
					on:click={() => (miscOptionsHidden = !miscOptionsHidden)}
					tabindex="-1"
				></button>
				<div
					class="absolute right-0 z-10 mt-2 w-48 rounded-lg border border-blue-500 bg-light dark:bg-dark"
					class:hidden={miscOptionsHidden}
				>
					<button
						aria-label="Collapse All"
						class="py-2 px-2 rounded-lg w-full hover:bg-blue-500 hover:text-white active:bg-blue-500 active:text-white"
						on:click={() => collapseExpandAll('collapse')}
					>
						Collapse All
					</button>
					<button
						aria-label="Expand All"
						class="py-2 px-2 rounded-lg w-full hover:bg-blue-500 hover:text-white active:bg-blue-500 active:text-white"
						on:click={() => collapseExpandAll('expand')}
					>
						Expand All
					</button>
				</div>
			</div>
		{/if}
	</section>
	<ul id="ul-{fileName}">
		{#each filteredMods as line, i (i)}
			{#if !line.startsWith('#')}
				<li
					class="{line.startsWith('-') && !line.endsWith('_separator') && !showDisabled
						? 'disabled hidden'
						: ''} flex items-center odd:bg-gray-200 hover:bg-blue-500 hover:text-white dark:odd:bg-[#26263a] dark:hover:bg-blue-500"
				>
					<span
						class="{line.endsWith('_separator')
							? 'hidden'
							: ''} min-w-14 select-none self-stretch bg-blue-500 p-2 text-center text-white"
					>
						{#if !line.endsWith('_separator')}
							<span>{i + 1}.</span>
						{/if}
					</span>

					<!-- if the line is a separator -->
					{#if line.endsWith('_separator')}
						<button
							class="w-full bg-green-500 py-2 pl-4 text-center font-bold text-white"
							on:click={() => toggleSeparator(i)}
						>
							{line.replace('_separator', '').replace(/^\+|^-/, '')}
						</button>
					{:else if line.startsWith('-')}
						<span class="w-full bg-red-500 py-2 pl-4 font-bold text-white line-through">
							{line.replace(/^-/, '')}
						</span>
					{:else}
						<span class="pl-4">{line.replace(/^\+|^-|^\*/, '')}</span>
					{/if}
				</li>
			{/if}
		{/each}
	</ul>
</section>
