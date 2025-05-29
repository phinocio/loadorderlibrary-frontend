import { ListCard } from "@/components/lists/list-card";
import { ListSkeletonGrid } from "@/components/skeletons/list-skeleton";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { listsQueryOptions, useLists } from "@/queries/use-list";
import {
	createFileRoute,
	useNavigate,
	useSearch,
} from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { z } from "zod";

const searchSchema = z.object({
	query: z.string().optional(),
});

export const Route = createFileRoute("/(app)/lists/")({
	validateSearch: searchSchema,
	loader: async ({ context, location }) => {
		const search = searchSchema.parse(location.search);
		return context.queryClient.prefetchQuery(
			listsQueryOptions(search.query),
		);
	},
	component: RouteComponent,
});

function ListIndexComponent() {
	const search = useSearch({ from: "/(app)/lists/" });
	const navigate = useNavigate();
	const { data: lists } = useLists(search.query);
	const [searchValue, setSearchValue] = useState(search.query || "");

	// Update local state when URL search changes
	useEffect(() => {
		setSearchValue(search.query || "");
	}, [search.query]);

	const handleSearch = () => {
		navigate({
			to: "/lists",
			search: searchValue ? { query: searchValue } : {},
			replace: true,
		});
	};

	const resetSearch = () => {
		setSearchValue("");
		navigate({ to: "/lists", replace: true });
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
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
				{/*
					Show no lists found message if lists is empty, and query if search is not empty
				*/}
				{lists.length === 0 ? (
					searchValue ? (
						<div>No lists found for "{searchValue}".</div>
					) : (
						<div>No lists available.</div>
					)
				) : (
					lists.map((list) => (
						<ListCard key={list.slug} list={list} />
					))
				)}
			</div>
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
