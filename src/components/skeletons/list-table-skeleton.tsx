import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export function ListTableSkeleton() {
	return (
		<Card className="px-4 py-2">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="font-semibold">Name</TableHead>
						<TableHead className="font-semibold">Game</TableHead>
						<TableHead className="font-semibold">Version</TableHead>
						<TableHead className="font-semibold">Created</TableHead>
						<TableHead className="font-semibold">Updated</TableHead>
						<TableHead className="font-semibold">Status</TableHead>
						<TableHead className="font-semibold text-right">
							Actions
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{Array.from({ length: 10 }).map((_, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: skeleton rows don't have meaningful keys
						<TableRow key={index}>
							<TableCell>
								<Skeleton className="h-4 w-32" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-4 w-24" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-4 w-16" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-4 w-20" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-4 w-20" />
							</TableCell>
							<TableCell>
								<Skeleton className="h-5 w-16" />
							</TableCell>
							<TableCell className="text-right">
								<div className="flex justify-end gap-2">
									<Skeleton className="h-8 w-8" />
									<Skeleton className="h-8 w-8" />
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Card>
	);
}

export function AdminListsSkeleton() {
	return (
		<div className="mx-auto container">
			<article className="py-6">
				<header className="mb-6">
					<section className="flex items-center mb-4 space-x-4">
						<h1 className="text-3xl font-bold">
							Admin - Lists Management
						</h1>
						<Skeleton className="h-6 w-12" />
					</section>
					<div>
						<Card>
							<div className="p-6">
								<Skeleton className="h-6 w-32 mb-2" />
								<Skeleton className="h-4 w-64 mb-4" />
								<div className="flex gap-2">
									<Skeleton className="h-9 flex-1" />
									<Skeleton className="h-9 w-9" />
								</div>
							</div>
						</Card>
					</div>
				</header>
				<div className="space-y-6">
					<ListTableSkeleton />
				</div>
			</article>
		</div>
	);
}
