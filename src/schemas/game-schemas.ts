import { z } from "zod";

export const GameSchema = z.object({
	id: z.string(),
	name: z.string(),
	slug: z.string(),
	lists_count: z.number(),
});
