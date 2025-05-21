import { ListCard } from "@/components/lists/list-card";
import { ListSkeletonGrid } from "@/components/skeletons/list-skeleton";
import { listsQueryOptions, useLists } from "@/queries/use-list";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/(app)/lists/")({
	loader: ({ context }) =>
		context.queryClient.prefetchQuery(listsQueryOptions),
	component: RouteComponent,
});

function ListIndexComponent() {
	const { data: lists } = useLists();
	return (
		<div className="container mx-auto py-6">
			<h1 className="text-3xl font-bold mb-6">All Lists</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
				{lists.map((list) => (
					<ListCard key={list.slug} list={list} />
				))}
			</div>
		</div>
	);
}

function RouteComponent() {
	return (
		<div className="container mx-auto py-6">
			<h1 className="text-3xl font-bold mb-6">All Lists</h1>
			<Suspense fallback={<ListSkeletonGrid />}>
				<ListIndexComponent />
			</Suspense>
		</div>
	);
}
