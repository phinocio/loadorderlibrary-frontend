import { ListCard } from "@/components/lists/list-card";
import { GameDetailSkeleton } from "@/components/skeletons/game-detail-skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ErrorFallback } from "@/components/ui/error-fallback";
import { Input } from "@/components/ui/input";
import {
	gameListsInfiniteQueryOptions,
	gameQueryOptions,
	useGame,
	useGameListsInfinite,
} from "@/queries/use-game";
import {
	createFileRoute,
	useNavigate,
	useSearch,
} from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { z } from "zod";

const searchSchema = z.object({
	query: z.string().optional(),
});

export const Route = createFileRoute("/(app)/games/$slug")({
	validateSearch: searchSchema,
	loader: ({ context, params, location }) => {
		const search = searchSchema.parse(location.search);
		context.queryClient.prefetchInfiniteQuery(
			gameListsInfiniteQueryOptions(params.slug, search.query),
		);
		context.queryClient.prefetchQuery(gameQueryOptions(params.slug));
	},
	component: RouteComponent,
});

function GameComponent() {
	const { slug } = Route.useParams();
	const search = useSearch({ from: "/(app)/games/$slug" });
	const {
		data: listsData,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useGameListsInfinite(slug, search.query);
	const { data: game } = useGame(slug);
	const navigate = useNavigate();
	const [searchValue, setSearchValue] = useState(search.query || "");

	// Flatten the paginated data into a single array
	const lists = listsData.pages.flatMap((page) => page.data);

	// Update local state when URL search changes
	useEffect(() => {
		setSearchValue(search.query || "");
	}, [search.query]);

	const handleSearch = () => {
		navigate({
			to: "/games/$slug",
			params: { slug },
			search: searchValue ? { query: searchValue } : {},
			replace: true,
		});
	};

	const resetSearch = () => {
		setSearchValue("");
		navigate({
			to: "/games/$slug",
			params: { slug },
			replace: true,
		});
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	return (
		<article className="container mx-auto py-6">
			<header className="mb-6">
				<section className="flex items-center mb-4 space-x-4">
					<h1 className="text-3xl font-bold">{game.name} Lists</h1>
					<Badge variant="secondary" className="font-bold">
						{listsData.pages[0]?.meta.total ?? 0}
					</Badge>
				</section>
				<div>
					<Card>
						<CardHeader>
							<CardTitle>Search Lists</CardTitle>
							<CardDescription>
								Find lists by name, author, or description.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="flex gap-2">
								<Input
									type="text"
									placeholder="Search lists..."
									value={searchValue}
									onChange={handleSearchChange}
									onKeyDown={handleKeyDown}
									className="flex-1"
								/>
								<Button onClick={handleSearch} size="icon">
									<Search className="h-4 w-4" />
								</Button>
								{searchValue && (
									<Button
										onClick={() => resetSearch()}
										size="icon"
										variant="destructive"
									>
										<X className="h-4 w-4" />
									</Button>
								)}
							</div>
						</CardContent>
					</Card>
				</div>
			</header>
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
				{/*
					Show no lists found message if lists is empty, and query if search is not empty
				*/}
				{lists.length === 0 ? (
					searchValue ? (
						<div className="col-span-full text-center py-12">
							<p className="text-lg text-muted-foreground">
								No lists found for{" "}
								<span className="font-semibold">
									"{searchValue}"
								</span>{" "}
								in{" "}
								<span className="font-semibold">
									{game.name}
								</span>
								.
							</p>
						</div>
					) : (
						<div className="col-span-full text-center py-12">
							<p className="text-lg text-muted-foreground">
								No lists available for{" "}
								<span className="font-semibold">
									{game.name}
								</span>{" "}
								yet.
							</p>
						</div>
					)
				) : (
					lists.map((list) => (
						<ListCard key={list.slug} list={list} />
					))
				)}
			</div>
			{/* Load More Button */}
			{hasNextPage && (
				<div className="flex justify-center mt-8">
					<Button
						onClick={() => fetchNextPage()}
						disabled={isFetchingNextPage}
						size="lg"
					>
						{isFetchingNextPage ? "Loading..." : "Load More Lists"}
					</Button>
				</div>
			)}
		</article>
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
