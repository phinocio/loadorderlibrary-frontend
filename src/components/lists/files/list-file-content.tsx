import { Button } from "@/components/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { ExpandIcon, ShrinkIcon } from "lucide-react";
import { useMemo, useState } from "react";

type ListFileContentProps = {
	content: string[];
	filename?: string;
};

interface ParsedLine {
	original: string;
	lineNumber: number;
	isSeparator: boolean;
	isEnabled: boolean | null; // null for separators and non-modlist files
	isComment: boolean; // lines starting with #
	text: string;
}

interface SeparatorSection {
	separator: ParsedLine | null;
	lines: ParsedLine[];
	isOpen: boolean;
}

export function ListFileContent({ content, filename }: ListFileContentProps) {
	const [showEnabled, setShowEnabled] = useState(true);
	const [showDisabled, setShowDisabled] = useState(false);
	const [expandAll, setExpandAll] = useState(true);
	const [separatorStates, setSeparatorStates] = useState<
		Record<number, boolean>
	>({});

	const isModlist = filename?.toLowerCase().includes("modlist.txt") ?? false;

	// Parse lines to determine their type and status
	const parsedLines = useMemo(() => {
		return content.map((line, index): ParsedLine => {
			const lineNumber = index + 1;
			const isSeparator = line.trim().endsWith("_separator");

			let isEnabled: boolean | null = null;
			let text = line;

			if (isSeparator) {
				// Clean up separator text: remove +/- prefix and _separator suffix
				text = line.trim();
				if (text.startsWith("+") || text.startsWith("-")) {
					text = text.substring(1);
				}
				if (text.endsWith("_separator")) {
					text = text.substring(0, text.length - 10); // Remove "_separator"
				}
				text = text.trim();
			} else if (isModlist) {
				if (line.startsWith("+")) {
					isEnabled = true;
					text = line.substring(1);
				} else if (line.startsWith("-")) {
					isEnabled = false;
					text = line.substring(1);
				}
			}

			// Check if line starts with # (comment/ignore)
			const isComment = text.trim().startsWith("#");

			return {
				original: line,
				lineNumber,
				isSeparator,
				isEnabled,
				isComment,
				text,
			};
		});
	}, [content, isModlist]);

	// Group lines by separators
	const separatorSections = useMemo(() => {
		const sections: SeparatorSection[] = [];
		let currentSection: SeparatorSection | null = null;

		for (const line of parsedLines) {
			if (line.isSeparator) {
				// Close previous section if exists
				if (currentSection) {
					sections.push(currentSection);
				}
				// Start new section
				currentSection = {
					separator: line,
					lines: [],
					isOpen: separatorStates[line.lineNumber] ?? expandAll,
				};
			} else if (currentSection) {
				currentSection.lines.push(line);
			} else {
				// Lines before first separator
				if (sections.length === 0) {
					sections.push({
						separator: null,
						lines: [],
						isOpen: true,
					});
				}
				sections[0].lines.push(line);
			}
		}

		// Don't forget the last section
		if (currentSection) {
			sections.push(currentSection);
		}

		return sections;
	}, [parsedLines, separatorStates, expandAll]);

	// Filter lines based on visibility settings
	const shouldShowLine = (line: ParsedLine) => {
		if (line.isSeparator) return true; // Always show separators
		if (line.isComment) return false; // Ignore lines starting with #
		if (!isModlist) return true; // Show all lines for non-modlist files
		if (line.isEnabled === null) return true; // Show lines that don't have +/- prefix
		if (line.isEnabled && !showEnabled) return false;
		if (!line.isEnabled && !showDisabled) return false;
		return true;
	};

	const toggleExpandAll = () => {
		const newExpandAll = !expandAll;
		setExpandAll(newExpandAll);

		// Update all separator states
		const newStates: Record<number, boolean> = {};
		for (const section of separatorSections) {
			if (section.separator) {
				newStates[section.separator.lineNumber] = newExpandAll;
			}
		}
		setSeparatorStates(newStates);
	};

	return (
		<div>
			{/* Controls */}
			{isModlist && (
				<div className="flex flex-wrap items-center justify-between gap-4 p-3 ">
					<div className="flex flex-wrap items-center gap-4">
						<>
							<div className="flex items-center gap-2">
								<Switch
									id="show-enabled"
									checked={showEnabled}
									onCheckedChange={setShowEnabled}
								/>
								<label
									htmlFor="show-enabled"
									className="text-sm font-medium"
								>
									Show Enabled (+)
								</label>
							</div>
							<div className="flex items-center gap-2">
								<Switch
									id="show-disabled"
									checked={showDisabled}
									onCheckedChange={setShowDisabled}
								/>
								<label
									htmlFor="show-disabled"
									className="text-sm font-medium"
								>
									Show Disabled (-)
								</label>
							</div>
						</>
					</div>

					{separatorSections.some((section) => section.separator) && (
						<Button
							variant="outline"
							size="sm"
							onClick={toggleExpandAll}
							className="gap-2"
						>
							{expandAll ? (
								<>
									<ShrinkIcon className="h-4 w-4" />
									Collapse All
								</>
							) : (
								<>
									<ExpandIcon className="h-4 w-4" />
									Expand All
								</>
							)}
						</Button>
					)}
				</div>
			)}

			{/* File content */}
			<div className="text-sm">
				{separatorSections.map((section) => {
					// Handle sections without separators (lines before first separator)
					if (!section.separator) {
						return (
							<div key="no-separator">
								{section.lines
									.filter(shouldShowLine)
									.map((line, lineIndex) => (
										<div
											key={line.lineNumber}
											className={cn(
												"flex items-stretch w-full group",
												lineIndex % 2 === 0
													? "bg-background"
													: "bg-muted/30",
												isModlist &&
													line.isEnabled === false &&
													"bg-destructive/20 dark:bg-destructive/30",
												isModlist &&
													line.isEnabled !== false &&
													"hover:bg-secondary hover:text-background",
											)}
										>
											<div className="bg-secondary text-background text-xs px-2 py-2 text-center font-bold w-12 flex-shrink-0 flex items-center justify-center">
												{line.lineNumber}
											</div>
											<span
												className={cn(
													"flex-1 leading-relaxed py-2 px-3",
													isModlist &&
														line.isEnabled ===
															false &&
														"text-destructive line-through",
													isModlist &&
														line.isEnabled !==
															false &&
														"hover:bg-secondary hover:text-background",
												)}
											>
												{line.text}
											</span>
										</div>
									))}
							</div>
						);
					}

					// Handle sections with separators
					const isOpen =
						separatorStates[section.separator.lineNumber] ??
						expandAll;
					const visibleLines = section.lines.filter(shouldShowLine);
					const separatorLineNumber = section.separator.lineNumber;

					return (
						<Collapsible
							key={separatorLineNumber}
							open={isOpen}
							onOpenChange={(newOpen) => {
								setSeparatorStates((prev) => ({
									...prev,
									[separatorLineNumber]: newOpen,
								}));
							}}
						>
							<CollapsibleTrigger asChild>
								<div className="w-full py-3 px-4 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/80 transition-colors">
									<div className="flex items-center justify-center">
										<span className="font-bold text-center">
											{section.separator.text}
										</span>
										<span className="text-xs opacity-75 ml-2">
											({visibleLines.length} items)
										</span>
									</div>
								</div>
							</CollapsibleTrigger>
							<CollapsibleContent>
								{visibleLines.map((line, lineIndex) => (
									<div
										key={line.lineNumber}
										className={cn(
											"flex items-stretch w-full group",
											lineIndex % 2 === 0
												? "bg-background"
												: "bg-muted/30",
											isModlist &&
												line.isEnabled === false &&
												"bg-destructive/20 dark:bg-destructive/30",
											isModlist &&
												line.isEnabled !== false &&
												"hover:bg-secondary hover:text-background",
										)}
									>
										<div className="bg-secondary text-background text-xs px-2 py-2 text-center font-bold w-12 flex-shrink-0 flex items-center justify-center">
											{line.lineNumber}
										</div>
										<span
											className={cn(
												"flex-1 leading-relaxed py-2 px-3",
												isModlist &&
													line.isEnabled === false &&
													"text-destructive line-through",
												isModlist &&
													line.isEnabled !== false &&
													"hover:bg-secondary hover:text-background",
											)}
										>
											{line.text}
										</span>
									</div>
								))}
							</CollapsibleContent>
						</Collapsible>
					);
				})}
			</div>
		</div>
	);
}
