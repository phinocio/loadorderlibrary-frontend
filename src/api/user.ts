import { type ApiResponse, handleApiError } from "@/api/utils";
import { useAxios } from "@/lib/axios";
import type { CurrentUser } from "@/types/auth";
import type {
	User,
	UserPasswordUpdateParams,
	UserProfile,
	UserUpdateParams,
} from "@/types/user";

export function useUserApi() {
	const axios = useAxios();

	const getUser = async (name: string): Promise<User> => {
		try {
			const response = await axios.get<ApiResponse<User>>(
				`/users/${name}/profile`,
			);
			return response.data.data;
		} catch (error) {
			throw handleApiError(error);
		}
	};

	const updateUser = async (
		name: string,
		data: UserUpdateParams,
	): Promise<User> => {
		try {
			const response = await axios.patch<ApiResponse<User>>(
				`/users/${name}`,
				data,
			);
			return response.data.data;
		} catch (error) {
			throw handleApiError(error);
		}
	};

	const updateUserPassword = async (
		name: string,
		data: UserPasswordUpdateParams,
	): Promise<void> => {
		try {
			await axios.patch(`/users/${name}/password`, data);
		} catch (error) {
			throw handleApiError(error);
		}
	};

	const updateUserProfile = async (
		name: string,
		data: Partial<UserProfile>,
	): Promise<CurrentUser> => {
		try {
			const response = await axios.patch<ApiResponse<CurrentUser>>(
				`/users/${name}/profile`,
				data,
			);
			return response.data.data;
		} catch (error) {
			throw handleApiError(error);
		}
	};

	const deleteUser = async (name: string): Promise<void> => {
		try {
			await axios.delete(`/users/${name}`);
		} catch (error) {
			throw handleApiError(error);
		}
	};

	return {
		getUser,
		updateUser,
		updateUserPassword,
		updateUserProfile,
		deleteUser,
	};
}
