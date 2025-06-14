import { ListCard } from "@/components/lists/list-card";
import { ListSkeletonGrid } from "@/components/skeletons/list-skeleton";
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	listsInfiniteQueryOptions,
	useListsInfinite,
} from "@/queries/use-list";
import {
	Link,
	createFileRoute,
	useNavigate,
	useSearch,
} from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { z } from "zod";

const searchSchema = z.object({
	query: z.string().optional(),
	sort: z
		.enum(["-created", "-updated", "created"])
		.optional()
		.default("-created"),
});

export const Route = createFileRoute("/(app)/lists/")({
	head: () => ({
		meta: [{ title: "Lists - Load Order Library" }],
	}),
	validateSearch: searchSchema,
	loader: async ({ context, location }) => {
		const search = searchSchema.parse(location.search);
		return context.queryClient.prefetchInfiniteQuery(
			listsInfiniteQueryOptions({
				query: search.query,
				sort: search.sort,
			}),
		);
	},
	component: RouteComponent,
});

function ListIndexComponent() {
	const search = useSearch({ from: "/(app)/lists/" });
	const navigate = useNavigate();
	const {
		data: listsData,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useListsInfinite({ query: search.query, sort: search.sort });
	const [searchValue, setSearchValue] = useState(search.query || "");

	// Flatten the paginated data into a single array
	const lists = listsData.pages.flatMap((page) => page.data);

	// Update local state when URL search changes
	useEffect(() => {
		setSearchValue(search.query || "");
	}, [search.query]);

	const handleSearch = () => {
		navigate({
			to: "/lists",
			search: {
				...(searchValue ? { query: searchValue } : {}),
				...(search.sort ? { sort: search.sort } : {}),
			},
			replace: true,
		});
	};

	const resetSearch = () => {
		setSearchValue("");
		navigate({
			to: "/lists",
			search: search.sort ? { sort: search.sort } : {},
			replace: true,
		});
	};

	const handleSortChange = (value: string) => {
		navigate({
			to: "/lists",
			search: {
				...(search.query ? { query: search.query } : {}),
				sort: value as "-created" | "-updated" | "created",
			},
			replace: true,
		});
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
		<article className="container mx-auto py-6">
			<header className="mb-6">
				<section className="flex items-center mb-4 space-x-4">
					<h1 className="text-3xl font-bold">All Lists</h1>
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
				<div className="mt-6">
					<div className="flex items-center gap-2">
						<span className="text-sm font-medium text-muted-foreground">
							Sort by:
						</span>
						<Select
							value={search.sort || "-created"}
							onValueChange={handleSortChange}
						>
							<SelectTrigger className="w-48 bg-card">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="-created">
									Newest First
								</SelectItem>
								<SelectItem value="-updated">
									Updated First
								</SelectItem>
								<SelectItem value="created">
									Oldest First
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</header>
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
				{/*
					Show no lists found message if lists is empty, and query if search is not empty
				*/}
				{lists.length === 0 ? (
					searchValue ? (
						<div className="col-span-full text-center py-12">
							<p className="text-lg text-muted-foreground">
								No lists found for{" "}
								<span className="font-semibold">
									"{searchValue}"
								</span>{" "}
								.
							</p>
						</div>
					) : (
						<div className="col-span-full text-center py-12">
							<p className="text-lg text-muted-foreground">
								No lists available yet. Why not{" "}
								<Link
									to="/upload"
									className="font-semibold text-primary"
								>
									create one
								</Link>
								?
							</p>
						</div>
					)
				) : (
					lists.map((list) => (
						<ListCard key={list.slug} list={list} />
					))
				)}
			</div>
			{/* Load More Button */}
			{hasNextPage && (
				<div className="flex justify-center mt-8">
					<Button
						onClick={() => fetchNextPage()}
						disabled={isFetchingNextPage}
						size="lg"
					>
						{isFetchingNextPage ? "Loading..." : "Load More Lists"}
					</Button>
				</div>
			)}
		</article>
	);
}

function RouteComponent() {
	return (
		<Suspense fallback={<ListSkeletonGrid />}>
			<ListIndexComponent />
		</Suspense>
	);
}
