import { type ApiResponse, handleApiError } from "@/api/utils";
import { useAxios } from "@/lib/axios";
import type {
	AdminUserUpdateParams,
	AdminUserUpdatePasswordParams,
} from "@/types/admin/user";
import type { User } from "@/types/user";

export function useAdminUserApi() {
	const axios = useAxios();

	const adminGetUsers = async (): Promise<User[]> => {
		try {
			const response =
				await axios.get<ApiResponse<User[]>>("/admin/users");
			return response.data.data;
		} catch (error) {
			throw handleApiError(error);
		}
	};

	const adminGetUser = async (name: string): Promise<User> => {
		try {
			const response = await axios.get<ApiResponse<User>>(
				`/admin/users/${name}`,
			);
			return response.data.data;
		} catch (error) {
			throw handleApiError(error);
		}
	};

	const adminUpdateUser = async (
		name: string,
		data: AdminUserUpdateParams,
	): Promise<User> => {
		try {
			const response = await axios.patch<ApiResponse<User>>(
				`/admin/users/${name}`,
				data,
			);
			return response.data.data;
		} catch (error) {
			throw handleApiError(error);
		}
	};

	const adminUpdateUserPassword = async (
		name: string,
		data: AdminUserUpdatePasswordParams,
	): Promise<User> => {
		try {
			const response = await axios.patch<ApiResponse<User>>(
				`/admin/users/${name}/password`,
				data,
			);
			return response.data.data;
		} catch (error) {
			throw handleApiError(error);
		}
	};

	const adminDeleteUser = async (name: string): Promise<void> => {
		try {
			await axios.delete(`/admin/users/${name}`);
		} catch (error) {
			throw handleApiError(error);
		}
	};

	return {
		adminGetUsers,
		adminGetUser,
		adminUpdateUser,
		adminUpdateUserPassword,
		adminDeleteUser,
	};
}
