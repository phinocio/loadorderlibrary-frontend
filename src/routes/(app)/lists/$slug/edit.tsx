import { ListEditForm } from "@/components/lists/list-edit-form";
import { ListDetailSkeleton } from "@/components/skeletons/list-detail-skeleton";
import { listQueryOptions, useList } from "@/queries/use-list";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/(app)/lists/$slug/edit")({
	loader: ({ context, params }) =>
		context.queryClient.ensureQueryData(listQueryOptions(params.slug)),
	component: RouteComponent,
});

function RouteComponent() {
	const { slug } = Route.useParams();
	const { data: list } = useList(slug);

	return (
		<div className="container mx-auto p-4">
			<Suspense fallback={<ListDetailSkeleton />}>
				<ListEditForm list={list} />
			</Suspense>
		</div>
	);
}
