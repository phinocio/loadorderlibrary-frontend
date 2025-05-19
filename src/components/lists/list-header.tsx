import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { List } from "@/types/list";
import { CheckCircleIcon, Download, Share2 } from "lucide-react";

interface ListHeaderProps {
	list: List;
}

export function ListHeader({ list }: ListHeaderProps) {
	return (
		<Card>
			<CardHeader>
				<div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
					<div className="space-y-2">
						<div className="flex items-center gap-2 flex-wrap">
							<CardTitle className="text-3xl font-bold text-primary">
								{list.name}
							</CardTitle>
							{list.version && (
								<Badge
									variant="outline"
									className="border-secondary text-secondary"
								>
									v{list.version}
								</Badge>
							)}
							{list.private && (
								<Badge variant="secondary">Private</Badge>
							)}
						</div>

						<div className="flex items-center gap-2 text-muted-foreground">
							<span className="font-medium text-secondary">
								{list.game.name}
							</span>
						</div>

						<div className="flex items-center gap-1 text-muted-foreground">
							<span>by </span>
							<span className="text-primary font-medium inline-flex items-center gap-1">
								{list.author?.name || "Anonymous"}
								{list.author?.verified && (
									<CheckCircleIcon className="h-4 w-4 text-secondary" />
								)}
							</span>
						</div>
					</div>

					<CardAction>
						<div className="flex flex-wrap gap-2">
							<Button
								variant="outline"
								className="gap-2"
								size="sm"
							>
								<Download className="h-4 w-4" />
								Download
							</Button>
							<Button
								variant="outline"
								className="gap-2"
								size="sm"
							>
								<Share2 className="h-4 w-4" />
								Share
							</Button>
						</div>
					</CardAction>
				</div>
			</CardHeader>

			<Separator className="my-1" />

			<CardContent>
				<div className="text-muted-foreground">
					{list.description || "No description provided."}
				</div>
			</CardContent>
		</Card>
	);
}
