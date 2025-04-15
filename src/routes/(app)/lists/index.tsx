import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/lists/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/(app)/lists/"!</div>;
}
