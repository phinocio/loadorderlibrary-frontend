import { requireGuest } from "@/lib/guards";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)")({
	beforeLoad: async ({ context }) => {
		await requireGuest(context.queryClient);
	},
	component: RouteComponent,
});

function RouteComponent() {
	return <Outlet />;
}
