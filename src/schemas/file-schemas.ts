import { z } from "zod";

export const FileSchema = z.object({
	name: z.string(),
	clean_name: z.string(),
	size_in_bytes: z.number(),
	content: z.array(z.string()).optional(),
});
