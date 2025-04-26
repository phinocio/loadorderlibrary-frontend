import { adminGetUser } from "@/api/admin-user";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/users/$name")({
	loader: async ({ context, params }) => {
		await context.queryClient.ensureQueryData({
			queryKey: ["admin-users", params.name],
			queryFn: () => adminGetUser(params.name),
		});
	},
	component: UserComponent,
});

function UserComponent() {
	const { name } = Route.useParams();
	const { data: user } = useSuspenseQuery({
		queryKey: ["admin-users", name],
		queryFn: () => adminGetUser(name),
	});

	return <div>Hello {user?.name}</div>;
}
