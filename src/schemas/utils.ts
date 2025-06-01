import z from "zod";

export const optionalUrl = z
	.union([
		z.string().url("Invalid URL. It must start with http:// or https://"),
		z.literal(""),
	])
	.optional();
