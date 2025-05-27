import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ListUpdateParamsSchema } from "@/schemas/list-schemas";
import {
	useListEditActions,
	useListEditFormData,
} from "@/stores/list-edit-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

const EditStep3Schema = ListUpdateParamsSchema.pick({
	website: true,
	discord: true,
	readme: true,
});

type EditStep3FormData = z.infer<typeof EditStep3Schema>;

export function ListEditStep3() {
	const formData = useListEditFormData();
	const { setFormData, setStep } = useListEditActions();

	const form = useForm<EditStep3FormData>({
		resolver: zodResolver(EditStep3Schema),
		defaultValues: {
			website: formData.website || "",
			discord: formData.discord || "",
			readme: formData.readme || "",
		},
	});

	async function onSubmit(data: EditStep3FormData) {
		setFormData(data);
		setStep(4);
	}

	const goBack = () => {
		setStep(2);
	};

	form.watch((data) => {
		setFormData(data);
	});

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Step 3: External Links & Socials</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-6"
						>
							<FormField
								control={form.control}
								name="website"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Website</FormLabel>
										<FormDescription className="text-sm text-muted-foreground">
											Optional website link for your mod
											list
										</FormDescription>
										<FormControl>
											<Input
												placeholder="https://example.com"
												type="url"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="discord"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Discord Link</FormLabel>
										<FormDescription className="text-sm text-muted-foreground">
											Optional Discord server invite link
										</FormDescription>
										<FormControl>
											<Input
												placeholder="https://discord.com/invite/K3KnEgrQE4"
												type="url"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="readme"
								render={({ field }) => (
									<FormItem>
										<FormLabel>README Link</FormLabel>
										<FormDescription className="text-sm text-muted-foreground">
											Optional link to documentation for
											your mod list
										</FormDescription>
										<FormControl>
											<Input
												type="url"
												placeholder="https://example.com/readme.md"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="flex justify-between border-t pt-4">
								<Button
									type="button"
									variant="outline"
									onClick={goBack}
								>
									Back
								</Button>
								<Button type="submit" variant="tertiary">
									Next
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</>
	);
}
