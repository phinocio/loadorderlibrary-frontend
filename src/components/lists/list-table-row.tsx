import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import type { List } from "@/types/list";
import { Link, useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import { CheckCircleIcon, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

type ListTableRowProps = {
	list: List;
	showAuthor?: boolean;
	showEdit?: boolean;
	deleteListFunction?: (slug: string) => void;
	isDeletingList?: boolean;
};

export function ListTableRow({
	list,
	showAuthor = false,
	showEdit = true,
	deleteListFunction,
	isDeletingList = false,
}: ListTableRowProps) {
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const navigate = useNavigate();

	const handleEditList = () => {
		navigate({
			to: "/lists/$slug/edit",
			params: {
				slug: list.slug,
			},
		});
	};

	const handleDeleteList = () => {
		setIsDeleteDialogOpen(true);
	};

	const confirmDeleteList = () => {
		if (deleteListFunction) {
			deleteListFunction(list.slug);
		}
		setIsDeleteDialogOpen(false);
	};

	return (
		<>
			<TableRow>
				<TableCell>
					<div className="py-2 space-y-1">
						<Link
							to="/lists/$slug"
							params={{
								slug: list.slug,
							}}
							className="font-medium text-primary hover:underline"
						>
							{list.name}
						</Link>
						{list.description && (
							<p className="text-sm text-muted-foreground line-clamp-1">
								{list.description.length > 50
									? `${list.description.slice(0, 50)}...`
									: list.description}
							</p>
						)}
					</div>
				</TableCell>
				{showAuthor && (
					<TableCell>
						<div className="flex items-center gap-1">
							{list.author?.name ? (
								<Link
									to="/users/$name"
									params={{ name: list.author.name }}
									className="text-primary hover:underline font-medium inline-flex items-center gap-1"
								>
									{list.author.name}
									{list.author.verified && (
										<CheckCircleIcon className="h-3.5 w-3.5 text-secondary" />
									)}
								</Link>
							) : (
								<span className="text-muted-foreground text-sm">
									Anonymous
								</span>
							)}
						</div>
					</TableCell>
				)}
				<TableCell>
					<Link
						to="/games/$slug"
						params={{
							slug: list.game.slug,
						}}
						className="text-secondary hover:underline font-medium"
					>
						{list.game.name}
					</Link>
				</TableCell>
				<TableCell>
					{list.version ? (
						<Badge
							variant="outline"
							className="border-secondary text-secondary"
						>
							v{list.version}
						</Badge>
					) : (
						<span className="text-muted-foreground text-sm">—</span>
					)}
				</TableCell>
				<TableCell>
					<div className="flex items-center gap-1 text-sm text-muted-foreground">
						{format(new Date(list.created), "MMM d, yyyy")}
					</div>
				</TableCell>
				<TableCell>
					<div className="flex items-center gap-1 text-sm text-muted-foreground">
						{format(new Date(list.updated), "MMM d, yyyy")}
					</div>
				</TableCell>
				<TableCell>
					<div className="flex items-center gap-2">
						{list.private && (
							<Badge variant="secondary" className="text-xs">
								Private
							</Badge>
						)}
						{list.expires &&
							new Date(list.expires) < new Date() && (
								<Badge
									variant="destructive"
									className="text-xs"
								>
									Expired
								</Badge>
							)}
						{list.expires &&
							new Date(list.expires) > new Date() && (
								<Badge variant="outline" className="text-xs">
									Expires{" "}
									{format(new Date(list.expires), "MMM d")}
								</Badge>
							)}
						{!list.private && !list.expires && (
							<Badge
								variant="outline"
								className="text-xs text-green-600 border-green-600"
							>
								Public
							</Badge>
						)}
					</div>
				</TableCell>
				<TableCell className="text-right align-middle">
					<div className="inline-flex space-x-3">
						{showEdit && (
							<Button
								variant="ghost"
								size="icon"
								className="size-5 text-secondary hover:text-secondary cursor-pointer"
								onClick={handleEditList}
							>
								<Edit className="size-5" />
								<span className="sr-only">Edit list</span>
							</Button>
						)}
						{deleteListFunction && (
							<Button
								variant="ghost"
								size="icon"
								className="size-5 text-destructive hover:text-destructive cursor-pointer"
								onClick={handleDeleteList}
								disabled={isDeletingList}
							>
								<Trash2 className="size-5" />
								<span className="sr-only">Delete list</span>
							</Button>
						)}
					</div>
				</TableCell>
			</TableRow>

			<ConfirmDialog
				open={isDeleteDialogOpen}
				onOpenChange={setIsDeleteDialogOpen}
				title={`Delete ${list.name}`}
				description="Are you sure you want to delete this list? This action cannot be undone."
				onConfirm={confirmDeleteList}
				confirmText="Delete List"
				variant="destructive"
				isLoading={isDeletingList}
			/>
		</>
	);
}
