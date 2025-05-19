import { createList, getList, getLists } from "@/api/list";
import { useListUploadActions } from "@/stores/list-upload-store";
import {
	queryOptions,
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const listsQueryOptions = queryOptions({
	queryKey: ["lists"],
	queryFn: getLists,
});

export const listQueryOptions = (slug: string) => {
	return queryOptions({
		queryKey: ["lists", slug],
		queryFn: () => getList(slug),
	});
};

export function useLists() {
	return useSuspenseQuery(listsQueryOptions);
}

export function useList(slug: string) {
	return useSuspenseQuery(listQueryOptions(slug));
}

export function useCreateList() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { reset } = useListUploadActions();

	const createListMutation = useMutation({
		mutationFn: (data: FormData) => createList(data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ["lists"],
			});
			toast.success("List created successfully", {
				richColors: true,
			});
			navigate({ to: `/lists/${data.slug}` });
			reset();
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
