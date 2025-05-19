import { getGame, getGames } from "@/api/game";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

export function useGamesQueryOptions() {
	return queryOptions({
		queryKey: ["games"],
		queryFn: getGames,
	});
}

export function useGames() {
	const gamesQueryOptions = useGamesQueryOptions();

	return useSuspenseQuery(gamesQueryOptions);
}

export function useGame(name: string) {
	return useSuspenseQuery({
		queryKey: ["games", name],
		queryFn: () => getGame(name),
	});
}
