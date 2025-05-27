import { ListCard } from "@/components/lists/list-card";
import { GameDetailSkeleton } from "@/components/skeletons/game-detail-skeleton";
import { ErrorFallback } from "@/components/ui/error-fallback";
import {
	gameListsQueryOptions,
	gameQueryOptions,
	useGame,
	useGameLists,
} from "@/queries/use-game";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const Route = createFileRoute("/(app)/games/$slug")({
	loader: ({ context, params }) => {
		context.queryClient.prefetchQuery(gameListsQueryOptions(params.slug));
		context.queryClient.prefetchQuery(gameQueryOptions(params.slug));
	},
	component: RouteComponent,
});

function GameComponent() {
	const { slug } = Route.useParams();
	const { data: lists } = useGameLists(slug);
	const { data: game } = useGame(slug);

	return (
		<div className="container mx-auto py-6">
			<h1 className="text-3xl font-bold mb-6">{game.name} Lists</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
				{lists.map((list) => (
					<ListCard key={list.slug} list={list} />
				))}
			</div>
		</div>
	);
}

function GameErrorFallback({
	error,
	resetErrorBoundary,
}: { error: Error; resetErrorBoundary?: () => void }) {
	return (
		<ErrorFallback
			error={error}
			resetErrorBoundary={resetErrorBoundary}
			title404="Game Not Found"
			description404="Could not find this game. It may not exist or may not be supported yet."
			titleGeneric="Error Loading Game"
			descriptionGeneric="An error occurred while loading the game page. Please try again later."
		/>
	);
}

function RouteComponent() {
	return (
		<ErrorBoundary
			fallbackRender={({ error, resetErrorBoundary }) => (
				<GameErrorFallback
					error={error}
					resetErrorBoundary={resetErrorBoundary}
				/>
			)}
		>
			<Suspense fallback={<GameDetailSkeleton />}>
				<GameComponent />
			</Suspense>
		</ErrorBoundary>
	);
}
