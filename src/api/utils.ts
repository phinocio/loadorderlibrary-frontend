import { isAxiosError } from "axios";

export type ApiResponse<T> = {
	data: T;
};

export class ApiError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "ApiError";
	}
}

export const handleApiError = (error: unknown) => {
	if (isAxiosError(error) && error.response?.data?.message) {
		throw new ApiError(error.response.data.message);
	}
	throw new ApiError("An unexpected error occurred");
};
