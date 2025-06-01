import { LoginForm } from "@/components/auth/login-form";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/(auth)/login")({
	validateSearch: z.object({
		redirect: z.string().optional(),
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<LoginForm />
			</div>
		</div>
	);
}
