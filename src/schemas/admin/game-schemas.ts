import { z } from "zod";

export const AdminGameUpdateSchema = z.object({
	name: z.string(),
});
