import { type ApiResponse, handleApiError } from "@/api/utils";
import axios from "@/lib/axios";
import type { Game } from "@/types/game";

export async function adminCreateGame(name: string): Promise<Game> {
	try {
		const response = await axios.post<ApiResponse<Game>>("/admin/games", {
			name,
		});
		return response.data.data;
	} catch (error) {
		throw handleApiError(error);
	}
}
