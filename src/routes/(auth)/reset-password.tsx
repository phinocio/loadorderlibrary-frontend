import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/(auth)/reset-password")({
	validateSearch: z.object({
		token: z.string(),
		email: z.string().email(),
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<ResetPasswordForm />
			</div>
		</div>
	);
}
