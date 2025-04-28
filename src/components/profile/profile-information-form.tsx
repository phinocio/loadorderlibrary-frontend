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
import { UserProfileSchema } from "@/schemas/user-schemas";
import type { CurrentUser } from "@/types/auth";
import type { UserProfile } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function ProfileInformationForm({
	currentUser,
}: { currentUser: CurrentUser }) {
	const { updateProfile, isUpdatingProfile, updateProfileError } = useUser(
		currentUser.name,
	);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserProfile>({
		resolver: zodResolver(UserProfileSchema),
		defaultValues: currentUser.profile ?? {
			bio: "",
			discord: "",
			kofi: "",
			patreon: "",
			website: "",
		},
	});

	const onSubmit = handleSubmit((data) => {
		updateProfile(data);
	});

	return (
		<Card>
			<CardHeader className="border-b">
				<CardTitle className="text-xl">Profile Information</CardTitle>
				<CardDescription>
					Update your public profile information
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={onSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="bio">Bio</Label>
						<Textarea
							id="bio"
							placeholder="Tell us about yourself"
							{...register("bio")}
						/>
						{errors.bio && (
							<p className="text-sm text-destructive">
								{errors.bio.message}
							</p>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="discord">Discord</Label>
						<Input
							id="discord"
							placeholder="Your Discord username"
							{...register("discord")}
						/>
						{errors.discord && (
							<p className="text-sm text-destructive">
								{errors.discord.message}
							</p>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="kofi">Ko-fi</Label>
						<Input
							id="kofi"
							placeholder="Your Ko-fi page URL"
							{...register("kofi")}
						/>
						{errors.kofi && (
							<p className="text-sm text-destructive">
								{errors.kofi.message}
							</p>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="patreon">Patreon</Label>
						<Input
							id="patreon"
							placeholder="Your Patreon page URL"
							{...register("patreon")}
						/>
						{errors.patreon && (
							<p className="text-sm text-destructive">
								{errors.patreon.message}
							</p>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="website">Website</Label>
						<Input
							id="website"
							type="url"
							placeholder="Your personal website URL"
							{...register("website")}
						/>
						{errors.website && (
							<p className="text-sm text-destructive">
								{errors.website.message}
							</p>
						)}
					</div>
					<Button
						type="submit"
						variant="tertiary"
						disabled={isUpdatingProfile}
					>
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
