import { ListEditStep1 } from "@/components/lists/edit/list-edit-step-1";
import { ListEditStep2 } from "@/components/lists/edit/list-edit-step-2";
import { ListEditStep3 } from "@/components/lists/edit/list-edit-step-3";
import { ListEditStep4 } from "@/components/lists/edit/list-edit-step-4";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	editStep1Completed,
	editStep2Completed,
	editStep3Completed,
	useListEditActions,
	useListEditStep,
} from "@/stores/list-edit-store";
import type { List } from "@/types/list";
import { CheckIcon } from "lucide-react";
import { useEffect } from "react";

export function ListEditForm({ list }: { list: List }) {
	const currentStep = useListEditStep();
	const { setOriginalList, setStep } = useListEditActions();
	const isStep1Done = editStep1Completed();
	const isStep2Done = editStep2Completed();
	const isStep3Done = editStep3Completed();

	// Initialize the store with the list data when the component mounts
	useEffect(() => {
		setOriginalList(list);
	}, [list, setOriginalList]);

	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-bold">Edit List: {list.name}</h1>

			<Tabs
				value={`step-${currentStep}`}
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
						newStep < currentStep
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
							<CheckIcon className="ml-1 h-4 w-4 text-green-600" />
						)}
					</TabsTrigger>
					<TabsTrigger
						value="step-2"
						className="flex-1"
						disabled={!isStep1Done}
					>
						2. Visibility
						{isStep2Done && (
							<CheckIcon className="ml-1 h-4 w-4 text-green-600" />
						)}
					</TabsTrigger>
					<TabsTrigger
						value="step-3"
						className="flex-1"
						disabled={!isStep1Done}
					>
						3. Links
						{isStep3Done && (
							<CheckIcon className="ml-1 h-4 w-4 text-green-600" />
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

				<TabsContent value={`step-${currentStep}`}>
					{currentStep === 1 && <ListEditStep1 />}
					{currentStep === 2 && <ListEditStep2 />}
					{currentStep === 3 && <ListEditStep3 />}
					{currentStep === 4 && <ListEditStep4 />}
				</TabsContent>
			</Tabs>
		</div>
	);
}
