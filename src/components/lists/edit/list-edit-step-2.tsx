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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ListUpdateParamsSchema } from "@/schemas/list-schemas";
import {
	useListEditActions,
	useListEditFormData,
} from "@/stores/list-edit-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

const EditStep2Schema = ListUpdateParamsSchema.pick({
	private: true,
	expires: true,
});

type EditStep2FormData = z.infer<typeof EditStep2Schema>;

export function ListEditStep2() {
	const formData = useListEditFormData();
	const { setFormData, setStep } = useListEditActions();

	const form = useForm<EditStep2FormData>({
		resolver: zodResolver(EditStep2Schema),
		defaultValues: {
			private: formData.private || false,
			expires: formData.expires || "never",
		},
	});

	function onSubmit(data: EditStep2FormData) {
		setFormData(data);
		setStep(3);
	}

	const goBack = () => {
		setStep(1);
	};

	form.watch((data) => {
		setFormData(data);
	});

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Step 2: List Visibility Settings</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-6"
						>
							<FormField
								control={form.control}
								name="private"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Make this list private
										</FormLabel>
										<FormDescription className="text-sm text-muted-foreground">
											Only people with the link can view
											this list
										</FormDescription>
										<FormControl>
											<Switch
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="expires"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Expiration Time</FormLabel>
										<FormDescription className="text-sm text-muted-foreground">
											Optional time period after which
											this list will expire
										</FormDescription>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select expiration time" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="never">
													Never
												</SelectItem>
												<SelectItem value="3h">
													3 Hours
												</SelectItem>
												<SelectItem value="24h">
													24 Hours
												</SelectItem>
												<SelectItem value="3d">
													3 Days
												</SelectItem>
												<SelectItem value="1w">
													1 Week
												</SelectItem>
												<SelectItem value="1m">
													1 Month
												</SelectItem>
											</SelectContent>
										</Select>
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
