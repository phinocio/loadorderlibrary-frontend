import { GameIndexSkeleton } from "@/components/skeletons/game-index-skeleton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { gamesQueryOptions, useGames } from "@/queries/use-game";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/(app)/games/")({
	head: () => ({
		meta: [{ title: "Games - Load Order Library" }],
	}),
	loader: ({ context }) =>
		context.queryClient.prefetchQuery(gamesQueryOptions),
	component: RouteComponent,
});

function GameIndexComponent() {
	const { data: games } = useGames();

	return (
		<div className="container mx-auto py-6">
			<h1 className="text-2xl font-bold mb-6">Games</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
				{games.map((game) => (
					<Card
						key={game.id}
						className="group hover:shadow-md transition-all"
					>
						<CardHeader>
							<CardTitle className="flex items-start justify-between">
								<Link
									to="/games/$slug"
									params={{ slug: game.slug }}
									className="text-primary hover:underline"
								>
									{game.name}
								</Link>
								<Badge
									variant="secondary"
									className="ml-2 font-bold"
								>
									{game.lists_count} lists
								</Badge>
							</CardTitle>
						</CardHeader>
						<CardContent>
							{game.lists_count > 0 ? (
								<p className="text-sm text-muted-foreground">
									Browse {game.lists_count} mod{" "}
									{game.lists_count === 1 ? "list" : "lists"}{" "}
									for {game.name}
								</p>
							) : (
								<p className="text-sm text-muted-foreground">
									No mod lists yet. Be the first to create
									one!
								</p>
							)}
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}

function RouteComponent() {
	return (
		<Suspense fallback={<GameIndexSkeleton />}>
			<GameIndexComponent />
		</Suspense>
	);
}
