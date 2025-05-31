import { type ApiResponse, handleApiError } from "@/api/utils";
import axios from "@/lib/axios";
import type { ApiToken, CreateApiTokenParams } from "@/types/api-token";

export const getApiTokens = async (): Promise<ApiResponse<ApiToken[]>> => {
	try {
		const response = await axios.get("/api/v1/api-tokens");
		return response.data.tokens;
	} catch (error) {
		throw handleApiError(error);
	}
};

export const createApiToken = async (
	data: CreateApiTokenParams,
): Promise<string> => {
	try {
		const response = await axios.post("/api-tokens", data);
		return response.data.token;
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
