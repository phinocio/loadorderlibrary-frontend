import { useListApi } from "@/api/list";
import type { ListCreateParams } from "@/types/list";
import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export function useLists() {
	const { getLists } = useListApi();

	return useSuspenseQuery({
		queryKey: ["lists"],
		queryFn: getLists,
	});
}

export function useList(slug: string) {
	const { getList } = useListApi();

	return useSuspenseQuery({
		queryKey: ["lists", slug],
		queryFn: () => getList(slug),
	});
}

export function useCreateList() {
	const queryClient = useQueryClient();
	const { createList } = useListApi();
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
