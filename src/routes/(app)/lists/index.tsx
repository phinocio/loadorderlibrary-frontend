import { ListCard } from "@/components/lists/list-card";
import { listsQueryOptions } from "@/queries/use-list";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/lists/")({
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData(listsQueryOptions);
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { data } = useSuspenseQuery(listsQueryOptions);

	return (
		<div className="container mx-auto py-6">
			<h1 className="text-3xl font-bold mb-6">All Lists</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
				{data.map((list) => (
					<ListCard key={list.slug} list={list} />
				))}
			</div>
		</div>
	);
}
