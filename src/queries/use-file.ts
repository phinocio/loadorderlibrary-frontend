import { getFile } from "@/api/file";

export const fileQueryOptions = (name: string) => ({
	queryKey: ["file", name],
	queryFn: () => getFile(name),
});
