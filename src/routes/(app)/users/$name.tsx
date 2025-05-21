import { useUser, userQueryOptions } from "@/queries/use-user";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/users/$name")({
	loader: ({ context, params }) => {
		context.queryClient.prefetchQuery(userQueryOptions(params.name));
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { name } = Route.useParams();
	const { data: user } = useUser(name);

	return (
		<div className="container mx-auto py-6">
			<h1 className="text-3xl font-bold mb-6">{user.name} Lists</h1>
		</div>
	);
}
