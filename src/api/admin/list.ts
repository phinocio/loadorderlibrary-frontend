import { type PaginatedApiResponse, handleApiError } from "@/api/utils";
import axios from "@/lib/axios";
import type { List } from "@/types/list";

export const adminGetLists = async (query?: string, page = 1) => {
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

export const adminDeleteList = async (slug: string) => {
	try {
		await axios.delete(`/admin/lists/${slug}`);
	} catch (error) {
		throw handleApiError(error);
	}
};
