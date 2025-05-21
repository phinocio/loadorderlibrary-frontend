import { ListDetail } from "@/components/lists/list-detail";
import { ListDetailSkeleton } from "@/components/skeletons/list-detail-skeleton";
import { listQueryOptions, useList } from "@/queries/use-list";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/(app)/lists/$slug")({
	loader: ({ context, params }) => {
		return context.queryClient.prefetchQuery(listQueryOptions(params.slug));
	},
	component: RouteComponent,
});

function ListDetailComponent() {
	const { slug } = Route.useParams();
	const { data: list, isError } = useList(slug);

	if (isError || !list) {
		return (
			<div className="container mx-auto py-6">
				<h1 className="text-2xl font-bold mb-2">Error</h1>
				<p className="text-muted-foreground">
					Could not load the list. It may have been deleted or you
					don't have permission to view it.
				</p>
			</div>
		);
	}

	return (
		<div className="container mx-auto py-6">
			<ListDetail list={list} />
		</div>
	);
}

function RouteComponent() {
	return (
		<Suspense fallback={<ListDetailSkeleton />}>
			<ListDetailComponent />
		</Suspense>
	);
}
