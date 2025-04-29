import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { adminUseGames } from "@/queries/admin/use-game";
import { gamesQueryOptions } from "@/queries/use-game";
import { AdminGameCreateSchema } from "@/schemas/admin/game-schemas";
import type { AdminGameCreateParams } from "@/types/admin/game";
import type { Game } from "@/types/game";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/admin/games/")({
	component: RouteComponent,
});

function RouteComponent() {
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
	const { data: games } = useQuery<Game[]>(gamesQueryOptions);
	const { createGame, isCreatingGame } = adminUseGames();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<AdminGameCreateParams>({
		resolver: zodResolver(AdminGameCreateSchema),
	});

	const onSubmit = handleSubmit((data) => {
		createGame(data.name);
		reset();
		setIsCreateDialogOpen(false);
	});

	return (
		<div className="container mx-auto p-4 gap-4">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold">Games</h1>
				<Button onClick={() => setIsCreateDialogOpen(true)}>
					<PlusIcon className="w-4 h-4 mr-2" />
					Add Game
				</Button>
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="font-bold">Name</TableHead>
						<TableHead className="font-bold">Lists</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{!games ? (
						<TableRow>
							<TableCell colSpan={2} className="text-center">
								Loading games...
							</TableCell>
						</TableRow>
					) : (
						games.map((game) => (
							<TableRow key={game.id}>
								<TableCell className="font-medium">
									{game.name}
								</TableCell>
								<TableCell>
									<Badge variant="secondary">
										{game.lists_count} lists
									</Badge>
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>

			<Dialog
				open={isCreateDialogOpen}
				onOpenChange={setIsCreateDialogOpen}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Create Game</DialogTitle>
						<DialogDescription>
							Add a new game to the platform
						</DialogDescription>
					</DialogHeader>

					<form onSubmit={onSubmit}>
						<div className="space-y-4 py-4">
							<div className="space-y-2">
								<Label htmlFor="name">Game Name</Label>
								<Input
									id="name"
									placeholder="Enter game name"
									{...register("name")}
								/>
								{errors.name && (
									<p className="text-sm text-destructive">
										{errors.name.message}
									</p>
								)}
							</div>
						</div>

						<DialogFooter>
							<Button type="submit" disabled={isCreatingGame}>
								Create Game
							</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
}
