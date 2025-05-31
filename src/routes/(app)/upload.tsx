import { ListUploadStep1 } from "@/components/lists/upload/list-upload-step-1";
import { ListUploadStep2 } from "@/components/lists/upload/list-upload-step-2";
import { ListUploadStep3 } from "@/components/lists/upload/list-upload-step-3";
import { ListUploadStep4 } from "@/components/lists/upload/list-upload-step-4";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { gamesQueryOptions } from "@/queries/use-game";
import {
	step1Completed,
	step2Completed,
	step3Completed,
	useListUploadActions,
	useListUploadStep,
} from "@/stores/list-upload-store";
import { createFileRoute } from "@tanstack/react-router";
import { CheckIcon } from "lucide-react";

export const Route = createFileRoute("/(app)/upload")({
	head: () => ({
		meta: [{ title: "Upload - Load Order Library" }],
	}),
	loader: ({ context }) => {
		context.queryClient.prefetchQuery(gamesQueryOptions);
	},
	component: RouteComponent,
});

function RouteComponent() {
	const step = useListUploadStep();
	const { setStep } = useListUploadActions();
	const isStep1Done = step1Completed();
	const isStep2Done = step2Completed();
	const isStep3Done = step3Completed();

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-6">Upload a List</h1>

			<Tabs
				value={`step-${step}`}
				onValueChange={(value) => {
					const newStep = Number.parseInt(
						value.replace("step-", ""),
						10,
					);
					if (
						(isStep1Done &&
							(newStep === 2 ||
								newStep === 3 ||
								newStep === 4)) ||
						newStep < step
					) {
						setStep(newStep);
					}
				}}
				className="mb-8"
			>
				<TabsList className="w-full">
					<TabsTrigger value="step-1" className="flex-1">
						1. Basic Info
						{isStep1Done && (
							<CheckIcon className="ml-1 h-4 w-4 text-secondary" />
						)}
					</TabsTrigger>
					<TabsTrigger
						value="step-2"
						className="flex-1"
						disabled={!isStep1Done}
					>
						2. Visibility
						{isStep2Done && (
							<CheckIcon className="ml-1 h-4 w-4 text-secondary" />
						)}
					</TabsTrigger>
					<TabsTrigger
						value="step-3"
						className="flex-1"
						disabled={!isStep1Done}
					>
						3. Links
						{isStep3Done && (
							<CheckIcon className="ml-1 h-4 w-4 text-secondary" />
						)}
					</TabsTrigger>
					<TabsTrigger
						value="step-4"
						className="flex-1"
						disabled={!isStep1Done}
					>
						4. Files
					</TabsTrigger>
				</TabsList>

				<TabsContent value={`step-${step}`}>
					{step === 1 && <ListUploadStep1 />}
					{step === 2 && <ListUploadStep2 />}
					{step === 3 && <ListUploadStep3 />}
					{step === 4 && <ListUploadStep4 />}
				</TabsContent>
			</Tabs>
		</div>
	);
}
