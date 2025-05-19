import { ListUploadStep1 } from "@/components/lists/upload/list-upload-step-1";
import { useListUploadStep } from "@/stores/list-upload-store";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/upload")({
	component: RouteComponent,
});

function RouteComponent() {
	const step = useListUploadStep();

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-6">Upload a List</h1>

			<div className="flex gap-2 mb-8">
				<span
					className={`h-2 flex-1 rounded-full ${step >= 1 ? "bg-primary" : "bg-muted"}`}
				/>
				<span
					className={`h-2 flex-1 rounded-full ${step >= 2 ? "bg-primary" : "bg-muted"}`}
				/>
				<span
					className={`h-2 flex-1 rounded-full ${step >= 3 ? "bg-primary" : "bg-muted"}`}
				/>
			</div>

			{step === 1 && <ListUploadStep1 />}
			{/* {step === 2 && <ListUploadStep2 />}
			{step === 3 && <ListUploadStep3 />} */}
		</div>
	);
}
