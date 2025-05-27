import {
	createList,
	deleteList,
	getList,
	getLists,
	updateList,
} from "@/api/list";
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
			queryClient.invalidateQueries({
				queryKey: ["current-user"],
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

export function useUpdateList() {
	const queryClient = useQueryClient();

	const updateListMutation = useMutation({
		mutationFn: ({ slug, data }: { slug: string; data: FormData }) =>
			updateList(slug, data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["lists"],
			});
			queryClient.invalidateQueries({
				queryKey: ["current-user"],
			});

			toast.success("List updated successfully", {
				richColors: true,
			});
		},
		onError: (error) => {
			toast.error("Failed to update list", {
				richColors: true,
				description: error.message,
			});
			console.error("Failed to update list", error);
		},
	});

	return {
		updateList: updateListMutation.mutate,
		isUpdatingList: updateListMutation.isPending,
		updateListError: updateListMutation.error,
	};
}

export function useDeleteList() {
	const queryClient = useQueryClient();

	const deleteListMutation = useMutation({
		mutationFn: (slug: string) => deleteList(slug),
		onSuccess: (_, slug) => {
			queryClient.invalidateQueries({
				queryKey: ["lists"],
			});
			queryClient.removeQueries({
				queryKey: ["lists", slug],
			});
			queryClient.invalidateQueries({
				queryKey: ["current-user"],
			});

			toast.success("List deleted successfully", {
				richColors: true,
			});
		},
		onError: (error) => {
			toast.error("Failed to delete list", {
				richColors: true,
				description: error.message,
			});
			console.error("Failed to delete list", error);
		},
	});

	return {
		deleteList: deleteListMutation.mutate,
		isDeletingList: deleteListMutation.isPending,
		deleteListError: deleteListMutation.error,
	};
}
