import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ListSkeleton() {
	return (
		<Card className="flex flex-col h-full">
			<CardHeader className="border-b pb-3">
				<div className="flex items-start justify-between">
					<div className="space-y-2 flex-1">
						<Skeleton className="h-6 w-3/4" />
						<Skeleton className="h-4 w-1/2" />
					</div>
					<Skeleton className="h-6 w-6" />
				</div>
			</CardHeader>
			<CardContent className="pt-4 flex-1">
				<div className="space-y-4">
					<div className="flex flex-wrap gap-2">
						<Skeleton className="h-5 w-16" />
						<Skeleton className="h-5 w-20" />
						<Skeleton className="h-5 w-24" />
					</div>
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-5/6" />
				</div>
			</CardContent>
		</Card>
	);
}

export function ListSkeletonGrid() {
	return (
		<div className="container mx-auto py-6">
			<h1 className="text-3xl font-bold mb-6">
				<Skeleton className="h-8 w-1/4" />
			</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
				{Array.from({ length: 6 }).map((_, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<ListSkeleton key={index} />
				))}
			</div>
		</div>
	);
}
