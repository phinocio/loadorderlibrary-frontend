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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	adminUserListQueryOptions,
	useAdminUser,
} from "@/hooks/queries/use-admin-user";
import {
	AdminUserUpdateParamsScheme,
	AdminUserUpdatePasswordParamsSchema,
} from "@/schemas/admin-user-schemas";
import type {
	AdminUserUpdateParams,
	AdminUserUpdatePasswordParams,
} from "@/types/admin-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/admin/users/$name")({
	loader: async ({ context, params }) => {
		await context.queryClient.ensureQueryData(
			adminUserListQueryOptions(params.name),
		);
	},
	component: UserComponent,
});

function UserComponent() {
	const { name } = Route.useParams();
	const navigate = useNavigate();
	const { data: user } = useSuspenseQuery(adminUserListQueryOptions(name));
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const {
		updateUser,
		verifyUser,
		updateUserPassword,
		deleteUser,
		isUpdatingUser,
		isVerifyingUser,
		isUpdatingPassword,
		isDeletingUser,
		updateUserError,
		verifyUserError,
		updateUserPasswordError,
		deleteUserError,
	} = useAdminUser(name);

	const {
		register: registerUser,
		handleSubmit: handleUserSubmit,
		formState: { errors: userErrors },
	} = useForm<AdminUserUpdateParams>({
		resolver: zodResolver(AdminUserUpdateParamsScheme),
		defaultValues: {
			email: "",
		},
	});

	const {
		register: registerPassword,
		handleSubmit: handlePasswordSubmit,
		formState: { errors: passwordErrors },
	} = useForm<AdminUserUpdatePasswordParams>({
		resolver: zodResolver(AdminUserUpdatePasswordParamsSchema),
	});

	const onUserSubmit = handleUserSubmit((data) => {
		updateUser(data);
	});

	const onPasswordSubmit = handlePasswordSubmit((data) => {
		updateUserPassword(data);
	});

	const handleVerificationToggle = () => {
		verifyUser(!user.verified);
	};

	const handleDeleteUser = async () => {
		await deleteUser();
		navigate({ to: "/admin/users" });
	};

	return (
		<div className="container mx-auto py-6 space-y-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<h1 className="text-3xl font-bold tracking-tight">
						{user.name}
					</h1>
					<div className="flex items-center gap-2">
						<Badge
							variant={user.verified ? "secondary" : "outline"}
							className="text-sm py-1"
						>
							{user.verified ? "Verified" : "Unverified"}
						</Badge>
						<Button
							onClick={handleVerificationToggle}
							disabled={isVerifyingUser}
							variant="ghost"
							className="text-sm hover:text-muted-foreground"
						>
							{user.verified ? "Revoke" : "Verify"}
						</Button>
					</div>
					{verifyUserError && (
						<p className="text-sm text-destructive ml-2">
							{verifyUserError.message}
						</p>
					)}
				</div>
				<div className="flex flex-col gap-2 text-sm text-muted-foreground">
					<p>Created: {format(parseISO(user.created), "PPpp")}</p>
					<p>
						Last Updated: {format(parseISO(user.updated), "PPpp")}
					</p>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Card>
					<CardHeader className="border-b">
						<CardTitle className="text-xl">
							Email Management
						</CardTitle>
						<CardDescription>
							Update the user's email address
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<form onSubmit={onUserSubmit} className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="Enter user's email"
									{...registerUser("email")}
								/>
								{userErrors.email && (
									<p className="text-sm text-destructive">
										{userErrors.email.message}
									</p>
								)}
							</div>

							<Button
								type="submit"
								variant="tertiary"
								disabled={isUpdatingUser}
							>
								Update Email
							</Button>

							{updateUserError && (
								<p className="text-sm text-destructive">
									{updateUserError.message}
								</p>
							)}
						</form>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="border-b">
						<CardTitle className="text-xl">
							Reset Password
						</CardTitle>
						<CardDescription>
							Set a new password for the user
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<form onSubmit={onPasswordSubmit} className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="password">New Password</Label>
								<Input
									id="password"
									type="password"
									placeholder="Enter new password"
									{...registerPassword("password")}
									autoComplete="new-password"
								/>
								{passwordErrors.password && (
									<p className="text-sm text-destructive">
										{passwordErrors.password.message}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label htmlFor="password_confirmation">
									Confirm Password
								</Label>
								<Input
									id="password_confirmation"
									type="password"
									placeholder="Confirm new password"
									{...registerPassword(
										"password_confirmation",
									)}
									autoComplete="new-password"
								/>
								{passwordErrors.password_confirmation && (
									<p className="text-sm text-destructive">
										{
											passwordErrors.password_confirmation
												.message
										}
									</p>
								)}
							</div>

							<Button
								type="submit"
								variant="tertiary"
								disabled={isUpdatingPassword}
							>
								Reset Password
							</Button>

							{updateUserPasswordError && (
								<p className="text-sm text-destructive">
									{updateUserPasswordError.message}
								</p>
							)}
						</form>
					</CardContent>
				</Card>
			</div>

			<Card className="border-destructive">
				<CardHeader className="border-b border-destructive">
					<CardTitle className="text-xl text-destructive">
						Danger Zone
					</CardTitle>
					<CardDescription>
						Actions in this section can't be undone
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center justify-between py-3">
						<div>
							<h3 className="font-medium">Delete User Account</h3>
							<p className="text-sm text-muted-foreground">
								Permanently delete this user and all their data
							</p>
						</div>
						<Button
							variant="destructive"
							onClick={() => setIsDeleteDialogOpen(true)}
							disabled={isDeletingUser}
						>
							Delete User
						</Button>
					</div>
					{deleteUserError && (
						<p className="text-sm text-destructive">
							{deleteUserError.message}
						</p>
					)}
				</CardContent>
			</Card>

			<ConfirmDialog
				open={isDeleteDialogOpen}
				onOpenChange={setIsDeleteDialogOpen}
				title={`Delete User ${user.name}`}
				description={`Are you sure you want to delete user ${user.name}? This action cannot be undone.`}
				onConfirm={handleDeleteUser}
				confirmText="Delete"
				variant="destructive"
				isLoading={isDeletingUser}
			/>
		</div>
	);
}
