import { downloadFile, getFile } from "@/api/file";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export function useFile(name: string) {
	return useSuspenseQuery({
		queryKey: ["files", name],
		queryFn: () => getFile(name),
	});
}

export function useFileDownload() {
	const fileDownloadMutation = useMutation({
		mutationFn: (name: string) => downloadFile(name),
		onSuccess: () => {
			toast.success("File downloaded successfully", {
				richColors: true,
			});
		},
		onError: (error) => {
			toast.error("Failed to download file", {
				richColors: true,
				description: error.message,
			});
			console.error("Failed to download file", error);
		},
	});

	return {
		downloadFile: fileDownloadMutation.mutate,
		isDownloadingFile: fileDownloadMutation.isPending,
		downloadFileError: fileDownloadMutation.error,
	};
}
