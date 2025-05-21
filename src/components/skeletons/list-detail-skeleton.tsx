import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, FileText, Globe, MessageCircle } from "lucide-react";

function ListHeaderSkeleton() {
	return (
		<Card>
			<CardHeader>
				<div className="space-y-4">
					<div className="space-y-2">
						<Skeleton className="h-8 w-2/3" />
						<Skeleton className="h-5 w-1/3" />
					</div>
					<div className="flex gap-2">
						<Skeleton className="h-6 w-24" />
						<Skeleton className="h-6 w-32" />
					</div>
				</div>
			</CardHeader>
		</Card>
	);
}

function ListFilesSkeleton() {
	return (
		<Card>
			<CardHeader className="pb-2">
				<CardTitle className="text-lg flex items-center gap-2">
					<FileText className="h-5 w-5" />
					Files
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				{Array.from({ length: 3 }).map((_, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<div key={i} className="flex items-center justify-between">
						<div className="space-y-1">
							<Skeleton className="h-5 w-48" />
							<Skeleton className="h-4 w-24" />
						</div>
						<Skeleton className="h-9 w-24" />
					</div>
				))}
			</CardContent>
		</Card>
	);
}

function InfoCardSkeleton() {
	return (
		<Card>
			<CardHeader className="pb-2">
				<CardTitle className="text-lg">Information</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="space-y-3">
					{/* Created date */}
					<div className="flex items-center justify-between text-sm">
						<span className="flex items-center gap-2 text-muted-foreground">
							<Clock className="h-4 w-4" />
							Created
						</span>
						<Skeleton className="h-4 w-24" />
					</div>
					{/* Updated date */}
					<div className="flex items-center justify-between text-sm">
						<span className="flex items-center gap-2 text-muted-foreground">
							<Clock className="h-4 w-4" />
							Updated
						</span>
						<Skeleton className="h-4 w-24" />
					</div>
				</div>

				<div className="space-y-3">
					{/* Links */}
					<div className="flex items-center justify-between text-sm">
						<span className="flex items-center gap-2 text-muted-foreground">
							<Globe className="h-4 w-4" />
							Links
						</span>
						<Skeleton className="h-4 w-8" />
					</div>
					{/* Comments */}
					<div className="flex items-center justify-between text-sm">
						<span className="flex items-center gap-2 text-muted-foreground">
							<MessageCircle className="h-4 w-4" />
							Comments
						</span>
						<Skeleton className="h-4 w-8" />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export function ListDetailSkeleton() {
	return (
		<div className="container mx-auto py-6">
			<div className="space-y-6">
				<ListHeaderSkeleton />

				{/* Main Content */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Files Section */}
					<div className="lg:col-span-2 space-y-6 order-last lg:order-first">
						<ListFilesSkeleton />
					</div>
					{/* Sidebar Information */}
					<div className="order-first lg:order-last">
						<InfoCardSkeleton />
					</div>
				</div>
			</div>
		</div>
	);
}
