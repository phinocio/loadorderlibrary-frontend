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
import { LoginCredentialsSchema } from "@/schemas/auth-schemas";
import type { LoginCredentials } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const navigate = useNavigate();
	const { redirect } = useSearch({ from: "/(auth)/login" });
	const { login, isLoggingIn, loginError } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginCredentials>({
		resolver: zodResolver(LoginCredentialsSchema),
	});

	const onSubmit = handleSubmit((data) => {
		login(data, {
			onSuccess: () => {
				navigate({ to: redirect || "/" });
			},
		});
	});

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle>Log in to your account</CardTitle>
					<CardDescription>
						Enter your account details below to login.
					</CardDescription>
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
							<div className="flex flex-col gap-3">
								<Button
									type="submit"
									variant="tertiary"
									className="w-full"
									disabled={isLoggingIn}
								>
									Log In
								</Button>
							</div>
						</div>
						<div className="mt-4 text-center text-sm">
							Don&apos;t have an account?{" "}
							<Link
								to="/register"
								className="underline underline-offset-4 text-primary hover:text-primary/80"
							>
								Register
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
