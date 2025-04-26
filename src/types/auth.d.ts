import type {
	CurrentUserSchema,
	LoginCredentialsSchema,
	RegisterCredentialsSchema,
} from "@/schemas/auth-schemas";

export type LoginCredentials = z.infer<typeof LoginCredentialsSchema>;
export type RegisterCredentials = z.infer<typeof RegisterCredentialsSchema>;
export type CurrentUser = z.infer<typeof CurrentUserSchema>;
