import type {
	AdminUserUpdateParamsScheme,
	AdminUserUpdatePasswordParamsSchema,
} from "@/schemas/admin-user-schemas";
import type { z } from "zod";

export type AdminUserUpdateParams = z.infer<typeof AdminUserUpdateParamsScheme>;
export type AdminUserUpdatePasswordParams = z.infer<
	typeof AdminUserUpdatePasswordParamsSchema
>;
