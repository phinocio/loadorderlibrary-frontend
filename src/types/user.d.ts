import type {
	UserPasswordUpdateParamsSchema,
	UserProfileSchema,
	UserSchema,
	UserUpdateParamsSchema,
} from "@/schemas/user-schemas";
import type { z } from "zod";

export type User = z.infer<typeof UserSchema>;
export type UserUpdateParams = z.infer<typeof UserUpdateParamsSchema>;
export type UserPasswordUpdateParams = z.infer<
	typeof UserPasswordUpdateParamsSchema
>;
export type UserProfile = z.infer<typeof UserProfileSchema>;
