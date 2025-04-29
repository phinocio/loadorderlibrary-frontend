import { type ApiResponse, handleApiError } from "@/api/utils";
import axios from "@/lib/axios";
import type { AdminGameUpdateParams } from "@/types/admin/game";
import type { Game } from "@/types/game";

export const adminUpdateGame = async (
	name: string,
	data: AdminGameUpdateParams,
): Promise<Game> => {
	try {
		const response = await axios.patch<ApiResponse<Game>>(
			`/admin/games/${name}`,
			data,
		);
		return response.data.data;
	} catch (error) {
		throw handleApiError(error);
	}
};
