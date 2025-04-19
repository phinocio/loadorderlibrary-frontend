"use client";

import { Link, redirect } from "@tanstack/react-router";
import {
	ChevronsUpDown,
	Lock,
	LogOut,
	Settings,
	User as UserIcon,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/queries/use-auth";
import type { User } from "@/types/user";

export function NavUser({ currentUser }: { currentUser: User }) {
	const { isMobile } = useSidebar();
	const { logout } = useAuth();

	async function handleLogout() {
		logout();
		redirect({
			to: "/",
		});
	}

	const initials = currentUser.name.slice(0, 2).toUpperCase();

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarFallback className="rounded-full bg-primary text-primary-foreground">
									{initials}
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">
									{currentUser.name}
								</span>
								{currentUser.email && (
									<span className="truncate text-xs">
										{currentUser.email}
									</span>
								)}
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarFallback className="rounded-full bg-primary text-primary-foreground">
										{initials}
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">
										{currentUser.name}
									</span>
									<span className="truncate text-xs">
										{currentUser.email}
									</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<Link to="/lists">
								<DropdownMenuItem>
									<UserIcon className="size-4" />
									<span>Profile</span>
								</DropdownMenuItem>
							</Link>
							<DropdownMenuItem>
								<Settings className="size-4" />
								<span>Settings</span>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						{currentUser.admin && (
							<>
								<DropdownMenuGroup>
									<Link to="/admin">
										<DropdownMenuItem>
											<Lock className="size-4" />
											<span>Admin</span>
										</DropdownMenuItem>
									</Link>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
							</>
						)}
						<DropdownMenuItem onClick={handleLogout}>
							<LogOut className="size-4" />
							<span>Log out</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
