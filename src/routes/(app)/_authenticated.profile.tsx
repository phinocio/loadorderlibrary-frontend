import { updateUser, updateUserProfile } from "@/api/user";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { currentUserQueryOptions } from "@/hooks/queries/use-auth";
import type { UserProfile } from "@/types/user";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/(app)/_authenticated/profile")({
	loader: async ({ context }) =>
		await context.queryClient.ensureQueryData(currentUserQueryOptions),
	component: RouteComponent,
});

function RouteComponent() {
	const { data: currentUser } = useSuspenseQuery(currentUserQueryOptions);

	if (!currentUser) {
		throw Error("Current User is null on profile page somehow."); // This should never happen with useSuspenseQuery, but satisfies TypeScript
	}

	const [email, setEmail] = useState(currentUser.email ?? "");
	const [profile, setProfile] = useState<UserProfile>(
		currentUser.profile ?? {
			bio: "",
			discord: "",
			kofi: "",
			patreon: "",
			website: "",
		},
	);

	const updateUserMutation = useMutation({
		mutationFn: () =>
			updateUser(currentUser.name, { email: email || null }),
	});

	const updateProfileMutation = useMutation({
		mutationFn: () => updateUserProfile(currentUser.name, profile),
	});

	return (
		<div className="container mx-auto max-w-2xl space-y-6 p-4">
			<Card>
				<CardHeader>
					<CardTitle>Basic Information</CardTitle>
					<CardDescription>Update your email address</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							updateUserMutation.mutate();
						}}
						className="space-y-4"
					>
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="Enter your email"
							/>
						</div>
						<Button
							type="submit"
							disabled={updateUserMutation.isPending}
						>
							{updateUserMutation.isPending
								? "Saving..."
								: "Save Email"}
						</Button>
						{updateUserMutation.isError && (
							<p className="text-sm text-destructive">
								{updateUserMutation.error.message}
							</p>
						)}
					</form>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Profile Information</CardTitle>
					<CardDescription>
						Update your public profile information
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							updateProfileMutation.mutate();
						}}
						className="space-y-4"
					>
						<div className="space-y-2">
							<Label htmlFor="bio">Bio</Label>
							<Textarea
								id="bio"
								value={profile.bio}
								onChange={(e) =>
									setProfile((prev) => ({
										...prev,
										bio: e.target.value,
									}))
								}
								placeholder="Tell us about yourself"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="discord">Discord</Label>
							<Input
								id="discord"
								value={profile.discord}
								onChange={(e) =>
									setProfile((prev) => ({
										...prev,
										discord: e.target.value,
									}))
								}
								placeholder="Your Discord username"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="kofi">Ko-fi</Label>
							<Input
								id="kofi"
								value={profile.kofi}
								onChange={(e) =>
									setProfile((prev) => ({
										...prev,
										kofi: e.target.value,
									}))
								}
								placeholder="Your Ko-fi page URL"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="patreon">Patreon</Label>
							<Input
								id="patreon"
								value={profile.patreon}
								onChange={(e) =>
									setProfile((prev) => ({
										...prev,
										patreon: e.target.value,
									}))
								}
								placeholder="Your Patreon page URL"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="website">Website</Label>
							<Input
								id="website"
								type="url"
								value={profile.website}
								onChange={(e) =>
									setProfile((prev) => ({
										...prev,
										website: e.target.value,
									}))
								}
								placeholder="Your personal website URL"
							/>
						</div>
						<Button
							type="submit"
							disabled={updateProfileMutation.isPending}
						>
							{updateProfileMutation.isPending
								? "Saving..."
								: "Save Profile"}
						</Button>
						{updateProfileMutation.isError && (
							<p className="text-sm text-destructive">
								{updateProfileMutation.error.message}
							</p>
						)}
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
