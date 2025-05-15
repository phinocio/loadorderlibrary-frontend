import { useAuthApi } from "@/api/auth";
import type {
	CurrentUser,
	LoginCredentials,
	RegisterCredentials,
} from "@/types/auth";
import {
	queryOptions,
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export function useCurrentUserQueryOptions() {
	const { getCurrentUser } = useAuthApi();

	return queryOptions({
		queryKey: ["current-user"],
		queryFn: getCurrentUser,
	});
}

export function useCurrentUser() {
	const currentUserQueryOptions = useCurrentUserQueryOptions();

	return useSuspenseQuery(currentUserQueryOptions);
}

export function useLogin() {
	const queryClient = useQueryClient();
	const { login } = useAuthApi();

	const loginMutation = useMutation<CurrentUser, Error, LoginCredentials>({
		mutationFn: login,
		onSuccess: (data) => {
			queryClient.setQueryData(["current-user"], data);
		},
	});

	return {
		login: loginMutation.mutate,
		isLoggingIn: loginMutation.isPending,
		loginError: loginMutation.error,
	};
}

export function useLogout() {
	const queryClient = useQueryClient();
	const { logout } = useAuthApi();

	const logoutMutation = useMutation({
		mutationFn: logout,
		onSuccess: () => {
			queryClient.setQueryData(["current-user"], null);
			toast.success("Logged out successfully", {
				richColors: true,
			});
		},
		onError: (error) => {
			toast.error("Failed to log out", {
				richColors: true,
				description: error.message,
			});
			console.error("Failed to log out", error);
		},
	});

	return {
		logout: logoutMutation.mutate,
		isLoggingOut: logoutMutation.isPending,
		logoutError: logoutMutation.error,
	};
}

export function useRegister() {
	const queryClient = useQueryClient();
	const { register } = useAuthApi();
	const registerMutation = useMutation<
		CurrentUser,
		Error,
		RegisterCredentials
	>({
		mutationFn: register,
		onSuccess: (data) => {
			queryClient.setQueryData(["current-user"], data);
		},
	});
	return {
		register: registerMutation.mutate,
		isRegistering: registerMutation.isPending,
		registerError: registerMutation.error,
	};
}

export function useForgotPassword() {
	const { forgotPassword } = useAuthApi();

	const forgotPasswordMutation = useMutation({
		mutationFn: forgotPassword,
		onSuccess: () => {
			toast.success("Password reset link sent to your email", {
				richColors: true,
			});
		},
		onError: (error) => {
			toast.error("Failed to send password reset link", {
				richColors: true,
				description: error.message,
			});
			console.error("Failed to send password reset link", error);
		},
	});

	return {
		forgotPassword: forgotPasswordMutation.mutate,
		isForgotPassword: forgotPasswordMutation.isPending,
		forgotPasswordError: forgotPasswordMutation.error,
	};
}

export function useResetPassword() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { resetPassword } = useAuthApi();

	const resetPasswordMutation = useMutation({
		mutationFn: resetPassword,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["current-user"] });
			await navigate({
				to: "/",
			});
			toast.success("Password reset successfully", {
				richColors: true,
			});
		},
		onError: (error) => {
			toast.error("Failed to reset password", {
				richColors: true,
				description: error.message,
			});
			console.error("Failed to reset password", error);
		},
	});

	return {
		resetPassword: resetPasswordMutation.mutate,
		isResettingPassword: resetPasswordMutation.isPending,
		resetPasswordError: resetPasswordMutation.error,
	};
}
