import axios from "@/lib/axios";
import type { CurrentUser, ForgotPassword } from "@/types/auth";
import { isAxiosError } from "axios";
import { type ApiResponse, handleApiError } from "./utils";

export const register = async (data: {
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

export const login = async (data: {
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

export const logout = async (): Promise<void> => {
	try {
		await axios.post<void>("/logout");
	} catch (error) {
		throw handleApiError(error);
	}
};

export const getCurrentUser = async (): Promise<CurrentUser | null> => {
	try {
		const response = await axios.get<ApiResponse<CurrentUser>>("/me");
		return response.data.data;
	} catch (error) {
		if (isAxiosError(error) && error.response?.status === 401) {
			return null;
		}
		throw handleApiError(error);
	}
};

export const forgotPassword = async (data: ForgotPassword): Promise<void> => {
	try {
		await axios.post<void>("/forgot-password", data);
	} catch (error) {
		throw handleApiError(error);
	}
};

export const resetPassword = async (data: {
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
