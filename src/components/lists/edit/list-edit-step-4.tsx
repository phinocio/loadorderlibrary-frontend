import { CurrentFilesDisplay } from "@/components/lists/files/current-files-display";
import { FileUploadArea } from "@/components/lists/files/file-upload-area";
import { SelectedFilesDisplay } from "@/components/lists/files/selected-files-display";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField } from "@/components/ui/form";
import { useUpdateList } from "@/queries/use-list";
import { FileUploadSchema } from "@/schemas/file-schemas";
import {
	useListEditActions,
	useListEditFormData,
	useListEditOriginalList,
} from "@/stores/list-edit-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

type FileFormData = z.infer<typeof FileUploadSchema>;

interface FileInfo {
	name: string;
	size: number;
	type: string;
}

export function ListEditStep4() {
	const navigate = useNavigate();
	const formData = useListEditFormData();
	const originalList = useListEditOriginalList();
	const { setStep, reset } = useListEditActions();
	const { updateList, isUpdatingList, updateListError } = useUpdateList();
	const [fileInfo, setFileInfo] = useState<FileInfo[]>([]);

	const form = useForm<FileFormData>({
		resolver: zodResolver(FileUploadSchema),
		defaultValues: {
			files: [],
		},
	});

	// Handle new file selection
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const files = Array.from(e.target.files);
			const newFileInfo = files.map((file) => ({
				name: file.name,
				size: file.size,
				type: file.type || "text/plain",
			}));
			setFileInfo(newFileInfo);
		}
	};

	// Handle removing a specific file
	const handleRemoveFile = (index: number) => {
		const currentFiles = form.getValues("files") as File[];
		const newFiles = currentFiles.filter((_, i) => i !== index);
		const newFileInfo = fileInfo.filter((_, i) => i !== index);

		form.setValue("files", newFiles);
		setFileInfo(newFileInfo);
	};

	// Handle removing all files
	const handleRemoveAllFiles = () => {
		form.setValue("files", []);
		setFileInfo([]);
	};

	const goBack = () => {
		setStep(3);
	};

	const onSubmit = async (data: FileFormData) => {
		if (!originalList) {
			console.error("Original list not found. This should not happen.");
			throw new Error("Original list not found. This should not happen.");
		}

		const updatedList = new FormData();

		if (formData.name && originalList.name !== formData.name) {
			updatedList.append("name", formData.name);
		}

		if (formData.game && String(originalList.game.id) !== formData.game) {
			updatedList.append("game", formData.game);
		}

		if (formData.version && originalList.version !== formData.version) {
			updatedList.append("version", formData.version);
		}
		if (
			(formData.description &&
				originalList.description !== formData.description) ||
			formData.description === ""
		) {
			updatedList.append("description", formData.description);
		}
		if (
			(formData.website && originalList.website !== formData.website) ||
			formData.website === ""
		) {
			updatedList.append("website", formData.website);
		}
		if (
			(formData.discord && originalList.discord !== formData.discord) ||
			formData.discord === ""
		) {
			updatedList.append("discord", formData.discord);
		}
		if (
			(formData.readme && originalList.readme !== formData.readme) ||
			formData.readme === ""
		) {
			updatedList.append("readme", formData.readme);
		}
		if (formData.private !== originalList.private) {
			updatedList.append("private", formData.private ? "1" : "0");
		}
		if (formData.expires && originalList.expires !== formData.expires) {
			updatedList.append("expires", formData.expires);
		}
		if (data.files && data.files.length > 0) {
			for (const file of data.files) {
				updatedList.append("files[]", file);
			}
		}
		updateList(
			{ slug: originalList.slug, data: updatedList },
			{
				onSuccess: () => {
					reset();
					navigate({
						to: "/lists/$slug",
						params: { slug: originalList.slug },
					});
				},
			},
		);
	};

	const currentFiles = originalList?.files || [];

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Step 4: Manage Files</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* Current Files */}
					<CurrentFilesDisplay files={currentFiles} />

					{/* Upload New Files */}
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-6"
						>
							<FormField
								control={form.control}
								name="files"
								render={(props) => (
									<FileUploadArea
										field={props.field}
										onFileChange={handleFileChange}
										label="Replace Files"
										description="Upload new mod list files in INI or TXT format. These will replace the existing files."
										disabled={isUpdatingList}
									/>
								)}
							/>

							{/* Selected New Files */}
							<SelectedFilesDisplay
								files={fileInfo}
								onRemoveFile={handleRemoveFile}
								onRemoveAll={handleRemoveAllFiles}
								title="New Files to Upload"
								showRemoveAll={true}
								disabled={isUpdatingList}
							/>

							{/* Error Display */}
							{updateListError && (
								<div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
									{updateListError.message ||
										"Failed to update list. Please try again."}
								</div>
							)}

							{/* Action Buttons */}
							<div className="flex justify-between border-t pt-4">
								<Button
									type="button"
									variant="outline"
									onClick={goBack}
									disabled={isUpdatingList}
								>
									Back
								</Button>
								<Button
									type="submit"
									variant="tertiary"
									disabled={isUpdatingList}
								>
									Update List
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</>
	);
}
