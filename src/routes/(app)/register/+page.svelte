<script lang="ts">
	import type { PageData } from './$types';
	import RegisterForm from '$lib/components/auth/RegisterForm.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Register - Load Order Library</title>
</svelte:head>

<RegisterForm data={data.form} />
