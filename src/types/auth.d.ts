import type {
	CurrentUserSchema,
	ForgotPasswordSchema,
	LoginCredentialsSchema,
	RegisterCredentialsSchema,
} from "@/schemas/auth-schemas";

export type LoginCredentials = z.infer<typeof LoginCredentialsSchema>;
export type RegisterCredentials = z.infer<typeof RegisterCredentialsSchema>;
export type CurrentUser = z.infer<typeof CurrentUserSchema>;
export type ForgotPassword = z.infer<typeof ForgotPasswordSchema>;
