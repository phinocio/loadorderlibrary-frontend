import { getFile } from "@/api/file";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useFile(name: string) {
	return useSuspenseQuery({
		queryKey: ["files", name],
		queryFn: () => getFile(name),
	});
}
