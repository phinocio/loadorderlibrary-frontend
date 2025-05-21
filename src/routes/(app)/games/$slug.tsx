import { ListCard } from "@/components/lists/list-card";
import { GameDetailSkeleton } from "@/components/skeletons/game-detail-skeleton";
import {
	gameListsQueryOptions,
	gameQueryOptions,
	useGame,
	useGameLists,
} from "@/queries/use-game";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

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

function RouteComponent() {
	return (
		<Suspense fallback={<GameDetailSkeleton />}>
			<GameComponent />
		</Suspense>
	);
}
