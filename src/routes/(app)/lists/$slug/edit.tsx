import { ListEditForm } from "@/components/lists/list-edit-form";
import { ListDetailSkeleton } from "@/components/skeletons/list-detail-skeleton";
import { listQueryOptions, useList } from "@/queries/use-list";
import {
	useListEditActions,
	useListEditFormData,
} from "@/stores/list-edit-store";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/(app)/lists/$slug/edit")({
	head: () => ({
		meta: [{ title: "Edit List - Load Order Library" }],
	}),
	loader: ({ context, params }) =>
		context.queryClient.ensureQueryData(listQueryOptions(params.slug)),
	component: RouteComponent,
});

function RouteComponent() {
	const { slug } = Route.useParams();
	const { data: list } = useList(slug);
	const { setOriginalList } = useListEditActions();
	const formData = useListEditFormData();

	useEffect(() => {
		setOriginalList(list);
	}, [list, setOriginalList]);

	if (!formData.name) {
		return <ListDetailSkeleton />;
	}

	return (
		<div className="container mx-auto p-4">
			<ListEditForm list={list} />
		</div>
	);
}
