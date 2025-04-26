import { adminUserListQueryOptions } from "@/hooks/queries/use-admin-user";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/users/$name")({
	loader: async ({ context, params }) => {
		await context.queryClient.ensureQueryData(
			adminUserListQueryOptions(params.name),
		);
	},
	component: UserComponent,
});

function UserComponent() {
	const { name } = Route.useParams();
	const { data: user } = useSuspenseQuery(adminUserListQueryOptions(name));

	return <div>Hello {user?.name}</div>;
}
