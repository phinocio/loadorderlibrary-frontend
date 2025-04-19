import { currentUserQueryOptions } from "@/hooks/queries/use-auth";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_authenticated")({
	beforeLoad: async ({ context }) => {
		const currentUser = await context.queryClient.ensureQueryData(
			currentUserQueryOptions,
		);

		if (!currentUser) {
			throw redirect({
				to: "/login",
				search: {
					redirect: "/profile",
				},
			});
		}
	},

	component: RouteComponent,
});

function RouteComponent() {
	return <Outlet />;
}
