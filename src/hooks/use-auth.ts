import { getUser, login, logout, register } from "@/api/auth";
import type { User } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAuth() {
	const queryClient = useQueryClient();

	const { data: user, isLoading } = useQuery<User>({
		queryKey: ["user"],
		queryFn: () => getUser().then((res) => res.data.data),
		retry: false,
		staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
	});

	const loginMutation = useMutation<
		User,
		Error,
		{ name: string; password: string }
	>({
		mutationFn: (data) => login(data).then((res) => res.data.data),
		onSuccess: (data) => {
			queryClient.setQueryData(["user"], data);
		},
	});

	const registerMutation = useMutation<
		User,
		Error,
		{
			name: string;
			password: string;
			password_confirmation: string;
		}
	>({
		mutationFn: (data) => register(data).then((res) => res.data.data),
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
		user,
		isLoading,
		login: loginMutation.mutate,
		register: registerMutation.mutate,
		logout: logoutMutation.mutate,
		isLoggingIn: loginMutation.isPending,
		isRegistering: registerMutation.isPending,
		loginError: loginMutation.error,
		registerError: registerMutation.error,
	};
}
