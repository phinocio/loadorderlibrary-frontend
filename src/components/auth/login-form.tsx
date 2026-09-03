import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import type { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useLogin } from "@/queries/use-auth";
import { LoginCredentialsSchema } from "@/schemas/auth-schemas";
import type { LoginCredentials } from "@/types/auth";

export function LoginForm(): ReactElement {
	const navigate = useNavigate();
	const { redirect } = useSearch({ from: "/(auth)/login" });
	const { login, isLoggingIn, loginError } = useLogin();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginCredentials>({
		resolver: zodResolver(LoginCredentialsSchema),
		defaultValues: {
			remember: false,
		},
	});

	const onSubmit = handleSubmit((data: LoginCredentials): void => {
		login(data, {
			onSuccess: (): void => {
				navigate({ to: redirect || "/" });
			},
		});
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>Log in to your account</CardTitle>
				<CardDescription>
					Enter your account details below to login.
				</CardDescription>
				<CardAction>
					<Link
						to="/register"
						className="underline underline-offset-4 text-primary hover:text-primary/80"
					>
						Register
					</Link>
				</CardAction>
			</CardHeader>
			<CardContent>
				<form onSubmit={onSubmit}>
					{loginError && (
						<div className="mb-4 text-sm text-destructive">
							{loginError instanceof Error
								? loginError.message
								: "Something went wrong. Please try again."}
						</div>
					)}
					<div className="flex flex-col gap-6">
						<div className="space-y-2">
							<Label htmlFor="name">Username</Label>
							<Input
								id="name"
								type="text"
								placeholder="Enter your name"
								{...register("name")}
								autoComplete="username"
								required
							/>
							{errors.name && (
								<p className="text-sm text-destructive">
									{errors.name.message}
								</p>
							)}
						</div>
						<div className="space-y-2">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
								<Link
									to="/forgot-password"
									className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
								>
									Forgot your password?
								</Link>
							</div>
							<Input
								id="password"
								type="password"
								placeholder="Enter your password"
								{...register("password")}
								autoComplete="current-password"
								required
							/>
							{errors.password && (
								<p className="text-sm text-destructive">
									{errors.password.message}
								</p>
							)}
						</div>
						<div className="flex items-center space-x-2">
							<input
								type="checkbox"
								id="remember"
								className="h-4 w-4 rounded border-input bg-background text-primary ring-offset-background"
								{...register("remember")}
							/>
							<Label
								htmlFor="remember"
								className="text-sm font-normal"
							>
								Remember me
							</Label>
						</div>
						<div className="flex flex-col gap-3">
							<Button
								type="submit"
								variant="tertiary"
								className="w-full"
								disabled={isLoggingIn}
							>
								Log In
							</Button>

							<div className="flex items-center gap-4">
								<Separator className="flex-1" />
								<span className="text-sm text-muted-foreground">
									OR
								</span>
								<Separator className="flex-1" />
							</div>

							<a
								href={import.meta.env.VITE_NEXUS_OAUTH_URL}
								className={buttonVariants({
									variant: "nexus",
								})}
							>
								Log In With Nexus Mods
							</a>
						</div>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
