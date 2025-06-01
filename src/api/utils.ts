import { isAxiosError } from "axios";

export type ApiResponse<T> = {
	data: T;
};

export type PaginatedApiResponse<T> = {
	data: T[];
	links: {
		first: string | null;
		last: string | null;
		prev: string | null;
		next: string | null;
	};
	meta: {
		current_page: number;
		from: number | null;
		last_page: number;
		links: Array<{
			url: string | null;
			label: string;
			active: boolean;
		}>;
		path: string;
		per_page: number;
		to: number | null;
		total: number;
	};
};

export class ApiError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "ApiError";
	}
}

export const handleApiError = (error: unknown): never => {
	if (isAxiosError(error) && error.response?.data?.message) {
		throw new ApiError(error.response.data.message);
	}
	throw new ApiError("An unexpected error occurred");
};
