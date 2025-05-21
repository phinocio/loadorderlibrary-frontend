import { ListCard } from "@/components/lists/list-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser, userQueryOptions } from "@/queries/use-user";
import { createFileRoute } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import {
	CircleDollarSign,
	Coffee,
	ExternalLinkIcon,
	GlobeIcon,
	MessageCircle,
} from "lucide-react";

export const Route = createFileRoute("/(app)/users/$name")({
	loader: ({ context, params }) => {
		context.queryClient.prefetchQuery(userQueryOptions(params.name));
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { name } = Route.useParams();
	const { data: user } = useUser(name);

	const initials = user.name.slice(0, 2).toUpperCase();

	return (
		<div className="container mx-auto py-6 space-y-8">
			<Card className="overflow-hidden">
				<div className="bg-gradient-to-r from-primary/20 to-secondary/20 h-32" />
				<CardHeader className="relative pt-0">
					<div className="-mt-12 flex items-end space-x-4">
						<Avatar className="size-24 border-4 border-background">
							<AvatarFallback className="rounded-full bg-primary text-primary-foreground font-bold text-4xl">
								{initials}
							</AvatarFallback>
						</Avatar>
						<div>
							<CardTitle className="text-2xl font-bold flex items-center gap-2">
								{name}
								{user.verified && (
									<Badge
										variant="outline"
										className="ml-2 border-blue-500 text-blue-500"
									>
										Verified
									</Badge>
								)}
							</CardTitle>
							<div className="text-muted-foreground text-sm">
								Member since{" "}
								{formatDistanceToNow(new Date(user.created), {
									addSuffix: true,
								})}
							</div>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					{user.profile?.bio && (
						<div className="space-y-2">
							<h3 className="font-semibold text-lg">About</h3>
							<p className="text-muted-foreground">
								{user.profile.bio}
							</p>
						</div>
					)}

					{(user.profile?.website ||
						user.profile?.discord ||
						user.profile?.patreon ||
						user.profile?.kofi) && (
						<div className="space-y-2">
							<h3 className="font-semibold text-lg">Links</h3>
							<div className="flex flex-wrap gap-3">
								{user.profile?.website && (
									<a
										href={user.profile.website}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-1 text-primary hover:underline"
									>
										<GlobeIcon className="size-4" />
										Website
										<ExternalLinkIcon className="size-3" />
									</a>
								)}
								{user.profile?.discord && (
									<a
										href={user.profile.discord}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-1 text-primary hover:underline"
									>
										<MessageCircle className="size-4" />
										Discord
										<ExternalLinkIcon className="size-3" />
									</a>
								)}
								{user.profile?.patreon && (
									<a
										href={user.profile.patreon}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-1 text-primary hover:underline"
									>
										<CircleDollarSign className="size-4" />
										Patreon
										<ExternalLinkIcon className="size-3" />
									</a>
								)}
								{user.profile?.kofi && (
									<a
										href={user.profile.kofi}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center gap-1 text-primary hover:underline"
									>
										<Coffee className="size-4" />
										Ko-fi
										<ExternalLinkIcon className="size-3" />
									</a>
								)}
							</div>
						</div>
					)}
				</CardContent>
			</Card>

			{user.lists && user.lists.length > 0 ? (
				<div>
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-2xl font-bold flex items-center gap-2">
							Lists
							<Badge variant="secondary" className="ml-2">
								{user.lists.length}{" "}
								{user.lists.length === 1 ? "list" : "lists"}
							</Badge>
						</h2>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{user.lists.map((list) => (
							<ListCard key={list.slug} list={list} />
						))}
					</div>
				</div>
			) : (
				<Card className="bg-muted/40">
					<CardContent className="py-8 text-center">
						<p className="text-muted-foreground">
							This user hasn't published any lists yet
						</p>
					</CardContent>
				</Card>
			)}
		</div>
	);
}
