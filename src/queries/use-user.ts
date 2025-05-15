import { useUserApi } from "@/api/user";
import type {
	UserPasswordUpdateParams,
	UserProfile,
	UserUpdateParams,
} from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export function useUpdateUser(name: string) {
	const queryClient = useQueryClient();
	const { updateUser } = useUserApi();

	const updateUserMutation = useMutation({
		mutationFn: (data: UserUpdateParams) => updateUser(name, data),
		onSuccess: (data) => {
			queryClient.setQueryData(["current-user"], data);
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

export function useUpdateUserPassword(name: string) {
	const { updateUserPassword } = useUserApi();

	const updateUserPasswordMutation = useMutation({
		mutationFn: (data: UserPasswordUpdateParams) =>
			updateUserPassword(name, data),
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

export function useUpdateUserProfile(name: string) {
	const queryClient = useQueryClient();
	const { updateUserProfile } = useUserApi();

	const updateProfileMutation = useMutation({
		mutationFn: (profile: UserProfile) => updateUserProfile(name, profile),
		onSuccess: (data) => {
			queryClient.setQueryData(["current-user"], data);
			queryClient.invalidateQueries({
				queryKey: ["admin-users"],
			});
			toast.success("Profile updated successfully", {
				richColors: true,
			});
		},
		onError: (error) => {
			toast.error("Failed to update profile", {
				richColors: true,
				description: error.message,
			});
			console.error("Failed to update profile", error);
		},
	});

	return {
		updateProfile: updateProfileMutation.mutate,
		isUpdatingProfile: updateProfileMutation.isPending,
		updateProfileError: updateProfileMutation.error,
	};
}

export function useDeleteUser() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { deleteUser } = useUserApi();

	const deleteUserMutation = useMutation({
		mutationFn: (name: string) => deleteUser(name),
		onSuccess: async () => {
			await navigate({ to: "/" });
			queryClient.setQueryData(["current-user"], null);
			toast.success("Account deleted successfully", {
				richColors: true,
			});
		},
		onError: (error) => {
			toast.error("Failed to delete account", {
				richColors: true,
				description: error.message,
			});
			console.error("Failed to delete account", error);
		},
	});

	return {
		deleteUser: deleteUserMutation.mutate,
		isDeletingUser: deleteUserMutation.isPending,
		deleteUserError: deleteUserMutation.error,
	};
}
