import { Skeleton } from "@/components/ui/skeleton";
import { ListSkeletonGrid } from "./list-skeleton";

export function GameDetailSkeleton() {
	return (
		<div className="container mx-auto py-6">
			<div className="mb-6">
				<Skeleton className="h-9 w-64" />
			</div>
			<ListSkeletonGrid />
		</div>
	);
}
