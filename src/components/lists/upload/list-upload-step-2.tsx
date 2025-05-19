import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ListCreateParamsSchema } from "@/schemas/list-schemas";
import { useListUploadStore } from "@/stores/list-upload-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import type { z } from "zod";

const Step2Schema = ListCreateParamsSchema.pick({
	description: true,
	website: true,
	discord: true,
	readme: true,
	private: true,
	expires: true,
});

type Step2FormData = z.infer<typeof Step2Schema>;

export function ListUploadStep2() {
	const { formData, setFormData, setStep } = useListUploadStore();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Step2FormData>({
		resolver: zodResolver(Step2Schema),
		defaultValues: {
			description: formData.description || "",
			website: formData.website || "",
			discord: formData.discord || "",
			readme: formData.readme || "",
			private: formData.private || false,
			expires: formData.expires
				? format(new Date(formData.expires), "yyyy-MM-dd'T'HH:mm")
				: "",
		},
	});

	const onSubmit = (data: Step2FormData) => {
		setFormData(data);
		setStep(3);
	};

	const goBack = () => {
		setStep(1);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Step 2: List Visibility & Details</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-2">
						<Label htmlFor="description">Description</Label>
						<Textarea
							id="description"
							placeholder="Enter a description for your list"
							{...register("description")}
							className="min-h-24"
						/>
						{errors.description && (
							<p className="text-sm text-destructive">
								{errors.description.message}
							</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="website">Website (optional)</Label>
						<Input
							id="website"
							type="url"
							placeholder="https://your-website.com"
							{...register("website")}
						/>
						{errors.website && (
							<p className="text-sm text-destructive">
								{errors.website.message}
							</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="discord">Discord Link (optional)</Label>
						<Input
							id="discord"
							type="url"
							placeholder="https://discord.gg/your-invite"
							{...register("discord")}
						/>
						{errors.discord && (
							<p className="text-sm text-destructive">
								{errors.discord.message}
							</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="readme">README (optional)</Label>
						<Textarea
							id="readme"
							placeholder="Markdown supported"
							{...register("readme")}
							className="min-h-32"
						/>
						{errors.readme && (
							<p className="text-sm text-destructive">
								{errors.readme.message}
							</p>
						)}
					</div>

					<div className="flex items-center gap-2">
						<input
							type="checkbox"
							id="private"
							{...register("private")}
							className="h-4 w-4 rounded border-input"
						/>
						<Label
							htmlFor="private"
							className="text-sm font-normal"
						>
							Make this list private
						</Label>
						{errors.private && (
							<p className="text-sm text-destructive">
								{errors.private.message}
							</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="expires">
							Expiration Date (optional)
						</Label>
						<Input
							id="expires"
							type="datetime-local"
							{...register("expires")}
						/>
						{errors.expires && (
							<p className="text-sm text-destructive">
								{errors.expires.message}
							</p>
						)}
					</div>

					<div className="flex justify-between">
						<Button
							type="button"
							variant="outline"
							onClick={goBack}
						>
							Back
						</Button>
						<Button type="submit">Next</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
