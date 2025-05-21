import { FileSchema } from "@/schemas/file-schemas";
import { GameSchema } from "@/schemas/game-schemas";
import { z } from "zod";

export const ListSchema = z.object({
	name: z.string(),
	version: z.string().nullable(),
	slug: z.string(),
	url: z.string().url(),
	description: z.string().nullable(),
	website: z.string().url().nullable(),
	discord: z.string().url().nullable(),
	readme: z.string().url().nullable(),
	private: z.boolean(),
	expires: z.string().datetime().nullable(),
	created: z.string().datetime(),
	updated: z.string().datetime(),
	author: z
		.object({
			name: z.string(),
			verified: z.boolean(),
		})
		.optional(),
	game: GameSchema,
	files: z.array(FileSchema).optional(),
	links: z.object({
		url: z.string(),
		self: z.string().url(),
	}),
});

export const ListCreateParamsSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	version: z.string().optional(),
	description: z
		.union([
			z.string().max(1000, { message: "Maximum of 1000 characters." }),
			z.literal(""),
		])
		.optional(),
	website: z.union([z.string().url(), z.literal("")]).optional(),
	discord: z.union([z.string().url(), z.literal("")]).optional(),
	readme: z.union([z.string(), z.literal("")]).optional(),
	private: z.boolean().optional(),
	expires: z
		.union([
			z.enum(["never", "3h", "24h", "3d", "1w", "1m"]),
			z.literal(""),
		])
		.optional(),
	game: z.string().nonempty({
		message: "Game is required",
	}),
	// files: FileUploadSchema, // Handled in the upload form
});

export const ListUpdateParamsSchema =
	ListCreateParamsSchema.partial().optional();
