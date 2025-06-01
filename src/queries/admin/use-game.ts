import { adminCreateGame } from "@/api/admin/game";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAdminCreateGame() {
	const queryClient = useQueryClient();

	const createGameMutation = useMutation({
		mutationFn: (name: string) => adminCreateGame(name),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["games"] });
			toast.success("Game created successfully", {
				richColors: true,
			});
		},
		onError: (error) => {
			toast.error("Failed to create game", {
				richColors: true,
				description: error.message,
			});
		},
	});

	return {
		createGame: createGameMutation.mutate,
		isCreatingGame: createGameMutation.isPending,
		createGameError: createGameMutation.error,
	};
}
