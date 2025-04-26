import { UserProfileSchema } from "@/schemas/user-schemas";
import { z } from "zod";

export const LoginCredentialsSchema = z.object({
	name: z.string(),
	password: z.string(),
});

export const RegisterCredentialsSchema = z.object({
	name: z.string(),
	password: z.string(),
	password_confirmation: z.string(),
});

export const CurrentUserSchema = z.object({
	name: z.string(),
	email: z.string().email().nullable(),
	verified: z.boolean(),
	admin: z.boolean(),
	profile: z.union([UserProfileSchema, z.null()]).optional(),
	created: z.string(),
	updated: z.string(),
});
