import z from "zod";

export const ApiTokenSchema = z.object({
	id: z.string(),
	name: z.string(),
	abilities: z.array(z.enum(["create", "read", "update", "delete"])),
	last_used: z.string().datetime().nullable(),
	expires: z.string().datetime().nullable(),
	created: z.string().datetime(),
	updated: z.string().datetime(),
});

export const CreateApiTokenParamsSchema = z.object({
	token_name: z.string().min(1, "Token name is required"),
	abilities: z
		.array(z.enum(["create", "read", "update", "delete"]))
		.min(1, "At least one permission must be selected"),
	expires: z.enum(["never", "3h", "24h", "3d", "1w", "1m"]).optional(),
});
