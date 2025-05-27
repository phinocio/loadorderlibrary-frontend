import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpdateList } from "@/queries/use-list";
import { FileUploadSchema } from "@/schemas/file-schemas";
import {
	useListEditActions,
	useListEditFormData,
	useListEditOriginalList,
} from "@/stores/list-edit-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { FileText, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

type FileFormData = z.infer<typeof FileUploadSchema>;

export function ListEditStep4() {
	const navigate = useNavigate();
	const formData = useListEditFormData();
	const originalList = useListEditOriginalList();
	const { setStep, reset } = useListEditActions();
	const { updateList, isUpdatingList, updateListError } = useUpdateList();
	const [newFileNames, setNewFileNames] = useState<string[]>([]);

	const form = useForm<FileFormData>({
		resolver: zodResolver(FileUploadSchema),
		defaultValues: {
			files: [],
		},
	});
	// Handle new file selection
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const fileNames = Array.from(e.target.files).map(
				(file) => file.name,
			);
			setNewFileNames(fileNames);
		}
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
			formData.description &&
			originalList.description !== formData.description
		) {
			updatedList.append("description", formData.description);
		}
		if (formData.website && originalList.website !== formData.website) {
			updatedList.append("website", formData.website);
		}
		if (formData.discord && originalList.discord !== formData.discord) {
			updatedList.append("discord", formData.discord);
		}
		if (formData.readme && originalList.readme !== formData.readme) {
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
					{currentFiles.length > 0 && (
						<div className="space-y-4">
							<div>
								<h3 className="text-sm font-medium mb-2">
									Current Files
								</h3>
								<p className="text-xs text-muted-foreground mb-3">
									These files will be replaced if you upload
									new files below.
								</p>
								<div className="space-y-2">
									{currentFiles.map((file) => (
										<div
											key={file.name}
											className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg"
										>
											<FileText className="h-4 w-4 text-muted-foreground" />
											<div className="flex flex-col">
												<span className="text-sm font-medium">
													{file.clean_name}
												</span>
												<span className="text-xs text-muted-foreground">
													{(
														file.size_in_bytes /
														1024
													).toFixed(2)}{" "}
													KiB
												</span>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					)}

					{/* Upload New Files */}
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-6"
						>
							<FormField
								control={form.control}
								name="files"
								render={({
									field: { onChange, value, ...field },
								}) => (
									<FormItem>
										<FormLabel>Replace Files</FormLabel>
										<FormDescription className="text-sm text-muted-foreground">
											Upload new mod list files in INI or
											TXT format. These will replace the
											existing files.
										</FormDescription>
										<FormControl>
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
														INI or TXT files (max
														512KB each)
													</p>
												</div>
												<Input
													id="files"
													type="file"
													className="hidden"
													multiple
													accept=".ini,.txt,text/plain,application/x-wine-extension-ini,application/octet-stream"
													onChange={(
														e: React.ChangeEvent<HTMLInputElement>,
													) => {
														// Convert FileList to array for validation
														const filesArray = e
															.target.files
															? Array.from(
																	e.target
																		.files,
																)
															: [];
														onChange(filesArray);
														handleFileChange(e);
													}}
													{...field}
													disabled={isUpdatingList}
												/>
											</label>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{/* Selected New Files */}
							{newFileNames.length > 0 && (
								<div className="space-y-2 p-4 bg-muted/30 rounded-lg">
									<div className="flex items-center justify-between">
										<h3 className="text-sm font-medium">
											New Files to Upload:
										</h3>
										<Button
											type="button"
											variant="ghost"
											size="sm"
											onClick={() => {
												setNewFileNames([]);
												form.setValue("files", []);
											}}
											disabled={isUpdatingList}
										>
											<X className="h-4 w-4" />
										</Button>
									</div>
									<ul className="list-disc pl-5 space-y-1">
										{newFileNames.map((name, i) => (
											<li
												key={`new-file-${i}-${name}`}
												className="text-sm"
											>
												{name}
											</li>
										))}
									</ul>
								</div>
							)}

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
									variant="default"
									disabled={isUpdatingList}
								>
									{isUpdatingList
										? "Updating..."
										: "Update List"}
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</>
	);
}
