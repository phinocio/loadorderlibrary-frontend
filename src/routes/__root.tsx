import { Toaster } from "@/components/ui/sonner";
import TanstackQueryLayout from "@/integrations/tanstack-query/layout";
import type { QueryClient } from "@tanstack/react-query";
import {
	HeadContent,
	Outlet,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

type MyRouterContext = {
	queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				name: "description",
				content:
					"Load Order Library is a website/tool to share mod lists of - primarily Bethesda - games with other players. Upload your mod lists for troubleshooting or sharing.",
			},
			{
				name: "keywords",
				content:
					"mod lists, bethesda games, skyrim, fallout, oblivion, morrowind, modding, troubleshooting",
			},
		],
	}),
	component: () => (
		<>
			<HeadContent />
			<Outlet />
			<Toaster />
			<TanStackRouterDevtools position="top-right" />
			<TanstackQueryLayout />
		</>
	),
});
