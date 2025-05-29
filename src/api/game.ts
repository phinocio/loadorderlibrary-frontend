import { type ApiResponse, handleApiError } from "@/api/utils";
import axios from "@/lib/axios";

import type { Game } from "@/types/game";
import type { List } from "@/types/list";

export const getGames = async (): Promise<Game[]> => {
	try {
		const response = await axios.get<ApiResponse<Game[]>>("/games");
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

export const getGameLists = async (slug: string, query?: string) => {
	try {
		const params = new URLSearchParams({ "filter[game]": slug });
		if (query) {
			params.append("query", query);
		}
		const response = await axios.get<ApiResponse<List[]>>(
			`/lists?${params.toString()}`,
		);
		return response.data.data;
	} catch (error) {
		throw handleApiError(error);
	}
};
