import { ListFiles } from "@/components/lists/files/list-files";
import { ListHeader } from "@/components/lists/list-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { List } from "@/types/list";
import { formatDistanceToNow, parseISO } from "date-fns";
import {
	CalendarIcon,
	Clock,
	FileText,
	Globe,
	MessageCircle,
} from "lucide-react";

interface ListDetailProps {
	list: List;
}

export function ListDetail({ list }: ListDetailProps) {
	return (
		<div className="space-y-6">
			<ListHeader list={list} />

			{/* Main Content */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Files Section (ordered differently on mobile/desktop) */}
				<div className="lg:col-span-2 space-y-6 order-last lg:order-first">
					<ListFiles files={list.files} />
				</div>
				{/* Sidebar Information */}
				<div className="order-first lg:order-last">
					{/* Info Card with Dates and Links */}
					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-lg">
								Information
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-6">
							{/* Dates Section */}
							<div className="space-y-3">
								<div className="flex items-center justify-between text-sm">
									<span className="flex items-center gap-2 text-muted-foreground">
										<Clock className="h-4 w-4" />
										Created
									</span>
									<span
										title={new Date(
											list.created,
										).toLocaleString()}
									>
										{formatDistanceToNow(
											parseISO(list.created),
											{ addSuffix: true },
										)}
									</span>
								</div>
								<div className="flex items-center justify-between text-sm">
									<span className="flex items-center gap-2 text-muted-foreground">
										<CalendarIcon className="h-4 w-4" />
										Last updated
									</span>
									<span
										title={new Date(
											list.updated,
										).toLocaleString()}
									>
										{formatDistanceToNow(
											parseISO(list.updated),
											{ addSuffix: true },
										)}
									</span>
								</div>
								{list.expires && (
									<div className="flex items-center justify-between text-sm">
										<span className="flex items-center gap-2 text-muted-foreground">
											<Clock className="h-4 w-4" />
											Expires
										</span>
										<span
											title={new Date(
												list.expires,
											).toLocaleString()}
										>
											{formatDistanceToNow(
												parseISO(list.expires),
												{ addSuffix: true },
											)}
										</span>
									</div>
								)}
							</div>

							{/* Separator between Dates and Links */}
							{(list.readme || list.website || list.discord) && (
								<Separator />
							)}

							{/* Links Section */}
							{(list.readme || list.website || list.discord) && (
								<div className="space-y-3">
									<h3 className="text-sm font-medium">
										Links
									</h3>

									{list.readme && (
										<a
											href={`https://${list.readme}`}
											target="_blank"
											rel="noopener noreferrer"
											className="text-sm hover:text-primary rounded-sm flex transition-colors"
										>
											<span className="flex items-center gap-2 text-muted-foreground hover:text-primary">
												<FileText className="h-4 w-4" />
												Readme
											</span>
										</a>
									)}

									{list.website && (
										<a
											href={`https://${list.website}`}
											target="_blank"
											rel="noopener noreferrer"
											className="flex text-sm hover:text-primary rounded-sm transition-colors"
										>
											<span className="flex items-center gap-2 text-muted-foreground hover:text-primary">
												<Globe className="h-4 w-4" />
												Website
											</span>
										</a>
									)}

									{list.discord && (
										<a
											href={`https://${list.discord}`}
											target="_blank"
											rel="noopener noreferrer"
											className="flex text-sm hover:text-primary rounded-sm transition-colors"
										>
											<span className="flex items-center gap-2 text-muted-foreground hover:text-primary">
												<MessageCircle className="h-4 w-4" />
												Discord
											</span>
										</a>
									)}
								</div>
							)}
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
