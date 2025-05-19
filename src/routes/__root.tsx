import { Toaster } from "@/components/ui/sonner";
import TanstackQueryLayout from "@/integrations/tanstack-query/layout";
import type { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

type MyRouterContext = {
	queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: () => (
		<>
			<Outlet />
			<Toaster />
			<TanStackRouterDevtools position="top-right" />
			<TanstackQueryLayout />
		</>
	),
});
