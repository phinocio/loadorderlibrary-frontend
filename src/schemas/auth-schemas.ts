import { UserProfileSchema } from "@/schemas/user-schemas";
import { z } from "zod";

export const LoginCredentialsSchema = z.object({
	name: z.string().min(1, "Username is required"),
	password: z.string().min(1, "Password is required"),
});

export const RegisterCredentialsSchema = z
	.object({
		name: z.string().min(1, "Username is required"),
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

export const CurrentUserSchema = z.object({
	name: z.string(),
	email: z.string().email("Invalid email address").nullable(),
	verified: z.boolean(),
	admin: z.boolean(),
	profile: z.union([UserProfileSchema, z.null()]).optional(),
	created: z.string(),
	updated: z.string(),
});

export const ForgotPasswordSchema = z.object({
	email: z.string().email("Invalid email address"),
});

export const ResetPasswordSchema = z
	.object({
		token: z.string().min(1, "Token is required"),
		email: z.string().email("Invalid email address"),
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
