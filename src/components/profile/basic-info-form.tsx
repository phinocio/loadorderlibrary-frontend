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
import { useUser } from "@/hooks/queries/use-user";
import type { CurrentUser } from "@/types/auth";
import { useState } from "react";

export function BasicInfoForm({ currentUser }: { currentUser: CurrentUser }) {
	const {
		updateUser,
		updateUserPassword,
		isUpdatingUser,
		isUpdatingPassword,
		updateUserError,
		updateUserPasswordError,
	} = useUser(currentUser.name);

	const [email, setEmail] = useState(currentUser.email ?? "");
	const [password, setPassword] = useState({
		current_password: "",
		password: "",
		password_confirmation: "",
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
				<form
					onSubmit={(e) => {
						e.preventDefault();
						updateUser({ email: email || null });
					}}
					className="space-y-4"
				>
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Enter your email"
						/>
					</div>
					<Button type="submit" disabled={isUpdatingUser}>
						Update Email
					</Button>
					{updateUserError && (
						<p className="text-sm text-destructive">
							{updateUserError.message}
						</p>
					)}
				</form>

				<Separator />

				<form
					onSubmit={(e) => {
						e.preventDefault();
						updateUserPassword(password);
					}}
					className="space-y-4"
				>
					<div className="space-y-2">
						<Label htmlFor="current-password">
							Current Password
						</Label>
						<Input
							id="current-password"
							type="password"
							placeholder="Enter your password"
							value={password.current_password}
							onChange={(e) =>
								setPassword((prev) => ({
									...prev,
									current_password: e.target.value,
								}))
							}
							autoComplete="current-password"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="new-password">New Password</Label>
						<Input
							id="new-password"
							type="password"
							placeholder="Enter your new password"
							value={password.password}
							onChange={(e) =>
								setPassword((prev) => ({
									...prev,
									password: e.target.value,
								}))
							}
							autoComplete="new-password"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="confirm-password">
							Confirm New Password
						</Label>
						<Input
							id="confirm-password"
							type="password"
							placeholder="Confirm your new password"
							value={password.password_confirmation}
							onChange={(e) =>
								setPassword((prev) => ({
									...prev,
									password_confirmation: e.target.value,
								}))
							}
							autoComplete="new-password"
						/>
					</div>
					<Button type="submit" disabled={isUpdatingPassword}>
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
