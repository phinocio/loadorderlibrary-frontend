import logo from "@/assets/images/logo.png";
import type * as React from "react";

import { NavMain } from "@/components/navigation/nav-main";
import { NavUser } from "@/components/navigation/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenuItem,
	SidebarRail,
	useSidebar,
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
	routes: {
		title: string;
		url: string;
		icon: LucideIcon;
	}[];
}

export function AppSidebar({ routes, ...props }: AppSidebarProps) {
	const { open } = useSidebar();
	return (
		<Sidebar collapsible="icon" {...props} variant="inset">
			<SidebarHeader>
				<SidebarMenuItem className="my-4 flex h-16 items-center justify-center">
					<Link to="/" className="flex flex-col gap-2 items-center">
						<img
							src={logo}
							alt="Load Order Library"
							className="h-8"
						/>
						{open && (
							<span className="ml-2 text-lg font-bold text-primary">
								Load Order Library
							</span>
						)}
					</Link>
				</SidebarMenuItem>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={routes} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
