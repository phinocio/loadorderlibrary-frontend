import { ShareDialog } from "@/components/lists/share-dialog";
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
import { Link } from "@tanstack/react-router";
import { CheckCircleIcon, Download, Share2 } from "lucide-react";
import { useState } from "react";

interface ListHeaderProps {
	list: List;
}

export function ListHeader({ list }: ListHeaderProps) {
	const [shareDialogOpen, setShareDialogOpen] = useState(false);
	const downloadLink = `${import.meta.env.VITE_API_BASE_URL}/${import.meta.env.VITE_API_VERSION}/lists/${list.slug}/download`;

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
									{list.version}
								</Badge>
							)}
							{list.private && (
								<Badge variant="secondary">Private</Badge>
							)}
						</div>

						<div className="flex items-center gap-2 text-muted-foreground">
							<Link
								to="/games/$slug"
								params={{ slug: list.game.slug }}
								className="font-bold text-secondary"
							>
								{list.game.name}
							</Link>
						</div>

						<div className="flex items-center gap-1 text-muted-foreground">
							<span>by </span>
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
						</div>
					</div>

					<CardAction>
						<div className="flex flex-wrap gap-2">
							<form action={downloadLink}>
								<Button
									variant="outline"
									className="gap-2"
									size="sm"
								>
									<Download className="h-4 w-4" />
									Download Files
								</Button>
							</form>
							<Button
								variant="outline"
								className="gap-2"
								size="sm"
								onClick={() => setShareDialogOpen(true)}
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

			<ShareDialog
				open={shareDialogOpen}
				onOpenChange={setShareDialogOpen}
				list={list}
				files={list.files}
			/>
		</Card>
	);
}
