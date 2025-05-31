import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
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
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	useApiTokens,
	useCreateApiToken,
	useDeleteApiToken,
} from "@/queries/use-api-token";
import { CreateApiTokenParamsSchema } from "@/schemas/api-token-schemas";
import type { CreateApiTokenParams } from "@/types/api-token";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatDistanceToNow } from "date-fns";
import { Copy, Eye, EyeOff, Key, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function ApiTokenManagement() {
	const { data: tokens } = useApiTokens();
	const { createApiToken, isCreatingApiToken } = useCreateApiToken();
	const { deleteApiToken, isDeletingApiToken } = useDeleteApiToken();

	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [tokenToDelete, setTokenToDelete] = useState<string>("");
	const [newTokenValue, setNewTokenValue] = useState<string>("");
	const [showTokenValue, setShowTokenValue] = useState(false);

	const form = useForm<CreateApiTokenParams>({
		resolver: zodResolver(CreateApiTokenParamsSchema),
		defaultValues: {
			token_name: "",
			abilities: [],
			expires: "never",
		},
	});

	const onSubmit = async (data: CreateApiTokenParams) => {
		try {
			const token = await createApiToken(data);
			setNewTokenValue(token);
			setIsCreateDialogOpen(false);
			setShowTokenValue(true);
			form.reset({
				token_name: "",
				abilities: [],
				expires: "never",
			});
		} catch (error) {
			// Error handling is done in the mutation
		}
	};

	const handleDeleteToken = (tokenId: string) => {
		setTokenToDelete(tokenId);
		setIsDeleteDialogOpen(true);
	};

	const confirmDelete = () => {
		if (tokenToDelete) {
			deleteApiToken(tokenToDelete);
			setIsDeleteDialogOpen(false);
			setTokenToDelete("");
		}
	};

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
		toast.success("Token copied to clipboard", { richColors: true });
	};

	const getAbilityBadgeVariant = (ability: string) => {
		switch (ability) {
			case "create":
				return "default";
			case "read":
				return "secondary";
			case "update":
				return "outline";
			case "delete":
				return "destructive";
			default:
				return "secondary";
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div className="space-y-1">
					<h3 className="text-2xl font-semibold">API Tokens</h3>
					<p className="text-sm text-muted-foreground">
						Manage your API tokens for external integrations.
					</p>
				</div>
				<Dialog
					open={isCreateDialogOpen}
					onOpenChange={setIsCreateDialogOpen}
				>
					<DialogTrigger asChild>
						<Button>
							<Plus className="h-4 w-4 mr-2" />
							Create Token
						</Button>
					</DialogTrigger>
					<DialogContent className="bg-card">
						<DialogHeader>
							<DialogTitle>Create API Token</DialogTitle>
							<DialogDescription>
								Create a new API token.
							</DialogDescription>
						</DialogHeader>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-4"
							>
								<FormField
									control={form.control}
									name="token_name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Token Name</FormLabel>
											<FormDescription>
												A descriptive name for this
												token
											</FormDescription>
											<FormControl>
												<Input
													placeholder="e.g., My App Integration"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="abilities"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Permissions</FormLabel>
											<FormDescription>
												Select the permissions for this
												token
											</FormDescription>
											<FormControl>
												<div className="space-y-3">
													{(
														[
															{
																value: "read",
																label: "Read",
																description:
																	"View lists and public data",
															},
															{
																value: "create",
																label: "Create",
																description:
																	"Create new lists and data",
															},
															{
																value: "update",
																label: "Update",
																description:
																	"Modify existing lists and data",
															},
															{
																value: "delete",
																label: "Delete",
																description:
																	"Delete lists and data",
															},
														] as const
													).map((permission) => (
														<div
															key={
																permission.value
															}
															className="flex items-start space-x-3"
														>
															<Checkbox
																id={`permission-${permission.value}`}
																checked={field.value?.includes(
																	permission.value,
																)}
																onCheckedChange={(
																	checked,
																) => {
																	if (
																		checked
																	) {
																		field.onChange(
																			[
																				...field.value,
																				permission.value,
																			],
																		);
																	} else {
																		field.onChange(
																			field.value?.filter(
																				(
																					value,
																				) =>
																					value !==
																					permission.value,
																			),
																		);
																	}
																}}
															/>
															<div className="grid gap-1.5 leading-none">
																<label
																	htmlFor={`permission-${permission.value}`}
																	className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
																>
																	{
																		permission.label
																	}
																</label>
																<p className="text-xs text-muted-foreground">
																	{
																		permission.description
																	}
																</p>
															</div>
														</div>
													))}
												</div>
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
											<FormLabel>Expiration</FormLabel>
											<FormDescription>
												When should this token expire?
											</FormDescription>
											<FormControl>
												<Select
													onValueChange={
														field.onChange
													}
													defaultValue={field.value}
												>
													<SelectTrigger>
														<SelectValue placeholder="Select expiration" />
													</SelectTrigger>
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
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<div className="flex justify-end space-x-2">
									<Button
										type="button"
										variant="outline"
										onClick={() =>
											setIsCreateDialogOpen(false)
										}
									>
										Cancel
									</Button>
									<Button
										type="submit"
										disabled={isCreatingApiToken}
									>
										Create Token
									</Button>
								</div>
							</form>
						</Form>
					</DialogContent>
				</Dialog>
			</div>

			{/* New Token Display */}
			{newTokenValue && (
				<Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
							<Key className="h-4 w-4" />
							New API Token Created
						</CardTitle>
						<CardDescription className="text-green-600 dark:text-green-400">
							Copy this token now. You won't be able to see it
							again.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex items-center space-x-2">
							<div className="flex-1 font-mono text-sm bg-background p-2 rounded border">
								{showTokenValue
									? newTokenValue
									: "••••••••••••••••••••••••••••••••"}
							</div>
							<Button
								size="icon"
								variant="outline"
								onClick={() =>
									setShowTokenValue(!showTokenValue)
								}
							>
								{showTokenValue ? (
									<EyeOff className="h-4 w-4" />
								) : (
									<Eye className="h-4 w-4" />
								)}
							</Button>
							<Button
								size="icon"
								variant="outline"
								onClick={() => copyToClipboard(newTokenValue)}
							>
								<Copy className="h-4 w-4" />
							</Button>
						</div>
						<Button
							className="mt-3"
							variant="outline"
							size="sm"
							onClick={() => setNewTokenValue("")}
						>
							I've saved this token
						</Button>
					</CardContent>
				</Card>
			)}

			{/* Tokens Table */}
			<Card>
				<CardHeader>
					<CardTitle>Your API Tokens</CardTitle>
					<CardDescription>
						Manage your existing API tokens.
					</CardDescription>
				</CardHeader>
				<CardContent>
					{tokens && tokens.length > 0 ? (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Name</TableHead>
									<TableHead>Permissions</TableHead>
									<TableHead>Last Used</TableHead>
									<TableHead>Expires</TableHead>
									<TableHead>Created</TableHead>
									<TableHead className="w-[100px]">
										Actions
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{tokens.map((token) => (
									<TableRow key={token.id}>
										<TableCell className="font-medium">
											{token.name}
										</TableCell>
										<TableCell>
											<div className="flex gap-1">
												{token.abilities.map(
													(ability) => (
														<Badge
															key={ability}
															variant={getAbilityBadgeVariant(
																ability,
															)}
															className="text-xs"
														>
															{ability}
														</Badge>
													),
												)}
											</div>
										</TableCell>
										<TableCell>
											{token.last_used ? (
												<Tooltip>
													<TooltipTrigger>
														{formatDistanceToNow(
															new Date(
																token.last_used,
															),
															{ addSuffix: true },
														)}
													</TooltipTrigger>
													<TooltipContent>
														{new Date(
															token.last_used,
														).toLocaleString()}
													</TooltipContent>
												</Tooltip>
											) : (
												"Never"
											)}
										</TableCell>
										<TableCell>
											{token.expires ? (
												<Tooltip>
													<TooltipTrigger>
														{formatDistanceToNow(
															new Date(
																token.expires,
															),
															{ addSuffix: true },
														)}
													</TooltipTrigger>
													<TooltipContent>
														{new Date(
															token.expires,
														).toLocaleString()}
													</TooltipContent>
												</Tooltip>
											) : (
												"Never"
											)}
										</TableCell>
										<TableCell>
											<Tooltip>
												<TooltipTrigger>
													{formatDistanceToNow(
														new Date(token.created),
														{ addSuffix: true },
													)}
												</TooltipTrigger>
												<TooltipContent>
													{new Date(
														token.created,
													).toLocaleString()}
												</TooltipContent>
											</Tooltip>
										</TableCell>
										<TableCell>
											<Button
												size="icon"
												variant="outline"
												onClick={() =>
													handleDeleteToken(token.id)
												}
												disabled={isDeletingApiToken}
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					) : (
						<div className="text-center py-8">
							<Key className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
							<h3 className="text-lg font-medium">
								No API tokens
							</h3>
							<p className="text-muted-foreground mb-4">
								You haven't created any API tokens yet.
							</p>
							<Button onClick={() => setIsCreateDialogOpen(true)}>
								<Plus className="h-4 w-4 mr-2" />
								Create your first token
							</Button>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Delete Confirmation Dialog */}
			<ConfirmDialog
				open={isDeleteDialogOpen}
				onOpenChange={setIsDeleteDialogOpen}
				title="Delete API Token"
				description="Are you sure you want to delete this API token? This action cannot be undone and any applications using this token will lose access."
				onConfirm={confirmDelete}
				confirmText="Delete"
				variant="destructive"
				isLoading={isDeletingApiToken}
			/>
		</div>
	);
}
