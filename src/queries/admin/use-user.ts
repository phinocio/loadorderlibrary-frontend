import {
	adminDeleteUser,
	adminGetUser,
	adminGetUsers,
	adminUpdateUser,
	adminUpdateUserPassword,
} from "@/api/admin/user";
import type {
	AdminUserUpdateParams,
	AdminUserUpdatePasswordParams,
} from "@/types/admin/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const adminUsersListQueryOptions = {
	queryKey: ["admin-users"],
	queryFn: adminGetUsers,
};

export function adminUserListQueryOptions(name: string) {
	return {
		queryKey: ["admin-users", name],
		queryFn: () => adminGetUser(name),
	};
}

export function useAdminUser(name?: string) {
	const queryClient = useQueryClient();

	const updateUserMutation = useMutation({
		mutationFn: (data: AdminUserUpdateParams) => {
			if (!name) throw new Error("Name is required to update user");
			if (data.is_verified !== undefined) {
				throw new Error(
					"Use verifyUser mutation to change verification status",
				);
			}
			return adminUpdateUser(name, data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin-users"] });
			toast.success("User updated successfully", {
				richColors: true,
			});
		},
		onError: (error) => {
			toast.error("Failed to update user", {
				richColors: true,
				description: error.message,
			});
			console.error("Failed to update user", error);
		},
	});

	const verifyUserMutation = useMutation({
		mutationFn: (verified: boolean) => {
			if (!name)
				throw new Error("Name is required to update verification");
			return adminUpdateUser(name, { is_verified: verified });
		},
		onSuccess: (_, verified) => {
			queryClient.invalidateQueries({ queryKey: ["admin-users"] });
			toast.success(
				verified
					? "User verified successfully"
					: "User verification removed",
				{ richColors: true },
			);
		},
		onError: (error) => {
			toast.error("Failed to update verification status", {
				richColors: true,
				description: error.message,
			});
			console.error("Failed to update verification", error);
		},
	});

	const updateUserPasswordMutation = useMutation({
		mutationFn: (data: AdminUserUpdatePasswordParams) => {
			if (!name) throw new Error("Name is required to update password");
			return adminUpdateUserPassword(name, data);
		},
		onSuccess: () => {
			toast.success("Password updated successfully", {
				richColors: true,
			});
		},
		onError: (error) => {
			toast.error("Failed to update password", {
				richColors: true,
				description: error.message,
			});
			console.error("Failed to update password", error);
		},
	});

	const deleteUserMutation = useMutation({
		mutationFn: () => {
			if (!name) throw new Error("Name is required to delete user");
			return adminDeleteUser(name);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin-users"] });
			toast.success("User deleted successfully", {
				richColors: true,
			});
		},
		onError: (error) => {
			toast.error("Failed to delete user", {
				richColors: true,
				description: error.message,
			});
			console.error("Failed to delete user", error);
		},
	});

	return {
		updateUser: updateUserMutation.mutate,
		verifyUser: verifyUserMutation.mutate,
		updateUserPassword: updateUserPasswordMutation.mutate,
		deleteUser: deleteUserMutation.mutate,
		isUpdatingUser: updateUserMutation.isPending,
		isVerifyingUser: verifyUserMutation.isPending,
		isUpdatingPassword: updateUserPasswordMutation.isPending,
		isDeletingUser: deleteUserMutation.isPending,
		updateUserError: updateUserMutation.error,
		verifyUserError: verifyUserMutation.error,
		updateUserPasswordError: updateUserPasswordMutation.error,
		deleteUserError: deleteUserMutation.error,
	};
}
