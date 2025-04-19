"use client";

import { Link } from "@tanstack/react-router";
import {
	ChevronsUpDown,
	Lock,
	LogIn,
	LogOut,
	Settings,
	User,
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
import { useAuth } from "@/hooks/use-auth";

export function NavUser() {
	const { isMobile } = useSidebar();
	const { user, logout } = useAuth();

	if (!user) {
		return (
			<SidebarMenu>
				<SidebarMenuItem className="flex flex-col gap-2">
					<SidebarMenuButton
						asChild
						className="w-full justify-center gap-2 rounded-lg border border-input hover:bg-accent hover:text-accent-foreground"
					>
						<Link to="/login">
							<LogIn className="size-4" />
							<span>Login</span>
						</Link>
					</SidebarMenuButton>
					<SidebarMenuButton
						asChild
						className="w-full justify-center gap-2 rounded-lg border border-input hover:bg-accent hover:text-accent-foreground"
					>
						<Link to="/register">
							<User className="size-4" />
							<span>Register</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		);
	}

	const initials = user.name.slice(0, 2).toUpperCase();

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
								<AvatarFallback className="rounded-lg">
									{initials}
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">
									{user.name}
								</span>
								{user.email && (
									<span className="truncate text-xs">
										{user.email}
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
									<AvatarFallback className="rounded-lg">
										{initials}
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">
										{user.name}
									</span>
									<span className="truncate text-xs">
										{user.email}
									</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<Link to="/lists">
								<DropdownMenuItem>
									<User className="size-4" />
									<span>Profile</span>
								</DropdownMenuItem>
							</Link>
							<DropdownMenuItem>
								<Settings className="size-4" />
								<span>Settings</span>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						{user.admin && (
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
						<DropdownMenuItem onClick={() => logout()}>
							<LogOut className="size-4" />
							<span>Log out</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
