import { z } from "zod";

export const AdminUserUpdateParamsScheme = z.object({
	email: z.union([z.string().email(), z.literal("")]).optional(),
	is_verified: z.boolean().optional(),
});

export const AdminUserUpdatePasswordParamsSchema = z
	.object({
		password: z
			.string()
			.min(1, "Password is required")
			.min(8, "Password must be at least 8 characters"),
		password_confirmation: z
			.string()
			.min(1, "Password confirmation is required")
			.min(8, "Password confirmation must be at least 8 characters"),
	})
	.refine((data) => data.password === data.password_confirmation, {
		message: "Passwords don't match",
		path: ["password_confirmation"],
	});
