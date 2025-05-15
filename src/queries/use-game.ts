import { useGameApi } from "@/api/game";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

export function useGamesQueryOptions() {
	const { getGames } = useGameApi();
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
	const { getGame } = useGameApi();

	return useSuspenseQuery({
		queryKey: ["games", name],
		queryFn: () => getGame(name),
	});
}
