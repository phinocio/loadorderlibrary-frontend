import {
	forgotPassword,
	getCurrentUser,
	login,
	logout,
	register,
	resetPassword,
} from "@/api/auth";
import type {
	CurrentUser,
	LoginCredentials,
	RegisterCredentials,
} from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const currentUserQueryOptions = {
	queryKey: ["current-user"],
	queryFn: getCurrentUser,
};

export function useAuth() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const loginMutation = useMutation<CurrentUser, Error, LoginCredentials>({
		mutationFn: login,
		onSuccess: (data) => {
			queryClient.setQueryData(["current-user"], data);
		},
	});

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

	const logoutMutation = useMutation({
		mutationFn: logout,
		onSuccess: async () => {
			await navigate({
				to: "/",
			});
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
		login: loginMutation.mutate,
		register: registerMutation.mutate,
		logout: logoutMutation.mutate,
		forgotPassword: forgotPasswordMutation.mutate,
		resetPassword: resetPasswordMutation.mutate,
		isLoggingIn: loginMutation.isPending,
		isRegistering: registerMutation.isPending,
		isForgotPassword: forgotPasswordMutation.isPending,
		isResettingPassword: resetPasswordMutation.isPending,
		loginError: loginMutation.error,
		registerError: registerMutation.error,
		forgotPasswordError: forgotPasswordMutation.error,
		resetPasswordError: resetPasswordMutation.error,
	};
}
