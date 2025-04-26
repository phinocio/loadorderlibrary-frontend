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
import { useUser } from "@/hooks/queries/use-user";
import type { CurrentUser } from "@/types/auth";
import type { UserProfile } from "@/types/user";
import { useState } from "react";

export function ProfileInformationForm({
	currentUser,
}: { currentUser: CurrentUser }) {
	const { updateProfile, isUpdatingProfile, updateProfileError } = useUser(
		currentUser.name,
	);

	const [profile, setProfile] = useState<UserProfile>(
		currentUser.profile ?? {
			bio: "",
			discord: "",
			kofi: "",
			patreon: "",
			website: "",
		},
	);

	return (
		<Card>
			<CardHeader className="border-b">
				<CardTitle className="text-xl">Profile Information</CardTitle>
				<CardDescription>
					Update your public profile information
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						updateProfile(profile);
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
					<Button type="submit" disabled={isUpdatingProfile}>
						Update Profile
					</Button>
					{updateProfileError && (
						<p className="text-sm text-destructive">
							{updateProfileError.message}
						</p>
					)}
				</form>
			</CardContent>
		</Card>
	);
}
