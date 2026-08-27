import { createFileRoute, Outlet } from "@tanstack/react-router";
import { requireGuest } from "@/lib/guards";

export const Route = createFileRoute("/(auth)")({
	beforeLoad: async ({ context }) => {
		await requireGuest(context.queryClient);
	},
	component: RouteComponent,
});

function RouteComponent() {
	return <Outlet />;
}
