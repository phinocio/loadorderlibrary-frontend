import { ListDetail } from "@/components/lists/list-detail";
import { ListDetailSkeleton } from "@/components/skeletons/list-detail-skeleton";
import { ErrorFallback } from "@/components/ui/error-fallback";
import { listQueryOptions, useList } from "@/queries/use-list";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const Route = createFileRoute("/(app)/lists/$slug/")({
	loader: ({ context, params }) => {
		return context.queryClient.prefetchQuery(listQueryOptions(params.slug));
	},
	component: RouteComponent,
});

function ListDetailComponent() {
	const { slug } = Route.useParams();
	const { data: list } = useList(slug);

	return (
		<div className="container mx-auto py-6">
			<ListDetail list={list} />
		</div>
	);
}

function ListErrorFallback({
	error,
	resetErrorBoundary,
}: { error: Error; resetErrorBoundary?: () => void }) {
	return (
		<ErrorFallback
			error={error}
			resetErrorBoundary={resetErrorBoundary}
			title404="List Not Found"
			description404="Could not load the list. It may have been deleted or you don't have permission to view it."
			titleGeneric="Error Loading List"
			descriptionGeneric="An error occurred while loading the list. Please try again later."
		/>
	);
}

function RouteComponent() {
	return (
		<ErrorBoundary
			fallbackRender={({ error, resetErrorBoundary }) => (
				<ListErrorFallback
					error={error}
					resetErrorBoundary={resetErrorBoundary}
				/>
			)}
		>
			<Suspense fallback={<ListDetailSkeleton />}>
				<ListDetailComponent />
			</Suspense>
		</ErrorBoundary>
	);
}
