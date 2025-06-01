import { cn } from "@/lib/utils";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeSelector() {
	const { theme, setTheme } = useTheme();

	const themes = [
		{
			value: "light" as const,
			label: "Light",
			icon: Sun,
		},
		{
			value: "dark" as const,
			label: "Dark",
			icon: Moon,
		},
		{
			value: "system" as const,
			label: "System",
			icon: Monitor,
		},
	];

	return (
		<div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
			{themes.map((themeOption) => {
				const Icon = themeOption.icon;
				const isActive = theme === themeOption.value;

				return (
					<button
						key={themeOption.value}
						onClick={() => setTheme(themeOption.value)}
						className={cn(
							"flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
							"hover:bg-background/60",
							isActive
								? "bg-background text-foreground shadow-sm"
								: "text-muted-foreground hover:text-foreground",
						)}
						type="button"
					>
						<Icon className="h-4 w-4" />
						{themeOption.label}
					</button>
				);
			})}
		</div>
	);
}
