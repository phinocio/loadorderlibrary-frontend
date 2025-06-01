import type {
	ApiTokenSchema,
	CreateApiTokenParamsSchema,
} from "@/schemas/api-token-schemas";
import type { z } from "zod";

export type ApiToken = z.infer<typeof ApiTokenSchema>;
export type CreateApiTokenParams = z.infer<typeof CreateApiTokenParamsSchema>;
