import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/lists/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Work in progress</div>;
}
