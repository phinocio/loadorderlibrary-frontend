import type { User } from "@/types/user";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)")({
	beforeLoad: async ({ context }) => {
		const { queryClient } = context;

		await new Promise((resolve) => setTimeout(resolve, 100));
		const user = queryClient.getQueryData<User>(["user"]);

		if (user) {
			throw redirect({
				to: "/",
			});
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	return <Outlet />;
}
