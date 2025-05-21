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

export const gameListsQueryOptions = (slug: string) =>
	queryOptions({
		queryKey: ["games", slug, "lists"],
		queryFn: () => getGameLists(slug),
	});

export function useGameLists(slug: string) {
	return useSuspenseQuery(gameListsQueryOptions(slug));
}
