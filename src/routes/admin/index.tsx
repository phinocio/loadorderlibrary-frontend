import { useAuth } from "@/hooks/use-auth";
import type { User } from "@/types/user";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
	beforeLoad: ({ context }) => {
		const { queryClient } = context;
		const user = queryClient.getQueryData<User>(["user"]);
		if (!user) {
			throw redirect({
				to: "/login",
				search: {
					redirect: "/admin",
				},
			});
		}
		if (!user.admin) {
			throw redirect({
				to: "/",
			});
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { user } = useAuth();
	return (
		<div className="p-4">
			<h1 className="mb-4 text-2xl font-bold">Admin Dashboard</h1>
			<p>Welcome, {user?.name}! This is a protected admin area.</p>
		</div>
	);
}
