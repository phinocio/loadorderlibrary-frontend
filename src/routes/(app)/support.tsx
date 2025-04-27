import { Alert, AlertDescription } from "@/components/ui/alert";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import {
	CircleDollarSign,
	Coffee,
	Github,
	InfoIcon,
	MessageCircle,
	Share2,
} from "lucide-react";

export const Route = createFileRoute("/(app)/support")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="container mx-auto py-6 space-y-6">
			<div className="space-y-2">
				<h1 className="text-3xl font-bold tracking-tight">
					Support the Site
				</h1>
				<p className="text-muted-foreground">
					Load Order Library has no paid features nor ads, if you find
					the site useful and would like to support its development,
					you can do so through the following platforms:
				</p>
			</div>

			<Alert variant="info">
				<InfoIcon className="size-4" />
				<AlertDescription>
					The support links on this page are for supporting Load Order
					Library as a platform. They are not for supporting
					individual list authors. List authors may include their own
					support links on their profiles.
				</AlertDescription>
			</Alert>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Card className="flex flex-col">
					<CardHeader className="flex-1">
						<CardTitle className="flex items-center gap-2">
							<Coffee className="size-5" />
							Ko-fi
						</CardTitle>
						<CardDescription>
							Buy me a coffee through Ko-fi with one-time
							donations
						</CardDescription>
					</CardHeader>
					<CardContent className="mt-auto">
						<a
							href="https://ko-fi.com/phinocio"
							className="text-primary hover:underline"
							target="_blank"
							rel="noopener noreferrer"
						>
							Support on Ko-fi →
						</a>
					</CardContent>
				</Card>

				<Card className="flex flex-col">
					<CardHeader className="flex-1">
						<CardTitle className="flex items-center gap-2">
							<Github className="size-5" />
							GitHub Sponsors
						</CardTitle>
						<CardDescription>
							Support through GitHub Sponsors with monthly or
							one-time donations
						</CardDescription>
					</CardHeader>
					<CardContent className="mt-auto">
						<a
							href="https://github.com/sponsors/phinocio"
							className="text-primary hover:underline"
							target="_blank"
							rel="noopener noreferrer"
						>
							Sponsor on GitHub →
						</a>
					</CardContent>
				</Card>

				<Card className="flex flex-col">
					<CardHeader className="flex-1">
						<CardTitle className="flex items-center gap-2">
							<CircleDollarSign className="size-5" />
							Patreon
						</CardTitle>
						<CardDescription>
							Support through Patreon with monthly donations
						</CardDescription>
					</CardHeader>
					<CardContent className="mt-auto">
						<a
							href="https://www.patreon.com/phinocio"
							className="text-primary hover:underline"
							target="_blank"
							rel="noopener noreferrer"
						>
							Support on Patreon →
						</a>
					</CardContent>
				</Card>
			</div>

			<div className="space-y-2">
				<h1 className="text-3xl font-bold tracking-tight">Socials</h1>
				<p className="text-muted-foreground">
					Follow and join our community on these platforms:
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Card className="flex flex-col">
					<CardHeader className="flex-1">
						<CardTitle className="flex items-center gap-2">
							<MessageCircle className="size-5" />
							Discord
						</CardTitle>
						<CardDescription>Join the Discord</CardDescription>
					</CardHeader>
					<CardContent className="mt-auto">
						<a
							href="https://discord.com/invite/K3KnEgrQE4"
							className="text-primary hover:underline"
							target="_blank"
							rel="noopener noreferrer"
						>
							Join Discord →
						</a>
					</CardContent>
				</Card>

				<Card className="flex flex-col">
					<CardHeader className="flex-1">
						<CardTitle className="flex items-center gap-2">
							<Share2 className="size-5" />
							Bluesky
						</CardTitle>
						<CardDescription>Follow me on Bluesky</CardDescription>
					</CardHeader>
					<CardContent className="mt-auto">
						<a
							href="https://bsky.app/profile/phinoc.io"
							className="text-primary hover:underline"
							target="_blank"
							rel="noopener noreferrer"
						>
							Follow on Bluesky →
						</a>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
