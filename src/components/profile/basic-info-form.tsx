import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useUpdateUser, useUpdateUserPassword } from "@/queries/use-user";
import {
	UserPasswordUpdateParamsSchema,
	UserUpdateParamsSchema,
} from "@/schemas/user-schemas";
import type { CurrentUser } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

type UserUpdateParams = z.infer<typeof UserUpdateParamsSchema>;
type UserPasswordUpdateParams = z.infer<typeof UserPasswordUpdateParamsSchema>;

export function BasicInfoForm({ currentUser }: { currentUser: CurrentUser }) {
	const { updateUser, isUpdatingUser, updateUserError } = useUpdateUser(
		currentUser.name,
	);
	const { updateUserPassword, isUpdatingPassword, updateUserPasswordError } =
		useUpdateUserPassword(currentUser.name);

	const {
		register: registerEmail,
		handleSubmit: handleEmailSubmit,
		formState: { errors: emailErrors },
	} = useForm<UserUpdateParams>({
		resolver: zodResolver(UserUpdateParamsSchema),
		defaultValues: {
			email: currentUser.email ?? "",
		},
	});

	const {
		register: registerPassword,
		handleSubmit: handlePasswordSubmit,
		formState: { errors: passwordErrors },
	} = useForm<UserPasswordUpdateParams>({
		resolver: zodResolver(UserPasswordUpdateParamsSchema),
		defaultValues: {
			current_password: "",
			password: "",
			password_confirmation: "",
		},
	});

	const onEmailSubmit = handleEmailSubmit((data) => {
		updateUser(data);
	});

	const onPasswordSubmit = handlePasswordSubmit((data) => {
		updateUserPassword(data);
	});

	return (
		<Card>
			<CardHeader className="border-b">
				<CardTitle className="text-xl">Basic Information</CardTitle>
				<CardDescription>
					Update your email address and password
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<Alert variant="info">
					<InfoIcon className="size-4" />
					<AlertDescription>
						<p>
							Load Order Library uses{" "}
							<a
								href="https://resend.com"
								target="_blank"
								rel="noopener noreferrer"
								className="underline text-primary font-bold"
							>
								Resend
							</a>{" "}
							to handle email, this means that Resend will end up
							receiving the email address in the event you need to
							reset your password.
						</p>
					</AlertDescription>
				</Alert>
				<form onSubmit={onEmailSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="Enter your email"
							{...registerEmail("email")}
						/>
						{emailErrors.email && (
							<p className="text-sm text-destructive">
								{emailErrors.email.message}
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

				<Separator />

				<form onSubmit={onPasswordSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="current-password">
							Current Password
						</Label>
						<Input
							id="current-password"
							type="password"
							placeholder="Enter your password"
							{...registerPassword("current_password")}
							autoComplete="current-password"
							required
						/>
						{passwordErrors.current_password && (
							<p className="text-sm text-destructive">
								{passwordErrors.current_password.message}
							</p>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="new-password">New Password</Label>
						<Input
							id="new-password"
							type="password"
							placeholder="Enter your new password"
							{...registerPassword("password")}
							autoComplete="new-password"
							required
						/>
						{passwordErrors.password && (
							<p className="text-sm text-destructive">
								{passwordErrors.password.message}
							</p>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="confirm-password">
							Confirm New Password
						</Label>
						<Input
							id="confirm-password"
							type="password"
							placeholder="Confirm your new password"
							{...registerPassword("password_confirmation")}
							autoComplete="new-password"
							required
						/>
						{passwordErrors.password_confirmation && (
							<p className="text-sm text-destructive">
								{passwordErrors.password_confirmation.message}
							</p>
						)}
					</div>
					<Button
						type="submit"
						variant="tertiary"
						disabled={isUpdatingPassword}
					>
						Update Password
					</Button>
					{updateUserPasswordError && (
						<p className="text-sm text-destructive">
							{updateUserPasswordError.message}
						</p>
					)}
				</form>
			</CardContent>
		</Card>
	);
}
