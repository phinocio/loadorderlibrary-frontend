<script lang="ts">
	import type { PageData } from './$types';
	import LoginForm from '$lib/components/auth/LoginForm.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>Login - Load Order Library</title>
</svelte:head>

<LoginForm data={data.form} />
