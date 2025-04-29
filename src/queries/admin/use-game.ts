import { adminUpdateGame } from "@/api/admin/game";
import type { AdminGameUpdateParams } from "@/types/admin/game";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function adminUseGame(name: string) {
	const queryClient = useQueryClient();
	const updateGameMutation = useMutation({
		mutationFn: (data: AdminGameUpdateParams) => {
			if (!name) throw new Error("Name is required to update game");
			return adminUpdateGame(name, data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["games"] });
			queryClient.invalidateQueries({ queryKey: ["game", name] });
			toast.success("Game updated successfully", {
				richColors: true,
			});
		},
		onError: (error) => {
			toast.error("Failed to update game", {
				richColors: true,
				description: error.message,
			});
			console.error("Failed to update game", error);
		},
	});

	return {
		updateGame: updateGameMutation.mutate,
		isUpdatingGame: updateGameMutation.isPending,
		updateGameError: updateGameMutation.error,
	};
}
