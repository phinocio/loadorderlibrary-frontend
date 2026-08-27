import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Construction } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/(app)/compare")({
	head: () => ({
		meta: [{ title: "Compare - Load Order Library" }],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="min-h-screen">
			<div className="container mx-auto px-4 py-8 max-w-4xl">
				{/* Main Card */}
				<Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
					<CardHeader className="text-center pb-8">
						<div className="mx-auto mb-6 size-20 rounded-full bg-linear-to-br from-primary/20 to-tertiary/20 flex items-center justify-center">
							<Construction className="h-10 w-10 text-primary" />
						</div>
						<CardTitle className="text-4xl font-bold bg-linear-to-r from-primary to-tertiary bg-clip-text text-transparent">
							List Comparison
						</CardTitle>
						<CardDescription className="text-lg mt-2 max-w-2xl mx-auto">
							Compare mod lists side-by-side to see differences
							and similarities
						</CardDescription>
						<Badge
							variant="outline"
							className="mx-auto mt-4 text-sm px-4 py-1"
						>
							<Clock className="h-3 w-3 mr-1" />
							Coming Soon
						</Badge>
					</CardHeader>

					<CardContent className="space-y-8">
						{/* Status Message */}
						<div className="bg-linear-to-r from-muted/50 to-muted/30 rounded-lg p-6 text-center">
							<h3 className="text-xl font-semibold mb-3">
								Why isn't this ready yet?
							</h3>
							<p className="text-muted-foreground leading-relaxed">
								I am lazy :3
							</p>
							<p>
								Check out this neat site using the Load Order
								Library API for comparisons: created by fr0:{" "}
								<a
									href="https://loadordercompare.com/"
									className="block text-primary hover:underline text-xl"
									target="_blank"
									rel="noopener noreferrer"
								>
									Load Order Compare
								</a>
							</p>
						</div>

						{/* Timeline */}
						<div className="bg-linear-to-r from-secondary/10 to-tertiary/10 rounded-lg p-6">
							<h3 className="text-xl font-semibold mb-4 text-center">
								Timeline
							</h3>
							<div className="text-center space-y-2">
								<p className="text-sm text-muted-foreground">
									Who knows?
								</p>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="flex flex-col sm:flex-row gap-3 pt-4">
							<Button asChild className="flex-1">
								<Link to="/lists">Browse Lists</Link>
							</Button>
							<Button
								variant="outline"
								asChild
								className="flex-1"
							>
								<Link to="/upload">Upload Your List</Link>
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
