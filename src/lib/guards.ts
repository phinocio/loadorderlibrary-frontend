import { currentUserQueryOptions } from "@/hooks/queries/use-auth";
import type { QueryClient } from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";

export async function requireAuth(
	queryClient: QueryClient,
	redirectTo?: string,
) {
	const currentUser = await queryClient.ensureQueryData(
		currentUserQueryOptions,
	);

	if (!currentUser) {
		throw redirect({
			to: "/login",
			search: redirectTo
				? {
						redirect: redirectTo,
					}
				: undefined,
		});
	}

	return currentUser;
}

export async function requireAdmin(queryClient: QueryClient) {
	const currentUser = await requireAuth(queryClient, "/admin");

	if (!currentUser.admin) {
		throw redirect({
			to: "/",
		});
	}

	return currentUser;
}

export async function requireGuest(queryClient: QueryClient) {
	const currentUser = await queryClient.ensureQueryData(
		currentUserQueryOptions,
	);

	if (currentUser) {
		throw redirect({
			to: "/",
		});
	}
}
