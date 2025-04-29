import { type ApiResponse, handleApiError } from "@/api/utils";
import axios from "@/lib/axios";
import type { Game } from "@/types/game";

export const getGames = async (gameId: string): Promise<Game> => {
	try {
		const response = await axios.get<ApiResponse<Game>>(`/games/${gameId}`);
		return response.data.data;
	} catch (error) {
		throw handleApiError(error);
	}
};
export const getGame = async (name: string): Promise<Game> => {
	try {
		const response = await axios.get<ApiResponse<Game>>(`/games/${name}`);
		return response.data.data;
	} catch (error) {
		throw handleApiError(error);
	}
};
