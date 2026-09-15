import { z } from "zod";
import { ListSchema } from "@/schemas/list-schemas";
import { optionalUrl } from "@/schemas/utils";

export const UserProfileSchema = z.object({
	avatar: z.string().optional(),
	bio: z.union([z.string(), z.literal("")]).optional(),
	discord: optionalUrl,
	kofi: optionalUrl,
	patreon: optionalUrl,
	website: optionalUrl,
});

// This should match the return for public user profiles, which doesn't include
// the email and admin fields
export const UserSchema = z.object({
	name: z.string(),
	verified: z.boolean(),
	admin: z.boolean().optional(),
	profile: z.union([UserProfileSchema, z.null()]).optional(),
	lists: z.array(ListSchema).optional(),
	created: z.string(),
	updated: z.string(),
});

export const UserUpdateParamsSchema = z.object({
	email: z.union([z.email(), z.literal("")]).optional(),
});

export const UserPasswordUpdateParamsSchema = z.object({
	current_password: z.string(),
	password: z.string(),
	password_confirmation: z.string(),
});
