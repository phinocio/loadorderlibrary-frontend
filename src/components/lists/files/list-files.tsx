import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { List } from "@/types/list";
import { ChevronDown, Download, FileText } from "lucide-react";

interface ListFilesProps {
	files: List["files"];
}

export function ListFiles({ files }: ListFilesProps) {
	return (
		<Card className="pb-0">
			<CardHeader>
				<div className="flex items-center gap-2">
					<FileText className="h-5 w-5" />
					<span className="text-lg font-semibold">Files</span>
				</div>
			</CardHeader>

			{files && files.length > 0 ? (
				<div className="space-y-3">
					{files.map((file) => (
						<Collapsible key={file.name}>
							<CollapsibleTrigger asChild>
								<div className="flex items-center justify-between hover:bg-accent px-4 py-2 rounded-xl cursor-pointer">
									<div className="flex items-center gap-2">
										<FileText className="h-6 w-6 text-muted-foreground" />
										<div className="flex flex-col">
											<span className="font-bold text-primary">
												{file.clean_name}
											</span>
											<span className="text-sm text-muted-foreground">
												{(
													file.size_in_bytes / 1024
												).toFixed(2)}{" "}
												KiB
											</span>
										</div>
									</div>
									<div className="flex items-center gap-2">
										<Button
											variant="ghost"
											size="sm"
											className="h-8 w-8 p-0"
											onClick={(e) => {
												e.stopPropagation();
												alert("Download file");
											}}
										>
											<Download className="h-6 w-6" />
										</Button>
										<ChevronDown className="h-6 w-6" />
									</div>
								</div>
							</CollapsibleTrigger>
							<CollapsibleContent>
								<div className="border-t p-4">
									{file.content ? (
										<pre className="text-xs overflow-x-auto whitespace-pre-wrap">
											{file.content.join("\n")}
										</pre>
									) : (
										<p className="text-sm text-muted-foreground">
											No content available for this file.
										</p>
									)}
								</div>
							</CollapsibleContent>
						</Collapsible>
					))}
				</div>
			) : (
				<CardContent className="py-4">
					<p className="text-muted-foreground">No files available.</p>
				</CardContent>
			)}
		</Card>
	);
}
