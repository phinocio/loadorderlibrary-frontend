import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { File, Files } from "@/types/file";
import { ChevronDown, Download, FileText } from "lucide-react";

export function ListFiles({ files }: { files: Files | undefined }) {
	function downloadLink(file: File) {
		return [
			import.meta.env.VITE_API_BASE_URL,
			import.meta.env.VITE_API_VERSION,
			"files",
			file.name,
			"download",
		].join("/");
	}

	return (
		<Card className="py-0">
			{files && files.length > 0 ? (
				<div>
					{files.map((file) => (
						<Collapsible key={file.name}>
							<CollapsibleTrigger asChild>
								<div className="flex items-center justify-between hover:bg-accent px-4 py-3 rounded-xl ">
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
