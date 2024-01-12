<script lang="ts">
	export let content: string[];

	let className: string = '';
	export { className as class };
</script>

<ul class={className}>
	{#each content as line, i}
		<li
			class="flex items-center odd:bg-gray-200 hover:bg-blue-500 hover:text-white dark:odd:bg-[#26263a] dark:hover:bg-blue-500"
		>
			<p
				class="{line.endsWith('_separator')
					? 'hidden'
					: ''} min-w-14 select-none self-stretch bg-blue-500 p-2 text-center text-white last:rounded-bl-xl"
			>
				<span>{i + 1}</span>
			</p>

			<!-- if the line is a separator -->
			{#if line.endsWith('_separator')}
				<p class="w-full bg-green-500 py-2 pl-4 text-center font-bold text-white">
					{line.replace('_separator', '').replace(/^-/, '')}
				</p>
			{:else if line.startsWith('-')}
				<p class="w-full bg-red-500 py-2 pl-4 font-bold text-white line-through">
					{line.replace(/^-/, '')}
				</p>
			{:else}
				<p class="pl-4">{line.replace(/^\+|^-/, '')}</p>
			{/if}
		</li>
	{/each}
</ul>
