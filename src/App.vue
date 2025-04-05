<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue';
import { RouterView } from 'vue-router';
import { SidebarInset, SidebarProvider, SidebarTrigger } from './components/ui/sidebar';
</script>

<template>
	<SidebarProvider>
		<AppSidebar />
		<SidebarInset>
			<main>
				<SidebarTrigger />
				<RouterView />
			</main>
		</SidebarInset>
	</SidebarProvider>
</template>
