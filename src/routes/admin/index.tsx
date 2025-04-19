import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="p-4">
			<h1 className="mb-4 text-2xl font-bold">Admin Dashboard</h1>
		</div>
	);
}
