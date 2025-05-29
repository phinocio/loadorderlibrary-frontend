import { getGame, getGameLists, getGames } from "@/api/game";
import {
	infiniteQueryOptions,
	queryOptions,
	useSuspenseInfiniteQuery,
	useSuspenseQuery,
} from "@tanstack/react-query";

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

export const gameListsInfiniteQueryOptions = (slug: string, query?: string) =>
	infiniteQueryOptions({
		queryKey: ["games", slug, "lists", "infinite", { query }],
		queryFn: ({ pageParam }) => getGameLists(slug, query, pageParam),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			const nextPage = lastPage.meta.current_page + 1;
			return nextPage <= lastPage.meta.last_page ? nextPage : undefined;
		},
	});

export function useGameLists(slug: string, query?: string) {
	return useSuspenseQuery(gameListsQueryOptions(slug, query));
}

export function useGameListsInfinite(slug: string, query?: string) {
	return useSuspenseInfiniteQuery(gameListsInfiniteQueryOptions(slug, query));
}
