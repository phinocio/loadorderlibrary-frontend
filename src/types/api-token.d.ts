import type { CreateApiTokenParamsSchema } from "@/schemas/api-token-schemas";
import type { z } from "zod";

export type ApiToken = z.infer<typeof CreateApiTokenParamsSchema>;
export type CreateApiTokenParams = z.infer<typeof CreateApiTokenParamsSchema>;
