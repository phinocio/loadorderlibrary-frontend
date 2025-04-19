import { updateUser, updateUserProfile } from "@/api/user";
import type { UserProfile } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUser(userName: string) {
	const queryClient = useQueryClient();

	const updateUserMutation = useMutation({
		mutationFn: (data: { email: string | null }) =>
			updateUser(userName, data),
		onSuccess: (data) => {
			queryClient.setQueryData(["current-user"], data);
		},
	});

	const updateProfileMutation = useMutation({
		mutationFn: (profile: UserProfile) =>
			updateUserProfile(userName, profile),
		onSuccess: (data) => {
			queryClient.setQueryData(["current-user"], data);
		},
	});

	return {
		updateUser: updateUserMutation.mutate,
		updateProfile: updateProfileMutation.mutate,
		isUpdatingUser: updateUserMutation.isPending,
		isUpdatingProfile: updateProfileMutation.isPending,
		updateUserError: updateUserMutation.error,
		updateProfileError: updateProfileMutation.error,
	};
}
