import type { z } from "zod";
import type {
	AdminUserUpdateParamsScheme,
	AdminUserUpdatePasswordParamsSchema,
} from "@/schemas/admin/user-schemas";

export type AdminUserUpdateParams = z.infer<typeof AdminUserUpdateParamsScheme>;
export type AdminUserUpdatePasswordParams = z.infer<
	typeof AdminUserUpdatePasswordParamsSchema
>;
