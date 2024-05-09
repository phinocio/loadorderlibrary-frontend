<script lang="ts">
	import { page } from '$app/stores';
</script>

<!-- TODO: make this a proper error page with correct colorscheme and whatnot (maybe fine a way to inherit child layout) -->

<h1>{$page.status} {$page.error.message}</h1>
