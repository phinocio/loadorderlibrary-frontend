import { useCurrentUser } from "@/queries/use-auth";
import { redirect } from "@tanstack/react-router";

export async function requireAuth(redirectTo?: string) {
	const { data: currentUser } = useCurrentUser();

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

export async function requireAdmin() {
	const currentUser = await requireAuth("/admin");

	if (!currentUser.admin) {
		throw redirect({
			to: "/",
		});
	}

	return currentUser;
}

export async function requireGuest() {
	const currentUser = useCurrentUser();

	if (currentUser) {
		throw redirect({
			to: "/",
		});
	}
}
