import { useFileApi } from "@/api/file";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useFile(name: string) {
	const { getFile } = useFileApi();

	return useSuspenseQuery({
		queryKey: ["files", name],
		queryFn: () => getFile(name),
	});
}
