import { FileUploadArea } from "@/components/lists/files/file-upload-area";
import { SelectedFilesDisplay } from "@/components/lists/files/selected-files-display";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { useCreateList } from "@/queries/use-list";
import { FileUploadSchema } from "@/schemas/file-schemas";
import {
	useListUploadActions,
	useListUploadFormData,
} from "@/stores/list-upload-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

type FileFormData = z.infer<typeof FileUploadSchema>;

export function ListUploadStep4() {
	const formData = useListUploadFormData();
	const { setStep, reset } = useListUploadActions();
	const { createList, isCreatingList, createListError } = useCreateList();
	const [fileInfo, setFileInfo] = useState<
		Array<{ name: string; size: number; type: string }>
	>([]);

	const form = useForm<FileFormData>({
		resolver: zodResolver(FileUploadSchema),
	});

	// Debug form errors
	console.log("Form errors:", form.formState.errors);

	// Update file info when files change
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const newFileInfo = Array.from(e.target.files).map((file) => ({
				name: file.name,
				size: file.size,
				type: file.type || (file.name.endsWith(".ini") ? "ini" : "txt"),
			}));
			setFileInfo(newFileInfo);
		}
	};

	// Handle removing a single file
	const handleRemoveFile = (index: number) => {
		const newFileInfo = fileInfo.filter((_, i) => i !== index);
		setFileInfo(newFileInfo);
		// Also update the form
		const currentFiles = form.getValues("files") || [];
		const newFiles = currentFiles.filter((_, i) => i !== index);
		form.setValue("files", newFiles);
	};

	// Handle removing all files
	const handleRemoveAllFiles = () => {
		setFileInfo([]);
		form.setValue("files", []);
	};

	const onSubmit = async (data: FileFormData) => {
		const newList = new FormData();

		// Required data
		newList.append("name", formData.name);
		newList.append("game", formData.game);
		for (const file of data.files) {
			newList.append("files[]", file);
		}

		formData.version && newList.append("version", formData.version);
		formData.description &&
			newList.append("description", formData.description);
		formData.website && newList.append("website", formData.website);
		formData.discord && newList.append("discord", formData.discord);
		formData.readme && newList.append("readme", formData.readme);
		formData.private &&
			newList.append("private", formData.private ? "1" : "0");
		formData.expires && newList.append("expires", formData.expires);

		createList(newList);
	};

	const goBack = () => {
		setStep(3);
	};

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Step 4: Upload Files</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-6"
						>
							<FormField
								control={form.control}
								name="files"
								render={({ field }) => (
									<FileUploadArea
										field={field}
										onFileChange={handleFileChange}
										disabled={isCreatingList}
									/>
								)}
							/>

							<SelectedFilesDisplay
								files={fileInfo}
								onRemoveFile={handleRemoveFile}
								onRemoveAll={handleRemoveAllFiles}
								showRemoveAll={true}
								disabled={isCreatingList}
							/>

							{createListError && (
								<div className="p-3 bg-destructive/15 text-destructive rounded-md">
									<p className="text-sm">
										{createListError instanceof Error
											? createListError.message
											: "An error occurred while creating the list."}
									</p>
								</div>
							)}

							<div className="flex justify-between border-t pt-4">
								<Button
									type="button"
									variant="outline"
									onClick={goBack}
								>
									Back
								</Button>
								<Button
									type="submit"
									disabled={
										isCreatingList || fileInfo.length === 0
									}
									variant="tertiary"
								>
									Create List
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
			<div className="mt-4">
				<Button
					variant="destructive"
					onClick={() => {
						reset();
						form.reset();
					}}
				>
					Reset Form
				</Button>
			</div>
		</>
	);
}
