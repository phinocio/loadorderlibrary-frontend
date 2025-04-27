import { type ApiResponse, handleApiError } from "@/api/utils";
import axios from "@/lib/axios";
import type {
	AdminUserUpdateParams,
	AdminUserUpdatePasswordParams,
} from "@/types/admin-user";
import type { User } from "@/types/user";

export async function adminGetUsers(): Promise<User[]> {
	try {
		const response = await axios.get<ApiResponse<User[]>>("/admin/users");
		return response.data.data;
	} catch (error) {
		throw handleApiError(error);
	}
}

export async function adminGetUser(name: string): Promise<User> {
	try {
		const response = await axios.get<ApiResponse<User>>(
			`/admin/users/${name}`,
		);
		return response.data.data;
	} catch (error) {
		throw handleApiError(error);
	}
}

export async function adminUpdateUser(
	name: string,
	data: AdminUserUpdateParams,
): Promise<User> {
	try {
		const response = await axios.patch<ApiResponse<User>>(
			`/admin/users/${name}`,
			data,
		);
		return response.data.data;
	} catch (error) {
		throw handleApiError(error);
	}
}

export async function adminUpdateUserPassword(
	name: string,
	data: AdminUserUpdatePasswordParams,
): Promise<User> {
	try {
		const response = await axios.patch<ApiResponse<User>>(
			`/admin/users/${name}/password`,
			data,
		);
		return response.data.data;
	} catch (error) {
		throw handleApiError(error);
	}
}

export async function adminDeleteUser(name: string): Promise<void> {
	try {
		await axios.delete(`/admin/users/${name}`);
	} catch (error) {
		throw handleApiError(error);
	}
}
