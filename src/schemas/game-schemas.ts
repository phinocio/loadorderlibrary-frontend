import { z } from "zod";

export const GameSchema = z.object({
	id: z.number(),
	name: z.string(),
	slug: z.string(),
	lists_count: z.number(),
});
