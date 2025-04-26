import { updateUser, updateUserPassword, updateUserProfile } from "@/api/user";
import type {
	UserPasswordUpdateParams,
	UserProfile,
	UserUpdateParams,
} from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useUser(userName: string) {
	const queryClient = useQueryClient();

	const updateUserMutation = useMutation({
		mutationFn: (data: UserUpdateParams) => updateUser(userName, data),
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

	const updateUserPasswordMutation = useMutation({
		mutationFn: (data: UserPasswordUpdateParams) =>
			updateUserPassword(userName, data),
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

	const updateProfileMutation = useMutation({
		mutationFn: (profile: UserProfile) =>
			updateUserProfile(userName, profile),
		onSuccess: (data) => {
			queryClient.setQueryData(["current-user"], data);
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
		updateUser: updateUserMutation.mutate,
		updateUserPassword: updateUserPasswordMutation.mutate,
		updateProfile: updateProfileMutation.mutate,
		isUpdatingUser: updateUserMutation.isPending,
		isUpdatingPassword: updateUserPasswordMutation.isPending,
		isUpdatingProfile: updateProfileMutation.isPending,
		updateUserError: updateUserMutation.error,
		updateUserPasswordError: updateUserPasswordMutation.error,
		updateProfileError: updateProfileMutation.error,
	};
}
