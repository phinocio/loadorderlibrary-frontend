import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { type ReactElement, useEffect, useState } from "react";
import zod from "zod";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

const searchSchema = zod.object({ error: zod.string().optional() });

const errorMessages: Record<string, string> = {
	invalid_state: "Your sign-in session expired. Please try again.",
	account_exists:
		"An account with this username already exists. Log in and link your Nexus Mods account from settings.",
	oauth_failed: "We couldn't complete the Nexus Mods sign-in.",
	auth_failed: "Nexus OAuth succeeded but logging in failed.",
};

const genericErrorMessage = errorMessages.oauth_failed;

export const Route = createFileRoute("/nexus-oauth-complete")({
	validateSearch: searchSchema,
	component: NexusOAuthComplete,
});

function NexusOAuthComplete(): ReactElement {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { error: errorCode } = Route.useSearch();
	const [refetchFailed, setRefetchFailed] = useState(false);

	const failed = errorCode !== undefined || refetchFailed;
	const description =
		errorCode !== undefined
			? (errorMessages[errorCode] ?? genericErrorMessage)
			: refetchFailed
				? genericErrorMessage
				: "You will be redirected shortly.";

	useEffect((): void => {
		if (errorCode !== undefined) {
			return;
		}

		void (async (): Promise<void> => {
			try {
				await queryClient.refetchQueries({
					queryKey: ["current-user"],
				});
				await navigate({ to: "/" });
			} catch {
				setRefetchFailed(true);
			}
		})();
	}, [queryClient, navigate, errorCode]);

	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<Card>
					<CardHeader className="text-center">
						<CardTitle className="text-xl">
							{failed ? "Log in failed" : "Logging you in…"}
						</CardTitle>
						<CardDescription>{description}</CardDescription>
					</CardHeader>
					<CardContent className="flex flex-col items-center gap-4">
						{failed ? (
							<Button
								onClick={(): void =>
									void navigate({ to: "/login" })
								}
							>
								Back to login
							</Button>
						) : (
							<Spinner className="size-8 text-primary" />
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
