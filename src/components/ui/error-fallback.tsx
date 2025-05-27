import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Link, useRouter } from "@tanstack/react-router";
import { AlertTriangle, ArrowLeft, Home, RefreshCw } from "lucide-react";

export interface ErrorFallbackProps {
	error: Error;
	resetErrorBoundary?: () => void;
	title404?: string;
	description404?: string;
	titleGeneric?: string;
	descriptionGeneric?: string;
	showHomeButton?: boolean;
	showBackButton?: boolean;
	showRetryButton?: boolean;
	homeRoute?: string;
}

export function ErrorFallback({
	error,
	resetErrorBoundary,
	title404 = "Not Found",
	description404 = "The resource you're looking for could not be found.",
	titleGeneric = "Something went wrong",
	descriptionGeneric = "An unexpected error occurred. Please try again later.",
	showHomeButton = true,
	showBackButton = true,
	showRetryButton = true,
	homeRoute = "/",
}: ErrorFallbackProps) {
	const router = useRouter();
	const is404 =
		error.message.includes("404") ||
		error.message.toLowerCase().includes("not found");

	const title = is404 ? title404 : titleGeneric;
	const description = is404 ? description404 : descriptionGeneric;

	return (
		<div className="container mx-auto py-12 px-4">
			<Card className="max-w-3xl mx-auto">
				<CardHeader className="text-center">
					<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
						<AlertTriangle className="h-6 w-6 text-destructive" />
					</div>
					<CardTitle className="text-2xl font-bold">
						{title}
					</CardTitle>
					<CardDescription className="text-base">
						{description}
					</CardDescription>
				</CardHeader>
				<CardContent className="text-center space-y-4">
					{!is404 && (
						<details className="text-left">
							<summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
								Technical details
							</summary>
							<pre className="mt-2 text-xs bg-muted p-2 rounded overflow-x-auto">
								{error.message}
							</pre>
						</details>
					)}

					<div className="flex flex-col sm:flex-row gap-2 justify-center">
						{showRetryButton && resetErrorBoundary && (
							<Button
								onClick={resetErrorBoundary}
								variant="default"
							>
								<RefreshCw className="mr-2 h-4 w-4" />
								Try Again
							</Button>
						)}

						{showBackButton && (
							<Button
								variant="outline"
								onClick={() => router.history.back()}
							>
								<ArrowLeft className="mr-2 h-4 w-4" />
								Go Back
							</Button>
						)}

						{showHomeButton && (
							<Button variant="outline" asChild>
								<Link to={homeRoute}>
									<Home className="mr-2 h-4 w-4" />
									Home
								</Link>
							</Button>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
