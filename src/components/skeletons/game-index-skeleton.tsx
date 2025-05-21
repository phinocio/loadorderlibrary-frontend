import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function GameCardSkeleton() {
	return (
		<Card className="group hover:shadow-md transition-all">
			<CardHeader>
				<CardTitle className="flex items-start justify-between">
					<Skeleton className="h-6 w-48" />
					<Skeleton className="h-5 w-20 ml-2" />
				</CardTitle>
			</CardHeader>
			<CardContent>
				<Skeleton className="h-5 w-4/5" />
			</CardContent>
		</Card>
	);
}

export function GameIndexSkeleton() {
	return (
		<div className="container mx-auto py-6">
			<Skeleton className="h-8 w-32 mb-6" />
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
				{Array.from({ length: 6 }).map((_, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<GameCardSkeleton key={index} />
				))}
			</div>
		</div>
	);
}
