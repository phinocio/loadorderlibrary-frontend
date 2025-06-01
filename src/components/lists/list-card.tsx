import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import type { List } from "@/types/list";
import { Link } from "@tanstack/react-router";
import { formatDistanceToNow, parseISO } from "date-fns";
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
							{list.version}
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
				<div className="space-y-2 w-full text-xs text-muted-foreground">
					<div className="flex items-center gap-1">
						<Clock className="h-3 w-3" />
						<Tooltip>
							<TooltipTrigger>
								Updated{" "}
								{formatDistanceToNow(parseISO(list.updated), {
									addSuffix: true,
								})}
							</TooltipTrigger>
							<TooltipContent>
								{new Date(list.updated).toLocaleString()}
							</TooltipContent>
						</Tooltip>
					</div>
					<div className="flex items-center gap-1">
						<Clock className="h-3 w-3" />
						<Tooltip>
							<TooltipTrigger>
								Created{" "}
								{formatDistanceToNow(parseISO(list.created), {
									addSuffix: true,
								})}
							</TooltipTrigger>
							<TooltipContent>
								{new Date(list.created).toLocaleString()}
							</TooltipContent>
						</Tooltip>
					</div>
					{list.expires && (
						<div className="flex items-center gap-1 ">
							<Clock className="h-3 w-3" />
							<Tooltip>
								<TooltipTrigger>
									Expires{" "}
									{formatDistanceToNow(
										parseISO(list.expires),
										{
											addSuffix: true,
										},
									)}
								</TooltipTrigger>
								<TooltipContent>
									{new Date(list.expires).toLocaleString()}
								</TooltipContent>
							</Tooltip>
						</div>
					)}
				</div>
			</CardFooter>
		</Card>
	);
}
