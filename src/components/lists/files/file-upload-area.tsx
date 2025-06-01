import {
	FormControl,
	FormDescription,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import type { ControllerRenderProps } from "react-hook-form";

type FileUploadAreaProps = {
	// This file type is actual browser File, not the custom File type
	field: ControllerRenderProps<{ files: File[] }, "files">;
	onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	label?: string;
	description?: string;
	disabled?: boolean;
};

export function FileUploadArea({
	field: { onChange, value, ...field },
	onFileChange,
	label = "Upload Files",
	description = "Upload your mod list files in INI or TXT format",
	disabled = false,
}: FileUploadAreaProps) {
	return (
		<FormItem>
			<FormLabel>{label}</FormLabel>
			<FormDescription className="text-sm text-muted-foreground">
				{description}
			</FormDescription>
			<FormControl>
				<label
					htmlFor="files"
					className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 hover:border-primary/50 transition-all duration-200 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
				>
					<div className="flex flex-col items-center justify-center pt-5 pb-6">
						<div className="flex size-12 items-center justify-center rounded-full bg-primary/10 mb-3">
							<Upload className="size-6 text-primary" />
						</div>
						<p className="mb-2 text-sm text-foreground">
							<span className="font-semibold">
								Click to upload files
							</span>
						</p>
						<p className="text-xs text-muted-foreground">
							INI or TXT files (max 512KB each)
						</p>
					</div>
					<Input
						id="files"
						type="file"
						className="hidden"
						multiple
						accept=".ini,.txt,text/plain,application/x-wine-extension-ini,application/octet-stream"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							// Convert FileList to array for validation
							const filesArray = e.target.files
								? Array.from(e.target.files)
								: [];
							onChange(filesArray);
							onFileChange(e);
						}}
						disabled={disabled}
						{...field}
					/>
				</label>
			</FormControl>
			<FormMessage />
		</FormItem>
	);
}
