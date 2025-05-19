import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
		<Card className="py-1 px-2">
			{files && files.length > 0 ? (
				<div className="space-y-3">
					{files.map((file) => (
						<Collapsible key={file.name}>
							<CollapsibleTrigger asChild>
								<div className="flex items-center justify-between p-3 bg-muted rounded-md hover:bg-muted/80 cursor-pointer">
									<div className="flex items-center gap-2">
										<FileText className="h-4 w-4 text-muted-foreground" />
										<span className="font-bold text-primary">
											{file.clean_name}
										</span>
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
											<Download className="h-4 w-4" />
										</Button>
										<ChevronDown className="h-4 w-4" />
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
