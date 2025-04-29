import { z } from "zod";

export const AdminGameCreateSchema = z.object({
	name: z.string().min(1, "Game name is required"),
});
