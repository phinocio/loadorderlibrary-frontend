import { FileText } from "lucide-react";

type ExistingFile = {
	name: string;
	clean_name: string;
	size_in_bytes: number;
};

type CurrentFilesDisplayProps = {
	files: ExistingFile[];
	title?: string;
	description?: string;
};

export function CurrentFilesDisplay({
	files,
	title = "Current Files",
	description = "These files will be replaced if you upload new files below.",
}: CurrentFilesDisplayProps) {
	// Format file size for display
	const formatFileSize = (bytes: number): string => {
		if (bytes === 0) return "0 Bytes";
		const k = 1024;
		const sizes = ["Bytes", "KiB", "MiB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return `${Number.parseFloat((bytes / k ** i).toFixed(1))} ${sizes[i]}`;
	};

	if (files.length === 0) return null;

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
					<FileText className="size-4" />
					{title} ({files.length})
				</div>
			</div>
			{description && (
				<p className="text-xs text-muted-foreground">{description}</p>
			)}
			<div className="grid gap-3">
				{files.map((file) => (
					<div
						key={file.name}
						className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border/50 hover:bg-muted/70 transition-colors"
					>
						<div className="flex items-center gap-3">
							<div className="flex size-10 items-center justify-center rounded-md bg-primary/10">
								<FileText className="size-5 text-primary" />
							</div>
							<div className="flex flex-col">
								<p className="text-sm font-medium leading-none">
									{file.clean_name}
								</p>
								<p className="text-xs text-muted-foreground mt-1">
									{file.name.endsWith(".ini")
										? "Configuration File"
										: "Text File"}{" "}
									• {formatFileSize(file.size_in_bytes)}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
