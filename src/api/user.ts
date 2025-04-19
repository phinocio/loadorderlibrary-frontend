import axios from "@/lib/axios";
import type { CurrentUser } from "@/types/auth";
import type { User, UserProfile } from "@/types/user";
import { type ApiResponse, handleApiError } from "./utils";

export const updateUser = async (
	userName: string,
	data: Partial<User>,
): Promise<User> => {
	try {
		const response = await axios.patch<ApiResponse<User>>(
			`/users/${userName}`,
			data,
		);
		return response.data.data;
	} catch (error) {
		throw handleApiError(error);
	}
};

export const deleteUser = async (userName: string): Promise<void> => {
	try {
		await axios.delete(`/users/${userName}`);
	} catch (error) {
		throw handleApiError(error);
	}
};

export const getUser = async (userName: string): Promise<User> => {
	try {
		const response = await axios.get<ApiResponse<User>>(
			`/users/${userName}/profile`,
		);
		return response.data.data;
	} catch (error) {
		throw handleApiError(error);
	}
};

export const updateUserProfile = async (
	userName: string,
	data: Partial<UserProfile>,
): Promise<CurrentUser> => {
	try {
		const response = await axios.patch<ApiResponse<CurrentUser>>(
			`/users/${userName}/profile`,
			data,
		);
		return response.data.data;
	} catch (error) {
		throw handleApiError(error);
	}
};
