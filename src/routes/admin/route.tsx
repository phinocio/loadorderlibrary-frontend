import { getUser } from "@/api/auth";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { Home, Search, User as UserIcon } from "lucide-react";

export const Route = createFileRoute("/admin")({
	beforeLoad: async ({ context }) => {
		const user = await context.queryClient.ensureQueryData({
			queryKey: ["user"],
			queryFn: getUser,
		});

		if (!user) {
			throw redirect({
				to: "/login",
				search: {
					redirect: "/admin",
				},
			});
		}

		if (!user.admin) {
			throw redirect({
				to: "/",
			});
		}
	},
	component: RouteComponent,
});

const navItems = [
	{
		title: "Home",
		url: "/",
		icon: Home,
	},
	{
		title: "Users",
		url: "/admin/users",
		icon: UserIcon,
	},
	{
		title: "Lists",
		url: "/admin/lists",
		icon: Search,
	},
];

function RouteComponent() {
	return (
		<>
			<SidebarProvider>
				<AppSidebar routes={navItems} />
				<SidebarInset>
					<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
						<div className="flex items-center gap-2 px-4">
							<SidebarTrigger className="-ml-1" />
						</div>
						<div className="ml-auto flex items-center gap-2 px-4">
							<ThemeSwitcher />
						</div>
					</header>
					<main className="flex flex-1 flex-col gap-4 p-4 pt-0">
						<Outlet />
					</main>
				</SidebarInset>
			</SidebarProvider>
		</>
	);
}
