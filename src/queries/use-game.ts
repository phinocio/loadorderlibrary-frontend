import { getGame, getGames } from "@/api/game";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

export const gamesQueryOptions = queryOptions({
	queryKey: ["games"],
	queryFn: getGames,
});

export function useGames() {
	return useSuspenseQuery(gamesQueryOptions);
}

export function useGame(name: string) {
	return useSuspenseQuery({
		queryKey: ["games", name],
		queryFn: () => getGame(name),
	});
}
