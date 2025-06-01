import { adminDeleteList, adminGetLists } from "@/api/admin/list";
import {
	infiniteQueryOptions,
	useMutation,
	useQueryClient,
	useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const adminListsInfiniteQueryOptions = (query?: string) =>
	infiniteQueryOptions({
		queryKey: ["admin-lists", "infinite", { query }],
		queryFn: ({ pageParam }) => adminGetLists(query, pageParam),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			const nextPage = lastPage.meta.current_page + 1;
			return nextPage <= lastPage.meta.last_page ? nextPage : undefined;
		},
	});

export function useAdminListsInfinite(query?: string) {
	return useSuspenseInfiniteQuery(adminListsInfiniteQueryOptions(query));
}

export function useAdminDeleteList() {
	const queryClient = useQueryClient();

	const deleteListMutation = useMutation({
		mutationFn: (slug: string) => adminDeleteList(slug),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["lists"],
			});
			queryClient.invalidateQueries({
				queryKey: ["admin-lists"],
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
