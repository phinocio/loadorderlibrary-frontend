import axios from "@/lib/axios";
import type { User } from "@/types/user";
import { isAxiosError } from "axios";
import { type ApiResponse, handleApiError } from "./utils";

export const register = async (data: {
	name: string;
	password: string;
	password_confirmation: string;
}): Promise<User> => {
	try {
		const response = await axios.post<ApiResponse<User>>("/register", data);
		return response.data.data;
	} catch (error) {
		throw handleApiError(error);
	}
};

export const login = async (data: {
	name: string;
	password: string;
}): Promise<User> => {
	try {
		const response = await axios.post<ApiResponse<User>>("/login", data);
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

export const getCurrentUser = async (): Promise<User | null> => {
	try {
		const response = await axios.get<ApiResponse<User>>("/me");
		return response.data.data;
	} catch (error) {
		if (isAxiosError(error) && error.response?.status === 401) {
			return null;
		}
		throw handleApiError(error);
	}
};
