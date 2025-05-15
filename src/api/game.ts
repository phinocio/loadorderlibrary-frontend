import { type ApiResponse, handleApiError } from "@/api/utils";
import { useAxios } from "@/lib/axios";

import type { Game } from "@/types/game";

export function useGameApi() {
	const axios = useAxios();

	const getGames = async (): Promise<Game[]> => {
		try {
			const response = await axios.get<ApiResponse<Game[]>>("/games");
			return response.data.data;
		} catch (error) {
			throw handleApiError(error);
		}
	};
	const getGame = async (name: string): Promise<Game> => {
		try {
			const response = await axios.get<ApiResponse<Game>>(
				`/games/${name}`,
			);
			return response.data.data;
		} catch (error) {
			throw handleApiError(error);
		}
	};

	return {
		getGames,
		getGame,
	};
}
