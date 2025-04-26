import { adminGetUser, adminGetUsers } from "@/api/admin-user";

export const adminUsersListQueryOptions = {
	queryKey: ["admin-users"],
	queryFn: adminGetUsers,
};

export function adminUserListQueryOptions(name: string) {
	return {
		queryKey: ["admin-users", name],
		queryFn: () => adminGetUser(name),
	};
}

export function useAdminUser() {
	// const queryClient = useQueryClient();

	return {};
}
