import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import type { Files } from "@/types/file";
import type { List } from "@/types/list";
import { Check, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";

interface ShareDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	list: List;
	files?: Files;
}

export function ShareDialog({
	open,
	onOpenChange,
	list,
	files,
}: ShareDialogProps) {
	const [shareType, setShareType] = useState<"list" | "file">("list");
	const [selectedFile, setSelectedFile] = useState<string>("");
	const [embedDimensions, setEmbedDimensions] = useState({
		width: "875",
		height: "1000",
	});
	const [copiedStates, setCopiedStates] = useState<{
		url: boolean;
		embed: boolean;
	}>({
		url: false,
		embed: false,
	});

	// Base URL construction
	const baseUrl = window.location.origin;
	const listUrl = `${baseUrl}/lists/${list.slug}`;

	// Generate URLs based on share type
	const getShareUrl = () => {
		if (shareType === "list") {
			return listUrl;
		}

		if (shareType === "file" && selectedFile) {
			return `${listUrl}#${selectedFile}`;
		}

		return listUrl;
	};

	// Generate embed URL for files
	const getEmbedUrl = () => {
		if (shareType === "file" && selectedFile) {
			return `${baseUrl}/lists/${list.slug}/embed/${selectedFile}`;
		}
		return "";
	};

	// Generate embed code
	const getEmbedCode = () => {
		const embedUrl = getEmbedUrl();
		if (!embedUrl) return "";

		return `<iframe title="Load Order Library iframe" src="${embedUrl}" width="${embedDimensions.width}" height="${embedDimensions.height}" sandbox="allow-scripts"></iframe>`;
	};

	// Copy to clipboard function
	const copyToClipboard = async (text: string, type: "url" | "embed") => {
		try {
			await navigator.clipboard.writeText(text);
			setCopiedStates((prev) => ({ ...prev, [type]: true }));
			setTimeout(() => {
				setCopiedStates((prev) => ({ ...prev, [type]: false }));
			}, 2000);
		} catch (err) {
			console.error("Failed to copy: ", err);
		}
	};

	// Open URL in new tab
	const openInNewTab = (url: string) => {
		window.open(url, "_blank", "noopener,noreferrer");
	};

	// Reset state when dialog closes
	const handleOpenChange = (open: boolean) => {
		if (!open) {
			setShareType("list");
			setSelectedFile("");
			setCopiedStates({ url: false, embed: false });
		}
		onOpenChange(open);
	};

	// Filter files to get actual filenames for selection
	const availableFiles =
		files?.filter((file) => file.content && file.content.length > 0) || [];

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogContent className="sm:max-w-md bg-card">
				<DialogHeader>
					<DialogTitle>Share "{list.name}"</DialogTitle>
					<DialogDescription>
						Share this list with others or embed it in your website.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					{/* Share Type Selection */}
					<div className="space-y-2">
						<Label>What would you like to share?</Label>
						<Select
							value={shareType}
							onValueChange={(value: "list" | "file") => {
								setShareType(value);
								setSelectedFile("");
							}}
						>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="list">
									Entire list
								</SelectItem>
								<SelectItem value="file">
									Specific file
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					{/* File Selection (when sharing a file) */}
					{shareType === "file" && (
						<div className="space-y-2">
							<Label>Select file</Label>
							<Select
								value={selectedFile}
								onValueChange={setSelectedFile}
							>
								<SelectTrigger>
									<SelectValue placeholder="Choose a file..." />
								</SelectTrigger>
								<SelectContent>
									{availableFiles.map((file) => (
										<SelectItem
											key={file.name}
											value={file.name}
										>
											{file.clean_name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					)}

					<Separator />

					{/* URL Sharing */}
					<div className="space-y-2">
						<Label>Share URL</Label>
						<div className="flex space-x-2">
							<Input
								value={getShareUrl()}
								readOnly
								className="flex-1"
							/>
							<Button
								size="sm"
								variant="outline"
								onClick={() =>
									copyToClipboard(getShareUrl(), "url")
								}
								className="shrink-0"
							>
								{copiedStates.url ? (
									<Check className="h-4 w-4" />
								) : (
									<Copy className="h-4 w-4" />
								)}
							</Button>
							<Button
								size="sm"
								variant="outline"
								onClick={() => openInNewTab(getShareUrl())}
								className="shrink-0"
							>
								<ExternalLink className="h-4 w-4" />
							</Button>
						</div>
						<p className="text-xs text-muted-foreground">
							{shareType === "list"
								? "Direct link to the load order list"
								: shareType === "file" && selectedFile
									? "Direct link that will automatically expand the selected file"
									: "Select a file to generate a direct link"}
						</p>
					</div>

					{/* Embed Code (only for files) */}
					{shareType === "file" && selectedFile && (
						<>
							<Separator />

							<div className="space-y-2">
								<Label>Embed Dimensions</Label>
								<div className="grid grid-cols-2 gap-2">
									<div>
										<Label
											htmlFor="width"
											className="text-xs"
										>
											Width
										</Label>
										<Input
											id="width"
											value={embedDimensions.width}
											onChange={(e) =>
												setEmbedDimensions((prev) => ({
													...prev,
													width: e.target.value,
												}))
											}
											placeholder="875"
										/>
									</div>
									<div>
										<Label
											htmlFor="height"
											className="text-xs"
										>
											Height
										</Label>
										<Input
											id="height"
											value={embedDimensions.height}
											onChange={(e) =>
												setEmbedDimensions((prev) => ({
													...prev,
													height: e.target.value,
												}))
											}
											placeholder="1000"
										/>
									</div>
								</div>
							</div>

							<div className="space-y-2">
								<Label>Embed Code</Label>
								<div className="space-y-2">
									<Textarea
										value={getEmbedCode()}
										readOnly
										className="min-h-[100px] font-mono text-xs"
									/>
									<div className="flex space-x-2">
										<Button
											size="sm"
											variant="outline"
											onClick={() =>
												copyToClipboard(
													getEmbedCode(),
													"embed",
												)
											}
											className="flex-1"
										>
											{copiedStates.embed ? (
												<>
													<Check className="h-4 w-4 mr-2" />
													Copied!
												</>
											) : (
												<>
													<Copy className="h-4 w-4 mr-2" />
													Copy Embed Code
												</>
											)}
										</Button>
										<Button
											size="sm"
											variant="outline"
											onClick={() =>
												openInNewTab(getEmbedUrl())
											}
											className="shrink-0"
										>
											<ExternalLink className="h-4 w-4" />
										</Button>
									</div>
								</div>
								<p className="text-xs text-muted-foreground">
									Embed this iframe in your website to display
									the file content directly.
								</p>
							</div>
						</>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
