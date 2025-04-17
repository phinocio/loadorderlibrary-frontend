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
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const navigate = useNavigate();
	const { login, isLoggingIn, loginError } = useAuth();
	const [formData, setFormData] = useState({
		name: "",
		password: "",
	});

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		login(formData, {
			onSuccess: () => {
				navigate({ to: "/" });
			},
		});
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setFormData((prev) => ({
			...prev,
			[e.target.id]: e.target.value,
		}));
	}

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle>Login to your account</CardTitle>
					<CardDescription>
						Enter your account name below to login.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={onSubmit}>
						{loginError && (
							<div className="mb-4 text-sm text-red-500">
								{loginError instanceof Error
									? loginError.message
									: "Something went wrong. Please try again."}
							</div>
						)}
						<div className="flex flex-col gap-6">
							<div className="grid gap-3">
								<Label htmlFor="name">Name</Label>
								<Input
									id="name"
									type="text"
									placeholder="Enter your name"
									required
									value={formData.name}
									onChange={handleChange}
									disabled={isLoggingIn}
								/>
							</div>
							<div className="grid gap-3">
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
									required
									value={formData.password}
									onChange={handleChange}
									disabled={isLoggingIn}
								/>
							</div>
							<div className="flex flex-col gap-3">
								<Button
									type="submit"
									className="w-full"
									disabled={isLoggingIn}
								>
									{isLoggingIn ? "Logging in..." : "Login"}
								</Button>
							</div>
						</div>
						<div className="mt-4 text-center text-sm">
							Don&apos;t have an account?{" "}
							<Link
								to="/register"
								className="underline underline-offset-4"
							>
								Sign up
							</Link>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
