import { type ApiResponse, handleApiError } from "@/api/utils";
import { useAxios } from "@/lib/axios";

export function useFileApi() {
	const axios = useAxios();

	const getFile = async (name: string) => {
		try {
			const response = await axios.get<ApiResponse<File>>(
				`/files/${name}`,
			);
			return response.data.data;
		} catch (error) {
			throw handleApiError(error);
		}
	};

	return {
		getFile,
	};
}
