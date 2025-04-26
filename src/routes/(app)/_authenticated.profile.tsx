import { ListCard } from "@/components/lists/list-card";
import { BasicInfoForm } from "@/components/profile/basic-info-form";
import { ProfileInformationForm } from "@/components/profile/profile-information-form";
import { currentUserQueryOptions } from "@/hooks/queries/use-auth";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_authenticated/profile")({
	loader: async ({ context }) =>
		await context.queryClient.ensureQueryData(currentUserQueryOptions),
	component: RouteComponent,
});

const lists = [
	{
		name: "Skyrim Anniversary Edition - Survival Mode",
		id: 1,
		author: "ModGuru",
		game: "TESV Skyrim SE",
		lastUpdated: "2025-04-20",
		description:
			"A hardcore survival experience with camping, needs, and temperature systems. Optimized for performance and stability.",
	},
	{
		name: "Tale of Two Wastelands - Ultimate Edition",
		id: 2,
		author: "WastelandWanderer",
		game: "Tale of Two Wastelands",
		lastUpdated: "2025-04-18",
		description:
			"Complete TTW setup featuring major quest mods, enhanced graphics, and gameplay overhauls for both FO3 and FNV content.",
	},
	{
		name: "Morrowind 2025 Graphics Overhaul",
		id: 3,
		author: "RetroReviver",
		game: "TESIII Morrowind",
		lastUpdated: "2025-04-15",
		description:
			"Modern graphics with MGE XE, featuring high-res textures and meshes while maintaining the original art style.",
	},
	{
		name: "Fallout 4 Performance Plus",
		id: 4,
		author: "FPSMaster",
		game: "Fallout 4",
		lastUpdated: "2025-04-12",
		description:
			"Heavily optimized setup focused on maximum FPS while enhancing visuals. Perfect for low-end to mid-range PCs.",
	},
];

function RouteComponent() {
	const { data: currentUser } = useSuspenseQuery(currentUserQueryOptions);

	if (!currentUser) {
		throw Error("Current User is null on profile page somehow.");
	}

	return (
		<div className="w-full  mx-auto container">
			<div className="flex flex-col gap-8">
				{/* Forms Section */}
				<div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
					{/* Basic Info Section */}
					<div className="w-full space-y-6">
						<div className="space-y-2">
							<h2 className="text-2xl font-semibold tracking-tight">
								Basic Info
							</h2>
							<p className="text-sm text-muted-foreground">
								Update your basic account information.
							</p>
						</div>
						<BasicInfoForm currentUser={currentUser} />
					</div>

					{/* Profile Information Section */}
					<div className="w-full space-y-6">
						<div className="space-y-2">
							<h2 className="text-2xl font-semibold tracking-tight">
								Profile Information
							</h2>
							<p className="text-sm text-muted-foreground">
								Customize your profile details.
							</p>
						</div>
						<ProfileInformationForm currentUser={currentUser} />
					</div>
				</div>

				{/* Lists Section */}
				<div className="w-full">
					<div className="space-y-6">
						<div className="space-y-2">
							<h2 className="text-2xl font-semibold tracking-tight">
								Your Load Orders
							</h2>
							<p className="text-sm text-muted-foreground">
								Browse and manage your created load orders.
							</p>
						</div>
						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
							{lists.map((list) => (
								<ListCard key={list.id} {...list} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
