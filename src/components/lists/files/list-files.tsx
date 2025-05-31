import { ListFileContent } from "@/components/lists/files/list-file-content";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import type { File, Files } from "@/types/file";
import { ChevronDown, Download, FileText } from "lucide-react";
import { useState } from "react";

export function ListFiles({ files }: { files: Files | undefined }) {
	const [openFiles, setOpenFiles] = useState<Set<string>>(new Set());

	function downloadLink(file: File) {
		return [
			import.meta.env.VITE_API_BASE_URL,
			import.meta.env.VITE_API_VERSION,
			"files",
			file.name,
			"download",
		].join("/");
	}

	const handleOpenChange = (fileName: string, isOpen: boolean) => {
		setOpenFiles((prev) => {
			const newSet = new Set(prev);
			if (isOpen) {
				newSet.add(fileName);
			} else {
				newSet.delete(fileName);
			}
			return newSet;
		});
	};

	return (
		<Card className="py-0 space-y-4">
			{files && files.length > 0 ? (
				<div>
					{files.map((file, index) => {
						const isFirst = index === 0;
						const isLast = index === files.length - 1;
						const isOpen = openFiles.has(file.name);

						return (
							<Collapsible
								key={file.name}
								onOpenChange={(open) =>
									handleOpenChange(file.name, open)
								}
							>
								<CollapsibleTrigger asChild>
									<div
										className={cn(
											"flex items-center justify-between hover:bg-accent px-4 py-3",
											isFirst && "rounded-t-xl",
											isLast && !isOpen && "rounded-b-xl",
											!isFirst &&
												!isLast &&
												!isOpen &&
												"rounded-none",
										)}
									>
										<div className="flex items-center gap-2">
											<FileText className="h-6 w-6 text-muted-foreground" />
											<div className="flex flex-col">
												<span className="font-bold text-primary">
													{file.clean_name}
												</span>
												<span className="text-sm text-muted-foreground">
													{(
														file.size_in_bytes /
														1024
													).toFixed(2)}{" "}
													KiB
												</span>
											</div>
										</div>
										<div className="flex items-center gap-2">
											<form
												className="flex "
												action={downloadLink(file)}
											>
												<Button
													type="submit"
													variant="ghost"
													className="size-5 p-0 cursor-pointer hover:text-secondary"
													onClick={(e) => {
														e.stopPropagation();
													}}
												>
													<Download className="size-5" />
												</Button>
											</form>
											<ChevronDown className="size-4" />
										</div>
									</div>
								</CollapsibleTrigger>
								<CollapsibleContent>
									<div className="border-t">
										{file.content ? (
											<ListFileContent
												content={file.content}
												filename={file.name}
											/>
										) : (
											<p className="text-sm text-muted-foreground">
												No content available for this
												file.
											</p>
										)}
									</div>
								</CollapsibleContent>
							</Collapsible>
						);
					})}
				</div>
			) : (
				<CardContent className="py-4">
					<p className="text-muted-foreground">No files available.</p>
				</CardContent>
			)}
		</Card>
	);
}
