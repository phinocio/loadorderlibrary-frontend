import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import type { List } from "@/types/list";
import { Link } from "@tanstack/react-router";
import { CheckCircleIcon, Clock } from "lucide-react";

interface ListCardProps {
	list: List;
}

export function ListCard({ list }: ListCardProps) {
	return (
		<Card className="group hover:shadow-md transition-all flex flex-col h-full">
			<CardHeader className="border-b pb-3">
				<div className="flex items-start justify-between">
					<CardTitle className="text-xl font-bold line-clamp-1 text-primary">
						<Link
							to="/lists/$slug"
							params={{ slug: list.slug }}
							className="hover:underline"
						>
							{list.name}
						</Link>
					</CardTitle>
					{list.version && (
						<Badge
							variant="outline"
							className="ml-2 border-secondary text-secondary"
						>
							v{list.version}
						</Badge>
					)}
				</div>
				<CardDescription className="text-base">
					<div className="flex items-center justify-between mt-2">
						<span className="text-secondary font-bold">
							<Link
								to="/games/$slug"
								params={{ slug: list.game.slug }}
								className="hover:underline"
							>
								{list.game.name}
							</Link>
						</span>
						<span className="text-sm flex items-center gap-1">
							by{" "}
							<span className="text-primary font-bold inline-flex items-center gap-1">
								{list.author?.name ? (
									<Link
										to="/users/$name"
										params={{ name: list.author.name }}
										className="hover:underline"
									>
										{list.author.name}
									</Link>
								) : (
									<span>Anonymous</span>
								)}
								{list.author?.verified && (
									<CheckCircleIcon className="h-3.5 w-3.5 text-secondary" />
								)}
							</span>
						</span>
					</div>
				</CardDescription>
			</CardHeader>
			<CardContent className="flex-grow items-center flex">
				<p className="line-clamp-2 text-sm">
					{list.description || "No description provided"}
				</p>
			</CardContent>
			<CardFooter className="border-t pt-3">
				<div className="grid w-full grid-cols-2 gap-2 text-xs text-muted-foreground">
					<div className="space-y-1">
						<div className="flex items-center gap-1">
							<Clock className="h-3 w-3" />
							<span>
								Updated{" "}
								{new Date(list.updated).toLocaleDateString()}
							</span>
						</div>
						<div className="flex items-center gap-1">
							<Clock className="h-3 w-3" />
							<span>
								Created{" "}
								{new Date(list.created).toLocaleDateString()}
							</span>
						</div>
					</div>
					{list.expires && (
						<div className="flex items-center gap-1 justify-end">
							<Clock className="h-3 w-3" />
							<span>
								Expires{" "}
								{new Date(list.expires).toLocaleDateString()}
							</span>
						</div>
					)}
				</div>
			</CardFooter>
		</Card>
	);
}
