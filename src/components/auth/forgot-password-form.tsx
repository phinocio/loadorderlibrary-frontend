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
import { useAuth } from "@/hooks/queries/use-auth";
import { cn } from "@/lib/utils";
import { ForgotPasswordSchema } from "@/schemas/auth-schemas";
import type { ForgotPassword } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { InfoIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function ForgotPasswordForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const [isSuccess, setIsSuccess] = useState(false);
	const { forgotPassword, isForgotPassword, forgotPasswordError } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ForgotPassword>({
		resolver: zodResolver(ForgotPasswordSchema),
	});

	const onSubmit = handleSubmit((data) => {
		setIsSuccess(false);
		forgotPassword(data, {
			onSuccess: () => {
				setIsSuccess(true);
				reset();
			},
		});
	});

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Alert variant="info">
				<InfoIcon className="size-4" />
				<AlertDescription className="space-y-2">
					<p>
						Since emails are optional, if the account does not have
						an email, passwords can not be reset this way.
					</p>
					<p>
						Load Order Library uses{" "}
						<a
							href="https://resend.com"
							target="_blank"
							rel="noopener noreferrer"
							className="underline text-primary"
						>
							Resend
						</a>{" "}
						to handle email, this means that Resend will end up
						receiving the email address when a reset link is sent.
					</p>
				</AlertDescription>
			</Alert>
			<Card>
				<CardHeader>
					<CardTitle>Reset your password</CardTitle>
					<CardDescription>
						Enter your email address and we'll send you a link to
						reset your password.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={onSubmit}>
						{forgotPasswordError && (
							<div className="mb-4 text-sm text-destructive">
								{forgotPasswordError instanceof Error
									? forgotPasswordError.message
									: "Something went wrong. Please try again."}
							</div>
						)}
						{isSuccess && (
							<div className="mb-4 text-sm text-green-600 dark:text-green-500">
								Password reset link has been sent to your email.
								Please check your inbox.
							</div>
						)}
						<div className="flex flex-col gap-6">
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="Enter your email"
									{...register("email")}
									autoComplete="email"
									required
								/>
								{errors.email && (
									<p className="text-sm text-destructive">
										{errors.email.message}
									</p>
								)}
							</div>
							<div className="flex flex-col gap-3">
								<Button
									type="submit"
									variant="tertiary"
									className="w-full"
									disabled={isForgotPassword}
								>
									Send Reset Link
								</Button>
							</div>
						</div>
						<div className="mt-4 text-center text-sm">
							Remember your password?{" "}
							<Link
								to="/login"
								className="underline underline-offset-4 text-primary hover:text-primary/80"
							>
								Log In
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
