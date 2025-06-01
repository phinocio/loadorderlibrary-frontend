import { requireAuth } from "@/lib/guards";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_authenticated")({
	beforeLoad: async ({ context }) => {
		await requireAuth(context.queryClient, "/profile");
	},
	component: RouteComponent,
});

function RouteComponent() {
	return <Outlet />;
}
