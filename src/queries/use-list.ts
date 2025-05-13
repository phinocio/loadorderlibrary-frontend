import { createList, getList, getLists } from "@/api/list";
import type { ListCreateParams } from "@/types/list";
import {
	queryOptions,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const listsQueryOptions = queryOptions({
	queryKey: ["lists"],
	queryFn: () => getLists,
});

export const listQueryOptions = (slug: string) =>
	queryOptions({
		queryKey: ["lists", slug],
		queryFn: () => getList(slug),
	});

export function useList() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const createListMutation = useMutation({
		mutationFn: (data: ListCreateParams) => createList(data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ["lists"],
			});
			toast.success("List created successfully", {
				richColors: true,
			});
			navigate({ to: `/lists/${data.name}` });
		},
		onError: (error) => {
			toast.error("Failed to create list", {
				richColors: true,
				description: error.message,
			});
			console.error("Failed to create list", error);
		},
	});

	return {
		createList: createListMutation.mutate,
		isCreatingList: createListMutation.isPending,
		createListError: createListMutation.error,
	};
}
