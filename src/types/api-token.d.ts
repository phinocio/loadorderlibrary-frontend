import type { z } from "zod";
import type {
	ApiTokenSchema,
	CreateApiTokenParamsSchema,
} from "@/schemas/api-token-schemas";

export type ApiToken = z.infer<typeof ApiTokenSchema>;
export type CreateApiTokenParams = z.infer<typeof CreateApiTokenParamsSchema>;
