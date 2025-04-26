import { z } from "zod";

const optionalUrl = z.union([z.string().url(), z.literal("")]).optional();

export const UserProfileSchema = z.object({
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
	profile: z.union([UserProfileSchema, z.null()]).optional(),
	created: z.string(),
	updated: z.string(),
	links: z.object({
		self: z.string(),
		url: z.string(),
	}),
});

export const UserUpdateParamsSchema = z.object({
	email: z.string().nullable().optional(),
});

export const UserPasswordUpdateParamsSchema = z.object({
	current_password: z.string(),
	password: z.string(),
	password_confirmation: z.string(),
});
