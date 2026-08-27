import { createFileRoute, Outlet } from "@tanstack/react-router";
import { requireAuth } from "@/lib/guards";

export const Route = createFileRoute("/(app)/_authenticated")({
	beforeLoad: async ({ context }) => {
		await requireAuth(context.queryClient, "/profile");
	},
	component: RouteComponent,
});

function RouteComponent() {
	return <Outlet />;
}
