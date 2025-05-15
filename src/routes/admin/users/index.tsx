import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useAdminUsers } from "@/queries/admin/use-user";
import { Link, createFileRoute } from "@tanstack/react-router";
import { format, parseISO } from "date-fns";

export const Route = createFileRoute("/admin/users/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data: users } = useAdminUsers();

	return (
		<div className="container mx-auto p-4 gap-4">
			<h1 className="text-2xl font-bold">Users</h1>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="font-bold">Username</TableHead>
						<TableHead className="font-bold">Verified</TableHead>
						<TableHead className="font-bold">Admin</TableHead>
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
										user.verified ? "secondary" : "outline"
									}
								>
									{user.verified ? "Verified" : "Unverified"}
								</Badge>
							</TableCell>
							<TableCell>
								<Badge
									variant={
										user.admin ? "secondary" : "outline"
									}
								>
									{user.admin ? "Admin" : "User"}
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
