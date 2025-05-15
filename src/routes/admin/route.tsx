import { AppSidebar } from "@/components/navigation/app-sidebar";
import { NavBreadcrumbs } from "@/components/navigation/nav-breadcrumbs";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { requireAdmin } from "@/lib/guards";
import { useCurrentUser } from "@/queries/use-auth";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Gamepad2, Home, Search, User as UserIcon } from "lucide-react";

export const Route = createFileRoute("/admin")({
	beforeLoad: async () => {
		await requireAdmin();
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
		title: "Games",
		url: "/admin/games",
		icon: Gamepad2,
	},
	{
		title: "Lists",
		url: "/admin/lists",
		icon: Search,
	},
];

function RouteComponent() {
	const { data: currentUser } = useCurrentUser();

	return (
		<>
			<SidebarProvider>
				<AppSidebar routes={navItems} currentUser={currentUser} />
				<SidebarInset>
					<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
						<div className="flex items-center gap-4 px-4">
							<SidebarTrigger className="-ml-1" />
							<NavBreadcrumbs />
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
