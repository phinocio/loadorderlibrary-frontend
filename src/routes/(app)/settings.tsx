import { useTheme } from "@/components/theme/theme-provider";
import { ThemeSelector } from "@/components/theme/theme-selector";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { createFileRoute } from "@tanstack/react-router";
import { Monitor, Moon, Sun } from "lucide-react";

export const Route = createFileRoute("/(app)/settings")({
	head: () => ({
		meta: [{ title: "Settings - Load Order Library" }],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	const { theme } = useTheme();

	const getThemeIcon = () => {
		switch (theme) {
			case "light":
				return <Sun className="h-4 w-4" />;
			case "dark":
				return <Moon className="h-4 w-4" />;
			case "system":
				return <Monitor className="h-4 w-4" />;
			default:
				return <Monitor className="h-4 w-4" />;
		}
	};

	const getThemeDescription = () => {
		switch (theme) {
			case "light":
				return "Use light theme";
			case "dark":
				return "Use dark theme";
			case "system":
				return "Follow system preference";
			default:
				return "Follow system preference";
		}
	};

	return (
		<div className="w-full mx-auto container">
			<div className="flex flex-col gap-8">
				<div className="space-y-2">
					<h1 className="text-3xl font-bold tracking-tight">
						Settings
					</h1>
					<p className="text-muted-foreground">
						Customize your preferences and appearance.
					</p>
				</div>

				{/* Appearance Section */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							{getThemeIcon()}
							Appearance
						</CardTitle>
						<CardDescription>
							Customize how Load Order Library looks on your
							device.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
							<div className="space-y-1">
								<Label className="text-base font-medium">
									Theme
								</Label>
								<p className="text-sm text-muted-foreground">
									{getThemeDescription()}
								</p>
							</div>
							<ThemeSelector />
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
