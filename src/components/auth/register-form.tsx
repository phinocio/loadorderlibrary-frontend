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
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export function RegisterForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const navigate = useNavigate();
	const { register, isRegistering, registerError } = useAuth();
	const [formData, setFormData] = useState({
		name: "",
		password: "",
		password_confirmation: "",
	});

	async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		register(formData, {
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
					<CardTitle>Create an account</CardTitle>
					<CardDescription>
						Enter your details below to create your account.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={onSubmit}>
						{registerError && (
							<div className="mb-4 text-sm text-red-500">
								{registerError instanceof Error
									? registerError.message
									: "Something went wrong. Please try again."}
							</div>
						)}
						<div className="flex flex-col gap-6">
							<div className="grid gap-3">
								<Label htmlFor="name">Username</Label>
								<Input
									id="name"
									type="text"
									placeholder="Enter your name"
									required
									value={formData.name}
									onChange={handleChange}
									disabled={isRegistering}
								/>
							</div>
							<div className="grid gap-3">
								<Label htmlFor="password">Password</Label>
								<Input
									id="password"
									type="password"
									placeholder="Enter your password"
									required
									value={formData.password}
									onChange={handleChange}
									disabled={isRegistering}
								/>
							</div>
							<div className="grid gap-3">
								<Label htmlFor="password_confirmation">
									Confirm Password
								</Label>
								<Input
									id="password_confirmation"
									type="password"
									placeholder="Confirm your password"
									required
									value={formData.password_confirmation}
									onChange={handleChange}
									disabled={isRegistering}
								/>
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
