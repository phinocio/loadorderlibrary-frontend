import { ListTable } from "@/components/lists/list-table";
import { AdminListsSkeleton } from "@/components/skeletons/list-table-skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	adminListsInfiniteQueryOptions,
	useAdminDeleteList,
	useAdminListsInfinite,
} from "@/queries/admin/use-list";
import {
	createFileRoute,
	useNavigate,
	useSearch,
} from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { Suspense, useEffect, useMemo, useState } from "react";
import z from "zod";

const searchSchema = z.object({
	query: z.string().optional(),
});

export const Route = createFileRoute("/admin/lists")({
	validateSearch: searchSchema,
	loader: async ({ context, location }) => {
		const search = searchSchema.parse(location.search);
		return context.queryClient.prefetchInfiniteQuery(
			adminListsInfiniteQueryOptions(search.query),
		);
	},
	component: RouteComponent,
});

function AdminListsComponent() {
	const search = useSearch({ from: "/admin/lists" });
	const navigate = useNavigate();
	const {
		data: listsData,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useAdminListsInfinite(search.query);
	const { deleteList, isDeletingList } = useAdminDeleteList();
	const [searchValue, setSearchValue] = useState(search.query || "");

	// Flatten the paginated data into a single array and remove duplicates
	const lists = useMemo(() => {
		const allLists = listsData.pages.flatMap((page) => page.data);
		// Remove duplicates based on slug
		const uniqueLists = allLists.filter(
			(list, index, self) =>
				index === self.findIndex((l) => l.slug === list.slug),
		);
		return uniqueLists;
	}, [listsData.pages]);

	// Update local state when URL search changes
	useEffect(() => {
		setSearchValue(search.query || "");
	}, [search.query]);

	const handleSearch = () => {
		navigate({
			to: "/admin/lists",
			search: searchValue ? { query: searchValue } : {},
			replace: true,
		});
	};

	const resetSearch = () => {
		setSearchValue("");
		navigate({ to: "/admin/lists", replace: true });
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	return (
		<div className="mx-auto container">
			<article className="py-6">
				<header className="mb-6">
					<section className="flex items-center mb-4 space-x-4">
						<h1 className="text-3xl font-bold">
							Admin - Lists Management
						</h1>
						<Badge variant="secondary" className="font-bold">
							{listsData.pages[0]?.meta.total ?? 0}
						</Badge>
					</section>
					<div>
						<Card>
							<CardHeader>
								<CardTitle>Search Lists</CardTitle>
								<CardDescription>
									Find lists by name, author, or description.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="flex gap-2">
									<Input
										type="text"
										placeholder="Search lists..."
										value={searchValue}
										onChange={handleSearchChange}
										onKeyDown={handleKeyDown}
										className="flex-1"
									/>
									<Button onClick={handleSearch} size="icon">
										<Search className="h-4 w-4" />
									</Button>
									{searchValue && (
										<Button
											onClick={() => resetSearch()}
											size="icon"
											variant="destructive"
										>
											<X className="h-4 w-4" />
										</Button>
									)}
								</div>
							</CardContent>
						</Card>
					</div>
				</header>

				{/* Lists Table */}
				<div className="space-y-6">
					{lists.length === 0 ? (
						searchValue ? (
							<div className="text-center py-12">
								<p className="text-lg text-muted-foreground">
									No lists found for{" "}
									<span className="font-semibold">
										"{searchValue}"
									</span>
								</p>
							</div>
						) : (
							<div className="text-center py-12">
								<p className="text-lg text-muted-foreground">
									No lists available yet.
								</p>
							</div>
						)
					) : (
						<ListTable
							lists={lists}
							showAuthor
							showEdit={false}
							deleteListFunction={deleteList}
							isDeletingList={isDeletingList}
						/>
					)}

					{/* Load More Button */}
					{hasNextPage && (
						<div className="flex justify-center mt-8">
							<Button
								onClick={() => fetchNextPage()}
								disabled={isFetchingNextPage}
								size="lg"
							>
								{isFetchingNextPage
									? "Loading..."
									: "Load More Lists"}
							</Button>
						</div>
					)}
				</div>
			</article>
		</div>
	);
}

function RouteComponent() {
	return (
		<Suspense fallback={<AdminListsSkeleton />}>
			<AdminListsComponent />
		</Suspense>
	);
}
