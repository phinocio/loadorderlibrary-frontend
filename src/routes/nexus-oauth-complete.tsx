import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { type ReactElement, useEffect } from "react";

export const Route = createFileRoute("/nexus-oauth-complete")({
	component: NexusOAuthComplete,
});

function NexusOAuthComplete(): ReactElement {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	useEffect((): void => {
		void (async (): Promise<void> => {
			await queryClient.refetchQueries({ queryKey: ["current-user"] });
			//await navigate({ to: "/" });
		})();
	}, [queryClient, navigate]);

	return (
		<div>
			<p>Signing you in…</p>
		</div>
	);
}
