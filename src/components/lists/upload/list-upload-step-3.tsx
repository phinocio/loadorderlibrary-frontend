// filepath: /home/alice/Projects/Websites/loadorderlibrary-frontend/src/components/lists/upload/list-upload-step-3.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export function ListUploadStep3() {
	const formData = useListUploadFormData();
	const { setFormData, setStep } = useListUploadActions();
	const { createList, isCreatingList, createListError } = useCreateList();
	const [fileNames, setFileNames] = useState<string[]>([]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<FileFormData>({
		resolver: zodResolver(FileUploadSchema),
		defaultValues: {
			"files[]": [],
		},
	});

	// Set up watch for file selection changes
	watch("files[]");

	// Update file names when files change
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const newFileNames = Array.from(e.target.files).map(
				(file) => file.name,
			);
			setFileNames(newFileNames);
		}
	};

	const onSubmit = async (data: FileFormData) => {
		// Update the form data with the files
		setFormData({ files: data });

		// Combine all form data for submission
		const completeFormData = {
			...formData,
			files: data,
			// Ensure required fields have values
			name: formData.name || "",
			game: formData.game || "",
		};

		try {
			// Submit to the API
			await createList(
				completeFormData as {
					name: string;
					game: string;
					files: FileFormData;
					version?: string;
					description?: string;
					website?: string;
					discord?: string;
					readme?: string;
					private?: boolean;
					expires?: string;
				},
			);
			// Navigation will be handled by the createList mutation
		} catch (error) {
			console.error("Error creating list:", error);
		}
	};

	const goBack = () => {
		setStep(2);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Step 3: Upload Files</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-2">
						<label
							htmlFor="files"
							className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50"
						>
							<div className="flex flex-col items-center justify-center pt-5 pb-6">
								<p className="mb-2 text-sm text-muted-foreground">
									<span className="font-semibold">
										Click to upload
									</span>{" "}
									or drag and drop
								</p>
								<p className="text-xs text-muted-foreground">
									INI or TXT files (max 512KB each)
								</p>
							</div>
							<input
								id="files"
								type="file"
								className="hidden"
								multiple
								accept=".ini,.txt,text/plain,application/x-wine-extension-ini,application/octet-stream"
								{...register("files[]")}
								onChange={handleFileChange}
							/>
						</label>
						{errors["files[]"] && (
							<p className="text-sm text-destructive">
								{errors["files[]"].message}
							</p>
						)}
					</div>

					{fileNames.length > 0 && (
						<div className="space-y-2 p-4 bg-muted/30 rounded-lg">
							<h3 className="text-sm font-medium">
								Selected Files:
							</h3>
							<ul className="list-disc pl-5 space-y-1">
								{fileNames.map((name, i) => (
									<li
										key={`file-${i}-${name}`}
										className="text-sm"
									>
										{name}
									</li>
								))}
							</ul>
						</div>
					)}

					{createListError && (
						<div className="p-3 bg-destructive/15 text-destructive rounded-md">
							<p className="text-sm">
								{createListError instanceof Error
									? createListError.message
									: "An error occurred while creating the list."}
							</p>
						</div>
					)}

					<div className="flex justify-between">
						<Button
							type="button"
							variant="outline"
							onClick={goBack}
						>
							Back
						</Button>
						<Button
							type="submit"
							disabled={isCreatingList || fileNames.length === 0}
						>
							{isCreatingList ? "Creating..." : "Create List"}
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
