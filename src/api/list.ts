import { type ApiResponse, handleApiError } from "@/api/utils";
import axios from "@/lib/axios";
import type { List, ListCreateParams, ListUpdateParams } from "@/types/list";

export const getLists = async (): Promise<List[]> => {
	try {
		const response = await axios.get<ApiResponse<List[]>>("/lists");
		return response.data.data;
	} catch (error) {
		throw handleApiError(error);
	}
};

export const getList = async (slug: string): Promise<List> => {
	try {
		const response = await axios.get<ApiResponse<List>>(`/lists/${slug}`);
		return response.data.data;
	} catch (error) {
		throw handleApiError(error);
	}
};

export const createList = async (data: ListCreateParams): Promise<List> => {
	try {
		const response = await axios.post<ApiResponse<List>>("/lists", data, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data.data;
	} catch (error) {
		throw handleApiError(error);
	}
};

export const updateList = async (
	slug: string,
	data: ListUpdateParams,
): Promise<List> => {
	try {
		const response = await axios.patch<ApiResponse<List>>(
			`/lists/${slug}`,
			data,
		);
		return response.data.data;
	} catch (error) {
		throw handleApiError(error);
	}
};

export const deleteList = async (slug: string): Promise<void> => {
	try {
		await axios.delete<ApiResponse<void>>(`/lists/${slug}`);
	} catch (error) {
		throw handleApiError(error);
	}
};
