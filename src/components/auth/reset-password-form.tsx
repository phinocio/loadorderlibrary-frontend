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
import { useAuth } from "@/hooks/queries/use-auth";
import { cn } from "@/lib/utils";
import { ResetPasswordSchema } from "@/schemas/auth-schemas";
import type { ResetPassword } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearch } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

export function ResetPasswordForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const { token, email } = useSearch({ from: "/(auth)/reset-password" });
	const { resetPassword, isResettingPassword, resetPasswordError } =
		useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ResetPassword>({
		resolver: zodResolver(ResetPasswordSchema),
		defaultValues: {
			token,
			email,
		},
	});

	const onSubmit = handleSubmit((data) => {
		resetPassword(data);
	});

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle>Reset your password</CardTitle>
					<CardDescription>
						Enter your new password below.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={onSubmit}>
						{resetPasswordError && (
							<div className="mb-4 text-sm text-destructive">
								{resetPasswordError instanceof Error
									? resetPasswordError.message
									: "Something went wrong. Please try again."}
							</div>
						)}
						<div className="flex flex-col gap-6">
							<input type="hidden" {...register("token")} />
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									{...register("email")}
									disabled
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="password">New Password</Label>
								<Input
									id="password"
									type="password"
									placeholder="Enter your new password"
									{...register("password")}
									autoComplete="new-password"
									required
								/>
								{errors.password && (
									<p className="text-sm text-destructive">
										{errors.password.message}
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
									placeholder="Confirm your new password"
									{...register("password_confirmation")}
									autoComplete="new-password"
									required
								/>
								{errors.password_confirmation && (
									<p className="text-sm text-destructive">
										{errors.password_confirmation.message}
									</p>
								)}
							</div>
							<Button
								type="submit"
								variant="secondary"
								className="w-full"
								disabled={isResettingPassword}
							>
								Reset Password
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
