import { ListCard } from "@/components/lists/list-card";
import { ListSkeleton } from "@/components/skeletons/list-skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useListsWithLoading } from "@/queries/use-list";
import { Link, createFileRoute } from "@tanstack/react-router";
import { FileText, Heart, Upload } from "lucide-react";

export const Route = createFileRoute("/(app)/")({
	component: HomePage,
});

const pageSize = 6;

function HomePage() {
	const { data: listsData, isLoading } = useListsWithLoading({ pageSize });

	return (
		<div className="space-y-6 container mx-auto">
			{/* Hero Section */}
			<div className="text-center space-y-6 py-12">
				<div className="space-y-4">
					<h1 className="text-4xl md:text-5xl font-bold text-primary">
						Load Order Library
					</h1>
					<p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
						Share mod lists of - primarily Bethesda - games with
						other players
					</p>
				</div>

				<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
					<Button asChild size="lg" className="gap-2">
						<Link to="/upload">
							<Upload className="h-5 w-5" />
							Upload Your List
						</Link>
					</Button>
					<Button
						asChild
						variant="outline"
						size="lg"
						className="gap-2"
					>
						<Link to="/lists">
							<FileText className="h-5 w-5" />
							Browse Lists
						</Link>
					</Button>

					<Button
						asChild
						variant="outline"
						size="lg"
						className="gap-2"
					>
						<Link to="/lists">
							<Heart className="h-5 w-5" />
							Support the Site
						</Link>
					</Button>
				</div>
			</div>

			{/* Description Section */}
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">
						What is Load Order Library?
					</CardTitle>
				</CardHeader>
				<CardContent className="prose prose-lg max-w-none">
					<p className="text-muted-foreground leading-relaxed">
						Load Order Library is a website/tool to share mod lists
						of - primarily Bethesda - games with other players.
						Intended mostly for troubleshooting purposes, the site
						can be quite useful for YouTubers to have mod lists for
						each of their let's play characters, modlist authors to
						share the list of mods with others, and many other uses.
					</p>
				</CardContent>
			</Card>

			{/* Recent Lists Section */}
			<>
				<h2 className="text-3xl font-bold">Recent Lists</h2>
				{isLoading ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{Array.from({ length: pageSize }).map((_, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: skeleton items don't need stable keys
							<ListSkeleton key={index} />
						))}
					</div>
				) : listsData && listsData.data.length > 0 ? (
					<>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
							{listsData.data.map((list) => (
								<ListCard key={list.slug} list={list} />
							))}
						</div>
						<div className="mt-6 text-center">
							<Button asChild variant="outline">
								<Link to="/lists">View All Lists</Link>
							</Button>
						</div>
					</>
				) : (
					<div className="text-center py-8 text-muted-foreground">
						No lists available yet. Why not{" "}
						<Link
							to="/upload"
							className="hover:underline text-primary font-bold"
						>
							create one
						</Link>
						?
					</div>
				)}
			</>
		</div>
	);
}
