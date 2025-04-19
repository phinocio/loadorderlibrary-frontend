import { getCurrentUser, login, logout, register } from "@/api/auth";
import type { LoginCredentials, RegisterCredentials } from "@/types/auth";
import type { User } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const currentUserQueryOptions = {
	queryKey: ["user"],
	queryFn: getCurrentUser,
};

export function useAuth() {
	const queryClient = useQueryClient();

	const loginMutation = useMutation<User, Error, LoginCredentials>({
		mutationFn: login,
		onSuccess: (data) => {
			queryClient.setQueryData(["user"], data);
		},
	});

	const registerMutation = useMutation<User, Error, RegisterCredentials>({
		mutationFn: register,
		onSuccess: (data) => {
			queryClient.setQueryData(["user"], data);
		},
	});

	const logoutMutation = useMutation({
		mutationFn: logout,
		onSuccess: () => {
			queryClient.setQueryData(["user"], null);
		},
	});

	return {
		login: loginMutation.mutate,
		register: registerMutation.mutate,
		logout: logoutMutation.mutate,
		isLoggingIn: loginMutation.isPending,
		isRegistering: registerMutation.isPending,
		loginError: loginMutation.error,
		registerError: registerMutation.error,
	};
}
