import { ListFileContent } from "@/components/lists/files/list-file-content";
import { ErrorFallback } from "@/components/ui/error-fallback";
import { listQueryOptions, useList } from "@/queries/use-list";
import { createFileRoute } from "@tanstack/react-router";
import { ErrorBoundary } from "react-error-boundary";

export const Route = createFileRoute("/lists/$slug/embed/$filename")({
	loader: ({ context, params }) => {
		return context.queryClient.prefetchQuery(listQueryOptions(params.slug));
	},
	component: RouteComponent,
});

function EmbedFileComponent() {
	const { slug, filename } = Route.useParams();
	const { data: list } = useList(slug);

	// Find the specific file
	const file = list?.files?.find(
		(f) =>
			f.name === filename ||
			f.clean_name === filename ||
			f.name.toLowerCase() === filename.toLowerCase() ||
			f.clean_name.toLowerCase() === filename.toLowerCase(),
	);

	if (!file) {
		return (
			<div className="flex items-center justify-center min-h-screen p-4">
				<div className="text-center">
					<h1 className="text-2xl font-bold text-muted-foreground mb-2">
						File not found
					</h1>
					<p className="text-muted-foreground">
						The requested file "{filename}" could not be found in
						this list.
					</p>
				</div>
			</div>
		);
	}

	if (!file.content || file.content.length === 0) {
		return (
			<div className="flex items-center justify-center min-h-screen p-4">
				<div className="text-center">
					<h1 className="text-2xl font-bold text-muted-foreground mb-2">
						No content available
					</h1>
					<p className="text-muted-foreground">
						The file "{file.clean_name}" does not have any content
						to display.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen w-full bg-background">
			{/* Header with file info */}
			<div className="border-b bg-muted/50 px-4 py-3 w-full">
				<div className="w-full">
					<h1 className="text-lg font-semibold text-foreground">
						{file.clean_name}
					</h1>
					<p className="text-sm text-muted-foreground">
						From "{list?.name}" •{" "}
						{(file.size_in_bytes / 1024).toFixed(2)} KiB
					</p>
				</div>
			</div>

			{/* File content - full width */}
			<div className="w-full">
				<ListFileContent content={file.content} filename={file.name} />
			</div>

			{/* Footer with attribution */}
			<div className="border-t bg-muted/30 px-4 py-3 mt-8 w-full">
				<div className="w-full text-center">
					<p className="text-xs text-muted-foreground">
						Powered by{" "}
						<a
							href={window.location.origin}
							target="_blank"
							rel="noopener noreferrer"
							className="text-primary hover:underline"
						>
							Load Order Library
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}

function EmbedErrorFallback({
	error,
	resetErrorBoundary,
}: { error: Error; resetErrorBoundary?: () => void }) {
	return (
		<div className="flex items-center justify-center min-h-screen p-4 w-full">
			<ErrorFallback
				error={error}
				resetErrorBoundary={resetErrorBoundary}
				titleGeneric="Embed Error"
				descriptionGeneric="There was an error loading the embedded file content."
			/>
		</div>
	);
}

function RouteComponent() {
	return (
		<ErrorBoundary FallbackComponent={EmbedErrorFallback}>
			<EmbedFileComponent />
		</ErrorBoundary>
	);
}
