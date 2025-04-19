import { adminGetUsers } from "@/api/admin-user";
import type { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export const adminUsersListQueryOptions = {
	queryKey: ["admin-users"],
	queryFn: adminGetUsers,
};

export function useAdminUser() {
	// const queryClient = useQueryClient();

	const { data: adminUsers, isLoading } = useQuery<User[]>({
		...adminUsersListQueryOptions,
	});

	return {
		adminUsers,
		isLoading,
	};
}
