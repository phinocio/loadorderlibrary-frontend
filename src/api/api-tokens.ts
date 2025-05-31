import { type ApiResponse, handleApiError } from "@/api/utils";
import axios from "@/lib/axios";
import type { ApiToken, CreateApiTokenParams } from "@/types/api-token";

export const getApiTokens = async (): Promise<ApiToken[]> => {
	try {
		const response =
			await axios.get<ApiResponse<ApiToken[]>>("/api-tokens");
		return response.data.data;
	} catch (error) {
		throw handleApiError(error);
	}
};

export const createApiToken = async (
	data: CreateApiTokenParams,
): Promise<string> => {
	try {
		const response = await axios.post<ApiResponse<{ token: string }>>(
			"/api-tokens",
			data,
		);
		return response.data.data.token;
	} catch (error) {
		throw handleApiError(error);
	}
};

export const deleteApiToken = async (tokenId: string): Promise<void> => {
	try {
		await axios.delete(`/api-tokens/${tokenId}`);
	} catch (error) {
		throw handleApiError(error);
	}
};
