import {
	type ApiResponse,
	type PaginatedApiResponse,
	handleApiError,
} from "@/api/utils";
import axios from "@/lib/axios";
import type { List } from "@/types/list";

export const getLists = async (query?: string, page = 1) => {
	try {
		const params: Record<string, string> = { page: page.toString() };
		if (query) {
			params.query = query;
		}
		const response = await axios.get<PaginatedApiResponse<List>>("/lists", {
			params,
		});
		return response.data;
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
	data: FormData,
): Promise<List> => {
	try {
		// This seems to be needed when sending formdata.
		data.append("_method", "PATCH");
		const response = await axios.post<ApiResponse<List>>(
			`/lists/${slug}`,
			data,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			},
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
