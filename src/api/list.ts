import { type ApiResponse, handleApiError } from "@/api/utils";
import axios from "@/lib/axios";
import type { List, ListUpdateParams } from "@/types/list";

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

export const createList = async (data: FormData): Promise<List> => {
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
		// Create a copy of the data to avoid mutating the original
		const apiData: Record<string, unknown> = { ...data };

		// Convert private boolean to "1" or "0" string if it exists
		if (data && typeof data.private === "boolean") {
			apiData.private = data.private ? "1" : "0";
		}

		const response = await axios.patch<ApiResponse<List>>(
			`/lists/${slug}`,
			apiData,
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
