import { type ApiResponse, handleApiError } from "@/api/utils";
import axios from "@/lib/axios";

export const getFile = async (name: string) => {
	try {
		const response = await axios.get<ApiResponse<File>>(`/files/${name}`);
		return response.data.data;
	} catch (error) {
		throw handleApiError(error);
	}
};
