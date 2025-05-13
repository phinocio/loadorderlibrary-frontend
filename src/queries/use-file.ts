import { getFile } from "@/api/file";

export const fileQueryOptions = (name: string) => ({
	queryKey: ["files", name],
	queryFn: () => getFile(name),
});
