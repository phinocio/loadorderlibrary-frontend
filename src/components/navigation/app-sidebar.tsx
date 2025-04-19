import type * as React from "react";

import { NavMain } from "@/components/navigation/nav-main";
import { NavUser } from "@/components/navigation/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import type { LucideIcon } from "lucide-react";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
	routes: {
		title: string;
		url: string;
		icon: LucideIcon;
	}[];
}

export function AppSidebar({ routes, ...props }: AppSidebarProps) {
	return (
		<Sidebar collapsible="icon" {...props} variant="inset">
			<SidebarHeader>Header</SidebarHeader>
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
