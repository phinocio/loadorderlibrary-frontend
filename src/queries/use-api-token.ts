import { createApiToken, deleteApiToken, getApiTokens } from "@/api/api-tokens";
import type { CreateApiTokenParams } from "@/types/api-token";
import {
	queryOptions,
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const apiTokensQueryOptions = queryOptions({
	queryKey: ["api-tokens"],
	queryFn: getApiTokens,
});

export function useApiTokens() {
	return useSuspenseQuery(apiTokensQueryOptions);
}

export function useCreateApiToken() {
	const queryClient = useQueryClient();

	const createApiTokenMutation = useMutation({
		mutationFn: async (data: CreateApiTokenParams) => createApiToken(data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["api-tokens"],
			});

			toast.success("API token created successfully", {
				richColors: true,
			});
		},
		onError: (error) => {
			toast.error("Failed to create API Token", {
				richColors: true,
				description: error.message,
			});
			console.error("Failed to create API token", error);
		},
	});

	return {
		createApiToken: createApiTokenMutation.mutate,
		isCreatingApiToken: createApiTokenMutation.isPending,
		createApiTokenError: createApiTokenMutation.error,
	};
}

export const useDeleteApiToken = () => {
	const queryClient = useQueryClient();

	const deleteApiTokenMutation = useMutation({
		mutationFn: async (tokenId: string) => deleteApiToken(tokenId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["api-tokens"],
			});

			toast.success("API token deleted successfully", {
				richColors: true,
			});
		},
		onError: (error) => {
			toast.error("Failed to delete API Token", {
				richColors: true,
				description: error.message,
			});
			console.error("Failed to delete API token", error);
		},
	});

	return {
		deleteApiToken: deleteApiTokenMutation.mutate,
		isDeletingApiToken: deleteApiTokenMutation.isPending,
		deleteApiTokenError: deleteApiTokenMutation.error,
	};
};
