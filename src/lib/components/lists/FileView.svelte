<script lang="ts">
	export let content: string[];

	// Need to copy this to a new variable to not mutate the original when filtering.
	// This allows us to use .filter() on content and also have it show files again
	// when deleting a search, instead of mutating it with content = content.filter()
	// and ending up forcing the user to refresh the page to see original lines again.
	let file = content;

	let className: string = '';
	export { className as class };
	export let fileName: string;
	let filterText: string;

	let showDisabled: boolean = false;

	function filterList() {
		file = content.filter((line) => {
			return line.toLowerCase().includes(filterText.toLowerCase()) || line.endsWith('_separator');
		});
	}
</script>

<section class={className}>
	<section class="flex flex-col items-center border border-blue-500 md:flex-row">
		<input
			type="text"
			class="w-full flex-1 bg-gray-200 p-4 focus:outline-none focus:ring-1 focus:ring-blue-500 md:w-auto dark:bg-[#26263a]"
			placeholder="Filter..."
			id="filter-{fileName}"
			bind:value={filterText}
			on:input={filterList}
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
		{/if}
	</section>
	<ul id={fileName}>
		{#each file as line, i}
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
					<span>{i + 1}</span>
				</span>

				<!-- if the line is a separator -->
				{#if line.endsWith('_separator')}
					<span class="w-full bg-green-500 py-2 pl-4 text-center font-bold text-white">
						{line.replace('_separator', '').replace(/^\+|^-/, '')}
					</span>
				{:else if line.startsWith('-')}
					<span class="w-full bg-red-500 py-2 pl-4 font-bold text-white line-through">
						{line.replace(/^-/, '')}
					</span>
				{:else}
					<span class="pl-4">{line.replace(/^\+|^-/, '')}</span>
				{/if}
			</li>
		{/each}
	</ul>
</section>
