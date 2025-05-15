import { ListCard } from "@/components/lists/list-card";
import { BasicInfoForm } from "@/components/profile/basic-info-form";
import { ProfileInformationForm } from "@/components/profile/profile-information-form";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useCurrentUser } from "@/queries/use-auth";
import { useDeleteUser } from "@/queries/use-user";
import type { List } from "@/types/list";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/(app)/_authenticated/profile")({
	component: RouteComponent,
});

const lists: List[] = [];

function RouteComponent() {
	const { data: currentUser } = useCurrentUser();
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const { deleteUser, isDeletingUser, deleteUserError } = useDeleteUser();

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
						<div className="grid grid-cols-1 gap-6 lg:grid-cols-[repeat(2,1fr)] xl:grid-cols-[repeat(3,1fr)]">
							{lists.length > 0 ? (
								lists.map((list) => (
									<ListCard key={list.slug} list={list} />
								))
							) : (
								<p className="text-sm text-muted-foreground">
									No lists found.
								</p>
							)}
						</div>
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
		</div>
	);
}
