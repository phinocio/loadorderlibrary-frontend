import { Card } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { List } from "@/types/list";
import { Link } from "@tanstack/react-router";
import { Upload } from "lucide-react";
import { ListTableRow } from "./list-table-row";

type ListTableProps = {
	lists: List[];
	showAuthor?: boolean;
	showEdit?: boolean;
	deleteListFunction?: (slug: string) => void;
	isDeletingList?: boolean;
};

export function ListTable({
	lists,
	showAuthor = false,
	showEdit = true,
	deleteListFunction,
	isDeletingList = false,
}: ListTableProps) {
	return (
		<Card className="px-4 py-2">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="font-semibold">Name</TableHead>
						<TableHead className="font-semibold">Game</TableHead>
						<TableHead className="font-semibold">Version</TableHead>
						<TableHead className="font-semibold">Created</TableHead>
						<TableHead className="font-semibold">Updated</TableHead>
						<TableHead className="font-semibold">Status</TableHead>
						<TableHead className="font-semibold text-right">
							Actions
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{lists.length > 0 ? (
						lists.map((list, index) => (
							<ListTableRow
								key={`${list.slug}-${index}`}
								list={list}
								showAuthor={showAuthor}
								showEdit={showEdit}
								deleteListFunction={deleteListFunction}
								isDeletingList={isDeletingList}
							/>
						))
					) : (
						<TableRow>
							<TableCell colSpan={7} className="h-64">
								<div className="flex flex-col items-center justify-center space-y-4 text-center py-8">
									<div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
										<Upload className="w-8 h-8 text-muted-foreground" />
									</div>
									<div className="space-y-2">
										<h3 className="text-lg font-semibold text-foreground">
											No lists found
										</h3>
										<p className="text-sm text-muted-foreground max-w-sm">
											You haven't created any mod lists
											yet. Get started by uploading your
											first list.
										</p>
									</div>
									<Link
										to="/upload"
										className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium"
									>
										<Upload className="w-4 h-4" />
										Create Your First List
									</Link>
								</div>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</Card>
	);
}
