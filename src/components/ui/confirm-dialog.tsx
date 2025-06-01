import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	description: string;
	onConfirm: () => void;
	confirmText?: string;
	cancelText?: string;
	variant?: "default" | "secondary" | "destructive";
	isLoading?: boolean;
}

export function ConfirmDialog({
	open,
	onOpenChange,
	title,
	description,
	onConfirm,
	confirmText = "Confirm",
	cancelText = "Cancel",
	variant = "default",
	isLoading = false,
}: ConfirmDialogProps) {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>
						{description}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel asChild>
						<Button variant="outline" disabled={isLoading}>
							{cancelText}
						</Button>
					</AlertDialogCancel>
					<Button
						variant={variant}
						onClick={onConfirm}
						disabled={isLoading}
					>
						{confirmText}
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
