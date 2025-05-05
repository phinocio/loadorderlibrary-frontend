import { getGame, getGames } from "@/api/game";

export const gamesQueryOptions = {
	queryKey: ["games"],
	queryFn: getGames,
};

export const gameQueryOptions = (name: string) => ({
	queryKey: ["game", name],
	queryFn: () => getGame(name),
});
