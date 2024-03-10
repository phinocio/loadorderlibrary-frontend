<script lang="ts">
	import type { PageData } from './$types';
	import LoginForm from '$lib/components/auth/LoginForm.svelte';
	import { page } from '$app/stores';

	export let data: PageData;
</script>

<svelte:head>
	<title>Login - Load Order Library</title>
	<!-- FB Meta -->
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:title" content="Login - Load Order Library" />
	<meta property="og:description" content="A modlist files site to help with support." />
	<meta property="og:image" content="/images/logo.png" />
	<meta property="og:type" content="website" />

	<!-- Twitter Meta -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:url" content={$page.url.href} />
	<meta name="twitter:title" content="Login - Load Order Library" />
	<meta name="twitter:description" content="A modlist files site to help with support." />
	<meta name="twitter:image" content="/images/logo.png" />
</svelte:head>

<LoginForm data={data.form} />
