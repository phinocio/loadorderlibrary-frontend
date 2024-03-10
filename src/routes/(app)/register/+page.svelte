<script lang="ts">
	import type { PageData } from './$types';
	import RegisterForm from '$lib/components/auth/RegisterForm.svelte';
	import { page } from '$app/stores';

	export let data: PageData;
</script>

<svelte:head>
	<title>Register - Load Order Library</title>
	<!-- FB Meta -->
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:title" content="Register - Load Order Library" />
	<meta property="og:description" content="A modlist files site to help with support." />
	<meta property="og:image" content="/images/logo.png" />
	<meta property="og:type" content="website" />

	<!-- Twitter Meta -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:url" content={$page.url.href} />
	<meta name="twitter:title" content="Register - Load Order Library" />
	<meta name="twitter:description" content="A modlist files site to help with support." />
	<meta name="twitter:image" content="/images/logo.png" />
</svelte:head>

<RegisterForm data={data.form} />
