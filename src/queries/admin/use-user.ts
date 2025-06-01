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
import {
	queryOptions,
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const adminUserQueryOptions = queryOptions({
	queryKey: ["admin-users"],
	queryFn: adminGetUsers,
});

export function useAdminUsers() {
	return useSuspenseQuery(adminUserQueryOptions);
}

export function useAdminUser(name: string) {
	return useSuspenseQuery({
		queryKey: ["admin-users", name],
		queryFn: () => adminGetUser(name),
	});
}

export function useAdminUpdateUser(name: string) {
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

	return {
		updateUser: updateUserMutation.mutate,
		isUpdatingUser: updateUserMutation.isPending,
		updateUserError: updateUserMutation.error,
	};
}

export function useAdminVerifyUser(name: string) {
	const queryClient = useQueryClient();

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

	return {
		verifyUser: verifyUserMutation.mutate,
		isVerifyingUser: verifyUserMutation.isPending,
		verifyUserError: verifyUserMutation.error,
	};
}

export function useAdminUpdateUserPassword(name: string) {
	const updateUserPasswordMutation = useMutation({
		mutationFn: (data: AdminUserUpdatePasswordParams) =>
			adminUpdateUserPassword(name, data),
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

	return {
		updateUserPassword: updateUserPasswordMutation.mutate,
		isUpdatingPassword: updateUserPasswordMutation.isPending,
		updateUserPasswordError: updateUserPasswordMutation.error,
	};
}

export function useAdminDeleteUser() {
	const queryClient = useQueryClient();

	const deleteUserMutation = useMutation({
		mutationFn: (name: string) => adminDeleteUser(name),
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
		deleteUser: deleteUserMutation.mutate,
		isDeletingUser: deleteUserMutation.isPending,
		deleteUserError: deleteUserMutation.error,
	};
}
