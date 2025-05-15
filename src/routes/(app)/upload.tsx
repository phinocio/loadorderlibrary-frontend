import { useGames } from "@/queries/use-game";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/upload")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data: games } = useGames();

	return (
		<div className="container mx-auto p-4 gap-4">
			<h1 className="text-2xl font-bold">Upload</h1>
			<p>Upload your game here</p>
			<div className="flex flex-col gap-4">
				{games.map((game) => (
					<div key={game.id} className="p-4 border rounded-md">
						<h2 className="text-xl font-bold">{game.name}</h2>
					</div>
				))}
			</div>
		</div>
	);
}
