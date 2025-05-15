import { useAxios } from "@/lib/axios";
import type { CurrentUser, ForgotPassword } from "@/types/auth";
import { type ApiResponse, handleApiError } from "./utils";

export function useAuthApi() {
	const axios = useAxios();
	const register = async (data: {
		name: string;
		password: string;
		password_confirmation: string;
	}): Promise<CurrentUser> => {
		try {
			const response = await axios.post<ApiResponse<CurrentUser>>(
				"/register",
				data,
			);
			return response.data.data;
		} catch (error) {
			throw handleApiError(error);
		}
	};

	const login = async (data: {
		name: string;
		password: string;
	}): Promise<CurrentUser> => {
		try {
			const response = await axios.post<ApiResponse<CurrentUser>>(
				"/login",
				data,
			);
			return response.data.data;
		} catch (error) {
			throw handleApiError(error);
		}
	};

	const logout = async (): Promise<void> => {
		try {
			await axios.post<void>("/logout");
		} catch (error) {
			throw handleApiError(error);
		}
	};

	const getCurrentUser = async (): Promise<CurrentUser> => {
		try {
			const response = await axios.get<ApiResponse<CurrentUser>>("/me");
			return response.data.data;
		} catch (error) {
			throw handleApiError(error);
		}
	};

	const forgotPassword = async (data: ForgotPassword): Promise<void> => {
		try {
			await axios.post<void>("/forgot-password", data);
		} catch (error) {
			throw handleApiError(error);
		}
	};

	const resetPassword = async (data: {
		token: string;
		email: string;
		password: string;
		password_confirmation: string;
	}): Promise<void> => {
		try {
			await axios.post<void>("/reset-password", data);
		} catch (error) {
			throw handleApiError(error);
		}
	};

	return {
		register,
		login,
		logout,
		getCurrentUser,
		forgotPassword,
		resetPassword,
	};
}
