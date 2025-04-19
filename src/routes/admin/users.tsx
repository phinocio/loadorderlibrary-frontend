import { adminUsersListQueryOptions } from "@/hooks/queries/use-admin-user";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/users")({
	loader: async ({ context }) =>
		context.queryClient.ensureQueryData(adminUsersListQueryOptions),
	component: RouteComponent,
});

function RouteComponent() {
	const { data: users } = useSuspenseQuery(adminUsersListQueryOptions);

	return (
		<div className="flex h-full w-full flex-col gap-4 p-4">
			<h1 className="text-2xl font-bold">Users</h1>
			<div className="flex flex-col gap-2">
				{users.map((user) => (
					<div key={user.name} className="flex items-center gap-2">
						<span>{user.name}</span>
						<span>{user.created}</span>
					</div>
				))}
			</div>
		</div>
	);
}
