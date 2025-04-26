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
import { RegisterCredentialsSchema } from "@/schemas/auth-schemas";
import type { RegisterCredentials } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

export function RegisterForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const navigate = useNavigate();
	const { register: registerUser, isRegistering, registerError } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterCredentials>({
		resolver: zodResolver(RegisterCredentialsSchema),
	});

	const onSubmit = handleSubmit((data) => {
		registerUser(data, {
			onSuccess: () => {
				navigate({ to: "/" });
			},
		});
	});

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle>Create an account</CardTitle>
					<CardDescription>
						Enter your details below to create your account.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={onSubmit}>
						{registerError && (
							<div className="mb-4 text-sm text-destructive">
								{registerError instanceof Error
									? registerError.message
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
								<Label htmlFor="password">Password</Label>
								<Input
									id="password"
									type="password"
									placeholder="Enter your password"
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
									placeholder="Confirm your password"
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
							<div className="flex flex-col gap-3">
								<Button
									type="submit"
									className="w-full"
									disabled={isRegistering}
								>
									{isRegistering
										? "Creating account..."
										: "Create account"}
								</Button>
							</div>
						</div>
						<div className="mt-4 text-center text-sm">
							Already have an account?{" "}
							<Link
								to="/login"
								className="underline underline-offset-4"
							>
								Sign in
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
