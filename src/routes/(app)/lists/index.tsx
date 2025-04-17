import { useAuth } from "@/hooks/use-auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/lists/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { user } = useAuth();
	if (!user) {
		return (
			<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
				<div className="w-full max-w-sm">
					<p className="text-center text-sm text-gray-500">
						Please login to view your lists.
					</p>
				</div>
			</div>
		);
	}
	return (
		<p className="text-center text-sm text-gray-500">
			Hello {user.email}, welcome to your lists!
		</p>
	);
}
