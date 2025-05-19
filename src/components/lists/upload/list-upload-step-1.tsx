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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGames } from "@/queries/use-game";
import { ListCreateParamsSchema } from "@/schemas/list-schemas";
import {
	useListUploadActions,
	useListUploadFormData,
} from "@/stores/list-upload-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

const Step1Schema = ListCreateParamsSchema.pick({
	name: true,
	version: true,
	description: true,
	game: true,
});

type Step1FormData = z.infer<typeof Step1Schema>;

export function ListUploadStep1() {
	const { data: games } = useGames();
	const formData = useListUploadFormData();
	const { setFormData, setStep, reset } = useListUploadActions();

	const form = useForm<Step1FormData>({
		resolver: zodResolver(Step1Schema),
		defaultValues: {
			name: formData.name || "",
			version: formData.version || "",
			description: formData.description || "",
			game: formData.game || "",
		},
	});

	function onSubmit(data: Step1FormData) {
		setFormData(data);
		setStep(2);
	}

	const { name, game } = form.watch();
	const nextDisabled = !name || !game;

	form.watch((data) => {
		setFormData(data);
	});

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Step 1: Basic List Information</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-6"
						>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>List Name</FormLabel>
										<FormDescription className="text-sm text-muted-foreground">
											Choose a name for your mod list
										</FormDescription>
										<FormControl>
											<Input
												placeholder="Enter list name"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="game"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Game</FormLabel>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Select a game" />
												</SelectTrigger>
												<SelectContent>
													{games.map((game) => (
														<SelectItem
															key={game.slug}
															value={String(
																game.id,
															)}
														>
															{game.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="version"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Version</FormLabel>
										<FormDescription className="text-sm text-muted-foreground">
											Optional version number for your
											list
										</FormDescription>
										<FormControl>
											<Input
												placeholder="e.g., 1.0.0"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormDescription className="text-sm text-muted-foreground">
											Brief description of your mod list
											(max 1000 characters)
										</FormDescription>
										<FormControl>
											<Textarea
												placeholder="Enter a description for your list"
												className="resize-none"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="flex justify-end border-t pt-4">
								<Button
									type="submit"
									variant="tertiary"
									disabled={nextDisabled}
								>
									Next
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
			<div className="mt-4">
				<Button
					variant="destructive"
					onClick={() => {
						reset();
						form.reset();
					}}
				>
					Reset Form
				</Button>
			</div>
		</>
	);
}
