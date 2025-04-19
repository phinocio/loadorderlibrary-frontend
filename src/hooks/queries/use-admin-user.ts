import { adminGetUsers } from "@/api/admin-user";

export const adminUsersListQueryOptions = {
	queryKey: ["admin-users"],
	queryFn: adminGetUsers,
};

export function useAdminUser() {
	// const queryClient = useQueryClient();

	return {};
}
