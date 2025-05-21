import { AppSidebar } from "@/components/navigation/app-sidebar";
import { NavBreadcrumbs } from "@/components/navigation/nav-breadcrumbs";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { useCurrentUser } from "@/queries/use-auth";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { GitCompareIcon, Home, Search, Upload } from "lucide-react";

export const Route = createFileRoute("/(app)")({
	component: RouteComponent,
});

const navItems = [
	{
		title: "Home",
		url: "/",
		icon: Home,
	},
	{
		title: "Upload",
		url: "/upload",
		icon: Upload,
	},
	{
		title: "Browse",
		url: "/lists",
		icon: Search,
	},
	{
		title: "Games",
		url: "/games",
		icon: Search,
	},
	{
		title: "Compare",
		url: "/compare",
		icon: GitCompareIcon,
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
