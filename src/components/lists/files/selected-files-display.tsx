import { Button } from "@/components/ui/button";
import { FileText, X } from "lucide-react";

type FileInfo = {
	name: string;
	size: number;
	type: string;
};

type SelectedFilesDisplayProps = {
	files: FileInfo[];
	onRemoveFile: (index: number) => void;
	title?: string;
	showRemoveAll?: boolean;
	onRemoveAll?: () => void;
	disabled?: boolean;
};

export function SelectedFilesDisplay({
	files,
	onRemoveFile,
	title = "Selected Files",
	showRemoveAll = false,
	onRemoveAll,
	disabled = false,
}: SelectedFilesDisplayProps) {
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
				{showRemoveAll && onRemoveAll && (
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={onRemoveAll}
						disabled={disabled}
						className="h-8 px-2"
					>
						<X className="size-4" />
					</Button>
				)}
			</div>
			<div className="grid gap-3">
				{files.map((file, i) => (
					<div
						key={`file-${i}-${file.name}`}
						className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border/50 hover:bg-muted/70 transition-colors"
					>
						<div className="flex items-center gap-3">
							<div className="flex size-10 items-center justify-center rounded-md bg-primary/10">
								<FileText className="size-5 text-primary" />
							</div>
							<div className="flex flex-col">
								<p className="text-sm font-medium leading-none">
									{file.name}
								</p>
								<p className="text-xs text-muted-foreground mt-1">
									{file.name.endsWith(".ini")
										? "Configuration File"
										: "Text File"}{" "}
									• {formatFileSize(file.size)}
								</p>
							</div>
						</div>
						<button
							type="button"
							onClick={() => onRemoveFile(i)}
							disabled={disabled}
							className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						>
							<X className="size-4" />
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
