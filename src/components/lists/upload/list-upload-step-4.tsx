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
	const [fileNames, setFileNames] = useState<string[]>([]);

	const form = useForm<FileFormData>({
		resolver: zodResolver(FileUploadSchema),
	});

	// Debug form errors
	console.log("Form errors:", form.formState.errors);

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
								render={({
									field: { onChange, value, ...field },
								}) => (
									<FormItem>
										<FormLabel>Upload Files</FormLabel>
										<FormDescription className="text-sm text-muted-foreground">
											Upload your mod list files in INI or
											TXT format
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
														</span>
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
												/>
											</label>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

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
										isCreatingList || fileNames.length === 0
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
