import type {
	CurrentUserSchema,
	ForgotPasswordSchema,
	LoginCredentialsSchema,
	RegisterCredentialsSchema,
	ResetPasswordSchema,
} from "@/schemas/auth-schemas";
import type { z } from "zod";

export type LoginCredentials = z.infer<typeof LoginCredentialsSchema>;
export type RegisterCredentials = z.infer<typeof RegisterCredentialsSchema>;
export type CurrentUser = z.infer<typeof CurrentUserSchema>;
export type ForgotPassword = z.infer<typeof ForgotPasswordSchema>;
export type ResetPassword = z.infer<typeof ResetPasswordSchema>;
