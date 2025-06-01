import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";
import { LogIn, User } from "lucide-react";

export function NavLoginRegister() {
	return (
		<SidebarMenu>
			<SidebarMenuItem className="flex flex-col gap-2">
				<SidebarMenuButton
					asChild
					className="w-full justify-center gap-2 rounded-lg border border-input hover:bg-tertiary hover:text-primary-foreground"
				>
					<Link to="/login">
						<LogIn className="size-4" />
						<span>Login</span>
					</Link>
				</SidebarMenuButton>
				<SidebarMenuButton
					asChild
					className="w-full justify-center gap-2 rounded-lg border border-input hover:bg-tertiary hover:text-primary-foreground"
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
