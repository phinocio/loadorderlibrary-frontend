import { getGame, getGameLists, getGames } from "@/api/game";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

export const gamesQueryOptions = queryOptions({
	queryKey: ["games"],
	queryFn: getGames,
});

export function useGames() {
	return useSuspenseQuery(gamesQueryOptions);
}

export const gameQueryOptions = (slug: string) =>
	queryOptions({
		queryKey: ["games", slug],
		queryFn: () => getGame(slug),
	});

export function useGame(slug: string) {
	return useSuspenseQuery(gameQueryOptions(slug));
}

export const gameListsQueryOptions = (slug: string, query?: string) =>
	queryOptions({
		queryKey: ["games", slug, "lists", { query }],
		queryFn: () => getGameLists(slug, query),
	});

export function useGameLists(slug: string, query?: string) {
	return useSuspenseQuery(gameListsQueryOptions(slug, query));
}
