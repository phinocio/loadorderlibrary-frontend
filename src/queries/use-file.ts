import { useSuspenseQuery } from "@tanstack/react-query";
import { getFile } from "@/api/file";

export function useFile(name: string) {
	return useSuspenseQuery({
		queryKey: ["files", name],
		queryFn: () => getFile(name),
	});
}
