import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { adminUsersListQueryOptions } from "@/hooks/queries/use-admin-user";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { format, parseISO } from "date-fns";

export const Route = createFileRoute("/admin/users/")({
	loader: async ({ context }) =>
		await context.queryClient.ensureQueryData(adminUsersListQueryOptions),
	component: RouteComponent,
});

function RouteComponent() {
	const { data: users } = useSuspenseQuery(adminUsersListQueryOptions);

	return (
		<div className="flex h-full w-full flex-col gap-4 p-4">
			<h1 className="text-2xl font-bold">Users</h1>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="font-bold">Username</TableHead>
						<TableHead className="font-bold">Verified</TableHead>
						<TableHead className="font-bold">
							Created Date
						</TableHead>
						<TableHead className="font-bold">
							Updated Date
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.map((user) => (
						<TableRow key={user.name}>
							<TableCell>
								<Link
									to="/admin/users/$name"
									params={{ name: user.name }}
									className="text-primary hover:underline"
								>
									<p className="font-bold">{user.name}</p>
								</Link>
							</TableCell>
							<TableCell>
								<Badge
									variant={
										user.verified
											? "default"
											: "destructive"
									}
								>
									{user.verified ? "Yes" : "No"}
								</Badge>
							</TableCell>
							<TableCell>
								{format(parseISO(user.created), "PPpp")}
							</TableCell>
							<TableCell>
								{format(parseISO(user.updated), "PPpp")}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
