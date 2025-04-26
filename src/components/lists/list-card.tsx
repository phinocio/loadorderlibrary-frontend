import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

interface ListCardProps {
	name: string;
	author: string;
	game: string;
	lastUpdated: string;
	description: string;
}

export function ListCard({
	name,
	author,
	game,
	lastUpdated,
	description,
}: ListCardProps) {
	return (
		<Card className="group hover:shadow-md transition-all">
			<CardHeader className="border-b">
				<CardTitle className="text-xl font-bold line-clamp-1 text-primary">
					{name}
				</CardTitle>
				<CardDescription>
					<div className="flex items-center justify-between">
						<span className="text-accent-foreground font-medium">
							{game}
						</span>
						<span className="text-secondary">
							by <span className="font-medium">{author}</span>
						</span>
					</div>
					<div className="text-[10px] text-muted-foreground mt-1">
						Updated {new Date(lastUpdated).toLocaleDateString()}
					</div>
				</CardDescription>
			</CardHeader>
			<CardContent>
				<p className="line-clamp-2">{description}</p>
			</CardContent>
		</Card>
	);
}
