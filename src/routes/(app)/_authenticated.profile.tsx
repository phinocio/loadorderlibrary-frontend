import { BasicInfoForm } from "@/components/profile/basic-info-form";
import { ProfileInformationForm } from "@/components/profile/profile-information-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { currentUserQueryOptions, useCurrentUser } from "@/queries/use-auth";
import { useDeleteList } from "@/queries/use-list";
import { useDeleteUser } from "@/queries/use-user";
import { Link, createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
import { Clock, Edit, Trash2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/(app)/_authenticated/profile")({
	loader: ({ context }) =>
		context.queryClient.ensureQueryData(currentUserQueryOptions),
	component: RouteComponent,
});

function RouteComponent() {
	const { data: currentUser } = useCurrentUser();
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [isDeleteListDialogOpen, setIsDeleteListDialogOpen] = useState(false);
	const [listToDelete, setListToDelete] = useState<string | null>(null);
	const { deleteUser, isDeletingUser, deleteUserError } = useDeleteUser();
	const { deleteList, isDeletingList } = useDeleteList();

	const handleEditList = (slug: string) => {
		// TODO: Implement edit functionality - navigate to edit page or open edit modal
		console.log("Edit list:", slug);
	};

	const handleDeleteList = (slug: string) => {
		setListToDelete(slug);
		setIsDeleteListDialogOpen(true);
	};

	const confirmDeleteList = () => {
		if (listToDelete) {
			deleteList(listToDelete);
			setListToDelete(null);
			setIsDeleteListDialogOpen(false);
		}
	};

	if (!currentUser) {
		return <p>Loading...</p>;
	}

	return (
		<div className="w-full mx-auto container">
			<div className="flex flex-col gap-8">
				{/* Forms Section */}
				<div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
					{/* Basic Info Section */}
					<div className="w-full space-y-6">
						<div className="space-y-2">
							<h2 className="text-2xl font-semibold tracking-tight">
								Basic Info
							</h2>
							<p className="text-sm text-muted-foreground">
								Update your basic account information.
							</p>
						</div>
						<BasicInfoForm currentUser={currentUser} />
					</div>

					{/* Profile Information Section */}
					<div className="w-full space-y-6">
						<div className="space-y-2">
							<h2 className="text-2xl font-semibold tracking-tight">
								Profile Information
							</h2>
							<p className="text-sm text-muted-foreground">
								Customize your profile details.
							</p>
						</div>
						<ProfileInformationForm currentUser={currentUser} />
					</div>
				</div>

				{/* Lists Section */}
				<div className="w-full">
					<div className="space-y-6">
						<div className="space-y-2">
							<h2 className="text-2xl font-semibold tracking-tight">
								Your Lists
							</h2>
							<p className="text-sm text-muted-foreground">
								Browse and manage your created load orders.
							</p>
						</div>

						{!currentUser.lists ||
						currentUser.lists.length === 0 ? (
							<p className="text-sm text-muted-foreground">
								No lists found.{" "}
								<Link
									to="/upload"
									className="text-primary hover:underline"
								>
									Create one
								</Link>{" "}
								to get started.
							</p>
						) : (
							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<h3 className="text-lg font-medium">
										{currentUser.lists.length}{" "}
										{currentUser.lists.length === 1
											? "List"
											: "Lists"}
									</h3>
								</div>

								<Card>
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead className="font-semibold">
													Name
												</TableHead>
												<TableHead className="font-semibold">
													Game
												</TableHead>
												<TableHead className="font-semibold">
													Version
												</TableHead>
												<TableHead className="font-semibold">
													Created
												</TableHead>
												<TableHead className="font-semibold">
													Updated
												</TableHead>
												<TableHead className="font-semibold">
													Status
												</TableHead>
												<TableHead className="font-semibold w-32">
													Actions
												</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{currentUser.lists.map((list) => (
												<TableRow
													key={list.slug}
													className="hover:bg-muted/50"
												>
													<TableCell>
														<div className="space-y-1">
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
																	{
																		list.description
																	}
																</p>
															)}
														</div>
													</TableCell>
													<TableCell>
														<Link
															to="/games/$slug"
															params={{
																slug: list.game
																	.slug,
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
															<span className="text-muted-foreground text-sm">
																—
															</span>
														)}
													</TableCell>
													<TableCell>
														<div className="flex items-center gap-1 text-sm text-muted-foreground">
															<Clock className="h-3 w-3" />
															{format(
																new Date(
																	list.created,
																),
																"MMM d, yyyy",
															)}
														</div>
													</TableCell>
													<TableCell>
														<div className="flex items-center gap-1 text-sm text-muted-foreground">
															<Clock className="h-3 w-3" />
															{format(
																new Date(
																	list.updated,
																),
																"MMM d, yyyy",
															)}
														</div>
													</TableCell>
													<TableCell>
														<div className="flex items-center gap-2">
															{list.private && (
																<Badge
																	variant="secondary"
																	className="text-xs"
																>
																	Private
																</Badge>
															)}
															{list.expires &&
																new Date(
																	list.expires,
																) <
																	new Date() && (
																	<Badge
																		variant="destructive"
																		className="text-xs"
																	>
																		Expired
																	</Badge>
																)}
															{list.expires &&
																new Date(
																	list.expires,
																) >
																	new Date() && (
																	<Badge
																		variant="outline"
																		className="text-xs"
																	>
																		Expires{" "}
																		{format(
																			new Date(
																				list.expires,
																			),
																			"MMM d",
																		)}
																	</Badge>
																)}
															{!list.private &&
																!list.expires && (
																	<Badge
																		variant="outline"
																		className="text-xs text-green-600 border-green-600"
																	>
																		Public
																	</Badge>
																)}
														</div>
													</TableCell>
													<TableCell>
														<div className="flex items-center gap-1">
															<Button
																variant="ghost"
																size="icon"
																className="h-8 w-8"
																onClick={() =>
																	handleEditList(
																		list.slug,
																	)
																}
															>
																<Edit className="h-4 w-4" />
																<span className="sr-only">
																	Edit list
																</span>
															</Button>
															<Button
																variant="ghost"
																size="icon"
																className="h-8 w-8 text-destructive hover:text-destructive"
																onClick={() =>
																	handleDeleteList(
																		list.slug,
																	)
																}
															>
																<Trash2 className="h-4 w-4" />
																<span className="sr-only">
																	Delete list
																</span>
															</Button>
														</div>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</Card>
							</div>
						)}
					</div>
				</div>

				{/* Danger Zone */}
				<div className="w-full">
					<div className="space-y-6">
						<div className="space-y-2">
							<h2 className="text-2xl font-semibold tracking-tight text-destructive">
								Danger Zone
							</h2>
							<p className="text-sm text-muted-foreground">
								Destructive actions that cannot be undone.
							</p>
						</div>
						<Card className="border-destructive">
							<CardHeader className="border-b border-destructive">
								<CardTitle className="text-xl text-destructive">
									Delete Account
								</CardTitle>
								<CardDescription>
									Permanently delete your account and all
									associated data
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center justify-between py-3">
									<div>
										<h3 className="font-medium">
											Delete Your Account
										</h3>
										<p className="text-sm text-muted-foreground">
											This will permanently delete your
											account and all your data
										</p>
									</div>
									<Button
										variant="destructive"
										onClick={() =>
											setIsDeleteDialogOpen(true)
										}
										disabled={isDeletingUser}
									>
										Delete Account
									</Button>
								</div>
								{deleteUserError && (
									<p className="text-sm text-destructive">
										{deleteUserError.message}
									</p>
								)}
							</CardContent>
						</Card>
					</div>
				</div>
			</div>

			<ConfirmDialog
				open={isDeleteDialogOpen}
				onOpenChange={setIsDeleteDialogOpen}
				title="Delete Your Account"
				description="Are you sure you want to delete your account? This action cannot be undone and will permanently delete all your data, including your load orders and profile information."
				onConfirm={() => deleteUser(currentUser.name)}
				confirmText="Delete Account"
				variant="destructive"
				isLoading={isDeletingUser}
			/>

			<ConfirmDialog
				open={isDeleteListDialogOpen}
				onOpenChange={setIsDeleteListDialogOpen}
				title="Delete List"
				description="Are you sure you want to delete this list? This action cannot be undone."
				onConfirm={confirmDeleteList}
				confirmText="Delete List"
				variant="destructive"
				isLoading={isDeletingList}
			/>
		</div>
	);
}
