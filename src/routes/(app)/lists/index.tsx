import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/lists/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <p className="text-center text-sm text-gray-500">Lists here!</p>;
}
