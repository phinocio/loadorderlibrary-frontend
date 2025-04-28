import logo from "@/assets/images/logo.png";
import type * as React from "react";

import { NavLoginRegister } from "@/components/navigation/nav-login-register";
import { NavMain } from "@/components/navigation/nav-main";
import { NavUser } from "@/components/navigation/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
	SidebarSeparator,
	useSidebar,
} from "@/components/ui/sidebar";
import type { CurrentUser } from "@/types/auth";
import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { Heart } from "lucide-react";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
	routes: {
		title: string;
		url: string;
		icon: LucideIcon;
	}[];
	currentUser: CurrentUser | null;
}

export function AppSidebar({ currentUser, routes, ...props }: AppSidebarProps) {
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
							<span className="text-lg font-bold text-primary">
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
				{currentUser ? (
					<NavUser currentUser={currentUser} />
				) : (
					<NavLoginRegister />
				)}
				{open && <SidebarSeparator />}
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
							<Link
								to="/support"
								className={open ? "justify-center" : ""}
							>
								<Heart className="text-primary" />
								<span>Support the Site</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
